import React, { useState } from 'react';

const FilterOption = ({ label, value, checked, onChange }) => (
  <div className="flex items-center gap-2 py-1">
    <input 
      type="checkbox" 
      id={`filter-${value}`} 
      value={value}
      checked={checked}
      onChange={onChange}
      className="rounded"
    />
    <label htmlFor={`filter-${value}`} className="text-sm">{label}</label>
  </div>
);

const FilterGroup = ({ title, options, selectedValues, onChange, open: initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter(item => item !== value));
    }
  };
  
  return (
    <div className="py-4">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-base">{title}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="mt-2 pl-2">
          {options.map(option => (
            <FilterOption 
              key={option.value}
              label={option.label}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarFilters = ({ onFilterChange, currentFilters }) => {
  // Filter options
  const ratingOptions = [
    { label: '4.5 & Above', value: '4.5' },
    { label: '4.0 & Above', value: '4.0' },
    { label: '3.5 & Above', value: '3.5' }
  ];
  
  const durationOptions = [
    { label: 'Less than 30 mins', value: 'short' },
    { label: '30-60 mins', value: 'medium' },
    { label: 'More than 60 mins', value: 'long' }
  ];
  
  const levelOptions = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];
  
  const priceOptions = [
    { label: 'Free', value: 'Free' },
    { label: 'Premium', value: 'Premium' }
  ];
  
  return (
    <div className="bg-white rounded-xl rounded-[10px] border transition border-gray-300  p-6 ">
      <h3 className="text-md font- mb-2 text-gray-500 border-b pb-4">All Filters</h3>
      <FilterGroup 
        title="Categories" 
        options={[]}
        selectedValues={[]}
        onChange={() => {}}
        open={false}
      />
      <FilterGroup 
        title="Ratings" 
        options={ratingOptions}
        selectedValues={currentFilters.ratings}
        onChange={(values) => onFilterChange('ratings', values)}
        open={true}
      />
      <FilterGroup 
        title="Duration" 
        options={durationOptions}
        selectedValues={currentFilters.duration}
        onChange={(values) => onFilterChange('duration', values)}
      />
      <FilterGroup 
        title="Level" 
        options={levelOptions}
        selectedValues={currentFilters.level}
        onChange={(values) => onFilterChange('level', values)}
      />
      <FilterGroup 
        title="Price" 
        options={priceOptions}
        selectedValues={currentFilters.price}
        onChange={(values) => onFilterChange('price', values)}
      />
      <div className="mt-6">
        <button 
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300"
          onClick={() => onFilterChange('reset', {
            ratings: [],
            duration: [],
            level: [],
            price: []
          })}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;