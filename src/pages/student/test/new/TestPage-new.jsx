import React, { useState, useEffect, useContext } from 'react';
import { Star, Clock, ChevronRight, Award, FileText, Loader, ArrowRight, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { mainContext } from '../../../../context/MainContext';
import { USERENDPOINTS } from '../../../../constants/ApiConstants';
import { mockCategoryStructure, mockTests } from './testMockData';

const TestPlatform = () => {
  const location = useLocation();
  const { token, user } = useContext(mainContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tests, setTests] = useState([]);
  const [categoryStructure, setCategoryStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('All Levels');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategorySections, setShowCategorySections] = useState(true);

  // Determine if we're in student routes or public routes
  const isStudentRoute = location.pathname.startsWith('/student');
  const testDetailsPath = isStudentRoute ? '/student/test-details' : '/test-details';

  // Category mapping: Maps category IDs to possible category values from backend
  const categoryMapping = {
    'neet-tests': ['neet', 'NEET', 'neet-tests', 'NEET Tests', 'Neet'],
    'jee-main-tests': ['jee main', 'JEE Main', 'jee-main', 'jee-main-tests', 'JEE MAIN'],
    'jee-advanced-tests': ['jee advanced', 'JEE Advanced', 'jee-advanced', 'jee-advanced-tests', 'JEE ADVANCED'],
    'aiims-tests': ['aiims', 'AIIMS', 'aiims-tests', 'AIIMS Tests'],
    'upsc-tests': ['upsc', 'UPSC', 'upsc-tests', 'UPSC Tests'],
    'ssc-tests': ['ssc', 'SSC', 'ssc-tests', 'SSC Tests'],
    'banking-tests': ['banking', 'Banking', 'banking-tests', 'Banking Tests'],
    'class-6-tests': ['class 6', 'Class 6', 'class-6', 'class-6-tests'],
    'class-7-tests': ['class 7', 'Class 7', 'class-7', 'class-7-tests'],
    'class-8-tests': ['class 8', 'Class 8', 'class-8', 'class-8-tests'],
    'class-9-tests': ['class 9', 'Class 9', 'class-9', 'class-9-tests'],
    'class-10-tests': ['class 10', 'Class 10', 'class-10', 'class-10-tests'],
    'class-11-science-tests': ['class 11 science', 'Class 11 Science', 'class-11-science', 'class-11-science-tests'],
    'class-12-science-tests': ['class 12 science', 'Class 12 Science', 'class-12-science', 'class-12-science-tests'],
    'class-12-commerce-tests': ['class 12 commerce', 'Class 12 Commerce', 'class-12-commerce', 'class-12-commerce-tests'],
    'verbal-reasoning-tests': ['verbal reasoning', 'Verbal Reasoning', 'verbal-reasoning', 'verbal-reasoning-tests'],
    'non-verbal-tests': ['non-verbal reasoning', 'Non-Verbal Reasoning', 'non-verbal', 'non-verbal-tests'],
    'analytical-tests': ['analytical reasoning', 'Analytical Reasoning', 'analytical', 'analytical-tests'],
    'arithmetic-tests': ['arithmetic', 'Arithmetic', 'arithmetic-tests'],
    'algebra-tests': ['algebra', 'Algebra', 'algebra-tests'],
    'geometry-tests': ['geometry', 'Geometry', 'geometry-tests'],
    'python-tests': ['python', 'Python', 'python-tests'],
    'java-tests': ['java', 'Java', 'java-tests'],
    'javascript-tests': ['javascript', 'JavaScript', 'javascript-tests'],
    'ml-tests': ['machine learning', 'Machine Learning', 'ml', 'ML', 'ml-tests'],
    'statistics-tests': ['statistics', 'Statistics', 'statistics-tests'],
  };

  const featuredCategories = [
    { id: 'neet-tests', label: 'NEET Preparation' },
    { id: 'jee-main-tests', label: 'JEE Main' },
    { id: 'jee-advanced-tests', label: 'JEE Advanced' },
    { id: 'upsc-tests', label: 'UPSC' },
    { id: 'banking-tests', label: 'Banking Exams' },
  ];

  // Normalize category: Convert backend category to category ID
  const normalizeCategory = (backendCategory) => {
    if (!backendCategory) return 'all';
    
    const categoryLower = String(backendCategory).toLowerCase().trim();
    
    // First check exact match
    for (const [categoryId, variations] of Object.entries(categoryMapping)) {
      if (variations.some(v => v.toLowerCase() === categoryLower)) {
        return categoryId;
      }
    }
    
    // Check if category ID matches directly
    if (categoryMapping[categoryLower]) {
      return categoryLower;
    }
    
    // Check if it's a partial match (e.g., "neet" matches "neet-tests")
    for (const [categoryId, variations] of Object.entries(categoryMapping)) {
      if (variations.some(v => categoryLower.includes(v.toLowerCase()) || v.toLowerCase().includes(categoryLower))) {
        return categoryId;
      }
    }
    
    // Return original if no match found
    return categoryLower;
  };

  // Map backend test data to frontend format
  const mapBackendTestToFrontend = (backendTest) => {
    const backendCategory = backendTest.category || 'all';
    const normalizedCategory = normalizeCategory(backendCategory);
    
    return {
      id: backendTest._id || backendTest.id,
      title: backendTest.title || 'Untitled Test',
      description: backendTest.description || '',
      image: backendTest.image || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
      type: backendTest.type || 'Mock Test',
      isPremium: backendTest.price?.discounted < backendTest.price?.actual || false,
      isFree: backendTest.isFree === true || 
              (backendTest.price?.actual === 0 && backendTest.price?.discounted === 0) ||
              (!backendTest.price?.actual && !backendTest.price?.discounted),
      questions: backendTest.numberOfQuestions || 0,
      duration: backendTest.duration || 60,
      rating: backendTest.averageRating || 0,
      attempts: backendTest.enrolledStudents?.length || 0,
      level: backendTest.level || 'Intermediate',
      category: normalizedCategory,
      originalCategory: backendCategory, // Keep original for reference
      subject: backendTest.company || 'General',
      price: backendTest.price || { actual: 999, discounted: 499 },
      features: backendTest.features || [],
      skills: backendTest.skills || [],
      includes: backendTest.includes || [],
    };
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    // Check if user is logged in (check inside function to get latest values)
    const isAuthenticated = !!(token && user && Object.keys(user).length > 0);
    
    try {
      // Try to fetch from backend for all users (authenticated and guest)
      const headers = isAuthenticated 
        ? { Authorization: `Bearer ${token}` }
        : {};
      
      const response = await axios.get(USERENDPOINTS.GETTESTS, { headers });
      
      // Map backend data to frontend format
      const mappedTests = Array.isArray(response.data) 
        ? response.data.map(mapBackendTestToFrontend)
        : [];
      
      setTests(mappedTests.length > 0 ? mappedTests : mockTests);
      
      // Use mock category structure for both guest and authenticated users
      // TODO: Replace with backend API call if category structure is available from backend
      setCategoryStructure(mockCategoryStructure);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tests:', err);
      
      // If backend fails, fallback to mock data for all users
      if (err.response?.status === 401) {
        // Unauthorized - try without auth header for guest access
        try {
          const guestResponse = await axios.get(USERENDPOINTS.GETTESTS);
          const mappedTests = Array.isArray(guestResponse.data) 
            ? guestResponse.data.map(mapBackendTestToFrontend)
            : [];
          setTests(mappedTests.length > 0 ? mappedTests : mockTests);
        } catch (guestErr) {
          // If guest access also fails, use mock data
          setError('Failed to load tests from server. Showing sample tests.');
          setTests(mockTests);
        }
      } else {
        // Other errors - use mock data as fallback
        setError('Failed to load tests from server. Showing sample tests.');
        setTests(mockTests);
      }
      
      setCategoryStructure(mockCategoryStructure);
      setLoading(false);
    }
  };

  const formatAttempts = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${minutes} minutes`;
  };

  const filteredTests = tests.filter(test => {
    // Category filter
    if (selectedCategory !== 'all') {
      // Exact match first
      if (test.category !== selectedCategory) {
        let matchesCategory = false;
 
        if (test.originalCategory) {
          const originalLower = String(test.originalCategory).toLowerCase().trim();
          const selectedLower = String(selectedCategory).toLowerCase().trim();
 
          const categoryVariations = categoryMapping[selectedCategory] || [];
          if (categoryVariations.some(v => v.toLowerCase() === originalLower)) {
            matchesCategory = true;
          }
 
          if (
            !matchesCategory &&
            (originalLower.includes(selectedLower.replace('-tests', '').replace('-', ' ')) ||
              selectedLower.replace('-tests', '').replace('-', ' ').includes(originalLower))
          ) {
            matchesCategory = true;
          }
        }
 
        if (!matchesCategory) {
          return false;
        }
      }
    }
 
    // Subject filter
    if (
      selectedSubject !== 'All Subjects' &&
      String(test.subject || '').toLowerCase() !== selectedSubject.toLowerCase()
    ) {
      return false;
    }
 
    // Level filter
    if (
      selectedLevelFilter !== 'All Levels' &&
      String(test.level || '').toLowerCase() !== selectedLevelFilter.toLowerCase()
    ) {
      return false;
    }
 
    // Price filter
    if (selectedPriceFilter !== 'All') {
      const isFree =
        test.isFree === true ||
        (test.price?.actual === 0 && test.price?.discounted === 0) ||
        (!test.price?.actual && !test.price?.discounted);
 
      if (selectedPriceFilter === 'Free' && !isFree) return false;
      if (selectedPriceFilter === 'Paid' && isFree) return false;
    }
 
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const inTitle = String(test.title || '').toLowerCase().includes(query);
      const inDescription = String(test.description || '').toLowerCase().includes(query);
      const inSubject = String(test.subject || '').toLowerCase().includes(query);
 
      if (!inTitle && !inDescription && !inSubject) {
        return false;
      }
    }
 
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / testsPerPage));
  const startIndex = (currentPage - 1) * testsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + testsPerPage);

  const isDefaultView =
    selectedCategory === 'all' &&
    selectedSubject === 'All Subjects' &&
    selectedLevelFilter === 'All Levels' &&
    selectedPriceFilter === 'All' &&
    !searchQuery.trim();

  const isCategorySectionView = isDefaultView && showCategorySections;

  const testsByCategory = tests.reduce((acc, test) => {
    const cat = test.category || 'others';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(test);
    return acc;
  }, {});

   if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading tests...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full px-4 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Explore Tests
              </h1>
              <p className="text-sm text-gray-500">
                Practice with mock exams and chapter-wise tests.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubject('All Subjects');
                setSelectedLevelFilter('All Levels');
                setSelectedPriceFilter('All');
                setSearchQuery('');
                setCurrentPage(1);
                setShowCategorySections(false);
              }}
              className="self-start md:self-auto inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Filters row */}
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                Find Tests:
              </span>
              <select
                className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Tests</option>
                <option value="neet-tests">NEET Preparation</option>
                <option value="jee-main-tests">JEE Main</option>
                <option value="jee-advanced-tests">JEE Advanced</option>
                <option value="upsc-tests">UPSC</option>
                <option value="banking-tests">Banking</option>
                <option value="python-tests">Python</option>
                <option value="ml-tests">Data Science</option>
              </select>
            </div>
 
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Biology</option>
              <option>Mathematics</option>
              <option>Reasoning</option>
              <option>Programming</option>
              <option>Data Science</option>
              <option>General Studies</option>
            </select>
 
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLevelFilter}
              onChange={(e) => {
                setSelectedLevelFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
 
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPriceFilter}
              onChange={(e) => {
                setSelectedPriceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
 
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search tests..."
                  className="w-full h-9 rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                className="px-4 h-9 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
 
          {/* Count */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <p>
              {isCategorySectionView ? (
                <>Showing {tests.length} tests across categories.</>
              ) : (
                <>
                  Showing {filteredTests.length} test
                  {filteredTests.length !== 1 ? 's' : ''}.
                </>
              )}
            </p>
          </div>
 
          {/* Tests Grid */}
          {isCategorySectionView ? (
            <>
              {featuredCategories.map((cat) => {
                const categoryTests = (testsByCategory[cat.id] || []).slice(0, 5);
                if (!categoryTests.length) return null;

                return (
                  <section key={cat.id} className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                        {cat.label}
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                        className="inline-flex items-center text-[11px] font-medium text-blue-600 hover:text-blue-700"
                      >
                        Show all
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                      {categoryTests.map((test) => {
                        const testWithDefaults = {
                          ...test,
                          price: test.price || { actual: 999, discounted: 499 },
                          features: test.features || [],
                          skills: test.skills || [],
                          includes: test.includes || [],
                        };

                        return (
                          <Link
                            key={test.id}
                            to={`${testDetailsPath}?id=${test.id}`}
                            state={{ test: testWithDefaults }}
                            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col block fade-in-up"
                          >
                            <div className="relative overflow-hidden ">
                              <img
                                src={test.image}
                                alt={test.title}
                                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                              {test.isFree ? (
                                <div className="absolute top-2 left-2">
                                  <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    FREE
                                  </span>
                                </div>
                              ) : test.isPremium && (
                                <div className="absolute top-2 left-2">
                                  <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    Premium
                                  </span>
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md">
                                  {test.type}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 flex flex-col flex-grow">
                              <div className="flex-grow">
                                <h3 className="text-base font-light text-black mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                  {test.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{test.description}</p>
                              </div>

                              <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mb-3 text-xs text-black">
                                <div className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  <span className="font-light">{test.questions}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatDuration(test.duration)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-light">{test.rating}</span>
                                </div>
                              </div>

                              <div className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-blue-700 group-hover:to-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md cursor-pointer transform group-hover:scale-[1.02]">
                                <span className="tracking-wide">View Details</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </>
          ) : filteredTests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm sm:text-base">
                No tests found with the selected filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                {paginatedTests.map(test => {
                  // Ensure test data has all required fields for details page
                  const testWithDefaults = {
                    ...test,
                    price: test.price || { actual: 999, discounted: 499 },
                    features: test.features || [],
                    skills: test.skills || [],
                    includes: test.includes || [],
                  };
                  
                  return (
                    <Link
                      key={test.id}
                      to={`${testDetailsPath}?id=${test.id}`}
                      state={{ test: testWithDefaults }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col block fade-in-up"
                    >
                      {/* Test Image */}
                      <div className="relative overflow-hidden ">
                        <img
                          src={test.image}
                          alt={test.title}
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Badges */}
                        {test.isFree ? (
                          <div className="absolute top-2 left-2">
                            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              FREE
                            </span>
                          </div>
                        ) : test.isPremium && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Premium
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md">
                            {test.type}
                          </span>
                        </div>
                      </div>

                      {/* Test Content */}
                      <div className="p-3 flex flex-col flex-grow">
                        {/* Title & Description */}
                        <div className="flex-grow">
                          <h3 className="text-base font-light text-black mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {test.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{test.description}</p>
                        </div>

                        {/* Test Stats */}
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mb-3 text-xs text-black">
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span className="font-light">{test.questions}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(test.duration)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-light">{test.rating}</span>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <div className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-blue-700 group-hover:to-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md cursor-pointer transform group-hover:scale-[1.02]">
                          <span className="tracking-wide">View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
 
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-xs text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPlatform;