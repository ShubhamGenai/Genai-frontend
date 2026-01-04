import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Clock, FileText, Award, BarChart2, CheckCircle, Star, Users, Target, PlayCircle, ChevronDown, ChevronRight, X, Circle, ShoppingCart, Loader } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MOCK_TESTS } from '../../mockTestCatalog';
import TopTabs from '../../../../../component/baseComponents/TopTabs';
import { mainContext } from '../../../../../context/MainContext';
import axios from 'axios';
import { USERENDPOINTS } from '../../../../../constants/ApiConstants';
import FormulaRenderer from '../../../../../component/contentManagerComponents/FormulaRenderer';

const TestDetailsNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(mainContext);
  
  // Determine if we're in student routes or public routes
  const isStudentRoute = location.pathname.startsWith('/student');
  const testTakingPath = isStudentRoute ? '/student/test-taking' : '/test-taking';
  
  // Get test ID from URL query params or navigation state
  const queryParams = new URLSearchParams(location.search);
  const testIdFromQuery = queryParams.get('id');
  const testFromState = location.state?.test;
  
  const [test, setTest] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Tests');
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedQuizzes, setExpandedQuizzes] = useState({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Map backend test data to frontend format
  const mapBackendTestToFrontend = (backendTest) => {
    return {
      _id: backendTest._id,
      id: backendTest._id || backendTest.id,
      title: backendTest.title || '',
      company: backendTest.company || '',
      description: backendTest.description || '',
      duration: backendTest.duration || 0,
      durationMinutes: backendTest.duration || 0,
      numberOfQuestions: backendTest.numberOfQuestions || 0,
      questions: backendTest.numberOfQuestions || 0,
      level: backendTest.level || 'Beginner',
      type: backendTest.type || 'Mock Test',
      price: backendTest.price || { actual: 0, discounted: 0 },
      image: backendTest.image || 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png',
      features: backendTest.features || [],
      skills: backendTest.skills || [],
      certificate: backendTest.certificate || false,
      averageRating: backendTest.averageRating || 0,
      totalReviews: backendTest.totalReviews || 0,
      enrolledStudents: backendTest.enrolledStudents || [],
      quizzes: backendTest.quizzes || [],
      passingScore: backendTest.passingScore || 0,
      totalMarks: backendTest.totalMarks || 0,
      testSections: backendTest.testSections || [],
      requirements: backendTest.requirements && backendTest.requirements.length > 0 
        ? backendTest.requirements 
        : [
            'Stable internet connection required',
            'Quiet environment for taking the test',
            'Device with updated browser',
            'Sufficient time to complete the test'
          ],
      prerequisites: backendTest.prerequisites && backendTest.prerequisites.length > 0
        ? backendTest.prerequisites
        : [
            'Basic understanding of the subject matter',
            'Familiarity with the test format'
          ],
      instructions: backendTest.instructions && (
        backendTest.instructions.general?.length > 0 || 
        Object.keys(backendTest.instructions.scoring || {}).length > 0
      ) ? backendTest.instructions : {
        general: [
          'Read each question carefully before answering',
          'Manage your time effectively throughout the test',
          'Review your answers before submitting',
          'Do not refresh or close the browser during the test',
          'Ensure a stable internet connection'
        ],
        scoring: {
          correct: '+1 mark',
          incorrect: '-0.25 marks',
          unanswered: '0 marks'
        }
      },
      statistics: backendTest.statistics || {},
      includes: backendTest.includes || [],
      isPremium: backendTest.price?.actual > 0 || backendTest.price?.discounted > 0 || false,
    };
  };

  // Map backend quiz data to frontend format
  const mapBackendQuizToFrontend = (backendQuiz) => {
    return {
      _id: backendQuiz._id,
      id: backendQuiz._id || backendQuiz.id,
      title: backendQuiz.title || backendQuiz.name || 'Untitled Quiz',
      name: backendQuiz.name || backendQuiz.title || 'Untitled Quiz',
      description: backendQuiz.description || '',
      questions: Array.isArray(backendQuiz.questions) 
        ? backendQuiz.questions.map(q => ({
            _id: q._id || q.id,
            id: q._id || q.id,
            questionText: q.questionText || q.question || '',
            question: q.question || q.questionText || '',
            options: Array.isArray(q.options) ? q.options : [],
            answer: q.answer || '',
            marks: q.marks || 1,
            type: q.type || 'multiple-choice',
          }))
        : [],
      duration: backendQuiz.duration || 0,
      totalMarks: backendQuiz.totalMarks || 0,
    };
  };

  // Fetch test details and quizzes from backend
  useEffect(() => {
    const fetchTestDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const testId = testIdFromQuery || testFromState?.id || testFromState?._id;
        
        if (!testId) {
          // If no test ID, try to use mock data from state
          const mockTest = testFromState || (testIdFromQuery ? MOCK_TESTS.find(t => String(t.id) === String(testIdFromQuery)) : null);
          if (mockTest) {
            setTest(mockTest);
            setLoading(false);
            return;
          }
          setError('Test ID not provided');
          setLoading(false);
          return;
        }

        // Check if user is authenticated
        const isAuthenticated = !!(user && token && Object.keys(user).length > 0);
        
        // Try to fetch from backend for all users (authenticated and guest)
        try {
          const headers = isAuthenticated 
            ? { Authorization: `Bearer ${token}` }
            : {};
          
          const response = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${testId}`, { headers });
          
          const testData = response.data.test || response.data;
          
          // Map backend test data to frontend format
          const mappedTest = mapBackendTestToFrontend(testData);
          setTest(mappedTest);

          // Fetch quizzes if test has quiz IDs
          if (testData.quizzes && testData.quizzes.length > 0) {
            const quizIds = testData.quizzes.map(q => {
              if (typeof q === 'object' && q !== null) {
                return q._id || q.id || q;
              }
              return q;
            }).filter(id => id); // Filter out null/undefined
            
            if (quizIds.length > 0) {
              try {
                const quizHeaders = isAuthenticated 
                  ? { Authorization: `Bearer ${token}` }
                  : {};
                
                const quizResponse = await axios.post(USERENDPOINTS.GET_QUIZ, 
                  { ids: quizIds },
                  { headers: quizHeaders }
                );
                
                // Map backend quizzes to frontend format
                const mappedQuizzes = Array.isArray(quizResponse.data) 
                  ? quizResponse.data.map(mapBackendQuizToFrontend)
                  : [];
                setQuizzes(mappedQuizzes);
              } catch (quizError) {
                console.error('Error fetching quizzes:', quizError);
                // Continue without quizzes - try without auth if 401
                if (quizError.response?.status === 401 && isAuthenticated) {
                  try {
                    const guestQuizResponse = await axios.post(USERENDPOINTS.GET_QUIZ, 
                      { ids: quizIds }
                    );
                    const mappedQuizzes = Array.isArray(guestQuizResponse.data) 
                      ? guestQuizResponse.data.map(mapBackendQuizToFrontend)
                      : [];
                    setQuizzes(mappedQuizzes);
                  } catch (guestQuizError) {
                    console.error('Error fetching quizzes as guest:', guestQuizError);
                    setQuizzes([]);
                  }
                } else {
                  setQuizzes([]);
                }
              }
            } else {
              setQuizzes([]);
            }
          } else {
            setQuizzes([]);
          }
        } catch (apiError) {
          console.error('Error fetching test:', apiError);
          
          // If 401 and authenticated, try without auth header
          if (apiError.response?.status === 401 && isAuthenticated) {
            try {
              const guestResponse = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${testId}`);
              const testData = guestResponse.data.test || guestResponse.data;
              const mappedTest = mapBackendTestToFrontend(testData);
              setTest(mappedTest);
              setQuizzes([]); // Don't fetch quizzes for guest
            } catch (guestError) {
              console.error('Error fetching test as guest:', guestError);
              // Fallback to mock data
              const mockTest = testFromState || MOCK_TESTS.find(t => String(t.id) === String(testId));
              if (mockTest) {
                setTest(mockTest);
              } else {
                setError('Failed to load test details');
              }
            }
          } else {
            // Fallback to mock data if API fails
            const mockTest = testFromState || MOCK_TESTS.find(t => String(t.id) === String(testId));
            if (mockTest) {
              setTest(mockTest);
            } else {
              setError('Failed to load test details');
            }
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load test details');
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [testIdFromQuery, testFromState, user, token]);

  const tabsData = [
    { id: 'Courses', label: 'Courses', count: 0, countLabel: 'courses', path: isStudentRoute ? '/student/learn' : '/learn' },
    { id: 'Jobs', label: 'Jobs', count: 45, countLabel: 'jobs', path: isStudentRoute ? '/student/jobs' : '/jobs' },
    { id: 'Tests', label: 'Tests', count: MOCK_TESTS.length, countLabel: 'tests', path: isStudentRoute ? '/student/tests' : '/tests' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleQuiz = (quizId) => {
    setExpandedQuizzes(prev => ({
      ...prev,
      [quizId]: !prev[quizId]
    }));
  };

  // Format test data - map backend response to frontend format
  // MUST be called before any early returns (Rules of Hooks)
  const formatted = useMemo(() => {
    if (!test) return {};
    
    const testId = test._id || test.id;
    const testDuration = test.durationMinutes || test.duration || 0;
    const totalQuestions = test.numberOfQuestions || test.questions || 0;
    const priceObj = typeof test.price === 'object' ? test.price : { actual: 0, discounted: 0 };
    const discountedPrice = priceObj.discounted ?? (typeof test.price === 'number' ? test.price : 0);
    const actualPrice = priceObj.actual ?? (typeof test.price === 'number' ? test.price : 0);
    
    return {
      id: testId,
      title: test.title || '',
      company: test.company || '',
      subject: test.subject || test.subjectName || test.company || '',
      duration: `${testDuration} minutes`,
      durationHours: Math.floor(testDuration / 60),
      durationMinutes: testDuration,
      questions: totalQuestions,
      numberOfQuestions: totalQuestions,
      level: test.level || 'Beginner',
      type: test.type || test.testType || 'Mock Test',
      rating: typeof test.averageRating === 'number' 
        ? test.averageRating.toFixed(1) 
        : (typeof test.rating === 'number' ? test.rating.toFixed(1) : '0.0'),
      reviews: test.enrolledStudents?.length || test.totalAttempts || test.attempts || 0,
      reviewsCount: test.totalReviews || test.reviewsCount || test.enrolledStudents?.length || 0,
      price: discountedPrice,
      originalPrice: actualPrice,
      discount: actualPrice > 0 && actualPrice > discountedPrice
        ? `${Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)}% OFF`
        : '0% OFF',
      benefits: test.features || [],
      skills: test.skills || [],
      description: test.description || '',
      includes: test.certificate 
        ? ['Certificate on completion', ...(test.includes || [])] 
        : (test.includes || [
            'Instant results',
            'Detailed solutions',
            'Topic-wise analytics',
            '1 free reattempt',
          ]),
      image: test.image || 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png',
      testFormat: test.testFormat || [],
      isPremium: actualPrice > 0 || discountedPrice > 0 || test.isPremium || false,
      testSections: test.testSections || [],
      requirements: test.requirements && test.requirements.length > 0
        ? test.requirements
        : [
            'Stable internet connection required',
            'Quiet environment for taking the test',
            'Device with updated browser',
            'Sufficient time to complete the test'
          ],
      prerequisites: test.prerequisites && test.prerequisites.length > 0
        ? test.prerequisites
        : [
            'Basic understanding of the subject matter',
            'Familiarity with the test format'
          ],
      instructions: test.instructions && (
        test.instructions.general?.length > 0 || 
        Object.keys(test.instructions.scoring || {}).length > 0
      ) ? test.instructions : {
        general: [
          'Read each question carefully before answering',
          'Manage your time effectively throughout the test',
          'Review your answers before submitting',
          'Do not refresh or close the browser during the test',
          'Ensure a stable internet connection'
        ],
        scoring: {
          correct: '+1 mark',
          incorrect: '-0.25 marks',
          unanswered: '0 marks'
        }
      },
      statistics: test.statistics || {},
      passingScore: test.passingScore || 0,
      totalMarks: (() => {
        // Calculate total marks from all quizzes and their questions
        if (quizzes && quizzes.length > 0) {
          const calculatedMarks = quizzes.reduce((total, quiz) => {
            if (quiz.questions && Array.isArray(quiz.questions)) {
              const quizMarks = quiz.questions.reduce((sum, question) => {
                return sum + (Number(question.marks) || 1);
              }, 0);
              return total + quizMarks;
            }
            // If quiz has totalMarks, use that
            if (quiz.totalMarks) {
              return total + Number(quiz.totalMarks);
            }
            return total;
          }, 0);
          return calculatedMarks > 0 ? calculatedMarks : (test.totalMarks || 0);
        }
        return test.totalMarks || 0;
      })(),
      quizzes: quizzes || [],
      quizIds: test.quizzes || []
    };
  }, [test, quizzes]);

  const isFree = useMemo(() => {
    if (!formatted || !formatted.price) return false;
    if (typeof formatted.price === 'string') {
      return formatted.price.toString().toLowerCase() === 'free';
    }
    return Number(formatted.price) === 0;
  }, [formatted]);

  // Check if test is enrolled/purchased
  useEffect(() => {
    if (test && user && (user.id || user._id)) {
      const userId = user.id || user._id;
      const userIdStr = String(userId);
      
      // Check if user ID is in enrolledStudents array
      const enrolled = test.enrolledStudents && Array.isArray(test.enrolledStudents) 
        ? test.enrolledStudents.some(studentId => {
            // Handle different formats: ObjectId, string, or object with _id/id
            let studentIdStr;
            if (typeof studentId === 'object' && studentId !== null) {
              studentIdStr = String(studentId._id || studentId.id || studentId);
            } else {
              studentIdStr = String(studentId);
            }
            return studentIdStr === userIdStr;
          })
        : false;
      
      setIsEnrolled(enrolled);
    } else {
      setIsEnrolled(false);
    }
  }, [test, user]);

  const discountPercent = useMemo(() => {
    if (!formatted || isFree) return null;
    const p = Number(formatted.price);
    const o = Number(formatted.originalPrice);
    if (!o || isNaN(p) || isNaN(o) || p >= o) return null;
    return Math.max(0, Math.round(100 - (p / o) * 100));
  }, [formatted, isFree]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Handle Buy Now with Razorpay
  const handleBuyNow = async () => {
    try {
      if (!token || !user) {
        setShowPurchaseModal(true);
        return;
      }

      if (!test || !formatted.id) {
        toast.error('Test information not available');
        return;
      }

      // Create Razorpay order
      const { data } = await axios.post(
        USERENDPOINTS.CREATE_PAYMENT,
        { testId: formatted.id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { order, paymentId } = data;

      // Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'GenAI Platform',
        description: `Payment for Test: ${formatted.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyBody = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId,
            };

            const verifyRes = await axios.post(
              USERENDPOINTS.VERIFY_PAYMENT,
              verifyBody,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            if (verifyRes.data.success) {
              toast.success('Payment successful! Test enrolled ✅');
              // Update enrollment status immediately
              setIsEnrolled(true);
              // Refresh test data to show enrollment status
              const testId = formatted.id;
              try {
                const response = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${testId}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                const testData = response.data.test || response.data;
                const mappedTest = mapBackendTestToFrontend(testData);
                setTest(mappedTest);
              } catch (err) {
                console.error('Error refreshing test data:', err);
              }
            } else {
              toast.error('Payment verification failed ❌');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
    }
  };

  // Loading state - must be after all hooks
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test details...</p>
        </div>
      </div>
    );
  }

  // Error state - must be after all hooks
  if (error || !test) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <p className="text-xl font-light mb-2">Test Not Found</p>
          <p className="text-gray-600 mb-4">{error || 'The requested test could not be found.'}</p>
          <p className="text-sm text-gray-500 mb-4">ID: {testIdFromQuery || 'No ID provided'}</p>
          <button 
            onClick={() => navigate(isStudentRoute ? '/student/tests' : '/tests')} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopTabs tabs={tabsData} activeTabId={activeTab} onTabClick={handleTabClick} />
      {/* Hero */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-2">
                <span className="text-xs font-light bg-black/30 px-3 py-1 rounded-full">{formatted.type}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-light mb-2">{formatted.title}</h1>
              <p className="text-blue-100 text-sm lg:text-base mb-4">{formatted.description}</p>

              {/* Statistics Row */}
              <div className="flex flex-wrap gap-6 items-center text-xs mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="font-light">{formatted.rating}</span>
                  <span className="text-blue-100">({formatted.reviewsCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-blue-100">{formatted.reviews.toLocaleString()} attempts</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-light">{formatted.questions} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-light">{formatted.durationHours} hours</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-400 px-4 py-1.5 rounded-lg text-sm font-light transition-colors">
                  {formatted.level}
                </button>
              </div>

              {/* Compact lists */}
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div>
                    <h3 className="text-xs font-light text-white mb-3">What you'll get</h3>
                    <div className="space-y-2">
                      {(formatted.benefits.length > 0 
                        ? formatted.benefits.slice(0, 4) 
                        : ['Instant results & analysis', 'Detailed solutions', 'Performance insights', 'Peer comparison']).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-blue-100 leading-4">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-light text-white mb-3">Test format</h3>
                    <div className="space-y-2">
                      {(formatted.testFormat.length > 0 
                        ? formatted.testFormat 
                        : ['Timed test with auto-submit', 'Multiple choice questions', 'Negative marking: -0.25', 'Certificate on 75%+ score']).slice(0, 4).map((format, idx) => {
                        let Icon = Clock;
                        if (format.toLowerCase().includes('multiple choice')) Icon = Target;
                        if (format.toLowerCase().includes('negative') || format.toLowerCase().includes('marking')) Icon = BarChart2;
                        if (format.toLowerCase().includes('certificate')) Icon = Award;
                        
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <Icon className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-[11px] text-blue-100 leading-4">{format}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Premium Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 md:top-20 bg-white rounded-xl overflow-hidden shadow-lg">
                {/* Preview Image with play */}
                <div className="relative">
                  <img src={formatted.image} alt={formatted.title} className="w-full h-48 object-cover" />
                  <button type="button" className="absolute inset-0 flex items-center justify-center group" aria-label="Preview Test"
                  onClick={handleBuyNow}
                  >
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-md group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-blue-600" />
                    </span>
                  </button>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Preview Questions</div>
                </div>

                <div className="p-4">
                  {(isFree || isEnrolled) ? (
                    // Free Test or Enrolled Test - Show only "Take Test" button
                    <button 
                      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors"
                      onClick={() => navigate(testTakingPath, { 
                        state: { 
                          test: test,
                          quizzes: formatted.quizzes,
                          testId: formatted.id
                        } 
                      })}
                    >
                      Take Test
                    </button>
                  ) : (
                    // Paid Test - Show price, Add to Cart, and Buy Now buttons
                    <>
                      {formatted.isPremium && (
                        <div className="mb-2">
                          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-light">
                            Premium Test
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-light text-gray-900">
                          ₹{formatted.price}
                          {Number(formatted.originalPrice) > Number(formatted.price) && (
                            <span className="text-xs text-gray-500 line-through ml-2">₹{formatted.originalPrice}</span>
                          )}
                        </div>
                        {discountPercent != null && (
                          <span className="text-[10px] px-2.5 py-0.5 bg-blue-600 text-white rounded-full">{discountPercent}% OFF</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-light text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add To Cart
                        </button>
                        <button 
                          className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors"
                          onClick={handleBuyNow}
                        >
                          Buy Now
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
      {/* Purchase/Login Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPurchaseModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-base font-light text-gray-900 mb-2">Login Required</h3>
            <p className="text-sm text-gray-600 mb-4">Please log in to purchase this test. Already have an account? Sign in or create a new account to continue.</p>
            <div className="flex items-center justify-end gap-3">
              <button className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowPurchaseModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                onClick={() => {
                  navigate('/login', {
                    state: {
                      from: location.pathname,
                      itemId: test.id,
                      itemType: 'test'
                    }
                  });
                }}
              >
                Sign In
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                onClick={() => {
                  navigate('/signup', {
                    state: {
                      from: location.pathname,
                      itemId: test.id,
                      itemType: 'test'
                    }
                  });
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RazorPay Payment Modal - Removed as payment is handled directly */}
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quizzes Section */}
            {formatted.quizzes && formatted.quizzes.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-light text-gray-900">Test Quizzes</h2>
                  <span className="text-xs text-gray-500">
                    {formatted.quizzes.length} quiz{formatted.quizzes.length !== 1 ? 'zes' : ''}
                  </span>
                </div>
                <div className="space-y-2">
                  {formatted.quizzes && formatted.quizzes.length > 0 ? (
                    formatted.quizzes.map((quiz, index) => {
                      const quizId = quiz._id || quiz.id || `quiz-${index}`;
                      const isExpanded = expandedQuizzes[quizId];
                      const quizQuestions = Array.isArray(quiz.questions) ? quiz.questions : [];
                      const quizTitle = quiz.title || quiz.name || `Quiz ${index + 1}`;
                      
                      return (
                        <div key={quizId} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleQuiz(quizId)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="font-light text-gray-900">{quizTitle}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">
                                {quizQuestions.length} question{quizQuestions.length !== 1 ? 's' : ''}
                              </span>
                              <ChevronDown 
                                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </button>
                          {isExpanded && quizQuestions.length > 0 && (
                            <div className="px-4 pb-4">
                              <div className="space-y-3 pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-600 font-medium">Questions:</p>
                                {quizQuestions.map((question, qIdx) => {
                                  const questionText = question.questionText || question.question || 'Question text not available';
                                  const questionOptions = Array.isArray(question.options) ? question.options : [];
                                  const questionId = question._id || question.id || qIdx;
                                  
                                  return (
                                    <div key={questionId} className="bg-gray-50 rounded p-3">
                                      <p className="text-xs text-gray-700 mb-2">
                                        <span className="font-medium">Q{qIdx + 1}:</span>{' '}
                                        <FormulaRenderer text={questionText} className="text-xs text-gray-700" />
                                      </p>
                                      {questionOptions.length > 0 && (
                                        <div className="ml-4 space-y-1">
                                          {questionOptions.map((option, optIdx) => (
                                            <div key={optIdx} className="text-xs text-gray-600">
                                              {String.fromCharCode(65 + optIdx)}.{' '}
                                              <FormulaRenderer text={String(option)} className="text-xs text-gray-600" />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No quizzes available for this test.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Test Sections */}
            {formatted.testSections.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-light text-gray-900">Test Sections</h2>
                  <span className="text-xs text-gray-500">
                    {formatted.testSections.length} sections • {formatted.testSections.reduce((sum, s) => sum + (s.questions || 0), 0)} questions
                  </span>
                </div>
                <div className="space-y-2">
                  {formatted.testSections.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-light text-gray-900">{section.subject} - {section.topic}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{section.questions} questions • {section.duration} min</span>
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                              expandedSections[index] ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </button>
                      {expandedSections[index] && section.topicsCovered && section.topicsCovered.length > 0 && (
                        <div className="px-4 pb-4">
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            {section.topicsCovered.map((topic, idx) => (
                              <div key={idx} className="flex items-center gap-3 py-2 text-xs text-gray-600">
                                <span className="text-blue-600">•</span>
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What you'll get - Two Columns */}
            {formatted.benefits.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-light text-gray-900 mb-4">What you'll get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {formatted.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {formatted.benefits.slice(4, 8).map((benefit, idx) => (
                      <div key={idx + 4} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requirements & Prerequisites */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-light text-gray-900 mb-4">Requirements & Prerequisites</h2>
              <ul className="space-y-2">
                {formatted.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
              {formatted.prerequisites && formatted.prerequisites.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-base font-light text-gray-800 mb-3">Prerequisites</h3>
                  <ul className="space-y-2">
                    {formatted.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm text-gray-700">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Test Instructions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-light text-gray-900 mb-4">Test Instructions</h2>
              
              <div className="mb-6">
                <h3 className="text-base font-light text-gray-800 mb-3">General Instructions</h3>
                <ul className="space-y-2">
                  {formatted.instructions.general.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-light text-gray-800 mb-3">Scoring System</h3>
                <div className="space-y-3">
                  {formatted.instructions.scoring.correct && (
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Correct answer:</span>
                      </div>
                      <span className="font-light text-green-600">{formatted.instructions.scoring.correct}</span>
                    </div>
                  )}
                  {formatted.instructions.scoring.incorrect && (
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-600" />
                        <span>Incorrect answer:</span>
                      </div>
                      <span className="font-light text-red-600">{formatted.instructions.scoring.incorrect}</span>
                    </div>
                  )}
                  {formatted.instructions.scoring.unanswered && (
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-gray-500" />
                        <span>Unanswered:</span>
                      </div>
                      <span className="font-light text-gray-600">{formatted.instructions.scoring.unanswered}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Test Statistics */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-base font-light text-gray-900 mb-4">Test Statistics</h3>
                <div className="space-y-4">
                  {formatted.passingScore > 0 && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Passing Score</div>
                      <div className="text-xl font-light text-gray-900">{formatted.passingScore} marks</div>
                    </div>
                  )}
                  {formatted.totalMarks > 0 && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Total Marks</div>
                      <div className="text-xl font-light text-gray-900">{formatted.totalMarks}</div>
                    </div>
                  )}
                  {formatted.statistics.averageScore !== undefined && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Average Score</div>
                      <div className="text-xl font-light text-gray-900">{formatted.statistics.averageScore}%</div>
                    </div>
                  )}
                  {formatted.statistics.passPercentage !== undefined && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Pass Percentage</div>
                      <div className="text-xl font-light text-gray-900">{formatted.statistics.passPercentage}%</div>
                    </div>
                  )}
                  {formatted.statistics.avgTimeTaken && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Avg. Time Taken</div>
                      <div className="text-xl font-light text-gray-900">{formatted.statistics.avgTimeTaken}</div>
                    </div>
                  )}
                  {formatted.statistics.highestScore !== undefined && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Highest Score</div>
                      <div className="text-xl font-light text-gray-900">{formatted.statistics.highestScore}%</div>
                    </div>
                  )}
                  {formatted.quizzes && formatted.quizzes.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Total Quizzes</div>
                      <div className="text-xl font-light text-gray-900">{formatted.quizzes.length}</div>
                    </div>
                  )}
                </div>
                {(isFree || isEnrolled) ? (
                  <button 
                    onClick={() => navigate(testTakingPath, { 
                      state: { 
                        test: test,
                        quizzes: formatted.quizzes,
                        testId: formatted.id
                      } 
                    })}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-light mt-6"
                  >
                    Take Test
                  </button>
                ) : (
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-light mt-6"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsNew;


