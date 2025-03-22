import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Popular Test Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedCategory === category 
                ? 'bg-blue-900 text-white' 
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;