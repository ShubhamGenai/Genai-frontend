// pages/StudentsManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Trash, Edit, ExternalLink } from 'lucide-react';

const StudentsManagement = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Sample student data
  const students = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', enrolledCourses: 4, progress: 75, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'Jamie Smith', email: 'jamie@example.com', enrolledCourses: 2, progress: 42, lastActive: '1 day ago', status: 'active' },
    { id: 3, name: 'Chris Williams', email: 'chris@example.com', enrolledCourses: 6, progress: 92, lastActive: '3 hours ago', status: 'active' },
    { id: 4, name: 'Morgan Davis', email: 'morgan@example.com', enrolledCourses: 1, progress: 15, lastActive: '5 days ago', status: 'inactive' },
    { id: 5, name: 'Taylor Wilson', email: 'taylor@example.com', enrolledCourses: 3, progress: 68, lastActive: '1 week ago', status: 'inactive' },
  ];
  
  const filteredStudents = students.filter(student => 
    selectedTab === 'all' || student.status === selectedTab
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" /> Add Student
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${selectedTab === 'all' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setSelectedTab('all')}
            >
              All Students
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${selectedTab === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setSelectedTab('active')}
            >
              Active
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${selectedTab === 'inactive' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setSelectedTab('inactive')}
            >
              Inactive
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={18} className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                <Filter size={16} className="mr-2 text-gray-500" /> Filter
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                <Download size={16} className="mr-2 text-gray-500" /> Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.status === 'active' ? 'Active' : 'Inactive'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.enrolledCourses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              student.progress >= 80 ? 'bg-green-500' : 
                              student.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-700">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <ExternalLink size={16} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of <span className="font-medium">{filteredStudents.length}</span> students
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsManagement;