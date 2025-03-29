'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
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
          <h1 className="text-3xl font-bold text-gray-900">Check-in Management</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">1,234</div>
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
                    <CheckCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Today's Check-ins</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">856</div>
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
                    <ExclamationTriangleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Check-in Rate</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">92%</div>
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
                    <StarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Streak</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">5.2 days</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                onClick={() => router.push('/admin/organizations')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">Manage Organizations</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/admin/analytics')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <ChartBarIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">View Analytics</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/admin/reports')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-gray-900">Generate Reports</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 