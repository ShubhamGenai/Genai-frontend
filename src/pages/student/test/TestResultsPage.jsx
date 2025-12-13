import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trophy, Award, TrendingUp, BookOpen, ArrowLeft, Download, Share2, BarChart3 } from 'lucide-react';
import { mainContext } from '../../../context/MainContext';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';

const TestResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(mainContext);
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const testData = location.state?.test;
  const answers = location.state?.answers;
  const questions = location.state?.questions;
  const submissionData = location.state?.submissionData;
  const submissionId = location.state?.submissionId;
  const fromHistory = location.state?.fromHistory;

  // Security check: Ensure only students can access this page
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    if (user.role !== 'student') {
      // Redirect non-student users to their respective dashboards
      const roleRedirects = {
        admin: '/admin',
        content: '/content',
        employer: '/employer/home'
      };
      navigate(roleRedirects[user.role] || '/');
      return;
    }
  }, [user, navigate, location.pathname]);

  useEffect(() => {
    // If coming from history with submissionId, fetch from backend
    if (fromHistory && submissionId && token) {
      fetchSubmissionFromBackend();
      return;
    }

    // If submission data is already available from navigation state, use it
    if (submissionData && submissionData.results) {
      setResults(submissionData.results);
      setLoading(false);
      return;
    }

    // Otherwise, calculate results from answers and questions
    if (answers && questions && questions.length > 0) {
      calculateResults();
    } else {
      setError('Test results data not available');
      setLoading(false);
    }
  }, [submissionId, fromHistory, token]);

  const fetchSubmissionFromBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${USERENDPOINTS.GET_TEST_SUBMISSION_DETAILS}/${submissionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.submission) {
        const submission = response.data.submission;
        // Convert submission answers to results format
        const detailedAnswers = submission.answers || [];
        const correctAnswers = detailedAnswers.filter(a => a.isCorrect).length;
        const incorrectAnswers = detailedAnswers.filter(a => !a.isCorrect && a.selectedAnswer !== null && a.selectedAnswer !== undefined).length;
        const unanswered = detailedAnswers.filter(a => a.selectedAnswer === null || a.selectedAnswer === undefined).length;
        const totalMarks = detailedAnswers.reduce((sum, a) => sum + (a.marks || 0), 0);
        const obtainedMarks = detailedAnswers.reduce((sum, a) => sum + (a.obtainedMarks || 0), 0);
        const score = totalMarks > 0 ? Math.round((Math.max(0, obtainedMarks) / totalMarks) * 100) : 0;
        const passingScore = testData?.passingScore || 50;
        const status = score >= passingScore ? 'passed' : 'failed';

        setResults({
          totalQuestions: detailedAnswers.length,
          correctAnswers,
          incorrectAnswers,
          unanswered,
          totalMarks,
          obtainedMarks: Math.max(0, obtainedMarks),
          score,
          status,
          passingScore,
          detailedAnswers: detailedAnswers.map(a => ({
            questionId: a.questionId,
            questionText: a.questionText || '',
            selectedAnswer: a.selectedOption || a.selectedAnswer,
            correctAnswer: a.correctAnswer,
            isCorrect: a.isCorrect,
            marks: a.marks || 1,
            obtainedMarks: a.obtainedMarks || 0,
            options: a.options || []
          }))
        });
      } else {
        setError('Failed to load submission details');
      }
    } catch (err) {
      console.error('Error fetching submission details:', err);
      setError('Failed to load submission details');
    } finally {
      setLoading(false);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;
    let totalMarks = 0;
    let obtainedMarks = 0;

    const detailedAnswers = questions.map((question, index) => {
      const questionId = question.id || question._id || index;
      const selectedAnswer = answers[questionId];
      const correctAnswer = question.correctAnswer || question.answer;
      const marks = question.marks || 1;
      
      totalMarks += marks;
      
      let isCorrect = false;
      if (selectedAnswer !== null && selectedAnswer !== undefined) {
        if (typeof selectedAnswer === 'number') {
          const selectedOption = question.options && question.options[selectedAnswer] 
            ? question.options[selectedAnswer] 
            : null;
          isCorrect = selectedOption === correctAnswer || String(selectedAnswer) === String(correctAnswer);
        } else {
          isCorrect = String(selectedAnswer) === String(correctAnswer);
        }
        
        if (isCorrect) {
          correctAnswers++;
          obtainedMarks += marks;
        } else {
          incorrectAnswers++;
          obtainedMarks -= marks * 0.25; // Negative marking
        }
      } else {
        unanswered++;
      }

      return {
        questionId: questionId,
        questionText: question.question || question.questionText || '',
        options: question.options || [],
        selectedAnswer: selectedAnswer !== null && selectedAnswer !== undefined 
          ? (typeof selectedAnswer === 'number' && question.options 
              ? question.options[selectedAnswer] 
              : selectedAnswer)
          : null,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        marks: marks,
        obtainedMarks: isCorrect ? marks : (selectedAnswer !== null && selectedAnswer !== undefined ? -(marks * 0.25) : 0)
      };
    });

    const score = totalMarks > 0 ? Math.round((Math.max(0, obtainedMarks) / totalMarks) * 100) : 0;
    const passingScore = testData?.passingScore || 50;
    const status = score >= passingScore ? 'passed' : 'failed';

    setResults({
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      totalMarks,
      obtainedMarks: Math.max(0, obtainedMarks),
      score,
      status,
      passingScore,
      detailedAnswers
    });
    setLoading(false);
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Security check: Ensure only students can access this page
  if (!user || user.role !== 'student') {
    return null; // Will be redirected by useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to load test results'}</p>
          <Link
            to="/student/tests"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tests
          </Link>
        </div>
      </div>
    );
  }

  const isPassed = results.status === 'passed';
  const scoreColor = isPassed ? 'text-green-600' : 'text-red-600';
  const bgColor = isPassed ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/student/tests')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tests
        </button>
        <h1 className="text-3xl font-light text-gray-900 mb-2">Test Results</h1>
        {testData && (
          <p className="text-gray-600">{testData.title || 'Test Results'}</p>
        )}
      </div>

      {/* Score Card */}
      <div className={`${bgColor} rounded-lg border border-gray-200 p-6 shadow-sm`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-4">
            {isPassed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          <h2 className={`text-4xl font-light ${scoreColor} mb-2`}>
            {results.score}%
          </h2>
          <p className={`text-lg font-medium ${scoreColor} mb-2`}>
            {isPassed ? 'Congratulations! You Passed' : 'You Did Not Pass'}
          </p>
          <p className="text-sm text-gray-600">
            Passing Score: {results.passingScore}%
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Questions</span>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{results.totalQuestions}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Correct</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{results.correctAnswers}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Incorrect</span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{results.incorrectAnswers}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Unanswered</span>
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-2xl font-bold text-gray-600">{results.unanswered}</p>
        </div>
      </div>

      {/* Marks Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Marks Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Marks</p>
            <p className="text-2xl font-bold text-gray-900">{results.totalMarks}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Obtained Marks</p>
            <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {results.obtainedMarks.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Percentage</p>
            <p className={`text-2xl font-bold ${scoreColor}`}>{results.score}%</p>
          </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
        <div className="space-y-4">
            {results.detailedAnswers.map((answer, index) => (
              <div
                key={answer.questionId || index}
                className={`border rounded-lg p-4 ${
                  answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <button
                    onClick={() => toggleQuestion(answer.questionId)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {expandedQuestions[answer.questionId] ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                
                <p className="text-sm font-medium text-gray-900 mb-2">{answer.questionText}</p>
                
                {expandedQuestions[answer.questionId] && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs">
                      <span className="font-medium text-gray-700">Your Answer: </span>
                      <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                        {answer.selectedAnswer || 'Not Answered'}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-gray-700">Correct Answer: </span>
                      <span className="text-green-700">{answer.correctAnswer}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-gray-700">Marks: </span>
                      <span className={answer.obtainedMarks >= 0 ? 'text-green-700' : 'text-red-700'}>
                        {answer.obtainedMarks >= 0 ? '+' : ''}{answer.obtainedMarks.toFixed(2)}
                      </span>
                      <span className="text-gray-600"> / {answer.marks}</span>
                    </div>
                    {answer.options && answer.options.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Options:</p>
                        <div className="space-y-1">
                          {answer.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`text-xs p-2 rounded ${
                                option === answer.correctAnswer
                                  ? 'bg-green-100 text-green-800'
                                  : option === answer.selectedAnswer && !answer.isCorrect
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {option}
                              {option === answer.correctAnswer && ' ✓'}
                              {option === answer.selectedAnswer && !answer.isCorrect && ' ✗'}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/student/tests"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Browse More Tests
          </Link>
          {testData && (
            <Link
              to={`/student/test-details?id=${testData.id || testData._id}`}
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              View Test Details
            </Link>
          )}
        </div>
      </div>
    
  );
};

export default TestResultsPage;

