import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/outline';

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      setModules([
        { 
          id: 1, 
          title: 'React Fundamentals', 
          courseTitle: 'Introduction to React',
          courseId: 1,
          lessonCount: 5, 
          order: 1,
          status: 'published' 
        },
        { 
          id: 2, 
          title: 'Component Lifecycle', 
          courseTitle: 'Introduction to React',
          courseId: 1,
          lessonCount: 3, 
          order: 2,
          status: 'published' 
        },
        { 
          id: 3, 
          title: 'State Management', 
          courseTitle: 'Introduction to React',
          courseId: 1,
          lessonCount: 4, 
          order: 3,
          status: 'draft' 
        },
        { 
          id: 4, 
          title: 'Advanced JavaScript Concepts', 
          courseTitle: 'Advanced JavaScript',
          courseId: 2,
          lessonCount: 6, 
          order: 1,
          status: 'published' 
        },
        { 
          id: 5, 
          title: 'Asynchronous JavaScript', 
          courseTitle: 'Advanced JavaScript',
          courseId: 2,
          lessonCount: 4, 
          order: 2,
          status: 'draft' 
        },
      ]);
      setIsLoading(false);
    }, 800); // Simulate network delay
  }, []);

  // Filter and sort modules
  const filteredModules = modules
    .filter(module => 
      (module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       module.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter === 'all' || module.status === filter)
    )
    .sort((a, b) => {
      if (sortField === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === 'course') {
        return sortDirection === 'asc'
          ? a.courseTitle.localeCompare(b.courseTitle)
          : b.courseTitle.localeCompare(a.courseTitle);
      } else if (sortField === 'order') {
        return sortDirection === 'asc'
          ? a.order - b.order
          : b.order - a.order;
      }
      return 0;
    });

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Delete module handler (mock)
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(module => module.id !== id));
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' 
        ? <ChevronUpIcon className="h-4 w-4 inline ml-1" />
        : <ChevronDownIcon className="h-4 w-4 inline ml-1" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Modules</h1>
        <Link
          to="/modules/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Module
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Modules Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <span className="flex items-center">
                    Module Title {getSortIcon('title')}
                  </span>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('course')}
                >
                  <span className="flex items-center">
                    Course {getSortIcon('course')}
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lessons
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('order')}
                >
                  <span className="flex items-center">
                    Order {getSortIcon('order')}
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredModules.length > 0 ? (
                filteredModules.map((module) => (
                  <tr key={module.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{module.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{module.courseTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{module.lessonCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{module.order}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        module.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {module.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/modules/edit/${module.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button onClick={() => handleDelete(module.id)} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No modules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ModuleList;