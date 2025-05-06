import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../redux/DataSlice';
import { Link } from 'react-router-dom';

const ExploreCourses = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.data);

  const tabCategories = ["Data Analyst", "Management", "Web Development", "Marketing", "All Categories"];

  const COURSES_PER_PAGE = 8;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let updatedCourses = courses;

    if (activeCategory !== "All Categories") {
      updatedCourses = updatedCourses.filter(course =>
        course.title.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    if (searchQuery) {
      updatedCourses = updatedCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(updatedCourses);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, courses, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Pagination logic
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row p-6">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
        <div className="bg-white shadow rounded-lg p-4 sticky top-6">
          <h3 className="text-lg font-semibold mb-4">All Filters</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-medium">Categories</summary>
              <div className="ml-4 text-sm text-gray-600">Filter options go here</div>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium">Ratings</summary>
              <div className="ml-4 text-sm text-gray-600">Filter options go here</div>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium">Duration</summary>
              <div className="ml-4 text-sm text-gray-600">Filter options go here</div>
            </details>
            {/* Add more filters similarly */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4">
        {/* Top Tabs */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 overflow-x-auto">
            {tabCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 text-sm rounded-full border ${
                  activeCategory === category
                    ? "bg-blue-100 text-blue-600 font-semibold border-blue-300"
                    : "text-gray-600 border-gray-300 hover:text-blue-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-600 mb-2">
          {filteredCourses.length} results for {activeCategory} course
        </p>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
  {paginatedCourses.map((course) => (
    <Link to={`/course-details?id=${course._id}`} key={course.id}>
      <CourseCard
        title={course.title}
        rating={course.rating}
        reviews={course.reviews}
        learners={course.learners}
        hours={course.hours}
        isBestSeller={course.isBestSeller}
        isHot={course.isHot}
      />
    </Link>
  ))}
</div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 text-sm rounded-full border ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
