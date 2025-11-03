import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ChevronRight, ChevronDown, Check, Loader, Folder, FolderOpen, Book } from 'lucide-react';

const LearningPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
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
      
      // Simplified category structure - only 2 levels (folders and categories)
      const mockCategoryStructure = [
        {
          id: 'academic',
          label: 'NCERT & School',
          type: 'folder',
          children: [
            { id: 'class-11', label: 'Class 11', type: 'category', parent: 'academic' },
            { id: 'class-12', label: 'Class 12', type: 'category', parent: 'academic' },
            { id: 'class-10', label: 'Class 10', type: 'category', parent: 'academic' },
            { id: 'class-9', label: 'Class 9', type: 'category', parent: 'academic' }
          ]
        },
        {
          id: 'competitive',
          label: 'Competitive Exams',
          type: 'folder',
          children: [
            { id: 'neet', label: 'NEET', type: 'category', parent: 'competitive' },
            { id: 'jee-main', label: 'JEE Main', type: 'category', parent: 'competitive' },
            { id: 'jee-advanced', label: 'JEE Advanced', type: 'category', parent: 'competitive' },
            { id: 'upsc', label: 'UPSC', type: 'category', parent: 'competitive' }
          ]
        },
        {
          id: 'professional',
          label: 'Professional Skills',
          type: 'folder',
          children: [
            { id: 'web-development', label: 'Web Development', type: 'category', parent: 'professional' },
            { id: 'data-science', label: 'Data Science', type: 'category', parent: 'professional' },
            { id: 'digital-marketing', label: 'Digital Marketing', type: 'category', parent: 'professional' },
            { id: 'graphic-design', label: 'Graphic Design', type: 'category', parent: 'professional' },
            { id: 'ui-ux', label: 'UI/UX Design', type: 'category', parent: 'professional' },
            { id: 'stock-market', label: 'Stock Market', type: 'category', parent: 'professional' }
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
          category: "class-12"
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
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-500" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 flex-shrink-0 text-gray-500" />
                ) : (
                  <Folder className="w-4 h-4 flex-shrink-0 text-gray-500" />
                )}
              </>
            )}
            {!hasChildren && (
              <Book className="w-4 h-4 flex-shrink-0 text-gray-500" />
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

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
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
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-light mb-4">Learn From The Best</h1>
          <p className="text-xs sm:text-xl text-blue-100 font-light max-w-3xl">
            Access world-class courses taught by industry experts. Start learning today and achieve your goals.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
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
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-black hover:text-blue-600 transition-colors py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.allCategories ? (
                        <ChevronDown className="w-4 h-4 text-black" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-black" />
                      )}
                      {expandedCategories.allCategories ? (
                        <FolderOpen className="w-4 h-4 text-black" />
                      ) : (
                        <Folder className="w-4 h-4 text-black" />
                      )}
                      <span className="text-xs">All Categories</span>
                    </div>
                  </button>

                  {expandedCategories.allCategories && (
                    <div className="mt-1 space-y-0.5 ">
                      {renderCategoryTree(categoryStructure)}
                    </div>
                  )}
                </div>

                {/* All Courses Button */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center gap-2 w-full text-left py-2 px-2 rounded-md transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-50 text-blue-700 font-light'
                      : 'text-black hover:bg-gray-50'
                  }`}
                >
                  <Book className="w-4 h-4 flex-shrink-0 text-black" />
                  <span className="text-xs">All Courses</span>
                </button>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-sm sm:text-sm font-light text-gray-600">
                Showing {filteredCourses.length} courses
              </h2>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No courses found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => navigate(`/learn/details/${course.id}`)}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden ">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Badges */}
                      {course.bestseller && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-light shadow-md">
                            Bestseller
                          </span>
                        </div>
                      )}
                      {course.enrolled && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-light flex items-center gap-1 shadow-md">
                            <Check className="w-3 h-3" />
                            Enrolled
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-3 flex flex-col flex-grow">
                      {/* Title & Instructor */}
                      <div className="flex-grow">
                        <h3 className="text-base font-light text-black mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-sm text-black mb-2">{course.instructor}</p>
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1.5 mb-2.5 text-xs text-black">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-light">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{formatStudents(course.students)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(course.duration)}</span>
                        </div>
                      </div>

                      {/* Price & Level */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-light text-black">₹{course.price}</span>
                          <span className="text-xs text-gray-500 line-through">₹{course.originalPrice}</span>
                        </div>
                        <span className="bg-gray-50 text-black px-2 py-0.5 rounded-md text-xs font-light border border-gray-200">
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