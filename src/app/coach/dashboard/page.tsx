'use client';

export default function CoachDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Coach Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-emerald-600 mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-600">Today at 2:00 PM</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-emerald-600 mb-4">Client Progress</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Active Clients</p>
              <p className="text-2xl font-bold text-emerald-600">12</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Goals Achieved This Month</p>
              <p className="text-2xl font-bold text-emerald-600">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-emerald-600 mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <div className="text-sm">
              <p className="text-gray-900">Session completed with John Doe</p>
              <p className="text-gray-600">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">New goal set for Jane Smith</p>
              <p className="text-gray-600">3 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Progress report updated</p>
              <p className="text-gray-600">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 