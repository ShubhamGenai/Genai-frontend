import React from 'react';

const demoCategories = [
  'CSS',
  'Management',
  'Web Development',
  'Marketing',
  'Govt. Exams',
  'ChatGPT & AI',
  'Data Science',
  'MBA',
];

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  const displayCategories = categories && categories.length > 0 ? categories : demoCategories;
  return (
    <section className="mb-10 px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">Popular Test Categories</h2>
      <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2">
        {displayCategories.map((category, index) => (
          <button 
            key={index}
            className={`px-6 py-2 rounded-[10px] text-base whitespace-nowrap border transition font-medium shadow-sm ${
              selectedCategory === category 
                ? 'bg-black text-white border-blue-900' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
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