import React, { useMemo, useState } from 'react';
import { Star, Users, Clock, Layers, PlayCircle, ChevronDown, CheckCircle, User, ShoppingCart } from 'lucide-react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { LEARN_COURSES } from './mockCatalog';

const LearnDetails = () => {
  const [expandedModule, setExpandedModule] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Courses');

  const location = useLocation();
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const queryId = query.get('id');
  const paramsId = params?.id;

  // Prefer course data passed via navigation state (from clicked card)
  const stateCourse = useMemo(() => {
    const s = location.state || {};
    return s.course || s.item || s.data || null;
  }, [location.state]);

  const effectiveId = useMemo(() => {
    // state wins; then query ?id=, then /:id
    return (stateCourse?.id != null && String(stateCourse.id)) || queryId || paramsId || null;
  }, [stateCourse, queryId, paramsId]);

  const selectedCourse = useMemo(() => {
    if (stateCourse) return stateCourse;
    if (effectiveId == null) return null;
    return LEARN_COURSES.find((c) => String(c.id) === String(effectiveId)) || null;
  }, [stateCourse, effectiveId]);

  const courseDetails = selectedCourse;

  const modules = useMemo(() => {
    return (selectedCourse?.modules || []).map((m, idx) => ({
      id: m?.id || m?._id || idx,
      title: m?.title || m?.name || `Module ${idx + 1}`,
      lessons: Array.isArray(m?.lessons) ? m.lessons.length : (m?.lessonCount || 0),
      content: Array.isArray(m?.lessons)
        ? m.lessons.map((l) => l?.title || l?.name || 'Lesson')
        : [],
    }));
  }, [selectedCourse]);

  const averageRating = useMemo(() => {
    const ratings = courseDetails?.ratings || [];
    if (!ratings.length) return '0.0';
    const avg = ratings.reduce((sum, r) => sum + (r?.rating || 0), 0) / ratings.length;
    return avg.toFixed(1);
  }, [courseDetails]);

  const totalReviews = courseDetails?.ratings?.length || 0;
  const enrolledCount = Array.isArray(courseDetails?.enrolledStudents)
    ? courseDetails.enrolledStudents.length
    : (courseDetails?.enrolledStudents || 0);
  const level = courseDetails?.level || 'Beginner';
  const duration = courseDetails?.duration || '—';

  const priceActual = courseDetails?.price?.actual;
  const priceDiscounted = courseDetails?.price?.discounted ?? priceActual;
  const discountPercent = useMemo(() => {
    if (!priceActual || priceDiscounted == null) return null;
    if (priceDiscounted >= priceActual) return null;
    return Math.max(0, Math.round(100 - (priceDiscounted / priceActual) * 100));
  }, [priceActual, priceDiscounted]);

  const isFreeCourse = useMemo(() => {
    if (typeof priceDiscounted === 'number') return priceDiscounted === 0;
    if (typeof priceActual === 'number') return priceActual === 0;
    const text = (courseDetails?.priceText || '').toString().toLowerCase();
    return text.includes('free');
  }, [priceDiscounted, priceActual, courseDetails]);

  const learningBullets = courseDetails?.features || [];
  const whoShouldTake = courseDetails?.learningOutcomes || [];
  const includesList = courseDetails?.includes || [
    'Certificate of Completion – Verified proof of your skills',
    'AI-Powered Quizzes – Smart assessments to track progress',
    'Downloadable Resources – Templates, datasets, and study materials',
    'Lifetime Access – Learn at your own pace, anytime',
  ];

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  if (!courseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-sm p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Course not found</h1>
          <p className="text-sm text-gray-600">The requested course could not be found. Please go back and select a course card.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 h-12">
            <button
              onClick={() => setActiveTab('Courses')}
              className={`relative text-sm font-light ${activeTab === 'Courses' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Courses
              <span className="ml-2 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full align-middle">{LEARN_COURSES.length} courses</span>
              {activeTab === 'Courses' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button
              onClick={() => setActiveTab('Jobs')}
              className={`relative text-sm font-light ${activeTab === 'Jobs' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Jobs
              <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">45 jobs</span>
              {activeTab === 'Jobs' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
            <button
              onClick={() => setActiveTab('Tests')}
              className={`relative text-sm font-light ${activeTab === 'Tests' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              Tests
              <span className="ml-2 text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full align-middle">28 tests</span>
              {activeTab === 'Tests' && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{courseDetails?.category || 'Course'}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-light mb-4">{courseDetails?.title || courseDetails?.name || 'Course Title'}</h1>
              <p className="text-sm lg:text-base text-blue-100 mb-4 leading-relaxed">
                {courseDetails?.description || courseDetails?.subtitle || '—'}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 items-center text-xs lg:text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="font-light">{averageRating}</span>
                  <span>({totalReviews} rated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-light">{enrolledCount} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-light">{courseDetails?.duration || courseDetails?.time || '—'}</span>
                </div>
                <div className="bg-white/20 text-white px-2 py-1 rounded text-[10px] lg:text-xs font-light">
                  {level}
                </div>
              </div>

              {/* Compact learn + includes inside blue */}
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div>
                    <h3 className="text-sm font-light text-white mb-2">What you'll learn</h3>
                    <div className="space-y-2">
                      {(learningBullets.slice(0, 6).length ? learningBullets.slice(0, 6) : ['Key concepts', 'Hands-on practice', 'Projects', 'Quizzes']).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-blue-100 leading-5">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-light text-white mb-2">This course includes</h3>
                    <div className="space-y-2">
                      {includesList.slice(0, 4).map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-blue-100 leading-5">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Video/Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 md:top-20 bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <img 
                    src={courseDetails?.imageUrl || courseDetails?.image || courseDetails?.thumbnail} 
                    alt="Course Preview" 
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center group"
                    onClick={() => setShowPurchaseModal(true)}
                    aria-label="Preview Course"
                  >
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-md group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-blue-600" />
                    </span>
                  </button>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Preview Course
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-lg font-light text-gray-900">
                    {priceDiscounted != null ? `₹${priceDiscounted}` : (courseDetails?.priceText || '—')}{' '}
                    {priceActual && priceDiscounted != null && priceDiscounted < priceActual && (
                      <span className="text-xs text-gray-500 line-through ml-2">₹{priceActual}</span>
                    )}
                    </div>
                    {!isFreeCourse && discountPercent != null && (
                      <span className="text-[10px] px-2.5 py-0.5 bg-blue-600 text-white rounded-full">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  {isFreeCourse ? (
                    <div className="flex flex-col gap-2.5">
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors"
                        onClick={() => navigate(`/learn/course/${effectiveId || ''}`)}
                      >
                        Go To Course
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <button
                        className="w-full bg-white text-gray-900 py-2 rounded-lg font-light text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2"
                        onClick={() => {
                          // Placeholder add-to-cart handler
                          console.log('Added to cart', courseDetails?.id);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add To Cart
                      </button>
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-light text-sm hover:bg-blue-700 transition-colors"
                        onClick={() => setShowPurchaseModal(true)}
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Course Curriculum */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-light text-gray-900">Course Curriculum</h2>
                <span className="text-sm text-gray-500">
                  {modules.length} modules • {modules.reduce((a, m) => a + (m.lessons || 0), 0)} lessons
                </span>
              </div>
              
              <div className="space-y-2">
                {modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-light text-gray-900">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{module.lessons} lessons</span>
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            expandedModule === module.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </button>
                    
                    {expandedModule === module.id && (
                      <div className="px-4 pb-4">
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                          {module.content.map((lesson, index) => (
                            <div key={index} className="flex items-center gap-3 py-2 text-sm text-gray-600">
                              <PlayCircle className="w-4 h-4 text-gray-400" />
                              <span>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-light text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {(courseDetails?.requirements || [
                  'No prior experience required',
                  'Basic knowledge of Excel recommended but not mandatory',
                ]).map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who should take this course */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-light text-gray-900 mb-4">Who should take this course?</h2>
              <ul className="space-y-2">
                {(whoShouldTake.length ? whoShouldTake : [
                  'Anyone interested in this subject',
                  'Students & professionals looking for career growth',
                  'Entrepreneurs & business owners wanting data-driven strategies',
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-900">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Reviews */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-light text-gray-900 mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {(courseDetails?.ratings || []).slice(0, 2).map((r, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.round(r?.rating || 0) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="font-light text-gray-900">{r?.user?.name || 'Student'}</span>
                      {r?.date && <span className="text-sm text-gray-500">{new Date(r.date).toDateString()}</span>}
                    </div>
                    <p className="text-sm text-gray-700">{r?.comment || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              
              {/* Instructor */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-base font-light text-gray-900 mb-4">Instructor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-light text-gray-900">{courseDetails?.instructor?.name || 'Instructor'}</div>
                    <div className="text-xs text-gray-500">{courseDetails?.instructor?.title || 'Expert'}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-light text-gray-900">{averageRating}</div>
                    <div className="text-gray-500">Instructor Rating</div>
                  </div>
                  <div>
                    <div className="font-light text-gray-900">{enrolledCount}</div>
                    <div className="text-gray-500">Students</div>
                  </div>
                  <div>
                    <div className="font-light text-gray-900">{courseDetails?.instructor?.coursesCount || 0}</div>
                    <div className="text-gray-500">Courses</div>
                  </div>
                </div>
              </div>

              {/* More Courses - placeholder */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <h3 className="text-base font-light text-gray-900 p-6 pb-4">More from this category</h3>
                <div className="relative">
                  <img 
                    src={courseDetails?.imageUrl || courseDetails?.image || courseDetails?.thumbnail} 
                    alt="Related Course" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-light text-gray-900 text-sm mb-1">{courseDetails?.title || courseDetails?.name || 'Course'}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{averageRating}</span>
                    <span>{duration}</span>
                  </div>
                </div>
              </div>

              {/* Additional Course */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'} 
                    alt="Related Course" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Premium
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 text-sm">Advanced Analytics</h4>
                </div>
              </div>
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
            <p className="text-sm text-gray-600 mb-4">
              Please log in to purchase this course. Already have an account? Sign in or create a new account to continue.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowPurchaseModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                onClick={() => { window.location.href = '/login'; }}
              >
                Sign In
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                onClick={() => { window.location.href = '/signup'; }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnDetails;