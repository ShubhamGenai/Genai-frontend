import React, { useEffect, useState } from 'react';
import Header from './Header';
import CategoryFilter from './Category-Filter';
import SidebarFilters from './SideBar-filter';
import TestListing from './TestListing';
import Pagination from './Pagination';
import TrendingTests from './TrendingTest';
import Stats from './Stats';
import FaqSection from '../jobs/Faq';
import { trendingTests as trendingTestsData, statsData, faqData } from './TestData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests, fetchTestsCategories } from '../../../redux/DataSlice';
import SubscribeBanner from './SubscribeBanner';


const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('mostPopular');
  const [filters, setFilters] = useState({
    ratings: [],
    duration: [],
    level: [],
    price: []
  });

  const dispatch = useDispatch();
  const { categories,tests, status, error } = useSelector((state) => state.data);
  const allTests = tests || [];
  const allCategories = categories || ["Jee","CAT"]

  useEffect(() => {
  dispatch(fetchTestsCategories());
    dispatch(fetchTests()); // Fetch tests
  }, [dispatch]);

 
  
  // Filtered tests based on current filters
  const [filteredTests, setFilteredTests] = useState([]);
  const [totalTests, setTotalTests] = useState(0);
  
  // Items per page for pagination
  const testsPerPage = 6;
  
  // Effect to filter tests when filters change
  useEffect(() => {
    let result = [...allTests];
    
    // Remove initial filter: do not filter by category, search, or filters unless user sets them
    // Filter by category
    if (selectedCategory) {
      result = result.filter(test => test.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(test => 
        test.title.toLowerCase().includes(query) || 
        test.category.toLowerCase().includes(query)
      );
    }
    
    // Apply additional filters
    if (filters.ratings.length > 0) {
      result = result.filter(test => {
        // Example: filter by minimum rating
        const minRating = Math.min(...filters.ratings);
        return test.rating >= minRating;
      });
    }
    
    if (filters.level.length > 0) {
      result = result.filter(test => filters.level.includes(test.level));
    }
    
    if (filters.price.length > 0) {
      result = result.filter(test => filters.price.includes(test.price));
    }
    
    // Apply sorting
    if (sortBy === 'mostPopular') {
      result.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'highestRated') {
      result.sort((a, b) => b.rating - a.rating);
    }
    // If sortBy is 'newest', sort by a 'createdAt' or similar field if available
    else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setTotalTests(result.length);
    
    // Slice for pagination
    const startIndex = (currentPage - 1) * testsPerPage;
    const endIndex = startIndex + testsPerPage;
    setFilteredTests(result.slice(startIndex, endIndex));
  }, [selectedCategory, searchQuery, filters, sortBy, currentPage, allTests]);
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalTests / testsPerPage);
  
  // Handler for filter changes
  const handleFilterChange = (filterType, values) => {
    if (filterType === 'reset') {
      setFilters({ ratings: [], duration: [], level: [], price: [] });
      setSelectedCategory("");
      setSearchQuery("");
      setCurrentPage(1);
      return;
    }
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  // Handler for search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(""); // Clear selected category so search works for both title and category
    setCurrentPage(1);
  };

  // Trending tests: top 3 by rating or reviews
  const trendingTests = [...allTests]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3)
    .map((test, idx) => ({
      ...test,
      badge: idx === 1 ? 'Free' : 'Premium',
      questions: `${test.questions || 8} Questions`,
      duration: test.duration || '5 Minutes',
      reviews: test.reviews ? test.reviews.toLocaleString() : '2,750',
      subtitle: `${test.category || 'General'} (Level)`
    }));

  if (status === "loading") return <div className="flex items-center justify-center h-screen">
  <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
</div>
;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen ">
      <Header onSearch={handleSearch} />
      <main className="flex-grow px-8 py-8 md:px-8">
        <CategoryFilter 
          categories={allCategories} 
          selectedCategory={selectedCategory} 
          onCategorySelect={(category) => {
            setSelectedCategory(category);
            setSearchQuery(category);
            setCurrentPage(1);
          }} 
        />
        <h2 className="text-2xl px-6 font-bold mt-8 ml-8 text-left">Explore Tests</h2>
        <div className="flex flex-col md:flex-row p-8 gap-8">
          <div className="w-full md:w-1/4">
            <SidebarFilters 
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">{totalTests} tests</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  className="border rounded p-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="mostPopular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="highestRated">Highest Rated</option>
                </select>
              </div>
            </div>
            {filteredTests.length > 0 ? (
              <TestListing tests={filteredTests} />
            ) : (
              <div className="text-center py-8 bg-white rounded shadow">
                <p className="text-gray-500">No tests found matching your criteria.</p>
                <button 
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() => {
                    setFilters({ ratings: [], duration: [], level: [], price: [] });
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </div>
        </div>
        <TrendingTests trendingTests={trendingTests} />
        <Stats statsData={statsData} />
      
        <FaqSection faqs={faqData} />
        <SubscribeBanner />
      </main>
    </div>
  );
}

export default TestPage;