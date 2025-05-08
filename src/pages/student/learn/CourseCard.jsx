import React from 'react';

const CourseCard = ({ title, rating, reviews, learners, hours, isBestSeller, isHot, image }) => {


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <img  src={image} alt={title} className="w-full h-40 object-cover" />
        {isBestSeller && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded">
            BEST
          </span>
        )}
        {isHot && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
            HOT
          </span>
        )}
      </div>
      <h1>{title}</h1>
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">({reviews})</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>{learners} Learners</span>
          <span className="mx-2">•</span>
          <span>{hours} Hours</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;