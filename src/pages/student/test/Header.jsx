import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  return (
    <header className="bg-[#BBBBBB]   text-center py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Sharp your skills with Gen AI <span className="text-blue-600 font-bold">Tests</span>
      </h1>
      <p className="text-gray-600 mb-8 text-lg">Explore tests in every category and take the next step in your learning.</p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center max-w-2xl mx-auto gap-2">
        <input 
          type="text" 
          placeholder="Search for tests (e.g. Data Science, MBA, AI)" 
          className="w-full md:w-96 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none text-base bg-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 rounded-r-md font-semibold hover:bg-blue-700 transition text-base"
        >
          Browse Courses
        </button>
      </form>
    </header>
  );
};

export default Header;