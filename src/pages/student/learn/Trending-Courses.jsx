import React from 'react';
import CourseCard from './CourseCard';

const TrendingCourses = () => {
  const trendingCourses = [
    {
      id: 7,
      title: "Prompt Engineering free course",
      rating: 4.9,
      reviews: 542,
      learners: "76K",
      hours: "4",
      isHot: true
    },
    {
      id: 8,
      title: "ChatGPT with AI advanced design course",
      rating: 4.7,
      reviews: 356,
      learners: "45K",
      hours: "9",
      isBestSeller: false
    },
    {
      id: 9,
      title: "Data Analysis course for beginners",
      rating: 4.8,
      reviews: 783,
      learners: "58K",
      hours: "11",
      isBestSeller: true
    }
  ];

  return (
    <div className="bg-gray-200 py-10 px-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <span className="text-sm uppercase text-gray-600 font-medium">FOR YOU</span>
          <h2 className="text-xl font-bold">Trending Courses</h2>
          <p className="text-sm text-gray-600 mt-1">
            The faster your work, the brighter your career. This marketplace showcases the latest hot courses from leading recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {trendingCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              rating={course.rating}
              reviews={course.reviews}
              learners={course.learners}
              hours={course.hours}
              isBestSeller={course.isBestSeller}
              isHot={course.isHot}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button className="flex items-center bg-white px-4 py-2 rounded-md border border-gray-300 text-sm font-medium">
            Explore Trending Courses
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingCourses;