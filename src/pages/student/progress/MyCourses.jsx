import React, { useState, useEffect } from 'react';

const MyCourses = () => {
  const [loading, setLoading] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // No endpoints available - set initial state
    setPurchasedCourses([]);
    setLoading(false);
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">My Courses</h1>
      {loading ? (
        <p className="text-center text-xs sm:text-sm text-gray-600">Loading courses...</p>
      ) : purchasedCourses.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">No Courses Yet</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">This feature is currently in progress. Your purchased courses will be displayed here once available.</p>
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 text-yellow-800 rounded-lg text-xs sm:text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            In Progress
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src={course.image} alt={course.title} className="w-full h-20 sm:h-24 object-cover" />
              <div className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h2>
                <div className="space-y-1 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Instructor: {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-600">Progress</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{course.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="h-1.5 sm:h-2 rounded-full bg-blue-600"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">Last Accessed: {course.lastAccessed}</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
