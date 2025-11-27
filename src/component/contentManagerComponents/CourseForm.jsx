import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft',
    thumbnail: '',
    prerequisites: '',
    objectives: ''
  });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // This would be an API call in a real application
      setTimeout(() => {
        setFormData({
          title: 'Introduction to React',
          description: 'Learn the basics of React including components, props, state, and hooks.',
          status: 'published',
          thumbnail: '',
          prerequisites: 'Basic knowledge of HTML, CSS, and JavaScript',
          objectives: '- Understand React components\n- Learn state management\n- Build a simple application'
        });
        setIsLoading(false);
      }, 800);
    }
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to courses list
      navigate('/content/courses-list');
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Please try again.');
    } finally {
      setIsSaving(false);
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
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/content/courses-list')}
            className="mr-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isEditMode ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-base font-bold text-slate-300 mb-2">
              Course Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.title ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
            />
            {errors.title && (
              <p className="mt-2 text-sm font-semibold text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-base font-bold text-slate-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.description ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
            />
            {errors.description && (
              <p className="mt-2 text-sm font-semibold text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-base font-bold text-slate-300 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label htmlFor="thumbnail" className="block text-base font-bold text-slate-300 mb-2">
              Thumbnail URL
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Prerequisites */}
          <div>
            <label htmlFor="prerequisites" className="block text-base font-bold text-slate-300 mb-2">
              Prerequisites
            </label>
            <textarea
              id="prerequisites"
              name="prerequisites"
              rows="3"
              value={formData.prerequisites}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="Any prerequisites for this course..."
            />
          </div>

          {/* Learning Objectives */}
          <div>
            <label htmlFor="objectives" className="block text-base font-bold text-slate-300 mb-2">
              Learning Objectives
            </label>
            <textarea
              id="objectives"
              name="objectives"
              rows="4"
              value={formData.objectives}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="List the learning objectives for this course..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/content/courses-list')}
              className="bg-slate-700/40 py-3 px-6 border border-slate-600/30 rounded-xl shadow-sm text-base font-semibold text-white hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
            >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Course'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
 
  );
};

export default CourseForm;