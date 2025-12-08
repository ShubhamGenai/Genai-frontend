import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Users, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../../../component/contentManagerComponents/DeleteConfirmationModal';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDuration, setFilterDuration] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  
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

  // Delete lesson handlers
  const handleDeleteClick = (lesson) => {
    setLessonToDelete(lesson);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${CONTENTMANAGER.DELETE_LESSON}/${lessonToDelete._id}`);
      
      // Refresh the entire list to ensure data consistency
      await fetchLessons();
      
      setDeleteModalOpen(false);
      setLessonToDelete(null);
      
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert(`Failed to delete lesson: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setLessonToDelete(null);
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
      <div className="w-full min-h-full pb-4">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-slate-400">Loading lessons...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-full pb-4">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
          <div className="text-red-400 text-base font-bold mb-1">Error Loading Lessons</div>
          <p className="text-red-300 mb-2 text-sm">{error}</p>
          <button
            onClick={fetchLessons}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight mb-1">Lessons</h1>
            <p className="text-slate-400 text-sm font-light">
              {filteredLessons.length} of {lessons.length} lessons
            </p>
          </div>
          <Link to="/content/lessons/add">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-sm shadow-xl hover:shadow-2xl">
              Add New Lesson
            </button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              className="pl-10 pr-6 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
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
        <div className="text-center py-6">
          <BookOpen className="mx-auto h-8 w-8 text-slate-500 mb-2" />
          <h3 className="text-base font-bold text-white mb-1">No lessons found</h3>
          <p className="text-slate-400 text-sm">
            {searchTerm || filterDuration !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first lesson.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLessons.map((lesson) => (
            <div key={lesson._id} className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              {/* Card Header */}
              <div className="p-3 pb-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-white line-clamp-2">
                    {lesson.title}
                  </h3>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => window.location.href = `/content/lessons/${lesson._id}`}
                      className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                      title="View lesson"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <Link to={`/content/lessons/edit/${lesson._id}`}>
                      <button
                        className="p-1.5 text-slate-400 hover:text-green-400 transition-colors"
                        title="Edit lesson"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(lesson)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete lesson"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-300 text-xs line-clamp-3 mb-3">
                  {lesson.content}
                </p>

                {/* Lesson Stats */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  {lesson.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{lesson.duration} min</span>
                    </div>
                  )}
                  
                  {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="font-medium">{lesson.practiceQuestions.length} questions</span>
                    </div>
                  )}
                  
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="font-medium">{lesson.quiz.length} quizzes</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Card Footer */}
              <div className="px-3 py-2 bg-slate-800/40 border-t border-slate-600/30 rounded-b-lg">
                <Link to={`/content/lessons/${lesson._id}`}> 
                  <button className="w-full px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                    View Lesson
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-3 text-center">
        <button
          onClick={fetchLessons}
          className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors text-xs font-semibold"
        >
          Refresh Lessons
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Lesson"
        message={`Are you sure you want to delete "${lessonToDelete?.title}"?`}
        itemName={lessonToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default LessonList