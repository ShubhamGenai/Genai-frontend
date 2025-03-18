// pages/Dashboard.jsx
import React from 'react';
import { Users, BookOpen, Briefcase, Award, TrendingUp, Clock } from 'lucide-react';
import { StatsCard } from '../../../component/adminComponents/dashboard/StatusCard';
import { CourseTable } from '../../../component/adminComponents/dashboard/CourseTable';
import { Chart } from '../../../component/adminComponents/dashboard/Chart';

const AdminLandingPage = () => {
  const stats = [
    { title: 'Total Students', value: '8,429', icon: <Users size={20} className="text-blue-500" />, change: '+12%' },
    { title: 'Total Courses', value: '142', icon: <BookOpen size={20} className="text-green-500" />, change: '+5%' },
    { title: 'Employers', value: '246', icon: <Briefcase size={20} className="text-purple-500" />, change: '+18%' },
    { title: 'Completion Rate', value: '84%', icon: <Award size={20} className="text-yellow-500" />, change: '+3%' },
  ];

  // Sample data for Recent Courses
  const recentCourses = [
    { title: 'Introduction to AI Ethics', enrollments: 348, completion: 82, lastUpdated: '2 days ago' },
    { title: 'Machine Learning Fundamentals', enrollments: 521, completion: 76, lastUpdated: '1 week ago' },
    { title: 'Deep Learning Applications', enrollments: 287, completion: 63, lastUpdated: '3 days ago' },
    { title: 'Natural Language Processing', enrollments: 192, completion: 88, lastUpdated: '5 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">Last updated:</span>
          <span className="font-medium flex items-center">
            <Clock size={16} className="mr-1" /> Today, 14:32
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} change={stat.change} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Enrollment Statistics</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1 bg-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64">
            <Chart type="line" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">User Growth</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1 bg-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64">
            <Chart type="bar" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Courses</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
        </div>
        <CourseTable courses={recentCourses} />
      </div>
    </div>
  );
};
  
  export default AdminLandingPage;
  