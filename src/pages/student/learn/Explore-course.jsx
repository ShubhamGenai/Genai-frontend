import React, { useState, useEffect, useMemo } from 'react';
import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../redux/DataSlice';
import { Link } from 'react-router-dom';

const durationBuckets = [
  { label: '< 30 min', test: d => d < 30 },
  { label: '30-60 min', test: d => d >= 30 && d <= 60 },
  { label: '> 60 min', test: d => d > 60 }
];

const getAvgRating = (course) => {
  if (!course.ratings || !course.ratings.length) return 0;
  return course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length;
};

const ExploreCourses = ({ searchQuery, activeTopic }) => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.data);

  // Unique values for filters
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(courses.map(c => c.category))).filter(Boolean);
  }, [courses]);
  const uniqueLevels = useMemo(() => {
    return Array.from(new Set(courses.map(c => c.level))).filter(Boolean);
  }, [courses]);
  const uniqueDurationLabels = durationBuckets.map(b => b.label);
  const uniqueRatings = useMemo(() => {
    // Use average rating, round down to int
    return Array.from(new Set(courses.map(getAvgRating).map(r => Math.floor(r)))).filter(Boolean).sort((a, b) => b - a);
  }, [courses]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]); // multiple
  const [selectedLevels, setSelectedLevels] = useState([]); // multiple
  const [selectedPrices, setSelectedPrices] = useState([]); // 'Free', 'Premium'
  const [selectedDurations, setSelectedDurations] = useState([]); // multiple
  const [selectedRatings, setSelectedRatings] = useState([]); // multiple
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilters, setOpenFilters] = useState({
    Categories: true,
    Level: false,
    Price: false,
    Duration: false,
    Ratings: false,
  });
  const [sortOption, setSortOption] = useState('Most Popular');

  const COURSES_PER_PAGE = 6;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let updatedCourses = courses;
    if (selectedCategories.length > 0) {
      updatedCourses = updatedCourses.filter(course => selectedCategories.includes(course.category));
    }
    if (selectedLevels.length > 0) {
      updatedCourses = updatedCourses.filter(course => selectedLevels.includes(course.level));
    }
    if (selectedPrices.length > 0) {
      updatedCourses = updatedCourses.filter(course => {
        const price = course.price ? (course.price.discounted ?? course.price.actual) : 0;
        const isFree = price === 0;
        const isPremium = price > 0;
        if (selectedPrices.includes('Free') && isFree) return true;
        if (selectedPrices.includes('Premium') && isPremium) return true;
        return false;
      });
    }
    if (selectedDurations.length > 0) {
      updatedCourses = updatedCourses.filter(course =>
        durationBuckets.some(bucket =>
          selectedDurations.includes(bucket.label) && bucket.test(course.duration)
        )
      );
    }
    if (selectedRatings.length > 0) {
      updatedCourses = updatedCourses.filter(course => selectedRatings.includes(Math.floor(getAvgRating(course))));
    }
    if (searchQuery) {
      updatedCourses = updatedCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sort logic
    if (sortOption === 'Most Popular') {
      updatedCourses = [...updatedCourses].sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0));
    } else if (sortOption === 'Newest') {
      updatedCourses = [...updatedCourses].sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortOption === 'Highest Rated') {
      updatedCourses = [...updatedCourses].sort((a, b) => getAvgRating(b) - getAvgRating(a));
    }
    setFilteredCourses(updatedCourses);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, courses, selectedCategories, selectedLevels, selectedPrices, selectedDurations, selectedRatings, sortOption]);

  // When activeTopic changes, update selectedCategories (unless already set by user)
  useEffect(() => {
    if (activeTopic && (!selectedCategories.length || selectedCategories[0] !== activeTopic)) {
      setSelectedCategories([activeTopic]);
    }
  }, [activeTopic]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };
  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };
  const handlePriceChange = (priceType) => {
    setSelectedPrices((prev) =>
      prev.includes(priceType) ? prev.filter(p => p !== priceType) : [...prev, priceType]
    );
  };
  const handleDurationChange = (durationLabel) => {
    setSelectedDurations((prev) =>
      prev.includes(durationLabel) ? prev.filter(d => d !== durationLabel) : [...prev, durationLabel]
    );
  };
  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };
  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  // Pagination logic
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  return (
    <div className="container mx-auto px-4 pt-2 pb-8">
      <h2 className="text-2xl font-bold mb-2 text-left">Explore Courses & Start Learning</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-8">
          <button
            key="all"
            onClick={() => setSelectedCategories([])}
            className={`pb-2 text-base font-semibold border-b-2 transition-colors duration-200 ${
              selectedCategories.length === 0
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
          >
            All Categories
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategories([category])}
              className={`pb-2 text-base font-semibold border-b-2 transition-colors duration-200 ${
                selectedCategories.length === 1 && selectedCategories[0] === category
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white shadow rounded-xl p-5 mb-4">
            <h3 className="text-base font-semibold mb-4">All Filters</h3>
            <div className="space-y-4">
              {/* Category Filter */}
              <details className="group" open={openFilters.Categories}>
                <summary
                  className="cursor-pointer font-medium flex items-center justify-between select-none"
                  onClick={e => {
                    e.preventDefault();
                    toggleFilter('Categories');
                  }}
                >
                  Categories
                  <svg
                    className={`w-4 h-4 ml-2 inline-block transform transition-transform duration-200 ${openFilters.Categories ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="ml-4 text-sm text-gray-600 pt-2 flex flex-col gap-2">
                  {uniqueCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </details>
              {/* Level Filter */}
              <details className="group" open={openFilters.Level}>
                <summary
                  className="cursor-pointer font-medium flex items-center justify-between select-none"
                  onClick={e => {
                    e.preventDefault();
                    toggleFilter('Level');
                  }}
                >
                  Level
                  <svg className={`w-4 h-4 ml-2 inline-block transform transition-transform duration-200 ${openFilters.Level ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="ml-4 text-sm text-gray-600 pt-2 flex flex-col gap-2">
                  {uniqueLevels.map(level => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() => handleLevelChange(level)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </details>
              {/* Price Filter */}
              <details className="group" open={openFilters.Price}>
                <summary
                  className="cursor-pointer font-medium flex items-center justify-between select-none"
                  onClick={e => {
                    e.preventDefault();
                    toggleFilter('Price');
                  }}
                >
                  Price
                  <svg className={`w-4 h-4 ml-2 inline-block transform transition-transform duration-200 ${openFilters.Price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="ml-4 text-sm text-gray-600 pt-2 flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes('Free')}
                      onChange={() => handlePriceChange('Free')}
                    />
                    Free
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes('Premium')}
                      onChange={() => handlePriceChange('Premium')}
                    />
                    Premium
                  </label>
                </div>
              </details>
              {/* Duration Filter */}
              <details className="group" open={openFilters.Duration}>
                <summary
                  className="cursor-pointer font-medium flex items-center justify-between select-none"
                  onClick={e => {
                    e.preventDefault();
                    toggleFilter('Duration');
                  }}
                >
                  Duration
                  <svg className={`w-4 h-4 ml-2 inline-block transform transition-transform duration-200 ${openFilters.Duration ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="ml-4 text-sm text-gray-600 pt-2 flex flex-col gap-2">
                  {uniqueDurationLabels.map(durationLabel => (
                    <label key={durationLabel} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(durationLabel)}
                        onChange={() => handleDurationChange(durationLabel)}
                      />
                      {durationLabel}
                    </label>
                  ))}
                </div>
              </details>
              {/* Ratings Filter */}
              <details className="group" open={openFilters.Ratings}>
                <summary
                  className="cursor-pointer font-medium flex items-center justify-between select-none"
                  onClick={e => {
                    e.preventDefault();
                    toggleFilter('Ratings');
                  }}
                >
                  Ratings
                  <svg className={`w-4 h-4 ml-2 inline-block transform transition-transform duration-200 ${openFilters.Ratings ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="ml-4 text-sm text-gray-600 pt-2 flex flex-col gap-2">
                  {uniqueRatings.map(rating => (
                    <label key={rating} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                      />
                      {rating}+
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">
              {filteredCourses.length} results for {selectedCategories.join(', ')} course
            </p>
            <div>
              <select
                className="border border-gray-300 rounded px-3 py-2 text-sm"
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
              >
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <Link to={`/learn/details/${course._id || course.id}`} key={course._id || course.id}>
                <CourseCard
                  image={course.imageUrl}
                  title={course.title}
                  rating={getAvgRating(course)}
                  reviews={course.ratings?.length || 0}
                  learners={course.ratings?.length || 0}
                  hours={course.duration}
                  isBestSeller={course.isBestSeller}
                  isHot={course.isHot}
                  price={course.price ? (course.price.discounted ?? course.price.actual) : 0}
                />
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 text-base rounded-full border flex items-center justify-center font-semibold transition-colors duration-200
                  ${currentPage === idx + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}
                `}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
