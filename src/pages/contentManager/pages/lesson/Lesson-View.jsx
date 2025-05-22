import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, Users, Edit, Trash2, Play, Code, FileText, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';

const LessonView = () => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
 const { lessonId } = useParams(); 
console.log(lessonId);

  // Fetch lesson details
  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${CONTENTMANAGER.LESSON_VIEW}/${lessonId}`);

      
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.data
      setLesson(data.lesson || data);
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError(err.message || 'Failed to fetch lesson');
    } finally {
      setLoading(false);
    }
  };

  // Delete lesson
  const handleDelete = async () => {
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

      alert('Lesson deleted successfully');
      window.location.href = '/lessons';
    } catch (err) {
      console.error('Error deleting lesson:', err);
      alert('Failed to delete lesson');
    }
  };

  // Copy code to clipboard
  const copyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Toggle practice question expansion
  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading lesson...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
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

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Lesson not found</h3>
          <p className="text-gray-500 mb-4">The lesson you're looking for doesn't exist.</p>
          <button
            onClick={() => window.location.href = '/lessons'}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.location.href = '/content/lessons'}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lessons
          </button>
          
          <div className="flex gap-2">
            <Link to = {`/content/lessons/edit/${lessonId}`}>
            <button
             
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Lesson Title and Meta */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
            {lesson.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} minutes</span>
              </div>
            )}
            
            {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{lesson.practiceQuestions.length} practice questions</span>
              </div>
            )}
            
            {lesson.quiz && lesson.quiz.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{lesson.quiz.length} quizzes</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            
            {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
              <button
                onClick={() => setActiveTab('practice')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'practice'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Practice Questions ({lesson.practiceQuestions.length})
              </button>
            )}
            
            {lesson.quiz && lesson.quiz.length > 0 && (
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quizzes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Quizzes ({lesson.quiz.length})
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-white">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Lesson Content</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {lesson.content}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Questions Tab */}
        {activeTab === 'practice' && lesson.practiceQuestions && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Practice Questions</h2>
            
            {lesson.practiceQuestions.map((question, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedQuestion === index ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800 font-medium mb-2">{question.question}</p>
                    {question.description && (
                      <p className="text-gray-600 text-sm">{question.description}</p>
                    )}
                  </div>

                  {expandedQuestion === index && (
                    <div className="space-y-4 border-t border-gray-100 pt-4">
                      {question.instructions && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <FileText className="w-4 h-4" />
                            Instructions
                          </h4>
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {question.instructions}
                            </p>
                          </div>
                        </div>
                      )}

                      {question.code && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700">
                              <Code className="w-4 h-4" />
                              Code
                            </h4>
                            <button
                              onClick={() => copyCode(question.code, index)}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                            >
                              {copiedCode === index ? (
                                <>
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm text-gray-100">
                              <code>{question.code}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {question.expectedAnswer && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <CheckCircle className="w-4 h-4" />
                            Expected Answer
                          </h4>
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {question.expectedAnswer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && lesson.quiz && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Associated Quizzes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.quiz.map((quiz, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  {typeof quiz === 'object' ? (
                    <>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {quiz.title || `Quiz ${index + 1}`}
                      </h3>
                      {quiz.description && (
                        <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          ID: {quiz._id}
                        </span>
                        <button
                          onClick={() => window.location.href = `/quizzes/${quiz._id}`}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Quiz
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-900 mb-2">Quiz {index + 1}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-mono">
                          ID: {quiz}
                        </span>
                        <button
                          onClick={() => window.location.href = `/quizzes/${quiz}`}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Quiz
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;