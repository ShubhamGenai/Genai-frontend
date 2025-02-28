// Category.jsx
import React, { useState } from "react";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState("Data Analyst");

  const categories = ['Data Analyst', 'Management', 'Web Development', 'Marketing'];
  
  // State to manage the active category, defaulting to "Data Analyst"
  const [activeCategory, setActiveCategory] = useState('Data Analyst');

  // Handlers for button clicks (placeholders for actual functionality)
  const handleAllCategoriesClick = () => {
    console.log('All Categories clicked - implement dropdown or navigation here');
    // Future enhancement: Open a dropdown or navigate to a full categories page
  };

  const handleFilterClick = () => {
    console.log('Filter clicked - implement filter modal or logic here');
    // Future enhancement: Open a filter modal or apply filtering logic
  };

  const handleSortClick = () => {
    console.log('Sort clicked - implement sort dropdown or logic here');
    // Future enhancement: Open a sort dropdown or apply sorting logic
  };

  // Example sidebar filters (you can replace with real data or more dynamic options)
  const [showCategories, setShowCategories] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showDuration, setShowDuration] = useState(true);

  // Example data for courses
  const courses = [
    {
      id: 1,
      label: "Free",
      title: "Data Analyst free course for beginners",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
    {
      id: 2,
      label: "Premium",
      title: "Prompt Engineering free course for beginners",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
    {
      id: 3,
      label: "Premium",
      title: "Design with AI (AI advance design course)",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
    {
      id: 4,
      label: "Free",
      title: "Data Analyst free course for beginners",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
    {
      id: 5,
      label: "Premium",
      title: "Prompt Engineering free course for beginners",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
    {
      id: 6,
      label: "Premium",
      title: "Design with AI (AI advance design course)",
      learners: "54.5k",
      duration: "2 hours",
      rating: 4.8,
      ratingCount: "2.7k",
      image: "https://via.placeholder.com/400x250?text=Course+Image",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      {/* Top Section: Title and Category Tabs */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Explore Courses &amp; Start Learning</h1>
        
      </div>

      <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Explore Courses & Start Learning
        </h1>

        {/* Categories and Buttons Container */}
        <div className="flex items-center justify-between">
          {/* Categories and All Categories Link */}
          <div className="flex items-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`text-blue-900 text-lg hover:underline ${
                  activeCategory === category ? 'border-b-2 border-blue-900' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
            <button
              className="text-blue-900 text-lg"
              onClick={handleAllCategoriesClick}
            >
              All Categories →
            </button>
          </div>

          {/* Filter and Sort Buttons */}
          <div className="flex space-x-2">
            <button
              className="bg-black text-white rounded-lg px-4 py-2 text-base"
              onClick={handleFilterClick}
            >
              Filter
            </button>
            <button
              className="bg-white text-black border border-black rounded-lg px-4 py-2 text-base shadow-sm"
              onClick={handleSortClick}
            >
              Sort
            </button>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-200 mt-4"></div>
      </div>
    </section>

   

      {/* Main Content: Sidebar + Courses Grid */}
      <div className="mx-auto w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-md p-4 shadow">
          {/* Categories */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowCategories(!showCategories)}
            >
              <h2 className="font-semibold text-lg">Categories</h2>
              <span>{showCategories ? "−" : "+"}</span>
            </div>
            {showCategories && (
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Data Analyst</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Web Development</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>AI</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Management</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Marketing</span>
                </label>
              </div>
            )}
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowRatings(!showRatings)}
            >
              <h2 className="font-semibold text-lg">Ratings</h2>
              <span>{showRatings ? "−" : "+"}</span>
            </div>
            {showRatings && (
              <div className="mt-2 space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>4.5 &amp; up</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>4.0 &amp; up</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>3.5 &amp; up</span>
                </label>
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowDuration(!showDuration)}
            >
              <h2 className="font-semibold text-lg">Duration</h2>
              <span>{showDuration ? "−" : "+"}</span>
            </div>
            {showDuration && (
              <div className="mt-2 space-y-2 text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>0-2 hours</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>3-6 hours</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>7-14 hours</span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* Courses Grid */}
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-md shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  {/* Label (Free/Premium) */}
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded 
                      ${
                        course.label === "Free"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {course.label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{course.title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {course.learners} Learners &middot; {course.duration}
                  </div>
                  <div className="flex items-center text-xs">
                    {/* Star icon(s) */}
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.064 9.394c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.967z" />
                    </svg>
                    <span className="mr-1">{course.rating}</span>
                    <span className="text-gray-400">({course.ratingCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
