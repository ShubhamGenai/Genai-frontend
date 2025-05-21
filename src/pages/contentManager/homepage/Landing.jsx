// pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  CollectionIcon, 

  QuestionMarkCircleIcon,
  ClipboardCheckIcon,
  UsersIcon
} from '@heroicons/react/outline';
import { Container, VideoIcon } from 'lucide-react';

const ContentManagerDashboard = () => {
  // These would normally come from an API
  const stats = [
    { name: 'Courses', count: 12, icon: AcademicCapIcon, color: 'bg-indigo-500', link: '/content/courses-list' },
    { name: 'Modules', count: 48, icon: CollectionIcon, color: 'bg-green-500', link: '/content/modules' }, 
    { name: 'Lessons', count: 156, icon: VideoIcon, color: 'bg-yellow-500', link: '/content/lessons' },
    { name: 'Quizzes', count: 75, icon: QuestionMarkCircleIcon, color: 'bg-red-500', link: '/content/quizzes' },
    { name: 'Tests', count: 8, icon: ClipboardCheckIcon, color: 'bg-purple-500', link: '/content/tests-list' },
    { name: 'Students', count: 2453, icon: UsersIcon, color: 'bg-blue-500', link: '#' },
  ];

  // Recent activities - would normally come from an API
  const recentActivities = [
    { id: 1, action: 'Course added', name: 'Introduction to AI', time: '2 hours ago' },
    { id: 2, action: 'Module updated', name: 'JavaScript Basics', time: '5 hours ago' },
    { id: 3, action: 'Lesson edited', name: 'React Components', time: '1 day ago' },
    { id: 4, action: 'Quiz published', name: 'Python Fundamentals', time: '2 days ago' },
    { id: 5, action: 'Test created', name: 'AWS Certification', time: '3 days ago' },
  ];

  return (
    <div className=''>
      <div className="mb-8 px-8  ">
        <h1 className="text-2xl font-bold  text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your learning platform content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link to={stat.link} key={stat.name} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`rounded-full p-3 ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-700">{stat.count}</h2>
                    <p className="text-sm text-gray-500">{stat.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all activity
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link to="/content/courses-list" className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Course</span>
            </Link>
            <Link to="/content/modules/add" className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <CollectionIcon className="h-8 w-8 text-green-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Module</span>
            </Link>
            <Link to="/content/lessons/add" className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <VideoIcon className="h-8 w-8 text-yellow-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Lesson</span>
            </Link>
            <Link to="/content/quizzes/add" className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <QuestionMarkCircleIcon className="h-8 w-8 text-red-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Quiz</span>
            </Link>
            <Link to="/content/tests/add" className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <ClipboardCheckIcon className="h-8 w-8 text-purple-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Add Test</span>
            </Link>
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <UsersIcon className="h-8 w-8 text-blue-600" />
              <span className="mt-2 text-sm font-medium text-gray-900">Manage Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagerDashboard;