// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  AcademicCapIcon, 
  CollectionIcon, 
  QuestionMarkCircleIcon,
  ClipboardCheckIcon,
  UsersIcon
} from '@heroicons/react/outline';
import { VideoIcon } from 'lucide-react';
import { CONTENTMANAGER } from '../../../constants/ApiConstants';

const ContentManagerDashboard = () => {
  const [stats, setStats] = useState([
    { name: 'Courses', count: 0, icon: AcademicCapIcon, color: 'bg-indigo-500', link: '/content/courses-list' },
    { name: 'Modules', count: 0, icon: CollectionIcon, color: 'bg-green-500', link: '/content/modules' }, 
    { name: 'Lessons', count: 0, icon: VideoIcon, color: 'bg-yellow-500', link: '/content/lessons' },
    { name: 'Quizzes', count: 0, icon: QuestionMarkCircleIcon, color: 'bg-red-500', link: '/content/quizzes' },
    { name: 'Tests', count: 0, icon: ClipboardCheckIcon, color: 'bg-purple-500', link: '/content/test-list' },
    { name: 'Students', count: 0, icon: UsersIcon, color: 'bg-blue-500', link: '#' },
  ]);

  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch stats and activities in parallel
        const [statsResponse, activitiesResponse] = await Promise.all([
          axios.get(CONTENTMANAGER.DASHBOARD_STATS),
          axios.get(CONTENTMANAGER.RECENT_ACTIVITIES)
        ]);

        // Update stats with real data
        const statsData = statsResponse.data.stats;
        setStats(prevStats => prevStats.map(stat => {
          // Map frontend stat names to backend keys
          const keyMap = {
            'Courses': 'courses',
            'Modules': 'modules',
            'Lessons': 'lessons',
            'Quizzes': 'quizzes',
            'Tests': 'tests',
            'Students': 'students'
          };
          const key = keyMap[stat.name];
          return {
            ...stat,
            count: statsData[key] || 0
          };
        }));

        // Update recent activities (limit to 5)
        if (activitiesResponse.data.activities) {
          setRecentActivities(activitiesResponse.data.activities.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='w-full min-h-full pb-8'>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dashboard</h1>
        <p className="text-slate-400 text-base font-light">Overview of your learning platform content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const Component = stat.link === '#' ? 'div' : Link;
          const props = stat.link === '#' ? {} : { to: stat.link };
          
          return (
            <Component 
              {...props}
              key={stat.name} 
              className="bg-slate-700/40 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center">
                  <div className={`rounded-xl p-4 ${stat.color} text-white shadow-lg mb-4 sm:mb-0`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="sm:ml-5">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {isLoading ? '...' : stat.count}
                    </h2>
                    <p className="text-sm font-medium text-slate-300 uppercase tracking-wide">{stat.name}</p>
                  </div>
                </div>
              </div>
            </Component>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
        {/* Recent Activity */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 shadow-xl rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-600/30 bg-slate-800/30">
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-600/30">
            {isLoading ? (
              <div className="px-6 py-4 text-center">
                <p className="text-sm text-slate-400">Loading activities...</p>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="px-6 py-4 text-center">
                <p className="text-sm text-slate-400">No recent activities</p>
              </div>
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-slate-700/40 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-white mb-1">{activity.action}</p>
                      <p className="text-sm text-slate-400">{activity.name}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{activity.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-600/30">
            <a href="#" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
              View all activity →
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 shadow-xl rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-600/30 bg-slate-800/30">
            <h2 className="text-xl font-bold text-white tracking-tight">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link 
              to="/content/course/add" 
              className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-blue-500/50 transition-all duration-300 group hover:scale-105"
            >
              <AcademicCapIcon className="h-9 w-9 text-blue-400 group-hover:text-blue-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Add Course</span>
            </Link>
            <Link 
              to="/content/modules/add" 
              className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-green-500/50 transition-all duration-300 group hover:scale-105"
            >
              <CollectionIcon className="h-9 w-9 text-green-400 group-hover:text-green-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Add Module</span>
            </Link>
            <Link 
              to="/content/lessons/add" 
              className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-yellow-500/50 transition-all duration-300 group hover:scale-105"
            >
              <VideoIcon className="h-9 w-9 text-yellow-400 group-hover:text-yellow-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Add Lesson</span>
            </Link>
            <Link 
              to="/content/quizzes/add" 
              className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-red-500/50 transition-all duration-300 group hover:scale-105"
            >
              <QuestionMarkCircleIcon className="h-9 w-9 text-red-400 group-hover:text-red-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Add Quiz</span>
            </Link>
            <Link 
              to="/content/tests/add" 
              className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105"
            >
              <ClipboardCheckIcon className="h-9 w-9 text-purple-400 group-hover:text-purple-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Add Test</span>
            </Link>
            <div className="flex flex-col items-center justify-center p-5 bg-slate-800/40 border border-slate-600/30 rounded-xl hover:bg-slate-700/60 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer hover:scale-105">
              <UsersIcon className="h-9 w-9 text-blue-400 group-hover:text-blue-300 transition-colors mb-2" />
              <span className="text-sm font-semibold text-white">Manage Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagerDashboard;