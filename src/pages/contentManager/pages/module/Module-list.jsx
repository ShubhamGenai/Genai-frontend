import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, EyeIcon, PencilIcon, PlayIcon, ClockIcon, QuestionMarkCircleIcon, TrashIcon, CalendarIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import AddModuleModal from "../../../../component/contentManagerComponents/module/Add-Module";
import EditModuleModal from "../../../../component/contentManagerComponents/module/Edit-module";
import ViewModuleModal from "../../../../component/contentManagerComponents/module/View_Module";

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const response = await axios.get(CONTENTMANAGER.GET_MODULES);
      // Sort modules by createdAt in descending order (latest first)
      const sortedModules = response.data.modules.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Latest first
      });
      setModules(sortedModules);
    } catch (error) {
      console.error("Error loading modules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModule = async (newModule) => {
    try {
      setIsLoading(true); // Show loading state while adding
      const { data } = await axios.post(CONTENTMANAGER.ADD_MODULE, newModule);
      
      // Always fetch fresh data from server to ensure consistency
      await loadModules();
      setAddModalOpen(false);
      setCurrentPage(1); // Reset to first page to see the newly added module
      
      // Optional: You could show a success message here
      console.log('Module added successfully:', data);
    } catch (error) {
      console.error("Error adding module:", error);
      // Optional: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditModule = async (updatedModule) => {
    try {
      await axios.put(`${CONTENTMANAGER.UPDATE_MODULE}/${updatedModule._id}`, updatedModule);
      
      // Refresh the entire list to ensure data consistency and maintain sort order
      await loadModules();
      setEditModalOpen(false);
      setSelectedModule(null);
      
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const handleDeleteClick = (module) => {
    setModuleToDelete(module);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!moduleToDelete) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${CONTENTMANAGER.DELETE_MODULE}/${moduleToDelete._id}`);
      setModules(modules.filter(m => m._id !== moduleToDelete._id));
      setDeleteConfirmOpen(false);
      setModuleToDelete(null);
      
      // Adjust current page if we deleted the last item on the current page
      const remainingModules = modules.filter(m => m._id !== moduleToDelete._id);
      const newTotalPages = Math.ceil(remainingModules.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
    } catch (error) {
      console.error("Error deleting module:", error);
      // You might want to show an error toast here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setModuleToDelete(null);
  };

  const calculateTotalDuration = (lessons) => {
    return lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
  };

  const getTotalPracticeQuestions = (lessons) => {
    return lessons.reduce((total, lesson) => total + (lesson.practiceQuestions?.length || 0), 0);
  };

  const getTotalQuizzes = (lessons) => {
    return lessons.reduce((total, lesson) => total + (lesson.quiz?.length || 0), 0);
  };

  const toggleExpandModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isRecentlyAdded = (dateString) => {
    if (!dateString) return false;
    const moduleDate = new Date(dateString);
    const now = new Date();
    const daysDiff = (now - moduleDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 1; // Within last 24 hours
  };

  // Pagination calculations
  const totalPages = Math.ceil(modules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModules = modules.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    setExpandedModule(null); // Close any expanded details when changing pages
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Modules Management</h1>
          <p className="text-base text-slate-400 font-light">
            Showing {startIndex + 1}-{Math.min(endIndex, modules.length)} of {modules.length} modules
          </p>
        </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Module
          </button>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Modules</h3>
          <p className="text-3xl font-bold text-indigo-400">{modules.length}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Lessons</h3>
          <p className="text-3xl font-bold text-green-400">
            {modules.reduce((total, mod) => total + mod.lessons.length, 0)}
          </p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Duration</h3>
          <p className="text-3xl font-bold text-blue-400">
            {modules.reduce((total, mod) => total + calculateTotalDuration(mod.lessons), 0)} min
          </p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Practice Questions</h3>
          <p className="text-3xl font-bold text-purple-400">
            {modules.reduce((total, mod) => total + getTotalPracticeQuestions(mod.lessons), 0)}
          </p>
        </div>
      </div>

      {/* Modules Table */}
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 shadow-xl rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Module Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Lessons
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
            {currentModules.map((module, index) => (
              <React.Fragment key={module._id}>
                <tr className={`${index % 2 === 0 ? "bg-slate-700/20" : "bg-slate-700/30"} ${isRecentlyAdded(module.createdAt) ? "border-l-4 border-green-500 bg-green-500/20" : ""} hover:bg-slate-700/40 transition-colors`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-base font-semibold text-white">
                            {module.title}
                          </span>
                          {isRecentlyAdded(module.createdAt) && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/50">
                              New
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          ID: {module._id}
                        </div>
                        <button
                          onClick={() => toggleExpandModule(module._id)}
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2 transition-colors"
                        >
                          {expandedModule === module._id ? "Hide Details" : "Show Details"}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center text-base font-medium text-white">
                      <CalendarIcon className="h-4 w-4 mr-2 text-slate-400" />
                      <div>
                        <div>{formatDate(module.createdAt)}</div>
                        {isRecentlyAdded(module.createdAt) && (
                          <div className="text-xs text-green-400 font-bold mt-1">Just added!</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base font-semibold text-white">
                      {module.lessons.length} lessons
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center text-base font-semibold text-white">
                      <ClockIcon className="h-4 w-4 mr-2 text-slate-400" />
                      {calculateTotalDuration(module.lessons)} min
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base font-medium text-white">
                      <div className="flex items-center mb-2">
                        <QuestionMarkCircleIcon className="h-4 w-4 mr-2 text-purple-400" />
                        {getTotalPracticeQuestions(module.lessons)} questions
                      </div>
                      <div className="flex items-center">
                        <PlayIcon className="h-4 w-4 mr-2 text-green-400" />
                        {getTotalQuizzes(module.lessons)} quizzes
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedModule(module);
                          setViewModalOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-500/20 transition-colors"
                        title="View Module"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedModule(module);
                          setEditModalOpen(true);
                        }}
                        className="text-green-400 hover:text-green-300 p-2 rounded-full hover:bg-green-500/20 transition-colors"
                        title="Edit Module"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(module)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 transition-colors"
                        title="Delete Module"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedModule === module._id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-slate-800/50">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Lessons Details:</h4>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson._id} className="bg-slate-700/50 p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h5 className="font-medium text-white">{lesson.title}</h5>
                                <p className="text-sm text-slate-400">ID: {lesson._id}</p>
                                <div className="flex items-center mt-2">
                                  <ClockIcon className="h-4 w-4 mr-1 text-blue-400" />
                                  <span className="text-sm text-slate-300">{lesson.duration} minutes</span>
                                </div>
                                {lesson.createdAt && (
                                  <div className="flex items-center mt-1">
                                    <CalendarIcon className="h-4 w-4 mr-1 text-slate-400" />
                                    <span className="text-sm text-slate-400">{formatDate(lesson.createdAt)}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div>
                                <h6 className="text-sm font-medium text-white">Video:</h6>
                                <a 
                                  href={lesson.videoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-400 hover:text-blue-300 truncate block transition-colors"
                                >
                                  {lesson.videoUrl}
                                </a>
                              </div>
                              
                              <div>
                                <h6 className="text-sm font-medium text-white">Content:</h6>
                                <div className="text-sm text-slate-300">
                                  <div>Questions: {lesson.practiceQuestions?.length || 0}</div>
                                  <div>Quizzes: {lesson.quiz?.length || 0}</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Practice Questions */}
                            {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
                              <div className="mt-4">
                                <h6 className="text-sm font-medium text-white mb-2">Practice Questions:</h6>
                                <div className="space-y-2">
                                  {lesson.practiceQuestions.map((question, qIndex) => (
                                    <div key={question._id} className="bg-purple-500/20 border border-purple-500/50 p-3 rounded">
                                      <p className="text-sm font-medium text-purple-300">{question.question}</p>
                                      <p className="text-xs text-purple-400">{question.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Quiz IDs */}
                            {lesson.quiz && lesson.quiz.length > 0 && (
                              <div className="mt-4">
                                <h6 className="text-sm font-medium text-white mb-2">Quiz IDs:</h6>
                                <div className="flex flex-wrap gap-2">
                                  {lesson.quiz.map((quizId, qIndex) => (
                                    <span key={qIndex} className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs px-2 py-1 rounded">
                                      {quizId}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {currentModules.length === 0 && modules.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <h3 className="mt-2 text-base font-bold text-white">No modules</h3>
              <p className="mt-1 text-sm text-slate-400">Get started by creating your first module.</p>
            </div>
          </div>
        )}
        
        {currentModules.length === 0 && modules.length > 0 && (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-base font-bold text-white">No modules on this page</h3>
              <p className="mt-1 text-sm text-slate-400">Try navigating to a different page.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {modules.length > itemsPerPage && (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 px-4 py-3 flex items-center justify-between sm:px-6 mt-6 rounded-xl shadow-xl">
          <div className="flex-1 flex justify-between sm:hidden">
            {/* Mobile pagination */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-slate-600/50 text-sm font-medium rounded-md text-white bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-600/50 text-sm font-medium rounded-md text-white bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-300">
                Showing <span className="font-medium text-white">{startIndex + 1}</span> to{' '}
                <span className="font-medium text-white">{Math.min(endIndex, modules.length)}</span> of{' '}
                <span className="font-medium text-white">{modules.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = page === 1 || 
                                  page === totalPages || 
                                  (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!showPage && page === currentPage - 2) {
                    return (
                      <span key={page} className="relative inline-flex items-center px-4 py-2 border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-slate-300">
                        ...
                      </span>
                    );
                  }
                  
                  if (!showPage && page === currentPage + 2) {
                    return (
                      <span key={page} className="relative inline-flex items-center px-4 py-2 border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-slate-300">
                        ...
                      </span>
                    );
                  }
                  
                  if (!showPage) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'z-10 bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                {/* Next button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Module</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the module "{moduleToDelete?.title}"? This action cannot be undone and will remove all associated lessons and content.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteCancel}
                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Modals */}
      <AddModuleModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddModule}
      />
      
      <EditModuleModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        moduleData={selectedModule}
        onSave={handleEditModule}
      />
      
      <ViewModuleModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        moduleData={selectedModule}
      />
    </div>
  );
};

export default ModuleList;