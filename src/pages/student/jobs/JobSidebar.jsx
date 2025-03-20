// components/FilterSidebar.jsx
import React, { useState } from 'react';

const FilterSidebar = ({ filters }) => {
  const [expandedFilter, setExpandedFilter] = useState(null);
  
  const toggleFilter = (filter) => {
    if (expandedFilter === filter) {
      setExpandedFilter(null);
    } else {
      setExpandedFilter(filter);
    }
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <button className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded transition-colors">All Filters</button>
      </div>
      
      {filters.map((filter, index) => (
        <div key={index} className="bg-white p-4 rounded shadow-sm mb-3">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFilter(filter)}
          >
            <span className="font-medium">{filter}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${expandedFilter === filter ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {expandedFilter === filter && (
            <div className="mt-3 pt-3 border-t">
              <div className="space-y-2">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Option 1
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Option 2
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Option 3
                </label>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;