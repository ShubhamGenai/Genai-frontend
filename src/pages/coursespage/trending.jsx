const TrendingCourses = () => {
    const courses = [
      {
        title: "Prompt Engineering free course",
        image: "./courses/cat.png",
        tag: "Premium",
        learners: "5K+ Learners",
        duration: "2 hours",
        rating: "4.8",
        reviews: "(2,750)",
      },
      {
        title: "Design with AI (Advance design course)",
        image: "./courses/cat.png",
        tag: "Free",
        learners: "5K+ Learners",
        duration: "2 hours",
        rating: "4.8",
        reviews: "(2,750)",
      },
      {
        title: "Data Analyst course for beginners",
        image: "./courses/cat.png",
        tag: "Free",
        learners: "5K+ Learners",
        duration: "2 hours",
        rating: "4.8",
        reviews: "(2,750)",
      },
    ];
  
    return (
      <div className="p-24">
        <div className="bg-gray-100 py-12 px-6 border-white rounded-lg">
          <div className="px-7 mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Left Section */}
            <div className="md:w-1/3">
              <h4 className="text-gray-600 text-sm font-semibold uppercase">For You</h4>
              <h2 className="text-3xl mt-2">
                <span className=" font-bold">Trending</span> <span className="font-semibold">Courses</span>
              </h2>
              <p className="text-gray-600 mt-3 text-sm">
                The better your rank, the brighter your <br/>career. Top the leaderboard, showcase<br/> your  skills, and grab exclusive job offers <br/>from leading recruiters.
              </p>
              <button className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
                Explore Trending Courses →
              </button>
            </div>
  
            {/* Right Section (Courses) */}
            <div className="mt-8 md:mt-0 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses.map((course, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="relative p-2">
                    <img src={course.image} alt={course.title} className="w-full  rounded-md h-32 object-cover" />
                    <span className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded-md">
                      {course.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                      <span className="bg-gray-200 px-2 py-1 rounded">{course.learners}</span>
                      <span className="bg-gray-200 px-2 py-1 rounded">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-yellow-500 text-sm mt-2">
                      ⭐ {course.rating}
                      <span className="text-gray-500 ml-1">{course.reviews}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
          </div>
        </div>
      </div>
    );
  };
  
  export default TrendingCourses;
  