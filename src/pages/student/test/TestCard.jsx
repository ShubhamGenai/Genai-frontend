import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col hover:shadow-lg transition-shadow min-h-[180px]">
      <h3 className="font-semibold text-gray-900 text-base mb-2 leading-tight line-clamp-2">{test.title}</h3>
      <div className="flex items-center text-xs text-gray-500 mb-2 gap-3">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" /></svg>
          <span>{test.questions} Questions</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{test.duration}</span>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.floor(test.rating || test.averageRating || 0)
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
        <span className="text-xs text-gray-500 ml-2">({test.reviews || (test.ratings ? test.ratings.length : 0)})</span>
      </div>
      <Link to={`/test-details?id=${test._id || test.id}`} className="w-full mt-auto">
        <button className="w-20 bg-[#5F5F5F]  text-white text-sm py-2 rounded font-semibold hover:bg-gray-900 transition">
          Get Test
        </button>
      </Link>
    </div>
  );
};

export default TestCard;