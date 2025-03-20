// components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-2">
        <button 
          className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page} 
            className={`w-8 h-8 flex items-center justify-center border rounded-full transition-colors ${
              page === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-100'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;