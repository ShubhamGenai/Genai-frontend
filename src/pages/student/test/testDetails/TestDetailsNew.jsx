import React, { useState, useMemo } from 'react';
import { Clock, FileText, Award, BarChart2, CheckCircle, Star, Users, Target, PlayCircle, ChevronDown, ChevronRight, X, Circle, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_TESTS } from '../mockTestCatalog';

const TestDetailsNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're in student routes or public routes
  const isStudentRoute = location.pathname.startsWith('/student');
  const testTakingPath = isStudentRoute ? '/student/test-taking' : '/test-taking';
  
  // Get test ID from URL query params or navigation state
  const queryParams = new URLSearchParams(location.search);
  const testIdFromQuery = queryParams.get('id');
  const testFromState = location.state?.test;
  
  // Find test from mock data
  const test = useMemo(() => {
    // If test comes from navigation state, merge with mock data to ensure all fields are available
    if (testFromState) {
      const mockTest = MOCK_TESTS.find(t => String(t.id) === String(testFromState.id));
      if (mockTest) {
        // Merge: use state data for basic fields, but use mock data for detailed fields if state doesn't have them
        return {
          ...mockTest,
          // Override with state data for basic fields
          title: testFromState.title || mockTest.title,
          description: testFromState.description || mockTest.description,
          image: testFromState.image || mockTest.image,
          rating: testFromState.rating || mockTest.rating,
          attempts: testFromState.attempts || mockTest.attempts,
          questions: testFromState.questions || testFromState.numberOfQuestions || mockTest.questions || mockTest.numberOfQuestions,
          numberOfQuestions: testFromState.numberOfQuestions || testFromState.questions || mockTest.numberOfQuestions || mockTest.questions,
          duration: testFromState.duration || mockTest.duration,
          durationMinutes: testFromState.durationMinutes || testFromState.duration || mockTest.durationMinutes || mockTest.duration,
          level: testFromState.level || mockTest.level,
          type: testFromState.type || mockTest.type,
          // Keep mock data for detailed fields (testSections, requirements, etc.)
          testSections: testFromState.testSections?.length > 0 ? testFromState.testSections : mockTest.testSections,
          requirements: testFromState.requirements?.length > 0 ? testFromState.requirements : mockTest.requirements,
          instructions: testFromState.instructions ? testFromState.instructions : mockTest.instructions,
          statistics: testFromState.statistics && Object.keys(testFromState.statistics).length > 0 ? testFromState.statistics : mockTest.statistics,
          testFormat: testFromState.testFormat?.length > 0 ? testFromState.testFormat : mockTest.testFormat,
          features: testFromState.features?.length > 0 ? testFromState.features : mockTest.features,
        };
      }
      return testFromState;
    }
    if (testIdFromQuery) {
      return MOCK_TESTS.find(t => String(t.id) === String(testIdFromQuery));
    }
    return null;
  }, [testFromState, testIdFromQuery]);

  const [activeTab, setActiveTab] = useState('Tests');
  const [expandedSections, setExpandedSections] = useState({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // If no test found, show error
  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <p className="text-xl font-light mb-2">Test Not Found</p>
          <p className="text-gray-600 mb-4">The requested test could not be found.</p>
          <p className="text-sm text-gray-500 mb-4">ID: {testIdFromQuery || 'No ID provided'}</p>
          <button 
            onClick={() => navigate('/student/tests')} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Format test data
  const formatted = {
    id: test.id,
    title: test.title || '',
    company: test.company || '',
    subject: test.subject || '',
    duration: `${test.durationMinutes || test.duration || 0} minutes`,
    durationHours: Math.floor((test.durationMinutes || test.duration || 0) / 60),
    questions: test.numberOfQuestions || test.questions || 0,
    level: test.level || 'Beginner',
    type: test.type || 'Mock Test',
    rating: typeof test.rating === 'number' ? test.rating.toFixed(1) : '0.0',
    reviews: test.attempts || 0,
    reviewsCount: test.reviewsCount || test.attempts || 0,
    price: typeof test.price === 'string' ? test.price : (test.price?.discounted ?? (typeof test.price === 'number' ? test.price : 499)),
    originalPrice: typeof test.price === 'object' ? (test.price?.actual ?? 999) : (typeof test.price === 'number' ? test.price : 999),
    discount: test.price?.actual 
      ? `${Math.round(((test.price.actual - (test.price.discounted || test.price)) / test.price.actual) * 100)}% OFF`
      : '0% OFF',
    benefits: test.features || [],
    skills: test.skills || [],
    description: test.description || '',
    includes: test.includes || [
      'Instant results',
      'Detailed solutions',
      'Topic-wise analytics',
      '1 free reattempt',
    ],
    image: test.image || '',
    testFormat: test.testFormat || [],
    isPremium: test.isPremium || false,
    testSections: test.testSections || [],
    requirements: test.requirements || [],
    instructions: test.instructions || { general: [], scoring: {} },
    statistics: test.statistics || {},
  };

  const isFree = useMemo(() => {
    if (typeof formatted.price === 'string') {
      return formatted.price.toString().toLowerCase() === 'free';
    }
    return Number(formatted.price) === 0;
  }, [formatted.price]);

  const discountPercent = useMemo(() => {
    if (isFree) return null;
    const p = Number(formatted.price);
    const o = Number(formatted.originalPrice);
    if (!o || isNaN(p) || isNaN(o) || p >= o) return null;
    return Math.max(0, Math.round(100 - (p / o) * 100));
  }, [formatted.price, formatted.originalPrice, isFree]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 h-12">
            <button 
              onClick={() => setActiveTab('Courses')} 
              className={`relative text-sm font-light ${activeTab === 'Courses' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Courses <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">0 courses</span>
              {activeTab === 'Courses' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('Jobs')} 
              className={`relative text-sm font-light ${activeTab === 'Jobs' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Jobs <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">45 jobs</span>
              {activeTab === 'Jobs' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('Tests')} 
              className={`relative text-sm font-light ${activeTab === 'Tests' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Tests <span className="ml-2 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full align-middle">{MOCK_TESTS.length} tests</span>
              {activeTab === 'Tests' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
          </div>
        </div>
      </div>

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
                  <button type="button" className="absolute inset-0 flex items-center justify-center group" aria-label="Preview Test">
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-md group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-blue-600" />
                    </span>
                  </button>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Preview Questions</div>
                </div>

                <div className="p-4">
                  {formatted.isPremium && (
                    <>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-light">
                          Premium Test
                        </span>
                        {discountPercent != null && (
                          <span className="text-[10px] px-2.5 py-0.5 bg-blue-600 text-white rounded-full">{discountPercent}% OFF</span>
                        )}
                      </div>
                      {(!isFree && Number(formatted.price) > 0) && (
                        <div className="text-sm text-gray-900 mb-2">
                          ₹{formatted.price}
                          {Number(formatted.originalPrice) > Number(formatted.price) && (
                            <span className="text-xs text-gray-500 line-through ml-2">₹{formatted.originalPrice}</span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-2.5">
                        <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-light text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add To Cart
                        </button>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors" onClick={() => setShowPurchaseModal(true)}>
                          Buy Now
                        </button>
                      </div>
                    </>
                  )}
                  
                  {!formatted.isPremium && (
                    <>
                      {!isFree ? (
                        <>
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
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors" onClick={() => setShowPurchaseModal(true)}>
                              Buy Now
                            </button>
                          </div>
                        </>
                      ) : (
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors" onClick={() => navigate(testTakingPath, { state: { test } })}>
                          Start Test
                        </button>
                      )}
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
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700" onClick={() => { window.location.href = '/login'; }}>Sign In</button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700" onClick={() => { window.location.href = '/signup'; }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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

            {/* Requirements */}
            {formatted.requirements.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-light text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {formatted.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Instructions */}
            {(formatted.instructions.general?.length > 0 || Object.keys(formatted.instructions.scoring || {}).length > 0) && (
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

                {Object.keys(formatted.instructions.scoring || {}).length > 0 && (
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
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar - Test Statistics */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {Object.keys(formatted.statistics).length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-base font-light text-gray-900 mb-4">Test Statistics</h3>
                  <div className="space-y-4">
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
                  </div>
                  {(formatted.type?.toLowerCase().includes('mock') || !formatted.isPremium) && (
                    <button 
                      onClick={() => navigate(testTakingPath, { state: { test: test } })}
                      className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-light mt-6"
                    >
                      Start Test
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsNew;


