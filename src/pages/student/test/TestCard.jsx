import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-gray-800 mb-2">{test.title}</h3>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{test.quizzes.length} Questions</span>
        <span>{test.duration}hr</span>
      </div>
      <div className="flex items-center mb-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.floor(test.averageRating) 
                  ? "text-yellow-400" 
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">({test.ratings.length})</span>
      </div>
      <Link to={`/test-details?id=${test._id}`}>
        <button className="w-2x1 bg-gray-600 text-white text-sm py-1 px-3 rounded hover:bg-gray-700 transition">
          Get Test
        </button>
      </Link>
    </div>
  );
};

export default TestCard;