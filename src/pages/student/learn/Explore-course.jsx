import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const ExploreCourses = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState("Data Analysis");
  const [filteredCourses, setFilteredCourses] = useState([]);
  
  const tabCategories = ["Data Analysis", "Management", "Web Development", "Marketing", "All Categories"];

  const courses = [
    {
      id: 1,
      title: "Data Analytics course for beginners",
      rating: 4.8,
      reviews: 783,
      learners: "58K",
      hours: "11",
      isBestSeller: true,
      isHot: false
    },
    {
      id: 2,
      title: "Prompt Engineering free course",
      rating: 4.9,
      reviews: 542,
      learners: "76K",
      hours: "4",
      isBestSeller: false,
      isHot: true
    },
    {
      id: 3,
      title: "ChatGPT with AI advanced design course",
      rating: 4.7,
      reviews: 356,
      learners: "45K",
      hours: "9",
      isBestSeller: false,
      isHot: false
    },
    {
      id: 4,
      title: "Data Analysis course for beginners",
      rating: 4.8,
      reviews: 783,
      learners: "58K",
      hours: "11",
      isBestSeller: true,
      isHot: false
    },
    {
      id: 5,
      title: "Prompt Engineering free course",
      rating: 4.9,
      reviews: 542,
      learners: "76K",
      hours: "4",
      isBestSeller: false,
      isHot: true
    },
    {
      id: 6,
      title: "Data Analysis course for beginners",
      rating: 4.8,
      reviews: 783,
      learners: "58K",
      hours: "11",
      isBestSeller: true,
      isHot: false
    }
  ];

  useEffect(() => {
    // Filter courses based on search query
    if (searchQuery) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchQuery]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Add smooth scroll to top of course grid
    const courseGrid = document.getElementById('course-grid');
    if (courseGrid) {
      courseGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-semibold mb-4">Explore Courses & Start Learning</h2>
      
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {tabCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm transition-all duration-300 ${
              activeCategory === category
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-between mb-6 items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-32">
            <div className="bg-white p-2 rounded border flex items-center justify-between hover:border-blue-500 transition-colors duration-300 cursor-pointer">
              <span className="text-sm">All Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white p-2 rounded border flex items-center justify-between w-32">
              <span className="text-sm">Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white p-2 rounded border flex items-center justify-between w-24">
              <span className="text-sm">Rating</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white p-2 rounded border flex items-center justify-between w-24">
              <span className="text-sm">Duration</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white p-2 rounded border flex items-center justify-between w-24">
              <span className="text-sm">Level</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Sort by:</span>
          <div className="bg-white p-2 rounded border flex items-center justify-between w-32 hover:border-blue-500 transition-colors duration-300 cursor-pointer">
            <span className="text-sm">Most Popular</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div id="course-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            rating={course.rating}
            reviews={course.reviews}
            learners={course.learners}
            hours={course.hours}
            isBestSeller={course.isBestSeller}
            isHot={course.isHot}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-12">
        <div className="flex space-x-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-sm">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm">
            4
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;