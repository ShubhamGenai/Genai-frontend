import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ChevronRight, Check, Loader, Search, Award, ArrowRight } from 'lucide-react';

const mockCourses = [
        {
          id: 1,
          title: "NEET 2025 Complete Preparation",
          instructor: "Dr. Rajesh Kumar",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
          rating: 4.8,
          students: 15400,
          duration: 120,
          price: 2999, // Reduced price
          originalPrice: 4999, // Reduced original price
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
          price: 2699, // Reduced price
          originalPrice: 4499, // Reduced original price
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
          price: 1999, // Reduced price
          originalPrice: 3999, // Reduced original price
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
          price: 3499, // Reduced price
          originalPrice: 6499, // Reduced original price
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
          price: 3299, // Reduced price
          originalPrice: 5999, // Reduced original price
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
          price: 4999, // Reduced price
          originalPrice: 8999, // Reduced original price
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
          price: 1499, // Reduced price
          originalPrice: 2999, // Reduced original price
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
          price: 1799, // Reduced price
          originalPrice: 3499, // Reduced original price
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
          price: 2499, // Reduced price
          originalPrice: 4999, // Reduced original price
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
          price: 2249, // Reduced price
          originalPrice: 4499, // Reduced original price
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
          price: 1999, // Reduced price
          originalPrice: 3999, // Reduced original price
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
          price: 1749, // Reduced price
          originalPrice: 3499, // Reduced original price
          level: "Intermediate",
          bestseller: false,
          enrolled: true,
          category: "class-12"
        },
        {
          id: 13,
          title: "Introduction to Programming (Free)",
          instructor: "Code Academy",
          image: "https://images.unsplash.com/photo-1542831371-d2432a7e7d58?w=400&h=300&fit=crop",
          rating: 4.5,
          students: 25000,
          duration: 10,
          price: 0,
          originalPrice: 999, // Reduced original price
          level: "Beginner",
          bestseller: false,
          enrolled: false,
          category: "web-development" // Assign to an existing category or create a new one
        }
      ];

const categoryFilterOptions = [
  { id: 'All', label: 'All Courses' },
  { id: 'neet', label: 'NEET Preparation' },
  { id: 'jee-main', label: 'JEE Main' },
  { id: 'jee-advanced', label: 'JEE Advanced' },
  { id: 'upsc', label: 'UPSC' },
  { id: 'web-development', label: 'Web Development' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'stock-market', label: 'Stock Market' },
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'class-10', label: 'Class 10' },
  { id: 'class-12', label: 'Class 12' },
];

const featuredCategories = [
  { id: 'neet', label: 'NEET Preparation' },
  { id: 'jee-main', label: 'JEE Main' },
  { id: 'jee-advanced', label: 'JEE Advanced' },
  { id: 'upsc', label: 'UPSC' },
  { id: 'web-development', label: 'Web Development' },
  { id: 'data-science', label: 'Data Science' },
];

const LearningPlatform = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;
  const [showCategorySections, setShowCategorySections] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCourses(mockCourses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatStudents = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatDuration = (hours) => `${hours} hours`;

  const filteredCourses = courses.filter((course) => {
    // Category
    if (selectedCategory !== 'All' && course.category !== selectedCategory) {
      return false;
    }

    // Level
    if (selectedLevel !== 'All Levels' && course.level !== selectedLevel) {
      return false;
    }

    // Price
    if (selectedPrice !== 'All') {
      const isFree = course.price === 0;
      if (selectedPrice === 'Free' && !isFree) return false;
      if (selectedPrice === 'Paid' && isFree) return false;
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const inTitle = course.title.toLowerCase().includes(query);
      const inInstructor = course.instructor.toLowerCase().includes(query);
      if (!inTitle && !inInstructor) return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const isDefaultView =
    selectedCategory === 'All' &&
    selectedLevel === 'All Levels' &&
    selectedPrice === 'All' &&
    !searchQuery.trim();

  const isCategorySectionView = isDefaultView && showCategorySections;

  const coursesByCategory = courses.reduce((acc, course) => {
    const cat = course.category || 'others';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {});

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
            onClick={() => window.location.reload()}
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
      <div className="w-full px-4 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Continue Learning
              </h1>
              <p className="text-sm text-gray-500">
                Pick up from where you left off or explore new topics.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All Levels');
                setSelectedPrice('All');
                setSearchQuery('');
                setCurrentPage(1);
                setShowCategorySections(false);
              }}
              className="self-start md:self-auto inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Filters row */}
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                Find Courses:
              </span>
              <select
                className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categoryFilterOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Price */}
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPrice}
              onChange={(e) => {
                setSelectedPrice(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>

            {/* Search */}
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
                  placeholder="Search your courses..."
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
                <>Showing {courses.length} courses across categories.</>
              ) : (
                <>
                  Showing {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? 's' : ''}.
                </>
              )}
            </p>
          </div>

          {/* Courses grid */}
          {isCategorySectionView ? (
            <>
              {featuredCategories.map((cat) => {
                const categoryCourses = (coursesByCategory[cat.id] || []).slice(0, 5);
                if (!categoryCourses.length) return null;

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
                      {categoryCourses.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => navigate(`/learn/details/${course.id}`)}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col fade-in-up text-left"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />

                            {course.price === 0 ? (
                              <span className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                FREE
                              </span>
                            ) : course.bestseller ? (
                              <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Bestseller
                              </span>
                            ) : null}

                            {course.enrolled && (
                              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Enrolled
                              </span>
                            )}
                          </div>

                          <div className="p-3 flex flex-col flex-grow">
                            <div className="flex-grow">
                              <h3 className="text-base font-light text-black mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                {course.title}
                              </h3>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {course.instructor}
                              </p>
                            </div>

                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mb-3 text-xs text-black">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span className="font-light">
                                  {formatStudents(course.students)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDuration(course.duration)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-light">{course.rating}</span>
                              </div>
                            </div>

                            <div className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-blue-700 group-hover:to-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md transform group-hover:scale-[1.02]">
                              <span className="tracking-wide">Continue Learning</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm sm:text-base">
                No courses match your filters yet.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                {paginatedCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => navigate(`/learn/details/${course.id}`)}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col fade-in-up text-left"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />

                      {course.price === 0 ? (
                        <span className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          FREE
                        </span>
                      ) : course.bestseller ? (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Bestseller
                        </span>
                      ) : null}

                      {course.enrolled && (
                        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-light shadow-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Enrolled
                        </span>
                      )}
                    </div>

                    <div className="p-3 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-base font-light text-black mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {course.instructor}
                        </p>
                      </div>

                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mb-3 text-xs text-black">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span className="font-light">
                            {formatStudents(course.students)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(course.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-light">{course.rating}</span>
                        </div>
                      </div>

                      <div className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-blue-700 group-hover:to-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md transform group-hover:scale-[1.02]">
                        <span className="tracking-wide">Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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

export default LearningPlatform;