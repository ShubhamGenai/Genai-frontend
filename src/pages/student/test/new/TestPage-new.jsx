import React, { useState, useEffect } from 'react';
import { Star, Users, Clock, ChevronRight, ChevronDown, Award, FileText, Timer, Folder, FolderOpen, BookOpen, Loader } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TestPlatform = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({
    allCategories: true
  });
  const [tests, setTests] = useState([]);
  const [categoryStructure, setCategoryStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine if we're in student routes or public routes
  const isStudentRoute = location.pathname.startsWith('/student');
  const testDetailsPath = isStudentRoute ? '/student/test-details' : '/test-details';

  // Simulate API fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock category structure for tests
      const mockCategoryStructure = [
        {
          id: 'ncert-school',
          label: 'NCERT & School',
          type: 'folder',
          children: [
            {
              id: 'class-6-8-tests',
              label: 'Class 6-8',
              type: 'folder',
              parent: 'ncert-school',
              children: [
                { id: 'class-6-tests', label: 'Class 6 Tests', type: 'category', parent: 'class-6-8-tests' },
                { id: 'class-7-tests', label: 'Class 7 Tests', type: 'category', parent: 'class-6-8-tests' },
                { id: 'class-8-tests', label: 'Class 8 Tests', type: 'category', parent: 'class-6-8-tests' }
              ]
            },
            {
              id: 'class-9-10-tests',
              label: 'Class 9-10',
              type: 'folder',
              parent: 'ncert-school',
              children: [
                { id: 'class-9-tests', label: 'Class 9 Tests', type: 'category', parent: 'class-9-10-tests' },
                { id: 'class-10-tests', label: 'Class 10 Tests', type: 'category', parent: 'class-9-10-tests' }
              ]
            },
            {
              id: 'class-11-12-tests',
              label: 'Class 11-12',
              type: 'folder',
              parent: 'ncert-school',
              children: [
                { id: 'class-11-science-tests', label: 'Class 11 Science', type: 'category', parent: 'class-11-12-tests' },
                { id: 'class-12-science-tests', label: 'Class 12 Science', type: 'category', parent: 'class-11-12-tests' },
                { id: 'class-12-commerce-tests', label: 'Class 12 Commerce', type: 'category', parent: 'class-11-12-tests' }
              ]
            }
          ]
        },
        {
          id: 'competitive-exams',
          label: 'Competitive Exams',
          type: 'folder',
          children: [
            {
              id: 'medical-entrance-tests',
              label: 'Medical Entrance',
              type: 'folder',
              parent: 'competitive-exams',
              children: [
                { id: 'neet-tests', label: 'NEET Tests', type: 'category', parent: 'medical-entrance-tests' },
                { id: 'aiims-tests', label: 'AIIMS Tests', type: 'category', parent: 'medical-entrance-tests' }
              ]
            },
            {
              id: 'engineering-entrance-tests',
              label: 'Engineering Entrance',
              type: 'folder',
              parent: 'competitive-exams',
              children: [
                { id: 'jee-main-tests', label: 'JEE Main Tests', type: 'category', parent: 'engineering-entrance-tests' },
                { id: 'jee-advanced-tests', label: 'JEE Advanced Tests', type: 'category', parent: 'engineering-entrance-tests' }
              ]
            },
            {
              id: 'government-job-tests',
              label: 'Government Jobs',
              type: 'folder',
              parent: 'competitive-exams',
              children: [
                { id: 'upsc-tests', label: 'UPSC Tests', type: 'category', parent: 'government-job-tests' },
                { id: 'ssc-tests', label: 'SSC Tests', type: 'category', parent: 'government-job-tests' },
                { id: 'banking-tests', label: 'Banking Tests', type: 'category', parent: 'government-job-tests' }
              ]
            }
          ]
        },
        {
          id: 'aptitude-reason',
          label: 'Aptitude & Reasoning',
          type: 'folder',
          children: [
            {
              id: 'logical-reasoning-tests',
              label: 'Logical Reasoning',
              type: 'folder',
              parent: 'aptitude-reason',
              children: [
                { id: 'verbal-reasoning-tests', label: 'Verbal Reasoning', type: 'category', parent: 'logical-reasoning-tests' },
                { id: 'non-verbal-tests', label: 'Non-Verbal Reasoning', type: 'category', parent: 'logical-reasoning-tests' },
                { id: 'analytical-tests', label: 'Analytical Reasoning', type: 'category', parent: 'logical-reasoning-tests' }
              ]
            },
            {
              id: 'quantitative-tests',
              label: 'Quantitative Aptitude',
              type: 'folder',
              parent: 'aptitude-reason',
              children: [
                { id: 'arithmetic-tests', label: 'Arithmetic Tests', type: 'category', parent: 'quantitative-tests' },
                { id: 'algebra-tests', label: 'Algebra Tests', type: 'category', parent: 'quantitative-tests' },
                { id: 'geometry-tests', label: 'Geometry Tests', type: 'category', parent: 'quantitative-tests' }
              ]
            }
          ]
        },
        {
          id: 'technical-skills',
          label: 'Technical Skills',
          type: 'folder',
          children: [
            {
              id: 'programming-tests',
              label: 'Programming',
              type: 'folder',
              parent: 'technical-skills',
              children: [
                { id: 'python-tests', label: 'Python Tests', type: 'category', parent: 'programming-tests' },
                { id: 'java-tests', label: 'Java Tests', type: 'category', parent: 'programming-tests' },
                { id: 'javascript-tests', label: 'JavaScript Tests', type: 'category', parent: 'programming-tests' }
              ]
            },
            {
              id: 'data-science-tests',
              label: 'Data Science',
              type: 'folder',
              parent: 'technical-skills',
              children: [
                { id: 'ml-tests', label: 'Machine Learning', type: 'category', parent: 'data-science-tests' },
                { id: 'statistics-tests', label: 'Statistics Tests', type: 'category', parent: 'data-science-tests' }
              ]
            }
          ]
        }
      ];

      // Mock tests data
      const mockTests = [
        {
          id: 1,
          title: "Class 12 Physics Board Exam Mock",
          description: "Complete board exam pattern mock test for Class 12 Physics",
          image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop",
          type: "Mock Test",
          isPremium: true,
          questions: 60,
          duration: 120, // in minutes
          rating: 4.7,
          attempts: 12400,
          level: "Intermediate",
          category: "class-12-science-tests",
          subject: "Physics"
        },
        {
          id: 2,
          title: "NEET Biology Chapter Test",
          description: "Comprehensive test covering all NEET Biology chapters",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
          type: "Chapter Test",
          isPremium: false,
          questions: 45,
          duration: 90,
          rating: 4.8,
          attempts: 18200,
          level: "Advanced",
          category: "neet-tests",
          subject: "Biology"
        },
        {
          id: 3,
          title: "JEE Main Mathematics Practice",
          description: "High-quality practice test for JEE Main Mathematics",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
          type: "Practice Test",
          isPremium: true,
          questions: 30,
          duration: 75,
          rating: 4.9,
          attempts: 15600,
          level: "Advanced",
          category: "jee-main-tests",
          subject: "Mathematics"
        },
        {
          id: 4,
          title: "Logical Reasoning Aptitude Test",
          description: "Comprehensive logical reasoning test for competitive exams",
          image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
          type: "Aptitude Test",
          isPremium: false,
          questions: 50,
          duration: 60,
          rating: 4.6,
          attempts: 9800,
          level: "Beginner",
          category: "verbal-reasoning-tests",
          subject: "Reasoning"
        },
        {
          id: 5,
          title: "Python Programming Assessment",
          description: "Test your Python programming skills with real-world problems",
          image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
          type: "Skill Test",
          isPremium: true,
          questions: 25,
          duration: 90,
          rating: 4.8,
          attempts: 7200,
          level: "Intermediate",
          category: "python-tests",
          subject: "Programming"
        },
        {
          id: 6,
          title: "Class 10 Science Mock Test",
          description: "Board exam pattern mock test for Class 10 Science",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
          type: "Mock Test",
          isPremium: false,
          questions: 40,
          duration: 180,
          rating: 4.7,
          attempts: 11500,
          level: "Beginner",
          category: "class-10-tests",
          subject: "Science"
        },
        {
          id: 7,
          title: "UPSC Prelims General Studies",
          description: "Complete UPSC Prelims pattern test with current affairs",
          image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
          type: "Prelims Test",
          isPremium: true,
          questions: 100,
          duration: 120,
          rating: 4.9,
          attempts: 8900,
          level: "Advanced",
          category: "upsc-tests",
          subject: "General Studies"
        },
        {
          id: 8,
          title: "Quantitative Aptitude Challenge",
          description: "Test your mathematical and analytical skills",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
          type: "Challenge Test",
          isPremium: false,
          questions: 35,
          duration: 45,
          rating: 4.5,
          attempts: 13200,
          level: "Intermediate",
          category: "arithmetic-tests",
          subject: "Mathematics"
        },
        {
          id: 9,
          title: "Data Science Fundamentals Quiz",
          description: "Test your understanding of data science concepts",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          type: "Quiz",
          isPremium: true,
          questions: 20,
          duration: 30,
          rating: 4.8,
          attempts: 5400,
          level: "Advanced",
          category: "ml-tests",
          subject: "Data Science"
        },
        {
          id: 10,
          title: "Banking Exam Preparation Test",
          description: "Complete banking exam preparation with all sections",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
          type: "Prep Test",
          isPremium: false,
          questions: 80,
          duration: 150,
          rating: 4.6,
          attempts: 16700,
          level: "Intermediate",
          category: "banking-tests",
          subject: "Banking"
        }
      ];

      setTests(mockTests);
      setCategoryStructure(mockCategoryStructure);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tests. Please try again later.');
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
    : tests.filter(test => test.category === selectedCategory);

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredTests.map(test => {
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
                        {test.isPremium && (
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

                        {/* Attempts & Level */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-black text-xs">
                            <Users className="w-3 h-3" />
                            <span>{formatAttempts(test.attempts)} attempts</span>
                          </div>
                          <span className="bg-gray-50 text-black px-2 py-0.5 rounded-md text-xs font-light border border-gray-200">
                            {test.level}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlatform;