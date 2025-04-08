import React from 'react';

const CourseCard = ({ title, rating, reviews, learners, hours, isBestSeller, isHot }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 flex-grow">{title}</h3>
          <div className="flex space-x-2">
            {isBestSeller && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Bestseller
              </span>
            )}
            {isHot && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                Hot
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 font-medium">{rating}</span>
          <div className="flex text-yellow-400 ml-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'stroke-current'}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-1">({reviews})</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <span>{learners} learners</span>
          <span className="mx-2">•</span>
          <span>{hours} total hours</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 