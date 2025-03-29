import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AdminDashboardData, CoachPerformance, OrganizationMetrics } from '@/types/admin';

export const adminService = {
  subscribeToAdminDashboard: (organizationId: string, callback: (data: AdminDashboardData) => void) => {
    // Subscribe to organization metrics
    const metricsQuery = query(
      collection(db, 'organizationStats'),
      where('organizationId', '==', organizationId)
    );

    const metricsUnsubscribe = onSnapshot(metricsQuery, (snapshot) => {
      const metrics = snapshot.docs[0]?.data() as OrganizationMetrics;
      
      // Subscribe to coaches
      const coachesQuery = query(
        collection(db, 'coaches'),
        where('organizationId', '==', organizationId)
      );

      const coachesUnsubscribe = onSnapshot(coachesQuery, async (coachesSnapshot) => {
        const coaches: CoachPerformance[] = await Promise.all(
          coachesSnapshot.docs.map(async (doc) => {
            const coachData = doc.data();
            const metricsQuery = query(
              collection(db, 'coachMetrics'),
              where('coachId', '==', doc.id)
            );
            const metricsSnapshot = await getDocs(metricsQuery);
            const metrics = metricsSnapshot.docs[0]?.data() || {
              totalClients: 0,
              activeSessions: 0,
              completedSessions: 0,
              clientRetention: 0,
              averageRating: 0,
              revenue: 0
            };

            return {
              coachId: doc.id,
              name: coachData.name,
              email: coachData.email,
              organizationId: coachData.organizationId,
              metrics,
              recentActivity: [], // Will be populated from activity collection
              topClients: [] // Will be populated from clients collection
            };
          })
        );

        // Subscribe to recent activity
        const activityQuery = query(
          collection(db, 'activity'),
          where('organizationId', '==', organizationId),
          orderBy('timestamp', 'desc')
        );

        const activityUnsubscribe = onSnapshot(activityQuery, (activitySnapshot) => {
          const recentActivity = activitySnapshot.docs.map(doc => ({
            type: doc.data().type,
            description: doc.data().description,
            timestamp: doc.data().timestamp.toDate(),
            coachId: doc.data().coachId,
            coachName: coaches.find(c => c.coachId === doc.data().coachId)?.name || 'Unknown Coach'
          }));

          callback({
            organizationMetrics: metrics,
            coaches,
            recentActivity
          });
        });

        return () => {
          activityUnsubscribe();
        };
      });

      return () => {
        coachesUnsubscribe();
      };
    });

    return () => {
      metricsUnsubscribe();
    };
  },

  updateCoachMetrics: async (coachId: string, metrics: Partial<CoachMetrics>) => {
    const metricsRef = doc(db, 'coachMetrics', coachId);
    await updateDoc(metricsRef, metrics);
  },

  updateOrganizationMetrics: async (organizationId: string, metrics: Partial<OrganizationMetrics>) => {
    const metricsRef = doc(db, 'organizationStats', organizationId);
    await updateDoc(metricsRef, metrics);
  }
}; 