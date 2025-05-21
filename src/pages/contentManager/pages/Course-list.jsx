// pages/Courses.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch courses - in a real app this would be an API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCourses = [
        {
          _id: '1',
          title: 'Introduction to Artificial Intelligence',
          category: 'Computer Science',
          instructor: 'Dr. Jane Smith',
          price: { actual: 99.99, discounted: 79.99 },
          level: 'Beginner',
          enrolledStudents: ['user1', 'user2', 'user3'],
          imageUrl: 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691773/designwithai_gobbbw.jpg',
          averageRating: 4.5,
          isBestSeller: true
        },
        {
          _id: '2',
          title: 'Advanced Prompt Engineering',
          category: 'AI & Machine Learning',
          instructor: 'Prof. Michael Johnson',
          price: { actual: 129.99, discounted: 99.99 },
          level: 'Advanced',
          enrolledStudents: ['user1', 'user5'],
          imageUrl: 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691773/promptengineering_r2kosa.jpg',
          averageRating: 4.8,
          isBestSeller: true
        },
        {
          _id: '3',
          title: 'Data Analytics Fundamentals',
          category: 'Data Science',
          instructor: 'Sarah Williams',
          price: { actual: 89.99, discounted: 69.99 },
          level: 'Intermediate',
          enrolledStudents: ['user3', 'user4', 'user5', 'user6'],
          imageUrl: 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691768/dataanalytics_xmodtp.jpg',
          averageRating: 4.2,
          isBestSeller: false
        },
      ];
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle search filtering
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete - in a real app this would be an API call
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      // Filter out the deleted course
      setCourses(courses.filter(course => course._id !== id));
      // Show success toast or notification
      alert('Course deleted successfully');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage your online courses</p>
        </div>
        <Link 
          to="/content/course/add" 
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Course
        </Link>
      </div>
      
      {/* Search & Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">All Categories</option>
          <option value="Computer Science">Computer Science</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Courses List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No courses found. Try a different search term or create a new course.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={course.imageUrl} alt={course.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' : 
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${course.price.discounted}</div>
                    {course.price.actual !== course.price.discounted && (
                      <div className="text-xs text-gray-500 line-through">${course.price.actual}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-500">{course.averageRating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link to={`/courses/edit/${course._id}`} className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(course._id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Courses;