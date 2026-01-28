import React, { useState, useEffect, useContext } from 'react';
import { Star, Users, Clock, ChevronRight, ChevronDown, Award, FileText, Timer, Folder, FolderOpen, BookOpen, Loader, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { mainContext } from '../../../../context/MainContext';
import { USERENDPOINTS } from '../../../../constants/ApiConstants';
import { mockCategoryStructure, mockTests } from './testMockData';

const TestPlatform = () => {
  const location = useLocation();
  const { token, user } = useContext(mainContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({
    allCategories: true
  });
  const [tests, setTests] = useState([]);
  const [categoryStructure, setCategoryStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 8;

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

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleCategoryClick = (item) => {
    if (item.type === 'folder') {
      toggleCategory(item.id);
    } else if (item.type === 'category') {
      setSelectedCategory(item.id);
      setCurrentPage(1);
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

  const renderCategoryTree = (items, level = 0) => {
    return items.map((item) => {
      const isExpanded = expandedCategories[item.id];
      const isSelected = selectedCategory === item.id;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id} className="select-none">
          <button
            onClick={() => handleCategoryClick(item)}
            className={`flex items-center gap-2 w-full text-left py-2 px-2 rounded-md transition-all group ${
              isSelected
                ? 'bg-blue-50 text-blue-700 font-light'
                : 'text-black hover:bg-gray-50'
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
          >
            {hasChildren && (
              <>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-black" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-500" />
                ) : (
                  <Folder className="w-4 h-4 flex-shrink-0 text-black group-hover:text-blue-500" />
                )}
              </>
            )}
            {!hasChildren && (
              <>
                <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-50" />
                <FileText className="w-4 h-4 flex-shrink-0 text-blue-500" />
              </>
            )}
            <span className="text-xs">{item.label}</span>
          </button>
          {hasChildren && isExpanded && (
            <div className="mt-0.5">
              {renderCategoryTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredTests = selectedCategory === 'all'
    ? tests
    : tests.filter(test => {
        // Exact match first
        if (test.category === selectedCategory) {
          return true;
        }
        
        // Also check original category for variations
        if (test.originalCategory) {
          const originalLower = String(test.originalCategory).toLowerCase().trim();
          const selectedLower = String(selectedCategory).toLowerCase().trim();
          
          // Check if selected category matches any variation
          const categoryVariations = categoryMapping[selectedCategory] || [];
          if (categoryVariations.some(v => v.toLowerCase() === originalLower)) {
            return true;
          }
          
          // Partial match check
          if (originalLower.includes(selectedLower.replace('-tests', '').replace('-', ' ')) || 
              selectedLower.replace('-tests', '').replace('-', ' ').includes(originalLower)) {
            return true;
          }
        }
        
        return false;
      });

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / testsPerPage));
  const startIndex = (currentPage - 1) * testsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + testsPerPage);

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
      {/* Hero Section */}
      
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 px-4">
        <div className="w-full">
          <h1 className="text-xl sm:text-xl lg:text-md font-medium mb-1">Test Your Skills</h1>
          <p className="text-xs sm:text-md text-blue-100 font-light max-w-3xl">
          Take practice tests and mock exams to evaluate your knowledge and track your progress..
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow- border border-gray-200 p-4 sticky top-6">
              <h2 className="text-base font-light mb-4 text-black">Categories</h2>

              <div className="space-y-0.5">
                {/* All Categories Folder */}
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <button
                    onClick={() => toggleCategory('allCategories')}
                    className="flex items-center justify-between w-full text-left text-sm font-light text-black hover:text-blue-600 transition-colors py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span className="text-xs">All Categories</span>
                    </div>
                    {expandedCategories.allCategories ? (
                      <ChevronDown className="w-4 h-4 text-black" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-black" />
                    )}
                  </button>

                  {expandedCategories.allCategories && (
                    <div className="mt-1 space-y-0.5">
                      {renderCategoryTree(categoryStructure)}
                    </div>
                  )}
                </div>

                {/* All Tests Button */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center gap-2 w-full text-left py-2 px-2 rounded-md transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-50 text-blue-700 font-light'
                      : 'text-black hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-black" />
                  <span className="text-xs">All Tests</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-sm sm:text-sm font-light text-gray-600">
                Showing {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {filteredTests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No tests found in this category.</p>
              </div>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
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
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col block"
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
    </div>
  );
};

export default TestPlatform;