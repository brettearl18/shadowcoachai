import { collection, query, where, onSnapshot, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Session, ClientProgress, Activity } from '@/types/coach';

export interface Client {
  id: string;
  name: string;
  email: string;
  lastCheckIn: Date;
  progress: number;
  status: 'on-track' | 'needs-attention' | 'at-risk';
  nextSession: Date;
  achievements: number;
  coachId: string;
  goals: Goal[];
  checkIns: CheckIn[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: Date;
  status: 'in-progress' | 'completed' | 'overdue';
}

interface CheckIn {
  id: string;
  date: Date;
  mood: number;
  notes: string;
  goalsProgress: {
    goalId: string;
    progress: number;
  }[];
}

interface Session {
  id: string;
  coachId: string;
  clientId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface ClientProgress {
  clientId: string;
  progress: number;
  status: 'on-track' | 'needs-attention' | 'at-risk';
  achievements: number;
}

interface Activity {
  id: string;
  type: 'check-in' | 'goal-update' | 'session' | 'achievement';
  clientId: string;
  date: Date;
  description: string;
  metadata?: Record<string, any>;
}

export class CoachService {
  private static instance: CoachService;
  private constructor() {}

  public static getInstance(): CoachService {
    if (!CoachService.instance) {
      CoachService.instance = new CoachService();
    }
    return CoachService.instance;
  }

  async getClients(coachId: string): Promise<Client[]> {
    try {
      const clientsRef = collection(db, 'clients');
      const q = query(clientsRef, where('coachId', '==', coachId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastCheckIn: doc.data().lastCheckIn?.toDate(),
        nextSession: doc.data().nextSession?.toDate(),
      })) as Client[];
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  async getClientDetails(clientId: string): Promise<Client> {
    try {
      const clientRef = collection(db, 'clients');
      const q = query(clientRef, where('id', '==', clientId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Client not found');
      }

      const clientData = querySnapshot.docs[0].data();
      return {
        id: querySnapshot.docs[0].id,
        ...clientData,
        lastCheckIn: clientData.lastCheckIn?.toDate(),
        nextSession: clientData.nextSession?.toDate(),
      } as Client;
    } catch (error) {
      console.error('Error fetching client details:', error);
      throw error;
    }
  }

  async getUpcomingSessions(coachId: string, limit: number = 5): Promise<Client[]> {
    try {
      const clientsRef = collection(db, 'clients');
      const q = query(
        clientsRef,
        where('coachId', '==', coachId),
        orderBy('nextSession', 'asc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        nextSession: doc.data().nextSession?.toDate(),
      })) as Client[];
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
      throw error;
    }
  }

  async getClientProgress(clientId: string): Promise<{
    progress: number;
    status: 'on-track' | 'needs-attention' | 'at-risk';
    achievements: number;
  }> {
    try {
      const checkInsRef = collection(db, 'checkIns');
      const goalsRef = collection(db, 'goals');
      
      // Get recent check-ins
      const checkInsQuery = query(
        checkInsRef,
        where('clientId', '==', clientId),
        orderBy('date', 'desc'),
        limit(5)
      );
      
      // Get active goals
      const goalsQuery = query(
        goalsRef,
        where('clientId', '==', clientId),
        where('status', '==', 'in-progress')
      );

      const [checkInsSnapshot, goalsSnapshot] = await Promise.all([
        getDocs(checkInsQuery),
        getDocs(goalsQuery)
      ]);

      // Calculate progress based on goals and check-ins
      const goals = goalsSnapshot.docs.map(doc => doc.data());
      const totalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length;
      
      // Calculate status based on check-in frequency and goal progress
      const lastCheckIn = checkInsSnapshot.docs[0]?.data().date.toDate();
      const daysSinceLastCheckIn = lastCheckIn ? (Date.now() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24) : 0;
      
      let status: 'on-track' | 'needs-attention' | 'at-risk' = 'on-track';
      if (daysSinceLastCheckIn > 7) {
        status = 'at-risk';
      } else if (daysSinceLastCheckIn > 3) {
        status = 'needs-attention';
      }

      // Calculate achievements
      const achievementsRef = collection(db, 'achievements');
      const achievementsQuery = query(
        achievementsRef,
        where('clientId', '==', clientId)
      );
      const achievementsSnapshot = await getDocs(achievementsQuery);

      return {
        progress: Math.round(totalProgress),
        status,
        achievements: achievementsSnapshot.size
      };
    } catch (error) {
      console.error('Error calculating client progress:', error);
      throw error;
    }
  }

  subscribeToSessions(coachId: string, callback: (sessions: Session[]) => void) {
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('coachId', '==', coachId),
      where('status', '==', 'scheduled'),
      orderBy('date', 'asc')
    );

    return onSnapshot(sessionsQuery, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate(),
      })) as Session[];
      callback(sessions);
    });
  }

  subscribeToClientProgress(coachId: string, callback: (progress: ClientProgress[]) => void) {
    const clientsRef = collection(db, 'clients');
    const q = query(clientsRef, where('coachId', '==', coachId));

    return onSnapshot(q, async (snapshot) => {
      const progressPromises = snapshot.docs.map(async (doc) => {
        const progress = await this.getClientProgress(doc.id);
        return {
          clientId: doc.id,
          ...progress
        };
      });

      const progress = await Promise.all(progressPromises);
      callback(progress);
    });
  }

  subscribeToActivity(coachId: string, callback: (activity: Activity[]) => void) {
    const activityQuery = query(
      collection(db, 'activity'),
      where('coachId', '==', coachId),
      orderBy('date', 'desc'),
      limit(10)
    );

    return onSnapshot(activityQuery, (snapshot) => {
      const activity = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate(),
      })) as Activity[];
      callback(activity);
    });
  }
} 