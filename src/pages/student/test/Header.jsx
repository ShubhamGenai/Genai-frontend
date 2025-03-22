import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  return (
    <header className="bg-gray-600 text-center py-12 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Sharp your skills with Gen AI Tests</h1>
      <p className="text-white mb-4">Explore tests in every category and take the next step in your learning</p>
      
      <form onSubmit={handleSubmit} className="flex justify-center max-w-lg mx-auto">
        <input 
          type="text" 
          placeholder="Search for tests (e.g. Data Science, MBA, AI)" 
          className="w-full px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Browse Courses
        </button>
      </form>
    </header>
  );
};

export default Header;