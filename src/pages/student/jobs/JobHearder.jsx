// components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-300 text-center py-12 px-6 relative">
      <div className="absolute right-12 top-10">
       
      </div>
      <h1 className="text-2xl font-bold mb-2">Your Next Job Starts Here</h1>
      <p className="text-sm text-gray-600 mb-6">Explore jobs in every company and role from all over the world. Build your career today</p>
      
      <div className="max-w-lg mx-auto flex">
        <input 
          type="text" 
          placeholder="Search for Job, e.g., Data Scientist, MBA, AI" 
          className="flex-grow px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r transition-colors">
          Browse Openings
        </button>
      </div>
    </header>
  );
};

export default Header;