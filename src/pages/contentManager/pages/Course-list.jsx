import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { CONTENTMANAGER } from '../../../constants/ApiConstants';
import DeleteConfirmationModal from '../../../component/contentManagerComponents/DeleteConfirmationModal';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    () => {
      const filtered = courses.filter((course) => {
        const matchesSearch =
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter
          ? course.category === categoryFilter
          : true;

        const matchesLevel = levelFilter ? course.level === levelFilter : true;

        return matchesSearch && matchesCategory && matchesLevel;
      });

      // Sort by createdAt in descending order (latest first)
      return filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0);
        const dateB = new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
    },
    [courses, searchTerm, categoryFilter, levelFilter]
  );

  // Handle delete click - open confirmation modal
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${CONTENTMANAGER.DELETE_COURSE}/${courseToDelete._id}`);
      
      // Remove course from state
      setCourses(courses.filter(course => course._id !== courseToDelete._id));
      
      // Close modal and reset state
      setDeleteModalOpen(false);
      setCourseToDelete(null);
    } catch (err) {
      console.error('Failed to delete course', err);
      alert(`Failed to delete course: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="w-full min-h-full pb-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-1">Courses</h1>
          <p className="text-slate-400 text-sm font-light">Manage your online courses</p>
        </div>
        <Link 
          to="/content/course/add" 
          className="mt-3 md:mt-0 flex items-center justify-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          <PlusIcon className="h-4 w-4 mr-1.5" />
          Add New Course
        </Link>
      </div>
        
      {/* Search & Filters */}
      <div className="mb-3 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-3 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
        >
          <option value="">All Categories</option>
          <option value="Computer Science">Computer Science</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Courses List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-red-500/40 rounded-lg shadow-xl p-4 text-center">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl p-4 text-center">
          <p className="text-slate-400 text-sm">No courses found. Try a different search term or create a new course.</p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Rating
                </th>
             
                <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredCourses.map((course) => (
                <tr key={course._id} className="hover:bg-slate-700/40 transition-colors">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0">
                        <img className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-600/30" src={course.imageUrl} alt={course.title} />
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-semibold text-white">{course.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{course.category}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-4 font-bold rounded 
                      ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
                        course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 
                        'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">${course.price.discounted}</div>
                    {course.price.actual !== course.price.discounted && (
                      <div className="text-xs text-slate-500 line-through">${course.price.actual}</div>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-300">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1.5 text-sm font-semibold text-white">{course.averageRating}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium">
                    <div className="flex space-x-2 justify-end">
                      <Link
                        to={`/content/courses/${course._id}`}
                        className="text-slate-200 hover:text-white transition-colors"
                        title="View course"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link to={`/content/course/edit/${course._id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(course)} 
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete course"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        message={`Are you sure you want to delete the course "${courseToDelete?.title}"? This will permanently delete the course and all associated modules, lessons, and quizzes.`}
        itemName={courseToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Courses;