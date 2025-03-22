import React from 'react';
import StarRating from './StarRating';

const TrendingTestCard = ({ test }) => {
  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="font-medium text-sm">{test.title}</h3>
          <p className="text-xs text-gray-500">{test.subtitle}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${test.badge === 'Hot' ? 'bg-black text-white' : 'bg-orange-500 text-white'}`}>
          {test.badge}
        </span>
      </div>
      
      <div className="flex gap-4 mb-2">
        <div className="flex items-center gap-1 text-xs">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {test.questions} Questions
        </div>
        <div className="flex items-center gap-1 text-xs">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {test.duration}
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        <StarRating rating={test.rating} />
        <span className="text-xs text-gray-500 ml-1">({test.reviews})</span>
      </div>
      
      <button className="w-full bg-white border border-gray-300 text-gray-700 text-sm py-1 rounded hover:bg-gray-50 transition">
        View Test
      </button>
    </div>
  );
};

const TrendingTests = ({ tests }) => {
  return (
    <section className="mt-12 mb-8">
      <div className="bg-gray-100 p-6 rounded">
        <div className="text-gray-700 mb-1">FOR YOU</div>
        <h2 className="text-xl font-bold mb-4">Trending Tests</h2>
        <p className="text-gray-600 mb-4">Find the latest top trending tests to boost your career. Take the recommended, showcase your skills, and grab incredible job offers from leading recruiters.</p>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 mb-8 hover:bg-blue-600 transition">
          Explore Trending Tests
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tests.map(test => (
            <TrendingTestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTests;