'use client';

import Link from 'next/link';
import { 
  UsersIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Organizations Card */}
        <Link href="/admin/organizations" 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
            <h2 className="text-xl font-semibold ml-3">Organizations</h2>
          </div>
          <p className="text-gray-600">Manage organizations and their settings</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">5 Active Organizations</span>
            <span className="text-indigo-600">View All →</span>
          </div>
        </Link>

        {/* Coaches Card */}
        <Link href="/admin/coaches" 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <UsersIcon className="h-8 w-8 text-emerald-600" />
            <h2 className="text-xl font-semibold ml-3">Coaches</h2>
          </div>
          <p className="text-gray-600">Manage coaches and their assignments</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">12 Active Coaches</span>
            <span className="text-emerald-600">View All →</span>
          </div>
        </Link>

        {/* Analytics Card */}
        <Link href="/admin/analytics" 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold ml-3">Analytics</h2>
          </div>
          <p className="text-gray-600">View platform analytics and insights</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">Real-time Data</span>
            <span className="text-blue-600">View Report →</span>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-indigo-600 font-semibold">Total Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg">
            <p className="text-emerald-600 font-semibold">Active Sessions</p>
            <p className="text-2xl font-bold">56</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-600 font-semibold">Success Rate</p>
            <p className="text-2xl font-bold">92%</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-600 font-semibold">Total Revenue</p>
            <p className="text-2xl font-bold">$45.2K</p>
          </div>
        </div>
      </div>
    </div>
  );
} 