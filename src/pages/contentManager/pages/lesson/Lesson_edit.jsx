import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Code, FileText, CheckCircle, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';

const EditLesson = () => {
  const [lesson, setLesson] = useState({
    title: '',
    content: '',
    duration: '',
    practiceQuestions: [],
    quiz: []
  });
  
  const [originalLesson, setOriginalLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [quizInput, setQuizInput] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

const {lessonId} = useParams();
  // Fetch lesson details
  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${CONTENTMANAGER.LESSON_VIEW}/${lessonId}`);
      
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.data;
      const lessonData = data.lesson || data;
      
      // Format lesson data for editing
      const formattedLesson = {
        title: lessonData.title || '',
        content: lessonData.content || '',
        duration: lessonData.duration || '',
        practiceQuestions: lessonData.practiceQuestions || [],
        quiz: Array.isArray(lessonData.quiz) 
          ? lessonData.quiz.map(q => typeof q === 'object' ? q._id : q)
          : []
      };
      
      setLesson(formattedLesson);
      setOriginalLesson(JSON.stringify(formattedLesson));
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError(err.message || 'Failed to fetch lesson');
    } finally {
      setLoading(false);
    }
  };

  // Check if there are unsaved changes
  const checkForChanges = () => {
    const currentLessonString = JSON.stringify(lesson);
    setHasChanges(currentLessonString !== originalLesson);
  };

  // Add a new practice question
  const addPracticeQuestion = () => {
    setLesson(prev => ({
      ...prev,
      practiceQuestions: [
        ...prev.practiceQuestions,
        {
          question: '',
          description: '',
          instructions: '',
          code: '',
          expectedAnswer: ''
        }
      ]
    }));
  };

  // Remove a practice question
  const removePracticeQuestion = (index) => {
    if (window.confirm('Are you sure you want to remove this practice question?')) {
      setLesson(prev => ({
        ...prev,
        practiceQuestions: prev.practiceQuestions.filter((_, i) => i !== index)
      }));
    }
  };

  // Update practice question
  const updatePracticeQuestion = (index, field, value) => {
    setLesson(prev => ({
      ...prev,
      practiceQuestions: prev.practiceQuestions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  // Add quiz reference
  const addQuizReference = () => {
    if (quizInput.trim()) {
      setLesson(prev => ({
        ...prev,
        quiz: [...prev.quiz, quizInput.trim()]
      }));
      setQuizInput('');
    }
  };

  // Remove quiz reference
  const removeQuizReference = (index) => {
    setLesson(prev => ({
      ...prev,
      quiz: prev.quiz.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    // Basic validation
    if (!lesson.title.trim() || !lesson.content.trim()) {
      alert('Please fill in all required fields (Title and Content)');
      return;
    }

    // Validate practice questions
    for (let i = 0; i < lesson.practiceQuestions.length; i++) {
      if (!lesson.practiceQuestions[i].question.trim()) {
        alert(`Please fill in the question for Practice Question ${i + 1}`);
        return;
      }
    }

    try {
      setSaving(true);
      
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...lesson,
          duration: lesson.duration ? parseInt(lesson.duration) : undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update lesson');
      }

      const updatedLesson = await response.json();
      setOriginalLesson(JSON.stringify(lesson));
      setHasChanges(false);
      
      alert('Lesson updated successfully!');
      // Optionally redirect to view page
      // window.location.href = `/lessons/${currentLessonId}`;
      
    } catch (err) {
      console.error('Error updating lesson:', err);
      alert(`Failed to update lesson: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel/back navigation
  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        window.location.href = `/lessons/${lessonId}`;
      }
    } else {
      window.location.href = `/lessons/${lessonId}`;
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  useEffect(() => {
    checkForChanges();
  }, [lesson, originalLesson]);

  // Warn before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading lesson...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Error Loading Lesson</div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="space-x-3">
            <button
              onClick={fetchLesson}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/lessons'}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lesson
          </button>
          
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-sm text-orange-600 font-medium">
                • Unsaved changes
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                saving || !hasChanges
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Lesson</h1>
        <p className="text-gray-600">Modify lesson content, practice questions, and quiz references.</p>
      </div>

      <div className="space-y-8">
        {/* Basic Lesson Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lesson Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={lesson.title}
                onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={lesson.duration}
                onChange={(e) => setLesson(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
                min="1"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              required
              value={lesson.content}
              onChange={(e) => setLesson(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the lesson content..."
            />
          </div>
        </div>

        {/* Practice Questions Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Practice Questions</h2>
            <button
              type="button"
              onClick={addPracticeQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          {lesson.practiceQuestions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No practice questions added yet. Click "Add Question" to get started.</p>
          ) : (
            <div className="space-y-6">
              {lesson.practiceQuestions.map((question, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Question {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removePracticeQuestion(index)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question *
                      </label>
                      <input
                        type="text"
                        required
                        value={question.question}
                        onChange={(e) => updatePracticeQuestion(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter the question prompt"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Description
                        </label>
                        <textarea
                          value={question.description}
                          onChange={(e) => updatePracticeQuestion(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Additional information about the question"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Instructions
                        </label>
                        <textarea
                          value={question.instructions}
                          onChange={(e) => updatePracticeQuestion(index, 'instructions', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Step-by-step instructions"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Code className="w-4 h-4 inline mr-1" />
                        Code
                      </label>
                      <textarea
                        value={question.code}
                        onChange={(e) => updatePracticeQuestion(index, 'code', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Starter code or example code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Expected Answer
                      </label>
                      <textarea
                        value={question.expectedAnswer}
                        onChange={(e) => updatePracticeQuestion(index, 'expectedAnswer', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Expected answer or solution"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz References Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz References</h2>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={quizInput}
              onChange={(e) => setQuizInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Quiz ID (e.g., 507f1f77bcf86cd799439011)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuizReference())}
            />
            <button
              type="button"
              onClick={addQuizReference}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Quiz
            </button>
          </div>

          {lesson.quiz.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Referenced Quizzes:</h3>
              {lesson.quiz.map((quizId, index) => (
                <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                  <span className="font-mono text-sm text-gray-700">{quizId}</span>
                  <button
                    type="button"
                    onClick={() => removeQuizReference(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span className="text-sm text-gray-600">
              You have unsaved changes
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  saving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLesson;