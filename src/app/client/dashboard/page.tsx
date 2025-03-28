'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  FireIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ChatBubbleLeftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function ClientDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="p-8">
      {/* Welcome & Motivation Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600 mt-2">Let's continue your journey to better health</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg">
            <p className="text-lg font-medium text-gray-900">"Small progress is still progress"</p>
            <p className="text-sm text-gray-600 mt-1">Daily Motivation</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Daily Streak */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <FireIcon className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Current Streak</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">7 Days</h3>
          <p className="text-sm text-gray-500">Personal Best: 14 Days</p>
          <div className="mt-2">
            <span className="text-emerald-600 text-sm font-medium">On Track!</span>
          </div>
        </div>

        {/* Weight Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">vs last week</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">-2.5 kg</h3>
          <p className="text-sm text-gray-500">Total Weight Loss</p>
          <div className="mt-2 flex items-center">
            <ArrowTrendingDownIcon className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-600 text-sm font-medium ml-1">-0.5 kg this week</span>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrophyIcon className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Overall Progress</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">75%</h3>
          <p className="text-sm text-gray-500">Goal Achievement</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Coach Support */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <HeartIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Next Session</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Tomorrow</h3>
          <p className="text-sm text-gray-500">2:00 PM - 3:00 PM</p>
          <div className="mt-2">
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
              View Details →
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
          <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <StarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">7-Day Streak</p>
            <p className="text-xs text-gray-500">Earned Today</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">First Goal</p>
            <p className="text-xs text-gray-500">Earned This Week</p>
          </div>
          {/* Add more achievement badges */}
        </div>
      </div>

      {/* Progress Charts */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Progress Tracking</h2>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weight Progress</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Weight progress chart will be displayed here</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Workout Consistency</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Workout consistency chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Setting */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Goals</h2>
          <button className="flex items-center text-emerald-600 hover:text-emerald-700">
            <PlusIcon className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Add New Goal</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Weight Loss</h3>
              <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded">
                On Track
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Target: Lose 10kg by June 2024</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          {/* Add more goal cards */}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
              <CheckCircleIcon className="h-6 w-6 text-emerald-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Daily Check-in</p>
            </button>
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <CalendarIcon className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Log Workout</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <ChatBubbleLeftIcon className="h-6 w-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Message Coach</p>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <ChartBarIcon className="h-6 w-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Track Progress</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Completed daily check-in</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ChartBarIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Logged 30-minute workout</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Received coach feedback</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrophyIcon className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Achieved weekly goal</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 