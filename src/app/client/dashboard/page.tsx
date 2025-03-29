'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import ProgressPhotos from './components/ProgressPhotos';

interface DashboardData {
  checkInRate: number;
  currentStreak: number;
  totalCheckIns: number;
  lastCheckIn: string;
  nextCheckIn: string;
  recentActivity: {
    type: string;
    date: string;
    description: string;
  }[];
}

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        checkInRate: 92,
        currentStreak: 7,
        totalCheckIns: 28,
        lastCheckIn: '2024-03-20T10:30:00Z',
        nextCheckIn: '2024-03-22T10:00:00Z',
        recentActivity: [
          {
            type: 'check-in',
            date: '2024-03-20T10:30:00Z',
            description: 'Submitted weekly check-in with progress photos',
          },
          {
            type: 'message',
            date: '2024-03-19T15:45:00Z',
            description: 'Received feedback from coach on progress',
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <button
              onClick={() => router.push('/client/check-in')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Submit Check-in
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Check-in Rate</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData?.checkInRate}%
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
                    <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData?.currentStreak} days
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Check-ins</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {dashboardData?.totalCheckIns}
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
                    <StarIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Next Check-in</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {new Date(dashboardData?.nextCheckIn || '').toLocaleDateString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {dashboardData?.recentActivity.map((activity, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {activity.type === 'check-in' ? (
                              <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(activity.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Progress Photos Section */}
          <div className="mt-8">
            <ProgressPhotos />
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                onClick={() => router.push('/client/check-in')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">Daily Check-in</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/client/history')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <ChartBarIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">Check-in History</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/client/messages')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">Message Support</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 