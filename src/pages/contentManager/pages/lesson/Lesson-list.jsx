import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Users, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDuration, setFilterDuration] = useState('all');

  
  // Fetch lessons from backend
  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await axios.get(CONTENTMANAGER.GET_LESSONS);
  
      
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.data
      setLessons(data.lessons || data); // Handle different response structures
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError(err.message || 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  };

  // Delete lesson
  const handleDelete = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) {
      return;
    }

    try {
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }

      // Remove lesson from state
      setLessons(prev => prev.filter(lesson => lesson._id !== lessonId));
      alert('Lesson deleted successfully');
    } catch (err) {
      console.error('Error deleting lesson:', err);
      alert('Failed to delete lesson');
    }
  };

  // Filter lessons based on search and duration
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration = filterDuration === 'all' || 
                           (filterDuration === 'short' && lesson.duration <= 30) ||
                           (filterDuration === 'medium' && lesson.duration > 30 && lesson.duration <= 60) ||
                           (filterDuration === 'long' && lesson.duration > 60);

    return matchesSearch && matchesDuration;
  });

  useEffect(() => {
    fetchLessons();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading lessons...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Error Loading Lessons</div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchLessons}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
            <p className="text-gray-600 mt-1">
              {filteredLessons.length} of {lessons.length} lessons
            </p>
          </div>
          <Link to="/content/lessons/add">
          <button
         
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add New Lesson
          </button>

          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (≤30 min)</option>
              <option value="medium">Medium (31-60 min)</option>
              <option value="long">Long (60 min)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-500">
            {searchTerm || filterDuration !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first lesson.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div key={lesson._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {lesson.title}
                  </h3>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => window.location.href = `/content/lessons/${lesson._id}`}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View lesson"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/lessons/${lesson._id}/edit`}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Edit lesson"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete lesson"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {lesson.content}
                </p>

                {/* Lesson Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {lesson.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration} min</span>
                    </div>
                  )}
                  
                  {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{lesson.practiceQuestions.length} questions</span>
                    </div>
                  )}
                  
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{lesson.quiz.length} quizzes</span>
                    </div>
                  )}
                </div>

                {/* Practice Questions Preview */}
                {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-xs font-medium text-gray-700 mb-2">
                      Practice Questions:
                    </div>
                    <div className="space-y-1">
                      {lesson.practiceQuestions.slice(0, 2).map((question, index) => (
                        <div key={index} className="text-xs text-gray-600 line-clamp-1">
                          {index + 1}. {question.question}
                        </div>
                      ))}
                      {lesson.practiceQuestions.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{lesson.practiceQuestions.length - 2} more questions
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                <Link to={`/content/lessons/${lesson._id}`}> 
        
                <button
                  // onClick={() => window.location.href = `/lessons/${lesson._id}`}
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Lesson
                </button>
                        </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchLessons}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
        >
          Refresh Lessons
        </button>
      </div>
    </div>
  );
};

export default LessonList