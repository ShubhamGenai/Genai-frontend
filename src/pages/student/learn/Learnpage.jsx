import React, { useState, useEffect } from 'react';
import { Star, Users, Clock, ChevronRight, ChevronDown, Check, Loader, Folder, FolderOpen } from 'lucide-react';

const LearningPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({
    allCategories: true
  });
  const [courses, setCourses] = useState([]);
  const [categoryStructure, setCategoryStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock category structure with nested folders
      const mockCategoryStructure = [
        {
          id: 'academic',
          label: 'NCERT & School',
          type: 'folder',
          children: [
            {
              id: 'class-6-8',
              label: 'Class 6-8',
              type: 'folder',
              parent: 'academic',
              children: [
                { id: 'class-6', label: 'Class 6', type: 'category', parent: 'class-6-8' },
                { id: 'class-7', label: 'Class 7', type: 'category', parent: 'class-6-8' },
                { id: 'class-8', label: 'Class 8', type: 'category', parent: 'class-6-8' }
              ]
            },
            {
              id: 'class-9-10',
              label: 'Class 9-10',
              type: 'folder',
              parent: 'academic',
              children: [
                { id: 'class-9', label: 'Class 9', type: 'category', parent: 'class-9-10' },
                { id: 'class-10', label: 'Class 10', type: 'category', parent: 'class-9-10' }
              ]
            },
            {
              id: 'class-11-12',
              label: 'Class 11-12',
              type: 'folder',
              parent: 'academic',
              children: [
                { id: 'class-11-science', label: 'Class 11 Science', type: 'category', parent: 'class-11-12' },
                { id: 'class-11-commerce', label: 'Class 11 Commerce', type: 'category', parent: 'class-11-12' },
                { id: 'class-12-science', label: 'Class 12 Science', type: 'category', parent: 'class-11-12' },
                { id: 'class-12-commerce', label: 'Class 12 Commerce', type: 'category', parent: 'class-11-12' }
              ]
            }
          ]
        },
        {
          id: 'competitive',
          label: 'Competitive Exams',
          type: 'folder',
          children: [
            {
              id: 'medical',
              label: 'Medical Entrance',
              type: 'folder',
              parent: 'competitive',
              children: [
                { id: 'neet', label: 'NEET', type: 'category', parent: 'medical' },
                { id: 'aiims', label: 'AIIMS', type: 'category', parent: 'medical' },
                { id: 'jipmer', label: 'JIPMER', type: 'category', parent: 'medical' }
              ]
            },
            {
              id: 'engineering',
              label: 'Engineering Entrance',
              type: 'folder',
              parent: 'competitive',
              children: [
                { id: 'jee-main', label: 'JEE Main', type: 'category', parent: 'engineering' },
                { id: 'jee-advanced', label: 'JEE Advanced', type: 'category', parent: 'engineering' },
                { id: 'bitsat', label: 'BITSAT', type: 'category', parent: 'engineering' }
              ]
            },
            {
              id: 'government',
              label: 'Government Jobs',
              type: 'folder',
              parent: 'competitive',
              children: [
                { id: 'upsc', label: 'UPSC', type: 'category', parent: 'government' },
                { id: 'ssc', label: 'SSC', type: 'category', parent: 'government' },
                { id: 'banking', label: 'Banking', type: 'category', parent: 'government' },
                { id: 'railway', label: 'Railway', type: 'category', parent: 'government' }
              ]
            }
          ]
        },
        {
          id: 'professional',
          label: 'Professional Skills',
          type: 'folder',
          children: [
            {
              id: 'technology',
              label: 'Technology & IT',
              type: 'folder',
              parent: 'professional',
              children: [
                { id: 'web-development', label: 'Web Development', type: 'category', parent: 'technology' },
                { id: 'mobile-development', label: 'Mobile Development', type: 'category', parent: 'technology' },
                { id: 'data-science', label: 'Data Science', type: 'category', parent: 'technology' },
                { id: 'ai-ml', label: 'AI & Machine Learning', type: 'category', parent: 'technology' },
                { id: 'cloud-computing', label: 'Cloud Computing', type: 'category', parent: 'technology' }
              ]
            },
            {
              id: 'business',
              label: 'Business & Marketing',
              type: 'folder',
              parent: 'professional',
              children: [
                { id: 'digital-marketing', label: 'Digital Marketing', type: 'category', parent: 'business' },
                { id: 'social-media', label: 'Social Media Marketing', type: 'category', parent: 'business' },
                { id: 'business-analytics', label: 'Business Analytics', type: 'category', parent: 'business' },
                { id: 'entrepreneurship', label: 'Entrepreneurship', type: 'category', parent: 'business' }
              ]
            },
            {
              id: 'design',
              label: 'Design & Creative',
              type: 'folder',
              parent: 'professional',
              children: [
                { id: 'graphic-design', label: 'Graphic Design', type: 'category', parent: 'design' },
                { id: 'ui-ux', label: 'UI/UX Design', type: 'category', parent: 'design' },
                { id: 'video-editing', label: 'Video Editing', type: 'category', parent: 'design' },
                { id: 'animation', label: 'Animation', type: 'category', parent: 'design' }
              ]
            },
            {
              id: 'finance',
              label: 'Finance & Accounting',
              type: 'folder',
              parent: 'professional',
              children: [
                { id: 'stock-market', label: 'Stock Market', type: 'category', parent: 'finance' },
                { id: 'accounting', label: 'Accounting', type: 'category', parent: 'finance' },
                { id: 'taxation', label: 'Taxation', type: 'category', parent: 'finance' },
                { id: 'financial-planning', label: 'Financial Planning', type: 'category', parent: 'finance' }
              ]
            }
          ]
        }
      ];

      // Mock courses data
      const mockCourses = [
        {
          id: 1,
          title: "NEET 2025 Complete Preparation",
          instructor: "Dr. Rajesh Kumar",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 15400,
          duration: 120,
          price: 4999,
          originalPrice: 9999,
          level: "Intermediate",
          bestseller: true,
          enrolled: true,
          category: "neet"
        },
        {
          id: 2,
          title: "JEE Advanced Mathematics Mastery",
          instructor: "Prof. Amit Singh",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
          rating: 4.9,
          students: 12300,
          duration: 100,
          price: 4499,
          originalPrice: 8999,
          level: "Advanced",
          bestseller: false,
          enrolled: false,
          category: "jee-advanced"
        },
        {
          id: 3,
          title: "Digital Marketing Masterclass 2025",
          instructor: "Priya Sharma",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          rating: 4.7,
          students: 8900,
          duration: 60,
          price: 3999,
          originalPrice: 7999,
          level: "Beginner",
          bestseller: true,
          enrolled: true,
          category: "digital-marketing"
        },
        {
          id: 4,
          title: "Full Stack Web Development Bootcamp",
          instructor: "Arjun Patel",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
          rating: 4.9,
          students: 18200,
          duration: 150,
          price: 5999,
          originalPrice: 12999,
          level: "Intermediate",
          bestseller: true,
          enrolled: false,
          category: "web-development"
        },
        {
          id: 5,
          title: "Data Science with Python Complete Course",
          instructor: "Dr. Meera Reddy",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 14500,
          duration: 130,
          price: 5499,
          originalPrice: 10999,
          level: "Advanced",
          bestseller: false,
          enrolled: true,
          category: "data-science"
        },
        {
          id: 6,
          title: "UPSC Civil Services Complete Preparation",
          instructor: "Vikram Malhotra",
          image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
          rating: 4.7,
          students: 9800,
          duration: 200,
          price: 6999,
          originalPrice: 14999,
          level: "Advanced",
          bestseller: true,
          enrolled: false,
          category: "upsc"
        },
        {
          id: 7,
          title: "Class 10 Science & Mathematics",
          instructor: "Prof. Sanjay Gupta",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 16500,
          duration: 90,
          price: 2999,
          originalPrice: 5999,
          level: "Beginner",
          bestseller: true,
          enrolled: false,
          category: "class-10"
        },
        {
          id: 8,
          title: "Graphic Design Fundamentals",
          instructor: "Sneha Krishnan",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
          rating: 4.6,
          students: 11200,
          duration: 80,
          price: 3499,
          originalPrice: 6999,
          level: "Beginner",
          bestseller: false,
          enrolled: false,
          category: "graphic-design"
        },
        {
          id: 9,
          title: "Stock Market Investing for Beginners",
          instructor: "Rahul Verma",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 13700,
          duration: 110,
          price: 4999,
          originalPrice: 9999,
          level: "Beginner",
          bestseller: true,
          enrolled: true,
          category: "stock-market"
        },
        {
          id: 10,
          title: "UI/UX Design Complete Course",
          instructor: "Ananya Desai",
          image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400&h=300&fit=crop",
          rating: 4.9,
          students: 10500,
          duration: 95,
          price: 4499,
          originalPrice: 8999,
          level: "Intermediate",
          bestseller: false,
          enrolled: false,
          category: "ui-ux"
        },
        {
          id: 11,
          title: "JEE Main Physics Preparation",
          instructor: "Dr. Suresh Patel",
          image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop",
          rating: 4.7,
          students: 11800,
          duration: 85,
          price: 3999,
          originalPrice: 7999,
          level: "Intermediate",
          bestseller: true,
          enrolled: false,
          category: "jee-main"
        },
        {
          id: 12,
          title: "Class 12 Commerce Complete Course",
          instructor: "CA Priya Agarwal",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 9200,
          duration: 100,
          price: 3499,
          originalPrice: 6999,
          level: "Intermediate",
          bestseller: false,
          enrolled: true,
          category: "class-12-commerce"
        }
      ];

      setCourses(mockCourses);
      setCategoryStructure(mockCategoryStructure);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
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

  const formatStudents = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatDuration = (hours) => {
    return `${hours} hours`;
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
            className={`flex items-center gap-2 w-full text-left py-2.5 px- rounded-md transition-all group ${
              isSelected
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            {hasChildren && (
              <>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-500" />
                ) : (
                  <Folder className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-blue-500" />
                )}
              </>
            )}
            {!hasChildren && (
              <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-50" />
            )}
            <span className="text-sm">{item.label}</span>
          </button>
          {hasChildren && isExpanded && (
            <div className="mt-1">
              {renderCategoryTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading courses...</p>
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-medium mb-4">Learn From The Best</h1>
          <p className="text-xs sm:text-xl text-blue-100 font-light max-w-3xl">
            Access world-class courses taught by industry experts. Start learning today and achieve your goals.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Categories</h2>

              <div className="space-y-1">
                {/* All Categories Folder */}
                <div className="border-b pb-3 mb-3">
                  <button
                    onClick={() => toggleCategory('allCategories')}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span>All Categories</span>
                    </div>
                    {expandedCategories.allCategories ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  {expandedCategories.allCategories && (
                    <div className="mt-2 space-y-1">
                      {renderCategoryTree(categoryStructure)}
                    </div>
                  )}
                </div>

                {/* All Courses Button */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center gap-3 w-full text-left py-2.5 px-3 rounded-md transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>All Courses</span>
                </button>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Showing {filteredCourses.length} courses
              </h2>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No courses found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {course.bestseller && (
                          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            Bestseller
                          </span>
                        )}
                        {course.enrolled && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                            <Check className="w-3 h-3" />
                            Enrolled
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title & Instructor */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{formatStudents(course.students)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.duration)}</span>
                        </div>
                      </div>

                      {/* Price & Level */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">₹{course.price}</span>
                          <span className="text-sm text-gray-400 line-through">₹{course.originalPrice}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPlatform;