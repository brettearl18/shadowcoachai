'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export default function ClientProgress() {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
          <p className="text-gray-600">Client since January 2024</p>
        </div>
        <div className="flex space-x-4">
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
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('checkins')}
            className={`${
              activeTab === 'checkins'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Check-ins
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`${
              activeTab === 'goals'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Goals
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`${
              activeTab === 'messages'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Messages
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">vs last period</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">95%</h3>
              <p className="text-sm text-gray-500">Check-in Rate</p>
              <div className="mt-2 flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+3.2%</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">vs last period</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">82%</h3>
              <p className="text-sm text-gray-500">Goal Achievement</p>
              <div className="mt-2 flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+5.1%</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <CalendarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">vs last period</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">98%</h3>
              <p className="text-sm text-gray-500">Session Attendance</p>
              <div className="mt-2 flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+1.5%</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <ChatBubbleLeftIcon className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">vs last period</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2.1h</h3>
              <p className="text-sm text-gray-500">Avg. Response Time</p>
              <div className="mt-2 flex items-center">
                <ArrowTrendingDownIcon className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 text-sm font-medium ml-1">-0.3h</span>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Over Time</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Progress chart will be displayed here</p>
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
                  <p className="text-sm font-medium text-gray-900">Achieved weight loss goal</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Attended coaching session</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checkins' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Check-in History</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
                New Check-in
              </button>
            </div>
            <div className="space-y-4">
              {/* Sample Check-in */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Daily Check-in</h3>
                    <p className="text-sm text-gray-500">March 15, 2024</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded">
                    Completed
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mood</p>
                    <p className="text-sm text-gray-600">Feeling energetic and motivated</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Progress</p>
                    <p className="text-sm text-gray-600">Completed all planned exercises</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Challenges</p>
                    <p className="text-sm text-gray-600">None reported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Goals & Progress</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
                Add New Goal
              </button>
            </div>
            <div className="space-y-6">
              {/* Weight Loss Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Weight Loss Goal</h3>
                  <span className="text-sm font-medium text-emerald-600">75% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Target: Lose 20kg by June 2024</p>
              </div>

              {/* Fitness Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Fitness Goal</h3>
                  <span className="text-sm font-medium text-emerald-600">82% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Target: Run 5km in under 25 minutes</p>
              </div>

              {/* Nutrition Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Nutrition Goal</h3>
                  <span className="text-sm font-medium text-emerald-600">68% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Target: Maintain 2000 calories daily</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Message History</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
                New Message
              </button>
            </div>
            <div className="space-y-4">
              {/* Sample Message */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Weekly Progress Update</h3>
                    <p className="text-sm text-gray-500">March 14, 2024</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded">
                    Read
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Great progress this week! You've exceeded your exercise goals and maintained a healthy diet. 
                  Keep up the good work!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 