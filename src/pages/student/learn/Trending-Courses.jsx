import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TrendingTestCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
        {course.badge && (
          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded ${
            course.badge === 'Free' ? 'bg-black text-white' : 'bg-yellow-400 text-white'
          }`}>
            {course.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">{course.title}</h3>
        <div className="flex items-center text-xs text-gray-600 mb-2 gap-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{course.learners}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{course.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <StarRating rating={course.rating} />
          <span className="ml-2 font-semibold">{course.rating.toFixed(1)}</span>
          <span className="ml-1 text-gray-500 text-xs">({course.ratingCount.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
};

const TrendingCourses = () => {
  const trendingCourses = [
    {
      id: 1,
      title: "Prompt Engineering free course",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQKfYO4fxzK5lRdrQ8_2t4T9iXxLz-9taRco2c6I7j9vBpFcLeIR3LDLKI1aIXrVTVLY&usqp=CAU",
      badge: "Premium",
      learners: "5K+ Learners",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: 2750
    },
    {
      id: 2,
      title: "Design with AI (Advance design course)",
      image: "https://timesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com/Popular_courses_in_IT_4415306030.webp",
      badge: "Free",
      learners: "5K+ Learners",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: 2750
    },
    {
      id: 3,
      title: "Data Analyst course for beginners",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr4Aw_e25DSWUE472xTEtqm8e0CMJEqcjE_Cy47TTIcJBQuwkp3ND4EU5ZyTZ8iu5EF1Q&usqp=CAU",
      badge: "Free",
      learners: "5K+ Learners",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: 2750
    }
  ];

  return (
    <div className="bg-[#BBBBBB] p-16 md:p-12  mt-10 flex flex-col md:flex-row gap-8 items-stretch">
      <div className="md:w-1/3 flex flex-col justify-between mb-6 md:mb-0">
  <div>
    <div className="uppercase text-xs font-semibold text-gray-500 mb-2 tracking-wider">FOR YOU</div>
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      <span className="font-extrabold">Trending</span> Courses
    </h2>
    <p className="text-gray-600 mb-6 text-base leading-relaxed">
      The better your rank, the brighter your career. Top the leaderboard, showcase your skills, and grab exclusive job offers from leading recruiters.
    </p>
  </div>
  <button className="bg-blue-600 text-white px-6 py-2.5 rounded flex items-center gap-2 font-semibold hover:bg-blue-700 transition w-fit">
    Explore Trending Courses
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</div>

      <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingCourses.map(course => (
          <TrendingTestCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default TrendingCourses;
