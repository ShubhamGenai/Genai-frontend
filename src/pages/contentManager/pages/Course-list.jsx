import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { CONTENTMANAGER } from '../../../constants/ApiConstants';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_COURSES);
        const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError('Failed to load courses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesSearch =
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter
          ? course.category === categoryFilter
          : true;

        const matchesLevel = levelFilter ? course.level === levelFilter : true;

        return matchesSearch && matchesCategory && matchesLevel;
      }),
    [courses, searchTerm, categoryFilter, levelFilter]
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
    <div className="w-full min-h-full pb-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Courses</h1>
          <p className="text-slate-400 text-base font-light">Manage your online courses</p>
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
            className="w-full px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base"
        >
          <option value="">All Categories</option>
          <option value="Computer Science">Computer Science</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-base"
        >
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
      ) : error ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-red-500/40 rounded-xl shadow-xl p-8 text-center">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-400 text-base">No courses found. Try a different search term or create a new course.</p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">
                  View
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredCourses.map((course) => (
                <tr key={course._id} className="hover:bg-slate-700/40 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-600/30" src={course.imageUrl} alt={course.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-semibold text-white">{course.title}</div>
                        <div className="text-sm text-slate-400 mt-1">{course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base font-medium text-white">{course.category}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-lg 
                      ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
                        course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 
                        'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base font-semibold text-white">${course.price.discounted}</div>
                    {course.price.actual !== course.price.discounted && (
                      <div className="text-xs text-slate-500 line-through">${course.price.actual}</div>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-base font-medium text-slate-300">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-2 text-base font-semibold text-white">{course.averageRating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3 justify-end">
                      <Link
                        to={`/content/courses/${course._id}`}
                        className="text-slate-200 hover:text-white transition-colors"
                        title="View course"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link to={`/courses/edit/${course._id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(course._id)} 
                        className="text-red-400 hover:text-red-300 transition-colors"
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