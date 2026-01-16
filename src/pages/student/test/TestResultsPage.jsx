import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trophy, Award, TrendingUp, BookOpen, ArrowLeft, Download, Share2, BarChart3 } from 'lucide-react';
import { mainContext } from '../../../context/MainContext';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import FormulaRenderer from '../../../component/contentManagerComponents/FormulaRenderer';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const TestResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(mainContext);
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [questionExplanations, setQuestionExplanations] = useState({});
  const [loadingExplanations, setLoadingExplanations] = useState({});

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
            passage: a.passage || '',
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
        passage: question.passage || '',
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

  const toggleQuestion = async (questionId) => {
    const isExpanding = !expandedQuestions[questionId];
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));

    // If expanding and explanation not yet loaded, generate it
    if (isExpanding && !questionExplanations[questionId] && !loadingExplanations[questionId]) {
      await generateExplanation(questionId);
    }
  };

  // Process LaTeX formulas in HTML string and convert to KaTeX-rendered HTML
  const processLaTeXInHtml = (htmlString) => {
    if (!htmlString) return '';
    
    try {
      let processedHtml = htmlString;
      
      // Process block formulas: $$...$$
      processedHtml = processedHtml.replace(/\$\$([^$]+)\$\$/g, (match, formula) => {
        try {
          return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
        } catch (error) {
          console.error('KaTeX block rendering error:', error, 'Formula:', formula);
          return match; // Return original if rendering fails
        }
      });
      
      // Process inline formulas: $...$
      processedHtml = processedHtml.replace(/\$([^$\n]+)\$/g, (match, formula) => {
        // Skip if already processed (contains katex class)
        if (match.includes('katex')) return match;
        try {
          return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
        } catch (error) {
          console.error('KaTeX inline rendering error:', error, 'Formula:', formula);
          return match; // Return original if rendering fails
        }
      });
      
      return processedHtml;
    } catch (error) {
      console.error('Error processing LaTeX in HTML:', error);
      return htmlString; // Return original if processing fails
    }
  };

  const generateExplanation = async (questionId) => {
    // Try to find by questionId first, then by index
    let answer = results.detailedAnswers.find(a => 
      a.questionId === questionId || 
      String(a.questionId) === String(questionId)
    );
    
    // If not found, try by index
    if (!answer) {
      const index = results.detailedAnswers.findIndex(a => 
        a.questionId === questionId || 
        String(a.questionId) === String(questionId)
      );
      if (index >= 0) {
        answer = results.detailedAnswers[index];
      } else {
        // Last resort: use the questionId as index
        const idx = parseInt(questionId);
        if (!isNaN(idx) && idx >= 0 && idx < results.detailedAnswers.length) {
          answer = results.detailedAnswers[idx];
        }
      }
    }
    
    if (!answer) {
      console.error('Could not find answer for questionId:', questionId);
      return;
    }

    setLoadingExplanations(prev => ({ ...prev, [questionId]: true }));

    try {
      const response = await axios.post(
        USERENDPOINTS.GENERATE_QUESTION_EXPLANATION,
        {
          questionText: answer.questionText,
          options: answer.options || [],
          correctAnswer: answer.correctAnswer,
          selectedAnswer: answer.selectedAnswer,
          subject: testData?.category || testData?.subject || ''
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success && response.data.explanationHtml) {
        // Process LaTeX formulas in the HTML before storing
        const processedHtml = processLaTeXInHtml(response.data.explanationHtml);
        setQuestionExplanations(prev => ({
          ...prev,
          [questionId]: processedHtml
        }));
      } else {
        toast.error('Failed to generate explanation');
      }
    } catch (err) {
      console.error('Error generating explanation:', err);
      toast.error('Failed to generate explanation. Please try again.');
    } finally {
      setLoadingExplanations(prev => ({ ...prev, [questionId]: false }));
    }
  };

  // Security check: Ensure only students can access this page
  if (!user || user.role !== 'student') {
    return null; // Will be redirected by useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md max-w-md w-full">
          <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{error || 'Unable to load test results'}</p>
          <Link
            to="/student/tests"
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
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
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <button
          onClick={() => navigate('/student/tests')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
          Back to Tests
        </button>
        <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1 sm:mb-2">Test Results</h1>
        {testData && (
          <p className="text-sm sm:text-base text-gray-600 truncate">{testData.title || 'Test Results'}</p>
        )}
      </div>

      {/* Score Card */}
      <div className={`${bgColor} rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white mb-3 sm:mb-4">
            {isPassed ? (
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            )}
          </div>
          <h2 className={`text-3xl sm:text-4xl font-light ${scoreColor} mb-1 sm:mb-2`}>
            {results.score}%
          </h2>
          <p className={`text-base sm:text-lg font-medium ${scoreColor} mb-1 sm:mb-2 px-2`}>
            {isPassed ? 'Congratulations! You Passed' : 'You Did Not Pass'}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Passing Score: {results.passingScore}%
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Total Questions</span>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{results.totalQuestions}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Correct</span>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{results.correctAnswers}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Incorrect</span>
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{results.incorrectAnswers}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Unanswered</span>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">{results.unanswered}</p>
        </div>
      </div>

      {/* Marks Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
          Marks Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Marks</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{results.totalMarks}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Obtained Marks</p>
            <p className={`text-xl sm:text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {results.obtainedMarks.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Percentage</p>
            <p className={`text-xl sm:text-2xl font-bold ${scoreColor}`}>{results.score}%</p>
          </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Question Review</h3>
        <div className="space-y-3 sm:space-y-4">
            {results.detailedAnswers.map((answer, index) => (
              <div
                key={answer.questionId || index}
                className={`border rounded-lg p-3 sm:p-4 overflow-hidden ${
                  answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Q{index + 1}</span>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                  <button
                    onClick={() => toggleQuestion(answer.questionId)}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap flex-shrink-0"
                  >
                    {expandedQuestions[answer.questionId] ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {/* Passage Display (if available) */}
                {answer.passage && answer.passage.trim() !== '' && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-semibold text-blue-900 mb-2 uppercase tracking-wide">Passage:</p>
                    <div className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {(answer.passage.includes('$') || answer.passage.includes('\\(') || answer.passage.includes('\\[')) ? (
                        <FormulaRenderer text={answer.passage} className="text-gray-800" />
                      ) : (
                        <div>{answer.passage}</div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-2 break-words">
                  <FormulaRenderer text={answer.questionText || ''} className="text-xs sm:text-sm font-medium text-gray-900" />
                </div>
                
                {expandedQuestions[answer.questionId] && (
                  <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                    <div className="text-[10px] sm:text-xs break-words">
                      <span className="font-medium text-gray-700">Your Answer: </span>
                      <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                        {answer.selectedAnswer ? (
                          <FormulaRenderer text={String(answer.selectedAnswer)} className={answer.isCorrect ? 'text-green-700' : 'text-red-700'} />
                        ) : (
                          'Not Answered'
                        )}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-xs break-words">
                      <span className="font-medium text-gray-700">Correct Answer: </span>
                      <span className="text-green-700">
                        <FormulaRenderer text={String(answer.correctAnswer || '')} className="text-green-700" />
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-xs">
                      <span className="font-medium text-gray-700">Marks: </span>
                      <span className={answer.obtainedMarks >= 0 ? 'text-green-700' : 'text-red-700'}>
                        {answer.obtainedMarks >= 0 ? '+' : ''}{answer.obtainedMarks.toFixed(2)}
                      </span>
                      <span className="text-gray-600"> / {answer.marks}</span>
                    </div>
                    
                    {/* AI Explanation Section */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span>💡 AI Explanation</span>
                        {loadingExplanations[answer.questionId] && (
                          <span className="text-[10px] sm:text-xs text-gray-500">Generating...</span>
                        )}
                      </h4>
                      {loadingExplanations[answer.questionId] ? (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
                          <span>Generating explanation...</span>
                        </div>
                      ) : questionExplanations[answer.questionId] ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-gray-700 w-full box-border overflow-hidden">
                          <div 
                            className="max-w-full break-words leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: questionExplanations[answer.questionId] }}
                          />
                        </div>
                      ) : null}
                    </div>

                    {answer.options && answer.options.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-1">Options:</p>
                        <div className="space-y-1">
                          {answer.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`text-[10px] sm:text-xs p-1.5 sm:p-2 rounded break-words ${
                                option === answer.correctAnswer
                                  ? 'bg-green-100 text-green-800'
                                  : option === answer.selectedAnswer && !answer.isCorrect
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              <FormulaRenderer text={String(option || '')} className={`text-[10px] sm:text-xs ${
                                option === answer.correctAnswer
                                  ? 'text-green-800'
                                  : option === answer.selectedAnswer && !answer.isCorrect
                                  ? 'text-red-800'
                                  : 'text-gray-700'
                              }`} />
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
          <Link
            to="/student/tests"
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Browse More Tests</span>
          </Link>
          {testData && (
            <Link
              to={`/student/test-details?id=${testData.id || testData._id}`}
              className="px-4 sm:px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">View Test Details</span>
            </Link>
          )}
        </div>
      </div>
    
  );
};

export default TestResultsPage;

