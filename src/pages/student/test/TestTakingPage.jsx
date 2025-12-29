import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flag, ChevronLeft, ChevronRight, Maximize, Minimize, Trophy, Flame, Clock, Pause, ArrowRight, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mainContext } from '../../../context/MainContext';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { MOCK_TESTS } from './mockTestCatalog';
import FormulaRenderer from '../../../component/contentManagerComponents/FormulaRenderer';

const TestTakingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(mainContext);
  
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Map backend quiz questions to frontend format
  const mapQuizQuestionsToFrontend = (quizzes) => {
    const allQuestions = [];
    let questionIndex = 1;
    
    quizzes.forEach((quiz, quizIndex) => {
      if (quiz.questions && Array.isArray(quiz.questions)) {
        quiz.questions.forEach((q) => {
          allQuestions.push({
            id: q._id || q.id || questionIndex,
            question: q.questionText || q.question || '',
            questionText: q.questionText || q.question || '',
            options: Array.isArray(q.options) ? q.options : [],
            subject: quiz.title || 'General',
            difficulty: 'Medium', // Default difficulty
            correctAnswer: q.answer || '',
            marks: q.marks || 1,
            quizId: quiz._id || quiz.id,
            quizTitle: quiz.title || quiz.name || '',
            imageUrl: q.imageUrl || '' // Include image URL for question diagrams
          });
          questionIndex++;
        });
      }
    });
    
    return allQuestions;
  };

  // Fetch test data and quizzes from backend
  useEffect(() => {
    const fetchTestData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get test ID from state or URL
        const testId = location.state?.testId || 
                      location.state?.test?.id || 
                      location.state?.test?._id ||
                      new URLSearchParams(location.search).get('id');
        
        if (!testId) {
          // Fallback to mock data if no test ID
          const mockTest = location.state?.test || MOCK_TESTS[0];
          if (mockTest) {
            setTest(mockTest);
            const totalQuestions = mockTest.questions || mockTest.numberOfQuestions || 180;
            const durationMinutes = mockTest.durationMinutes || mockTest.duration || 180;
            setTimeLeft(durationMinutes * 60);
            // Generate mock questions
            const mockQuestions = generateMockQuestions(mockTest, totalQuestions);
            setQuestions(mockQuestions);
            setLoading(false);
            return;
          }
          setError('Test ID not provided');
          setLoading(false);
          return;
        }

        // Check if user is authenticated
        const isAuthenticated = !!(user && token && Object.keys(user).length > 0);
        const headers = isAuthenticated ? { Authorization: `Bearer ${token}` } : {};

        // Fetch test details
        try {
          const testResponse = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${testId}`, { headers });
          const testData = testResponse.data.test || testResponse.data;
          setTest(testData);

          const durationMinutes = testData.duration || 180;
          setTimeLeft(durationMinutes * 60);

          // Fetch quizzes if test has quiz IDs
          if (testData.quizzes && testData.quizzes.length > 0) {
            const quizIds = testData.quizzes.map(q => {
              if (typeof q === 'object' && q !== null) {
                return q._id || q.id || q;
              }
              return q;
            }).filter(id => id);

            if (quizIds.length > 0) {
              try {
                const quizResponse = await axios.post(USERENDPOINTS.GET_QUIZ, 
                  { ids: quizIds },
                  { headers }
                );
                
                const quizzes = Array.isArray(quizResponse.data) ? quizResponse.data : [];
                const mappedQuestions = mapQuizQuestionsToFrontend(quizzes);
                
                if (mappedQuestions.length > 0) {
                  setQuestions(mappedQuestions);
                } else {
                  // If no questions from quizzes, generate mock questions
                  const totalQuestions = testData.numberOfQuestions || 180;
                  const mockQuestions = generateMockQuestions(testData, totalQuestions);
                  setQuestions(mockQuestions);
                }
              } catch (quizError) {
                console.error('Error fetching quizzes:', quizError);
                // If 401, try without auth
                if (quizError.response?.status === 401 && isAuthenticated) {
                  try {
                    const guestQuizResponse = await axios.post(USERENDPOINTS.GET_QUIZ, 
                      { ids: quizIds }
                    );
                    const quizzes = Array.isArray(guestQuizResponse.data) ? guestQuizResponse.data : [];
                    const mappedQuestions = mapQuizQuestionsToFrontend(quizzes);
                    setQuestions(mappedQuestions.length > 0 ? mappedQuestions : generateMockQuestions(testData, testData.numberOfQuestions || 180));
                  } catch (guestQuizError) {
                    console.error('Error fetching quizzes as guest:', guestQuizError);
                    const totalQuestions = testData.numberOfQuestions || 180;
                    setQuestions(generateMockQuestions(testData, totalQuestions));
                  }
                } else {
                  const totalQuestions = testData.numberOfQuestions || 180;
                  setQuestions(generateMockQuestions(testData, totalQuestions));
                }
              }
            } else {
              const totalQuestions = testData.numberOfQuestions || 180;
              setQuestions(generateMockQuestions(testData, totalQuestions));
            }
          } else {
            // No quizzes, generate mock questions
            const totalQuestions = testData.numberOfQuestions || 180;
            setQuestions(generateMockQuestions(testData, totalQuestions));
          }
        } catch (apiError) {
          console.error('Error fetching test:', apiError);
          
          // If 401 and authenticated, try without auth
          if (apiError.response?.status === 401 && isAuthenticated) {
            try {
              const guestResponse = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${testId}`);
              const testData = guestResponse.data.test || guestResponse.data;
              setTest(testData);
              const durationMinutes = testData.duration || 180;
              setTimeLeft(durationMinutes * 60);
              const totalQuestions = testData.numberOfQuestions || 180;
              setQuestions(generateMockQuestions(testData, totalQuestions));
            } catch (guestError) {
              console.error('Error fetching test as guest:', guestError);
              // Fallback to mock data
              const mockTest = location.state?.test || MOCK_TESTS.find(t => String(t.id) === String(testId)) || MOCK_TESTS[0];
              setTest(mockTest);
              const totalQuestions = mockTest.questions || mockTest.numberOfQuestions || 180;
              const durationMinutes = mockTest.durationMinutes || mockTest.duration || 180;
              setTimeLeft(durationMinutes * 60);
              setQuestions(generateMockQuestions(mockTest, totalQuestions));
            }
          } else {
            // Fallback to mock data
            const mockTest = location.state?.test || MOCK_TESTS.find(t => String(t.id) === String(testId)) || MOCK_TESTS[0];
            setTest(mockTest);
            const totalQuestions = mockTest.questions || mockTest.numberOfQuestions || 180;
            const durationMinutes = mockTest.durationMinutes || mockTest.duration || 180;
            setTimeLeft(durationMinutes * 60);
            setQuestions(generateMockQuestions(mockTest, totalQuestions));
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load test data');
        // Fallback to mock data
        const mockTest = location.state?.test || MOCK_TESTS[0];
        setTest(mockTest);
        const totalQuestions = mockTest.questions || mockTest.numberOfQuestions || 180;
        const durationMinutes = mockTest.durationMinutes || mockTest.duration || 180;
        setTimeLeft(durationMinutes * 60);
        setQuestions(generateMockQuestions(mockTest, totalQuestions));
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [location.state, location.search, user, token]);

  // Generate mock questions as fallback
  const generateMockQuestions = (testData, questionCount) => {
    if (!testData) return [];
    
    const questions = [];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const subjects = testData.testSections?.map(s => s.subject) || [testData.subject || testData.company || 'General'];
    
    for (let i = 0; i < questionCount; i++) {
      const subject = subjects[i % subjects.length];
      const difficulty = difficulties[i % 3];
      
      questions.push({
        id: i + 1,
        question: `Question ${i + 1}: Which of the following statements about ${subject} is correct?`,
        questionText: `Question ${i + 1}: Which of the following statements about ${subject} is correct?`,
        options: [
          `Option A: This is the first possible answer to the question`,
          `Option B: This is the second possible answer to the question`,
          `Option C: This is the third possible answer to the question`,
          `Option D: This is the fourth possible answer to the question`
        ],
        subject: subject,
        difficulty: difficulty,
        correctAnswer: 0
      });
    }
    return questions;
  };

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if browser is in fullscreen mode
  useEffect(() => {
    const checkFullscreen = () => {
      const isFull = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );
      setIsFullscreen(isFull);
    };

    // Check fullscreen status on mount
    checkFullscreen();

    // Listen for fullscreen changes
    const events = ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'mozfullscreenchange'];
    events.forEach(event => {
      document.addEventListener(event, checkFullscreen);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, checkFullscreen);
      });
    };
  }, []);

  // Enter fullscreen function
  const enterFullscreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        // Safari
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        await element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        await element.mozRequestFullScreen();
      }
    } catch (error) {
      console.log('Fullscreen error:', error);
      // User may have denied fullscreen request or browser doesn't support it
    }
  };

  // Exit fullscreen function
  const exitFullscreen = () => {
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
    } catch (error) {
      console.log('Exit fullscreen error:', error);
    }
  };

  // Try to enter fullscreen automatically (may require user interaction in some browsers)
  useEffect(() => {
    // Try to enter fullscreen after a short delay
    const timer = setTimeout(() => {
      if (!isFullscreen) {
        enterFullscreen().catch(() => {
          // Silently fail if automatic fullscreen is not allowed
        });
      }
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  // Exit fullscreen when component unmounts
  useEffect(() => {
    return () => {
      exitFullscreen();
    };
  }, []);

  // Handle submit function
  const handleSubmitTest = React.useCallback(async () => {
    if (!window.confirm('Are you sure you want to submit the test? You cannot change your answers after submission.')) {
      return;
    }

    try {
      const testId = test?._id || test?.id || location.state?.testId;
      const startTime = new Date().getTime() - (timeLeft * 1000); // Approximate start time
      const endTime = new Date().getTime();
      const duration = Math.floor((endTime - startTime) / 1000); // Duration in seconds

      // If user is authenticated, submit to backend
      if (token && user && testId) {
        try {
          const response = await axios.post(
            USERENDPOINTS.SUBMIT_TEST,
            {
              testId,
              answers: selectedAnswers,
              questions,
              startTime: new Date(startTime),
              endTime: new Date(endTime),
              duration: `${Math.floor(duration / 60)}m ${duration % 60}s`,
              markedQuestions: Array.from(markedQuestions)
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          if (response.data.success) {
            // Navigate to results page with backend data
            navigate('/student/test-results', {
              state: {
                test,
                answers: selectedAnswers,
                questions,
                submissionData: response.data
              }
            });
          } else {
            throw new Error('Submission failed');
          }
        } catch (submitError) {
          console.error('Error submitting to backend:', submitError);
          // Fallback to client-side calculation
          navigate('/student/test-results', {
            state: { test, answers: selectedAnswers, questions }
          });
        }
      } else {
        // Not authenticated, calculate results client-side
        navigate('/student/test-results', {
          state: { test, answers: selectedAnswers, questions }
        });
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Error submitting test. Showing results...');
      // Still navigate to results page
      navigate('/student/test-results', {
        state: { test, answers: selectedAnswers, questions }
      });
    }
  }, [test, selectedAnswers, questions, markedQuestions, timeLeft, token, user, navigate, location.state]);

  // Timer countdown
  useEffect(() => {
    if (isPaused || timeLeft <= 0 || !test) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Will handle submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, test]); // Removed timeLeft from dependencies to prevent recreation

  // Auto submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && test && questions.length > 0) {
      handleSubmitTest();
    }
  }, [timeLeft, test, questions.length, handleSubmitTest]);

  // Update answered count
  useEffect(() => {
    const answered = Object.values(selectedAnswers).filter(v => v !== null && v !== undefined).length;
    setAnsweredCount(answered);
  }, [selectedAnswers]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    // Don't allow selection when paused
    if (isPaused) {
      alert('Test is paused. Please resume the test to continue.');
      return;
    }
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleMarkForReview = () => {
    if (isPaused) {
      alert('Test is paused. Please resume the test to mark questions.');
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
      } else {
        newSet.add(currentQuestion.id);
      }
      return newSet;
    });
  };

  const handleClearResponse = () => {
    if (isPaused) {
      alert('Test is paused. Please resume the test to clear responses.');
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers(prev => {
      const newSet = { ...prev };
      delete newSet[currentQuestion.id];
      return newSet;
    });
  };

  const goToQuestion = (index) => {
    if (isPaused) {
      alert('Test is paused. Please resume the test to navigate between questions.');
      return;
    }
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToNext = () => {
    if (isPaused) {
      alert('Test is paused. Please resume the test to continue.');
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (isPaused) {
      alert('Test is paused. Please resume the test to continue.');
      return;
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestionStatus = (index) => {
    const question = questions[index];
    if (!question) return 'not-visited';
    
    const isAnswered = selectedAnswers[question.id] !== null && selectedAnswers[question.id] !== undefined;
    const isMarked = markedQuestions.has(question.id);

    if (isAnswered && isMarked) return 'marked-answered';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    return 'not-visited';
  };

  const handlePause = () => {
    setIsPaused(prev => {
      if (!prev) {
        // Pausing - show confirmation
        if (window.confirm('Test will be paused. Timer will stop. Continue?')) {
          return true;
        }
        return false;
      } else {
        // Resuming - enter fullscreen again
        enterFullscreen().catch(() => {
          // Silently fail if fullscreen is not allowed
        });
        return false;
      }
    });
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be saved.')) {
      navigate(-1);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && (!test || questions.length === 0)) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Show loading if questions not initialized
  if (!test || questions.length === 0) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Preparing test questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>Question not found</p>
        </div>
      </div>
    );
  }

  // Calculate test properties
  const totalQuestions = questions.length || test?.questions || test?.numberOfQuestions || 180;
  const durationMinutes = test?.durationMinutes || test?.duration || 180;
  const testTitle = test?.title || 'Test';
  const testSubject = test?.subject || test?.company || 'General';

  const progress = ((answeredCount / totalQuestions) * 100).toFixed(1);
  const notVisitedCount = totalQuestions - Object.keys(selectedAnswers).filter(k => selectedAnswers[k] !== null && selectedAnswers[k] !== undefined).length - markedQuestions.size;

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-white border-b flex-shrink-0">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo and Test Title */}
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="GenAI Logo" className="h-8 w-auto" />
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-700">{testTitle}</span>
            </div>

            {/* Right Side - Controls and Info */}
            <div className="flex items-center gap-3">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>0</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  <Flame className="w-3.5 h-3.5" />
                  <span>0</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePause}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors border ${
                    isPaused 
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100' 
                      : 'text-gray-700 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleExit}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Exit</span>
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b flex-shrink-0">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-700">Progress: {answeredCount}/{totalQuestions} questions</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 font-medium">{progress}%</span>
              <button
                onClick={() => isFullscreen ? exitFullscreen() : enterFullscreen()}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
          {/* Left Sidebar - Question Palette */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Question Palette</h3>
              
              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2 mb-6 flex-1 overflow-y-auto">
                {questions.map((question, index) => {
                  const status = getQuestionStatus(index);
                  let buttonClasses = "w-full py-2 text-xs rounded border transition-colors";

                  if (currentQuestionIndex === index) {
                    buttonClasses += " bg-blue-600 text-white border-blue-600 font-semibold";
                  } else if (status === 'answered') {
                    buttonClasses += " bg-green-100 text-green-800 border-green-300";
                  } else if (status === 'marked') {
                    buttonClasses += " bg-yellow-100 text-yellow-800 border-yellow-300";
                  } else if (status === 'marked-answered') {
                    buttonClasses += " bg-green-200 text-green-900 border-green-400";
                  } else {
                    buttonClasses += " bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
                  }

                  return (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      disabled={isPaused}
                      className={`${buttonClasses} ${isPaused ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={isPaused ? 'Test is paused. Resume to navigate.' : ''}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-gray-700">Answered</span>
                  </div>
                  <span className="font-medium text-gray-900">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span className="text-gray-700">Marked</span>
                  </div>
                  <span className="font-medium text-gray-900">{markedQuestions.size}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span className="text-gray-700">Not Visited</span>
                  </div>
                  <span className="font-medium text-gray-900">{notVisitedCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full overflow-y-auto">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-700">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <span className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-medium">
                  {currentQuestion.subject || currentQuestion.quizTitle || testSubject}
                </span>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <div className="text-base text-gray-900 leading-relaxed">
                  <FormulaRenderer text={currentQuestion.questionText || currentQuestion.question || 'Question text not available'} className="text-gray-900" />
                </div>
              </div>

              {/* Question Image if available */}
              {currentQuestion.imageUrl && currentQuestion.imageUrl.trim() !== '' && (
                <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 p-4">
                  <img
                    src={currentQuestion.imageUrl}
                    alt={`Question ${currentQuestionIndex + 1} diagram`}
                    className="max-w-full max-h-64 object-contain rounded mx-auto"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', currentQuestion.imageUrl);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  
                  return (
                    <div
                      key={idx}
                      onClick={() => !isPaused && handleOptionSelect(currentQuestion.id, idx)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        isPaused 
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50 cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                      }`}
                      title={isPaused ? 'Test is paused. Resume to select options.' : ''}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          checked={isSelected}
                          onChange={() => !isPaused && handleOptionSelect(currentQuestion.id, idx)}
                          disabled={isPaused}
                          className="mt-1 w-4 h-4 text-blue-600"
                        />
                        <span className="flex-1 text-sm text-gray-700">
                          <span className="font-medium mr-2">Option {optionLetters[idx]}:</span>
                          <FormulaRenderer text={option || ''} className="text-gray-700" />
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMarkForReview}
                    disabled={isPaused}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isPaused
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : markedQuestions.has(currentQuestion.id)
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-300'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    title={isPaused ? 'Test is paused. Resume to mark questions.' : ''}
                  >
                    <Flag className="w-4 h-4" />
                    <span>Mark for Review</span>
                  </button>
                  <button
                    onClick={handleClearResponse}
                    disabled={isPaused}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      isPaused
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    title={isPaused ? 'Test is paused. Resume to clear responses.' : ''}
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrev}
                    disabled={currentQuestionIndex === 0 || isPaused}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentQuestionIndex === 0 || isPaused
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    title={isPaused ? 'Test is paused. Resume to navigate.' : ''}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentQuestionIndex === totalQuestions - 1 || isPaused}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentQuestionIndex === totalQuestions - 1 || isPaused
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    title={isPaused ? 'Test is paused. Resume to continue.' : ''}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTakingPage;

