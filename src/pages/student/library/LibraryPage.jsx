import React from 'react';
import { BookOpenIcon, SearchIcon, FilterIcon, StarIcon, ClockIcon, UsersIcon } from 'lucide-react';

const LibraryPage = () => {
  // Sample library data
  const libraryItems = [
    {
      id: 1,
      title: "Complete React Guide",
      type: "Course",
      category: "Web Development",
      rating: 4.8,
      duration: "12 hours",
      students: 1250,
      image: "/public/courses/react.jpg",
      description: "Master React from basics to advanced concepts"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      type: "Book",
      category: "Programming",
      rating: 4.6,
      duration: "8 hours",
      students: 2100,
      image: "/public/courses/js.jpg",
      description: "Learn JavaScript from scratch with practical examples"
    },
    {
      id: 3,
      title: "Python for Data Science",
      type: "Course",
      category: "Data Science",
      rating: 4.9,
      duration: "15 hours",
      students: 1800,
      image: "/public/courses/python.jpg",
      description: "Complete Python course for data analysis and ML"
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      type: "Course",
      category: "Design",
      rating: 4.7,
      duration: "10 hours",
      students: 950,
      image: "/public/courses/design.jpg",
      description: "Learn modern UI/UX design principles and tools"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      type: "Book",
      category: "AI/ML",
      rating: 4.5,
      duration: "6 hours",
      students: 1400,
      image: "/public/courses/ml.jpg",
      description: "Introduction to machine learning concepts"
    },
    {
      id: 6,
      title: "Database Design",
      type: "Course",
      category: "Backend",
      rating: 4.4,
      duration: "9 hours",
      students: 1100,
      image: "/public/courses/database.jpg",
      description: "Learn database design and optimization"
    }
  ];

  const categories = ["All", "Web Development", "Programming", "Data Science", "Design", "AI/ML", "Backend"];
  const types = ["All", "Course", "Book", "Video", "Article"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpenIcon className="w-8 h-8 text-blue-600" />
                Library
              </h1>
              <p className="text-gray-600 mt-2">Explore our collection of courses, books, and resources</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search library..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FilterIcon className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Library Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <BookOpenIcon className="w-16 h-16 text-blue-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{item.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Load More Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
