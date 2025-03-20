// components/JobCategories.jsx
import React, { useState } from 'react';

const JobCategories = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState("UI/UX Designer");
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="py-8 px-8 md:px-16">
      <h2 className="text-lg font-semibold mb-5">Popular Jobs Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`px-4 py-2 text-sm border rounded-full transition-colors ${
              category === activeCategory ? 'bg-gray-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default JobCategories;