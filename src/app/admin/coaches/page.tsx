'use client';

import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Coaches() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Coaches</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Coach
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search coaches..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Coach Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-xl font-semibold">JD</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">Executive Coach</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Clients</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Success Rate</span>
              <span className="font-semibold">95%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Experience</span>
              <span className="font-semibold">5 years</span>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
            <div className="flex space-x-2">
              <button className="text-emerald-600 hover:text-emerald-900">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Add more coach cards here */}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">9</span> of{' '}
              <span className="font-medium">24</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 