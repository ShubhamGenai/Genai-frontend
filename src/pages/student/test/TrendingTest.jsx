import React from 'react';
import { Link } from 'react-router-dom';

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Individual Test Card Component
const TrendingTestCard = ({ test }) => {
  return (
    <div className="bg-white rounded p-12">
      <div className="mb-2">
        {test.badge && (
          <span className={`inline-block text-xs px-2 py-1 rounded mb-2 ${
            test.badge === 'Free' ? 'bg-black text-white' : 'bg-orange-400 text-white'
          }`}>
            {test.badge}
          </span>
        )}
        <h3 className="font-medium text-sm">{test.title}</h3>
        <p className="text-xs text-gray-500">{test.subtitle}</p>
      </div>
      
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-600">{test.questions} Questions</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-600">{test.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        <StarRating rating={test.rating} />
        <span className="text-xs text-gray-500 ml-1">({test.reviews})</span>
      </div>
      
      <button className="w-full bg-white border border-gray-300 text-gray-700 text-sm py-2 rounded hover:bg-gray-50 transition">
        View Test
      </button>
    </div>
  );
};

// Main Trending Tests Component
const TrendingTests = () => {
  const trendingTests = [
    {
      id: 1,
      title: "CSS Advance Test 1",
      subtitle: "CSS (Advance Level)",
      badge: "Premium",
      questions: "8 Questions",
      duration: "5 Minutes",
      rating: 4.8,
      reviews: "2,750"
    },
    {
      id: 2,
      title: "CSS Advance Test 2",
      subtitle: "CSS (Advance Level)",
      badge: "Free",
      questions: "8 Questions",
      duration: "5 Minutes",
      rating: 4.8,
      reviews: "2,750"
    },
    {
      id: 3,
      title: "CSS Advance Test 3",
      subtitle: "CSS (Advance Level)",
      badge: "Premium",
      questions: "8 Questions",
      duration: "5 Minutes",
      rating: 4.8,
      reviews: "2,750"
    }
  ];

  return (
    <div className="bg-gray-200 p-16 rounded-lg mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="uppercase text-sm font-medium text-gray-600 mb-2">FOR YOU</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Tests</h2>
          <p className="text-gray-600 mb-6">
            The better your rank, the brighter your career. Top the leaderboard, showcase your skills, and grab exclusive job offers from leading recruiters.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition">
            Explore Trending Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingTests.map(test => (
            <TrendingTestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTests;