'use client';

export default function CoachClients() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Clients</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-emerald-600">Clients List</h2>
            <div className="flex space-x-4">
              <input
                type="search"
                placeholder="Search clients..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
                Add New Client
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Client Cards */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">JD</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-600">Since Jan 2024</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Next Session: Tomorrow at 2 PM</p>
                <p className="text-sm text-gray-600">Goals Completed: 5/8</p>
                <div className="flex justify-end">
                  <button className="text-emerald-600 hover:text-emerald-800">View Profile</button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">JS</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Jane Smith</h3>
                  <p className="text-sm text-gray-600">Since Feb 2024</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Next Session: Friday at 10 AM</p>
                <p className="text-sm text-gray-600">Goals Completed: 3/6</p>
                <div className="flex justify-end">
                  <button className="text-emerald-600 hover:text-emerald-800">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 