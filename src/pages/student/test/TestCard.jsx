import React from 'react';
import StarRating from './StarRating';



const TestCard = ({ test }) => {
  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-md transition-shadow">
      {test.price === 'Premium' && (
        <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mb-2">
          Premium
        </span>
      )}
      <h3 className="font-medium text-sm mb-1">{test.title}</h3>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{test.questions} Questions</span>
        <span>{test.duration}</span>
      </div>
      <div className="flex items-center mb-3">
        <StarRating rating={test.rating} />
        <span className="text-xs text-gray-500 ml-1">({test.reviews})</span>
      </div>
      <button className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600 transition">
        Take Test
      </button>
    </div>
  );
};

export default TestCard;