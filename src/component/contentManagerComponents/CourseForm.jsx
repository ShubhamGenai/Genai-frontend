import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { CONTENTMANAGER } from '../../constants/ApiConstants';
import ModuleSelectorPopup from './ModuleSelectorPopup';

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Form state with all backend fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseDescription: '',
    priceActual: '',
    priceDiscounted: '',
    category: '',
    instructor: '',
    imageUrl: '',
    level: 'Beginner',
    duration: '',
    features: [],
    learningOutcomes: '',
    targetAudience: '',
    requirements: '',
    certificate: true,
    modules: [],
    ratings: []
  });

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [moduleSelectorOpen, setModuleSelectorOpen] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      fetchCourseData();
    }
  }, [id, isEditMode]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      // Fetch course by ID using the correct endpoint
      const response = await axios.get(`${CONTENTMANAGER.GET_COURSE_BY_ID}/${id}`);
      const course = response.data.course || response.data;
      
      setFormData({
        title: course.title || '',
        description: course.description || '',
        courseDescription: course.courseDescription || '',
        priceActual: course.price?.actual || '',
        priceDiscounted: course.price?.discounted || '',
        category: course.category || '',
        instructor: course.instructor?._id || course.instructor || '',
        imageUrl: course.imageUrl || '',
        level: course.level || 'Beginner',
        duration: course.duration || '',
        features: Array.isArray(course.features) ? course.features : [],
        learningOutcomes: Array.isArray(course.learningOutcomes) ? course.learningOutcomes.join('\n') : (course.learningOutcomes || ''),
        targetAudience: Array.isArray(course.targetAudience) ? course.targetAudience.join('\n') : (course.targetAudience || ''),
        requirements: course.requirements || '',
        certificate: course.certificate !== undefined ? course.certificate : true,
        modules: course.modules || [],
        ratings: course.ratings || []
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      alert('Failed to load course data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle feature addition
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  // Handle feature removal
  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Handle module selection
  const handleModuleSelect = (selectedModules) => {
    setFormData(prev => ({
      ...prev,
      modules: selectedModules
    }));
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

    if (!formData.courseDescription?.trim()) {
      newErrors.courseDescription = 'Course description is required';
    }

    if (!formData.priceActual || parseFloat(formData.priceActual) <= 0) {
      newErrors.priceActual = 'Valid actual price is required';
    }

    if (!formData.priceDiscounted || parseFloat(formData.priceDiscounted) <= 0) {
      newErrors.priceDiscounted = 'Valid discounted price is required';
    }

    if (!formData.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.instructor?.trim()) {
      newErrors.instructor = 'Instructor is required';
    }

    if (!formData.duration?.trim()) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.modules || formData.modules.length === 0) {
      newErrors.modules = 'At least one module is required';
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
      // Prepare modules data - backend expects array of module objects with lessons
      // Each lesson should have: title, videoUrl, duration, practiceQuestions, quizzes
      const modulesData = formData.modules.map(module => {
        // Transform lessons to match backend expectations
        // Lessons from GET_MODULES are already populated objects
        const lessons = (module.lessons || []).map(lesson => {
          // Handle both populated lesson objects and lesson IDs
          if (typeof lesson === 'object' && lesson._id) {
            // Transform quizzes - filter out invalid ones and ensure required fields
            // Note: GET_MODULES only populates lessons, not quizzes inside lessons
            // So lesson.quiz will be ObjectIds, not populated objects
            // We'll skip quizzes for now (set to empty array) to avoid validation errors
            // Quizzes can be added later when creating/editing lessons
            let quizzes = [];
            
            // Check if quizzes are populated (have actual data, not just IDs)
            if (lesson.quizzes && Array.isArray(lesson.quizzes)) {
              quizzes = lesson.quizzes;
            } else if (lesson.quiz && Array.isArray(lesson.quiz)) {
              // Check if quiz array contains objects with data or just IDs
              const hasPopulatedQuizzes = lesson.quiz.some(q => 
                typeof q === 'object' && q !== null && q.title && q.questions
              );
              if (hasPopulatedQuizzes) {
                quizzes = lesson.quiz;
              }
              // If quizzes are just ObjectIds (not populated), skip them
              // This prevents validation errors when creating the course
            }

            // Filter and transform quizzes to ensure they have required fields
            const validQuizzes = quizzes
              .filter(q => {
                // Skip if it's not an object (e.g., just an ID string)
                if (typeof q !== 'object' || q === null) {
                  return false;
                }
                // Skip if it's just an ObjectId without populated data
                if (Object.keys(q).length === 1 && q._id) {
                  return false;
                }
                // Check if quiz has required fields: title (non-empty string), duration (number), and questions (array)
                const hasValidTitle = q.title && typeof q.title === 'string' && q.title.trim() !== '';
                const hasValidDuration = q.duration !== undefined && q.duration !== null && typeof q.duration === 'number';
                const hasValidQuestions = Array.isArray(q.questions) && q.questions.length > 0;
                
                return hasValidTitle && hasValidDuration && hasValidQuestions;
              })
              .map(q => {
                // Transform questions to ensure they have the correct structure
                const validQuestions = (q.questions || [])
                  .filter(question => {
                    // Ensure question has required fields
                    const questionText = question.questionText || question.question;
                    const hasQuestionText = questionText && typeof questionText === 'string' && questionText.trim() !== '';
                    const hasOptions = Array.isArray(question.options) && question.options.length > 0;
                    const hasAnswer = question.answer !== undefined && question.answer !== null && question.answer !== '';
                    return hasQuestionText && hasOptions && hasAnswer;
                  })
                  .map(question => ({
                    questionText: (question.questionText || question.question || '').trim(),
                    options: question.options || [],
                    answer: question.answer || ''
                  }));

                // Only include quiz if it has valid questions
                if (validQuestions.length === 0) {
                  return null;
                }

                return {
                  title: q.title.trim(),
                  duration: q.duration || 0,
                  questions: validQuestions
                };
              })
              .filter(q => q !== null); // Remove null entries

            // Populated lesson object - extract the data we need
            // Note: Lesson schema requires 'content' field (not videoUrl)
            // Backend expects: title, content, duration, practiceQuestions, quiz
            return {
              title: lesson.title || '',
              content: lesson.content || lesson.videoUrl || 'No content provided', // Schema requires content
              duration: lesson.duration || 0,
              practiceQuestions: lesson.practiceQuestions || [],
              quizzes: validQuizzes
            };
          }
          // If lesson is just an ID (shouldn't happen with populated data, but handle it)
          return {
            title: 'Untitled Lesson',
            content: 'No content provided', // Required field
            duration: 0,
            practiceQuestions: [],
            quizzes: []
          };
        });

        return {
          title: module.title,
          lessons: lessons
        };
      });

      // Convert learningOutcomes and targetAudience from strings to arrays
      const learningOutcomesArray = formData.learningOutcomes
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      const targetAudienceArray = formData.targetAudience
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');

      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        courseDescription: formData.courseDescription.trim(),
        price: {
          actual: parseFloat(formData.priceActual) || 0,
          discounted: parseFloat(formData.priceDiscounted) || 0
        },
        category: formData.category.trim(),
        instructor: formData.instructor.trim(), // Should be ObjectId string
        imageUrl: formData.imageUrl.trim(),
        level: formData.level, // Should be "Beginner", "Intermediate", or "Advanced"
        duration: formData.duration.trim(),
        features: formData.features,
        learningOutcomes: learningOutcomesArray,
        targetAudience: targetAudienceArray,
        requirements: formData.requirements.trim(),
        certificate: formData.certificate,
        modules: modulesData,
        ratings: formData.ratings || []
      };

      if (isEditMode) {
        // Update course
        await axios.put(`${CONTENTMANAGER.UPDATE_COURSE}/${id}`, courseData);
      } else {
        // Create new course
        await axios.post(CONTENTMANAGER.ADD_COURSE, courseData);
      }
      
      // Redirect back to courses list
      navigate('/content/courses-list');
    } catch (error) {
      console.error('Error saving course:', error);
      alert(`Failed to save course: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-4">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/content/courses-list')}
            className="mr-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {isEditMode ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-300 mb-1">
              Course Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.title ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="Enter course title"
            />
            {errors.title && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-slate-300 mb-1">
              Short Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.description ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="Brief description of the course"
            />
            {errors.description && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Course Description */}
          <div>
            <label htmlFor="courseDescription" className="block text-sm font-bold text-slate-300 mb-1">
              Detailed Course Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              rows="3"
              value={formData.courseDescription}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.courseDescription ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="Detailed description of what students will learn"
            />
            {errors.courseDescription && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.courseDescription}</p>
            )}
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Actual Price */}
            <div>
              <label htmlFor="priceActual" className="block text-sm font-bold text-slate-300 mb-1">
                Actual Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="priceActual"
                name="priceActual"
                value={formData.priceActual}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`block w-full bg-slate-800/40 border ${errors.priceActual ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                placeholder="0.00"
              />
              {errors.priceActual && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceActual}</p>
              )}
            </div>

            {/* Discounted Price */}
            <div>
              <label htmlFor="priceDiscounted" className="block text-sm font-bold text-slate-300 mb-1">
                Discounted Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="priceDiscounted"
                name="priceDiscounted"
                value={formData.priceDiscounted}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`block w-full bg-slate-800/40 border ${errors.priceDiscounted ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                placeholder="0.00"
              />
              {errors.priceDiscounted && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceDiscounted}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-slate-300 mb-1">
              Category <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.category ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="e.g., Web Development, Data Science"
            />
            {errors.category && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.category}</p>
            )}
          </div>

          {/* Instructor and Level Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instructor */}
            <div>
            <label htmlFor="instructor" className="block text-sm font-bold text-slate-300 mb-1">
              Instructor ID (ObjectId) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className={`block w-full bg-slate-800/40 border ${errors.instructor ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="MongoDB ObjectId of instructor (e.g., 60d0fe4f5311236168a109ca)"
            />
            {errors.instructor && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.instructor}</p>
            )}
            </div>

            {/* Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-bold text-slate-300 mb-1">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Duration and Image URL Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-bold text-slate-300 mb-1">
                Duration <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`block w-full bg-slate-800/40 border ${errors.duration ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                placeholder="e.g., 10 hours, 4 weeks"
              />
              {errors.duration && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.duration}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-bold text-slate-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">
              Course Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="Add a feature (press Enter to add)"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-indigo-600/30 text-indigo-200 px-2 py-1 rounded text-xs font-medium"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-indigo-300 hover:text-white transition-colors text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Learning Outcomes */}
          <div>
            <label htmlFor="learningOutcomes" className="block text-sm font-bold text-slate-300 mb-1">
              Learning Outcomes
            </label>
            <textarea
              id="learningOutcomes"
              name="learningOutcomes"
              rows="3"
              value={formData.learningOutcomes}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="What students will learn from this course..."
            />
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-bold text-slate-300 mb-1">
              Target Audience
            </label>
            <textarea
              id="targetAudience"
              name="targetAudience"
              rows="2"
              value={formData.targetAudience}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="Who should take this course..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-bold text-slate-300 mb-1">
              Requirements / Prerequisites
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows="2"
              value={formData.requirements}
              onChange={handleChange}
              className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              placeholder="Prerequisites or requirements for this course..."
            />
          </div>

          {/* Certificate */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificate"
              name="certificate"
              checked={formData.certificate}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="certificate" className="ml-2 text-sm font-bold text-slate-300">
              Certificate of Completion Available
            </label>
          </div>

          {/* Modules Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">
              Modules <span className="text-red-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => setModuleSelectorOpen(true)}
              className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-2 px-3 text-sm text-white hover:bg-slate-800/60 transition-all text-left flex items-center justify-between"
            >
              <span>
                {formData.modules.length > 0
                  ? `${formData.modules.length} module${formData.modules.length > 1 ? 's' : ''} selected`
                  : 'Click to select modules'}
              </span>
              <span className="text-indigo-400 text-xs">Select Modules →</span>
            </button>
            {errors.modules && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.modules}</p>
            )}
            {formData.modules.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.modules.map((module, index) => (
                  <div
                    key={module._id || module.id || index}
                    className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{module.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {module.lessons?.length || 0} lesson{module.lessons?.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            modules: prev.modules.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/content/courses-list')}
              className="bg-slate-700/40 py-2 px-4 border border-slate-600/30 rounded-lg shadow-sm text-sm font-semibold text-white hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

      {/* Module Selector Popup */}
      <ModuleSelectorPopup
        isOpen={moduleSelectorOpen}
        onClose={() => setModuleSelectorOpen(false)}
        selectedModules={formData.modules}
        onSelect={handleModuleSelect}
      />
    </div>
  );
};

export default CourseForm;
