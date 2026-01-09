import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';
import DeleteConfirmationModal from '../../../../component/contentManagerComponents/DeleteConfirmationModal';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

useEffect(() => {
  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(CONTENTMANAGER.GET_QUIZ);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      alert('Failed to load quizzes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchQuizzes();
}, []);

  // Handle delete click - open confirmation modal
  const handleDeleteClick = (quiz) => {
    setQuizToDelete(quiz);
    setDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!quizToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${CONTENTMANAGER.DELETE_QUIZ}/${quizToDelete._id}`);
      
      // Remove quiz from state
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizToDelete._id));
      
      // Close modal and reset state
      setDeleteModalOpen(false);
      setQuizToDelete(null);
    } catch (err) {
      console.error('Failed to delete quiz', err);
      alert(`Failed to delete quiz: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  // Sort quizzes by newest first (using createdAt or _id as fallback)
  const sortedQuizzes = [...quizzes].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    // Fallback to _id comparison (MongoDB ObjectIds are sortable by creation time)
    return b._id.localeCompare(a._id);
  });

  // Filter quizzes by search term
  const filteredQuizzes = sortedQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="w-full min-h-full pb-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-1">Quizzes</h1>
          <p className="text-slate-400 text-sm font-light">Manage your quizzes</p>
        </div>
          <Link
            to="/content/quizzes/add"
            className="mt-3 md:mt-0 flex items-center justify-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            Add New Quiz
          </Link>
        </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="w-full px-3 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Quiz List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl p-4 text-center">
          <p className="text-slate-400 text-sm">No quizzes found.</p>
        </div>
      ) : (
        <>
          <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl overflow-hidden">
            <table className="min-w-full divide-y divide-slate-600/30">
              <thead className="bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Title</th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Duration</th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Questions</th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Created Date</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
                {paginatedQuizzes.map((quiz) => (
                  <tr key={quiz._id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-semibold text-white">{quiz.title}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-300">{quiz.duration} mins</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-300">{quiz.questions?.length || 0}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-300">{formatDate(quiz.createdAt)}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-right text-xs">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/content/quizzes/${quiz._id}`}
                          className="text-slate-200 hover:text-white transition-colors"
                          title="View quiz"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link to={`/content/quizzes/edit/${quiz._id}`} className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit quiz">
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(quiz)} 
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete quiz"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl px-4 py-3">
              <div className="text-sm text-slate-300">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredQuizzes.length)} of {filteredQuizzes.length} quizzes
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-600/50 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-slate-400">...</span>;
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-slate-600/50 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Quiz"
        message={`Are you sure you want to delete the quiz "${quizToDelete?.title}"? This action cannot be undone.`}
        itemName={quizToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Quizzes;
