import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  return (
    <header className="bg-gray-300 text-center py-16 px-4">
      <h1 className="text-4xl mt-4 font-semibold text-black mb-">Sharp your skills with Gen AI Tests</h1>
      <p className="text-gray-800 mb-4 mt-8">Explore tests in every category and take the next step in your learning</p>
      
      <form onSubmit={handleSubmit} className="flex justify-center max-w-lg mx-auto">
        <input 
          type="text" 
          placeholder="Search for tests (e.g. Data Science, MBA, AI)" 
          className="w-full px-4 py-2 rounded-l radius-5px bg-white border-gray-300 focus:outline-none"
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