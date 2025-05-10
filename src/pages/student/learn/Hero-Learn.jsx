import React, { useState } from 'react';

const HeroSection = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="bg-[#BBBBBB]   text-center py-16 px-4 text-center min-h-[220px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Unlock Your Potential with GenAI Courses!</h1>
      <p className="text-lg text-gray-700 mb-8  max-w-3xl mx-auto">
        Your next career move starts with the right course—let's find yours and take the first step<br />
        toward success with expert-led learning!
      </p>
      <form onSubmit={handleSearch} className="flex w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Courses (e.g., Data Science, MBA, AI)"
          className="flex-grow px-4 py-3 rounded-l-md border-0 bg-white text-sm text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#2563eb] text-white px-8 py-3 rounded-r-md font-medium text-sm border-0"
        >
          Browse Courses
        </button>
      </form>
    </div>
  );
};

export default HeroSection;