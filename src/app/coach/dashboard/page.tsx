'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import ClientProgressPhotos from './components/ClientProgressPhotos';

interface RecentCheckIn {
  id: string;
  clientId: string;
  clientName: string;
  timestamp: string;
  weekNumber: number;
  rating: 'red' | 'orange' | 'green';
  averageScore: number;
  notes: string;
}

interface DashboardData {
  totalClients: number;
  activeClients: number;
  checkInRate: number;
  recentCheckIns: RecentCheckIn[];
}

export default function CoachDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalClients: 0,
    activeClients: 0,
    checkInRate: 0,
    recentCheckIns: [],
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        totalClients: 15,
        activeClients: 12,
        checkInRate: 85,
        recentCheckIns: [
          {
            id: '1',
            clientId: 'client1',
            clientName: 'John Doe',
            timestamp: new Date().toISOString(),
            weekNumber: 4,
            rating: 'green',
            averageScore: 4.5,
            notes: 'Feeling great, hit all my targets this week!'
          },
          {
            id: '2',
            clientId: 'client2',
            clientName: 'Jane Smith',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            weekNumber: 3,
            rating: 'orange',
            averageScore: 3.2,
            notes: 'Struggled with nutrition but maintained workout schedule'
          },
          {
            id: '3',
            clientId: 'client3',
            clientName: 'Mike Johnson',
            timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            weekNumber: 2,
            rating: 'red',
            averageScore: 2.1,
            notes: 'Missed several workouts, need guidance'
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getRatingColor = (rating: 'red' | 'orange' | 'green') => {
    switch (rating) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'orange':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Coach Dashboard</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData.totalClients}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData.activeClients}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Check-in Rate</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData.checkInRate}%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Check-ins */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Check-ins</h2>
                <button
                  onClick={() => router.push('/coach/check-ins')}
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  View all
                </button>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {dashboardData.recentCheckIns.map((checkIn) => (
                    <li
                      key={checkIn.id}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/coach/clients/${checkIn.clientId}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-emerald-700 font-medium">
                                {checkIn.clientName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{checkIn.clientName}</h3>
                            <div className="flex items-center mt-1">
                              <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-500">
                                {new Date(checkIn.timestamp).toLocaleDateString()} - Week {checkIn.weekNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRatingColor(checkIn.rating)}`}>
                            Score: {checkIn.averageScore.toFixed(1)}
                          </span>
                          <ChartBarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 line-clamp-2">{checkIn.notes}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 