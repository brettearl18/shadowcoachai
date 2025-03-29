require('dotenv').config({ path: '.env.local' });

const { db } = require('../lib/firebase');
const { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  Timestamp 
} = require('firebase/firestore');

const ORGANIZATION_ID = 'demo-org-id';

const coaches = [
  {
    id: 'coach-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    organizationId: ORGANIZATION_ID,
    metrics: {
      totalClients: 15,
      activeSessions: 8,
      completedSessions: 45,
      clientRetention: 92,
      averageRating: 4.8,
      revenue: 7500
    },
    topClients: [
      {
        clientId: 'client-1',
        name: 'John Smith',
        progress: 85,
        engagement: 95
      },
      {
        clientId: 'client-2',
        name: 'Emma Wilson',
        progress: 78,
        engagement: 88
      }
    ]
  },
  {
    id: 'coach-2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    organizationId: ORGANIZATION_ID,
    metrics: {
      totalClients: 12,
      activeSessions: 6,
      completedSessions: 38,
      clientRetention: 88,
      averageRating: 4.6,
      revenue: 6000
    },
    topClients: [
      {
        clientId: 'client-3',
        name: 'David Brown',
        progress: 92,
        engagement: 90
      },
      {
        clientId: 'client-4',
        name: 'Lisa Anderson',
        progress: 75,
        engagement: 85
      }
    ]
  }
];

const organizationMetrics = {
  organizationId: ORGANIZATION_ID,
  totalCoaches: 2,
  totalClients: 27,
  totalRevenue: 13500,
  averageClientRetention: 90,
  averageCoachRating: 4.7,
  activeSessions: 14,
  completedSessions: 83
};

const recentActivity = [
  {
    type: 'session',
    description: 'Completed weekly check-in with John Smith',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 30)), // 30 minutes ago
    coachId: 'coach-1',
    coachName: 'Sarah Johnson',
    clientId: 'client-1'
  },
  {
    type: 'goal',
    description: 'New goal set for Emma Wilson: Weight loss target',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60)), // 1 hour ago
    coachId: 'coach-1',
    coachName: 'Sarah Johnson',
    clientId: 'client-2'
  },
  {
    type: 'checkIn',
    description: 'Daily check-in completed by David Brown',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 90)), // 1.5 hours ago
    coachId: 'coach-2',
    coachName: 'Michael Chen',
    clientId: 'client-3'
  },
  {
    type: 'achievement',
    description: 'Lisa Anderson achieved their first milestone',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 120)), // 2 hours ago
    coachId: 'coach-2',
    coachName: 'Michael Chen',
    clientId: 'client-4'
  }
];

async function createTestData() {
  try {
    // Create organization metrics
    await setDoc(doc(db, 'organizationStats', ORGANIZATION_ID), organizationMetrics);

    // Create coaches
    for (const coach of coaches) {
      await setDoc(doc(db, 'coaches', coach.id), {
        name: coach.name,
        email: coach.email,
        organizationId: coach.organizationId
      });

      // Create coach metrics
      await setDoc(doc(db, 'coachMetrics', coach.id), coach.metrics);

      // Create top clients
      for (const client of coach.topClients) {
        await setDoc(doc(db, 'clients', client.clientId), {
          name: client.name,
          coachId: coach.id,
          progress: client.progress,
          engagement: client.engagement
        });
      }
    }

    // Create recent activity
    for (const activity of recentActivity) {
      await addDoc(collection(db, 'activity'), activity);
    }

    console.log('Test data created successfully!');
  } catch (error) {
    console.error('Error creating test data:', error);
  }
}

// Run the script
createTestData(); 