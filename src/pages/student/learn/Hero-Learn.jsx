import React, { useState } from 'react';

const HeroSection = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="bg-gray-300 py-16 px-8 text-center text-black">
      <h1 className="text-4xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">
        Unlock Your Potential with GenAI Courses!
      </h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Take your career more seriously with the right courses—we'll help guide you and take the first step
        toward success with expert-led learning.
      </p>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Courses (e.g., Data Science, MBA, AI)"
          className="flex-grow px-4 py-3 rounded-l-md border-0  bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        />
        <button 
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-r-md transition-colors duration-300"
        >
          Browse Courses
        </button>
      </form>
    </div>
  );
};

export default HeroSection;