import React from 'react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      text: "This course transformed my career. The real-world projects helped me land a job at Amazon!",
      author: "Sunil Namo",
      rating: 5,
      date: "Jan 15, 2025"
    },
    {
      id: 2,
      text: "The structured learning insights made it super easy to track progress and focus on weak areas.",
      author: "Sunil Namo",
      rating: 5,
      date: "Jan 15, 2025"
    },
    {
      id: 3,
      text: "The courses transformed my career. The real-world projects helped me land a job at Amazon.",
      author: "Sunil Namo", 
      rating: 5,
      date: "Jan 15, 2025"
    },
    {
      id: 4,
      text: "The document is extremely helpful and got me ready to rock!",
      author: "Sunil Namo",
      rating: 5,
      date: "Jan 15, 2025"
    }
  ];

  // Star rendering helper
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Reviews & Testimonials (4.8/5)</h2>
      </div>
      <p className="text-gray-600 mb-6">Take AI-generated tests to assess your skills:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-white border rounded-lg shadow-sm flex flex-col h-full">
            {/* Make the text container take up available space */}
            <div className="flex-grow">
              <p className="text-sm text-gray-700 mb-4">"{review.text}"</p>
            </div>
            
            {/* Profile info aligned at the bottom */}
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div>
                <p className="font-medium text-sm">{review.author}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;