import React from 'react';

const StarRating = ({ rating }) => {
  // Create an array of 5 stars with filled or unfilled status
  const stars = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const filled = value <= Math.floor(rating);
    const halfFilled = value === Math.ceil(rating) && !Number.isInteger(rating);
    
    if (filled) return 'filled';
    if (halfFilled) return 'half';
    return 'empty';
  });
  
  return (
    <div className="flex text-yellow-400">
      {stars.map((type, index) => (
        <span key={index}>
          {type === 'filled' && '★'}
          {type === 'half' && '⭐'}
          {type === 'empty' && '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;