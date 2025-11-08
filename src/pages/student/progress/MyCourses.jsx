import React, { useState, useEffect } from 'react';
// Assuming you'll create a CSS file for styling

const MyCourses = () => {
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchCourses = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyCourses = [
        {
          id: 1,
          title: 'Introduction to React',
          instructor: 'John Doe',
          progress: 75,
          lastAccessed: '2023-10-26',
          image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=React',
        },
        {
          id: 2,
          title: 'Advanced JavaScript',
          instructor: 'Jane Smith',
          progress: 50,
          lastAccessed: '2023-10-20',
          image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=JavaScript',
        },
        {
          id: 3,
          title: 'CSS Masterclass',
          instructor: 'Peter Jones',
          progress: 90,
          lastAccessed: '2023-10-15',
          image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=CSS',
        },
      ];
      setPurchasedCourses(dummyCourses);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading courses...</p>
      ) : purchasedCourses.length === 0 ? (
        <p className="text-center text-gray-600">You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
                <p className="text-gray-600 text-xs mb-0.5">Instructor: {course.instructor}</p>
                <p className="text-gray-600 text-xs mb-0.5">Progress: {course.progress}%</p>
                <p className="text-gray-600 text-xs mb-3">Last Accessed: {course.lastAccessed}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded">
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
