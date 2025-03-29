import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  setDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit 
} from 'firebase/firestore';

export interface PhotoUpload {
  file: File;
  type: 'front' | 'side' | 'back';
}

export interface CheckInData {
  weight: string;
  measurements: {
    chest: string;
    waist: string;
    hips: string;
    arms: string;
    legs: string;
  };
  notes: string;
  photos: PhotoUpload[];
  questionnaireAnswers?: Record<number, number>;
  weekNumber?: number;
  rating?: 'red' | 'orange' | 'green';
  averageScore?: number;
}

export interface CheckInSubmission {
  weight: string;
  measurements: {
    chest: string;
    waist: string;
    hips: string;
    arms: string;
    legs: string;
  };
  notes: string;
  photos: {
    url: string;
    type: 'front' | 'side' | 'back';
    date: Date;
  }[];
  questionnaireAnswers?: Record<number, number>;
  weekNumber: number;
  timestamp: Date;
  clientId: string;
  rating: 'red' | 'orange' | 'green';
  averageScore: number;
}

class CheckInService {
  private readonly CHECKINS_COLLECTION = 'checkIns';
  private readonly CLIENTS_COLLECTION = 'clients';

  async ensureClientExists(clientId: string): Promise<void> {
    const clientRef = doc(db, this.CLIENTS_COLLECTION, clientId);
    const clientDoc = await getDoc(clientRef);

    if (!clientDoc.exists()) {
      // Create new client document with initial data
      await setDoc(clientRef, {
        id: clientId,
        totalCheckIns: 0,
        currentStreak: 0,
        checkInRate: 0,
        createdAt: new Date(),
        lastCheckIn: null
      });
    }
  }

  async getClientCheckInCount(clientId: string): Promise<number> {
    try {
      const clientRef = doc(db, this.CLIENTS_COLLECTION, clientId);
      const clientDoc = await getDoc(clientRef);

      if (clientDoc.exists()) {
        return clientDoc.data().totalCheckIns || 0;
      }

      return 0;
    } catch (error) {
      console.error('Error getting check-in count:', error);
      return 0;
    }
  }

  private calculateRating(answers: Record<number, number>, checkInConsistency: number): { rating: 'red' | 'orange' | 'green'; averageScore: number } {
    // Calculate average score from questionnaire answers
    const averageScore = Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length;

    // Factor in check-in consistency (0-100%)
    const consistencyScore = checkInConsistency / 20; // Convert to 0-5 scale

    // Combined score weighs questionnaire 70% and consistency 30%
    const combinedScore = (averageScore * 0.7) + (consistencyScore * 0.3);

    // Determine rating based on combined score
    let rating: 'red' | 'orange' | 'green';
    if (combinedScore >= 4) {
      rating = 'green';
    } else if (combinedScore >= 3) {
      rating = 'orange';
    } else {
      rating = 'red';
    }

    return {
      rating,
      averageScore: combinedScore
    };
  }

  async submitCheckIn(clientId: string, data: CheckInData): Promise<void> {
    try {
      // 1. Upload photos to Firebase Storage
      const photoUrls = await this.uploadPhotos(clientId, data.photos);

      // 2. Get the current week number
      const weekNumber = data.weekNumber || (await this.getClientCheckInCount(clientId)) + 1;

      // 3. Calculate rating if questionnaire answers are provided
      const clientRef = doc(db, this.CLIENTS_COLLECTION, clientId);
      const clientDoc = await getDoc(clientRef);
      const checkInRate = clientDoc.exists() ? clientDoc.data().checkInRate || 0 : 0;
      
      const rating = data.questionnaireAnswers 
        ? this.calculateRating(data.questionnaireAnswers, checkInRate)
        : { rating: 'orange' as const, averageScore: 3 };

      // 4. Prepare check-in data
      const checkInData: CheckInSubmission = {
        weight: data.weight,
        measurements: data.measurements,
        notes: data.notes,
        photos: photoUrls,
        questionnaireAnswers: data.questionnaireAnswers,
        weekNumber,
        timestamp: new Date(),
        clientId,
        rating: rating.rating,
        averageScore: rating.averageScore,
      };

      // 5. Save check-in data to Firestore
      await addDoc(collection(db, this.CHECKINS_COLLECTION), checkInData);

      // 6. Update client's stats
      await this.updateClientStats(clientId, checkInData);

      return;
    } catch (error) {
      console.error('Error submitting check-in:', error);
      throw new Error('Failed to submit check-in');
    }
  }

  private async uploadPhotos(clientId: string, photos: PhotoUpload[]): Promise<{ url: string; type: string; date: Date; }[]> {
    if (!photos || photos.length === 0) return [];

    const uploadPromises = photos.map(async (photo) => {
      const fileName = `${clientId}/${Date.now()}_${photo.type}.jpg`;
      const storageRef = ref(storage, `progress-photos/${fileName}`);
      
      // Upload the file
      await uploadBytes(storageRef, photo.file);
      
      // Get the download URL
      const url = await getDownloadURL(storageRef);
      
      return {
        url,
        type: photo.type,
        date: new Date()
      };
    });

    return Promise.all(uploadPromises);
  }

  private async updateClientStats(clientId: string, checkInData: CheckInSubmission): Promise<void> {
    const clientRef = doc(db, this.CLIENTS_COLLECTION, clientId);
    const clientDoc = await getDoc(clientRef);

    if (!clientDoc.exists()) {
      await this.ensureClientExists(clientId);
    }

    const clientData = clientDoc.exists() ? clientDoc.data() : { totalCheckIns: 0 };
    const lastCheckIn = clientData.lastCheckIn ? new Date(clientData.lastCheckIn) : null;
    const currentStreak = this.calculateStreak(lastCheckIn, checkInData.timestamp);

    await updateDoc(clientRef, {
      lastCheckIn: checkInData.timestamp,
      currentStreak,
      totalCheckIns: (clientData.totalCheckIns || 0) + 1,
      checkInRate: this.calculateCheckInRate(clientData.totalCheckIns || 0, checkInData.timestamp),
      lastUpdated: new Date(),
    });
  }

  private calculateStreak(lastCheckIn: Date | null, currentCheckIn: Date): number {
    if (!lastCheckIn) return 1;

    const daysDifference = Math.floor(
      (currentCheckIn.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If check-in is within 24 hours, continue streak
    return daysDifference <= 1 ? 1 : 0;
  }

  private calculateCheckInRate(totalCheckIns: number, lastCheckIn: Date): number {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // For now, use a simple calculation
    // In a real implementation, you'd want to count actual check-ins in the last 30 days
    return Math.min(100, (totalCheckIns / 30) * 100);
  }

  async getClientPhotos(clientId: string): Promise<Photo[]> {
    try {
      const photosRef = collection(db, 'check-ins');
      const q = query(
        photosRef,
        where('clientId', '==', clientId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const photos: Photo[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.photos && Array.isArray(data.photos)) {
          data.photos.forEach((photo: any) => {
            photos.push({
              url: photo.url,
              type: photo.type,
              date: photo.date.toDate(),
              weekNumber: data.weekNumber
            });
          });
        }
      });

      return photos;
    } catch (error) {
      console.error('Error fetching client photos:', error);
      throw new Error('Failed to fetch client photos');
    }
  }
}

export const checkInService = new CheckInService(); 