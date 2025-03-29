import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  getDoc,
  limit 
} from 'firebase/firestore';

export interface ProgressMetrics {
  weight: {
    current: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    history: { date: Date; value: number }[];
  };
  measurements: {
    [key: string]: {
      current: number;
      change: number;
      trend: 'up' | 'down' | 'stable';
      history: { date: Date; value: number }[];
    };
  };
  checkIns: {
    total: number;
    streak: number;
    consistency: number;
    lastCheckIn: Date | null;
  };
  questionnaire: {
    averageScore: number;
    trend: 'up' | 'down' | 'stable';
    categories: {
      [key: string]: {
        average: number;
        trend: 'up' | 'down' | 'stable';
      };
    };
  };
  milestones: {
    achieved: Array<{
      id: string;
      title: string;
      date: Date;
      type: 'weight' | 'measurement' | 'streak' | 'consistency';
    }>;
    upcoming: Array<{
      id: string;
      title: string;
      progress: number;
      type: 'weight' | 'measurement' | 'streak' | 'consistency';
    }>;
  };
}

class AnalyticsService {
  private readonly CHECKINS_COLLECTION = 'checkIns';
  private readonly CLIENTS_COLLECTION = 'clients';

  async getClientProgress(clientId: string): Promise<ProgressMetrics> {
    try {
      // Fetch all check-ins for the client
      const checkInsRef = collection(db, this.CHECKINS_COLLECTION);
      const q = query(
        checkInsRef,
        where('clientId', '==', clientId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const checkIns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Get client data
      const clientRef = doc(db, this.CLIENTS_COLLECTION, clientId);
      const clientDoc = await getDoc(clientRef);
      const clientData = clientDoc.data();

      // Calculate weight metrics
      const weightHistory = checkIns.map(checkIn => ({
        date: checkIn.timestamp.toDate(),
        value: parseFloat(checkIn.weight)
      })).reverse();

      const weightMetrics = this.calculateMetrics(weightHistory);

      // Calculate measurements metrics
      const measurementTypes = ['chest', 'waist', 'hips', 'arms', 'legs'];
      const measurements: ProgressMetrics['measurements'] = {};

      measurementTypes.forEach(type => {
        const history = checkIns.map(checkIn => ({
          date: checkIn.timestamp.toDate(),
          value: parseFloat(checkIn.measurements[type])
        })).reverse();

        measurements[type] = this.calculateMetrics(history);
      });

      // Calculate questionnaire metrics
      const questionnaireMetrics = this.calculateQuestionnaireMetrics(checkIns);

      // Calculate milestones
      const milestones = await this.calculateMilestones(clientId, {
        weight: weightHistory,
        measurements,
        checkIns: clientData
      });

      return {
        weight: {
          ...weightMetrics,
          history: weightHistory
        },
        measurements,
        checkIns: {
          total: clientData?.totalCheckIns || 0,
          streak: clientData?.currentStreak || 0,
          consistency: clientData?.checkInRate || 0,
          lastCheckIn: clientData?.lastCheckIn?.toDate() || null
        },
        questionnaire: questionnaireMetrics,
        milestones
      };
    } catch (error) {
      console.error('Error fetching client progress:', error);
      throw new Error('Failed to fetch client progress');
    }
  }

  private calculateMetrics(history: { date: Date; value: number }[]) {
    if (history.length === 0) {
      return {
        current: 0,
        change: 0,
        trend: 'stable' as const,
        history: []
      };
    }

    const current = history[history.length - 1].value;
    const first = history[0].value;
    const change = current - first;

    // Calculate trend based on last 3 entries
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (history.length >= 3) {
      const recent = history.slice(-3).map(h => h.value);
      const avgChange = (recent[2] - recent[0]) / 2;
      trend = avgChange > 0.5 ? 'up' : avgChange < -0.5 ? 'down' : 'stable';
    }

    return {
      current,
      change,
      trend,
      history
    };
  }

  private calculateQuestionnaireMetrics(checkIns: any[]): ProgressMetrics['questionnaire'] {
    const recentCheckIns = checkIns.slice(0, 5); // Last 5 check-ins
    const scores = recentCheckIns
      .filter(checkIn => checkIn.questionnaireAnswers)
      .map(checkIn => {
        const answers = checkIn.questionnaireAnswers;
        return Object.values(answers).reduce((sum: number, val: number) => sum + val, 0) / Object.values(answers).length;
      });

    const averageScore = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;

    // Calculate trend
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (scores.length >= 3) {
      const avgChange = (scores[0] - scores[scores.length - 1]) / scores.length;
      trend = avgChange > 0.3 ? 'up' : avgChange < -0.3 ? 'down' : 'stable';
    }

    // Group questions by categories (example categories)
    const categories = {
      'Physical Health': { average: 0, trend: 'stable' as const },
      'Mental Wellbeing': { average: 0, trend: 'stable' as const },
      'Nutrition': { average: 0, trend: 'stable' as const },
      'Recovery': { average: 0, trend: 'stable' as const }
    };

    return {
      averageScore,
      trend,
      categories
    };
  }

  private async calculateMilestones(
    clientId: string,
    data: any
  ): Promise<ProgressMetrics['milestones']> {
    const achieved = [];
    const upcoming = [];

    // Weight milestones
    if (data.weight.length >= 2) {
      const totalWeightChange = Math.abs(data.weight[0].value - data.weight[data.weight.length - 1].value);
      
      if (totalWeightChange >= 5) {
        achieved.push({
          id: 'weight-5',
          title: '5kg Weight Change',
          date: new Date(),
          type: 'weight' as const
        });
      }
      
      if (totalWeightChange < 10) {
        upcoming.push({
          id: 'weight-10',
          title: '10kg Weight Change',
          progress: (totalWeightChange / 10) * 100,
          type: 'weight' as const
        });
      }
    }

    // Streak milestones
    const streak = data.checkIns.currentStreak;
    if (streak >= 7) {
      achieved.push({
        id: 'streak-7',
        title: '7-Day Streak',
        date: new Date(),
        type: 'streak' as const
      });
    }
    
    if (streak < 30) {
      upcoming.push({
        id: 'streak-30',
        title: '30-Day Streak',
        progress: (streak / 30) * 100,
        type: 'streak' as const
      });
    }

    return {
      achieved,
      upcoming
    };
  }
}

export const analyticsService = new AnalyticsService(); 