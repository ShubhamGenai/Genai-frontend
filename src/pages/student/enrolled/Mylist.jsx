import { useState } from "react";
import { BookOpen, Clock, Award, Star, Calendar, CheckCircle, BarChart2, BookMarked, BookCheck, PieChart, AlertCircle, Play, FileText } from "lucide-react";

export default function EnrolledCoursesPage() {
  const [activeTab, setActiveTab] = useState("courses");
  
  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced JavaScript Mastery",
      description: "Master JavaScript with this comprehensive course covering ES6+, async programming, design patterns, and performance optimization.",
      instructor: "Sarah Johnson",
      progress: 65,
      lastAccessed: "Yesterday",
      deadline: "May 15, 2025",
      image: "/api/placeholder/400/225",
      modules: [
        { name: "JavaScript Fundamentals", completed: true, score: 92 },
        { name: "ES6+ Features", completed: true, score: 88 },
        { name: "Asynchronous Programming", completed: true, score: 75 },
        { name: "Design Patterns", completed: false, score: null },
        { name: "Performance Optimization", completed: false, score: null }
      ]
    },
    {
      id: 2,
      title: "Data Science Foundations",
      description: "Learn the fundamentals of data science including statistics, Python, data visualization, and machine learning basics.",
      instructor: "Dr. Michael Chen",
      progress: 30,
      lastAccessed: "3 days ago",
      deadline: "June 20, 2025",
      image: "/api/placeholder/400/225",
      modules: [
        { name: "Statistics Foundations", completed: true, score: 85 },
        { name: "Python for Data Analysis", completed: false, score: null },
        { name: "Data Visualization", completed: false, score: null },
        { name: "Machine Learning Introduction", completed: false, score: null },
        { name: "Data Science Projects", completed: false, score: null }
      ]
    },
    {
      id: 3,
      title: "UX/UI Design Masterclass",
      description: "Complete guide to UX/UI design principles, wireframing, prototyping, and user testing methodologies.",
      instructor: "Emma Rodriguez",
      progress: 10,
      lastAccessed: "1 week ago",
      deadline: "July 5, 2025",
      image: "/api/placeholder/400/225",
      modules: [
        { name: "Design Thinking Process", completed: true, score: 90 },
        { name: "User Research Methods", completed: false, score: null },
        { name: "Wireframing & Prototyping", completed: false, score: null },
        { name: "Visual Design Principles", completed: false, score: null },
        { name: "User Testing", completed: false, score: null }
      ]
    }
  ];

  const upcomingTests = [
    {
      id: 1,
      title: "JavaScript Design Patterns",
      courseTitle: "Advanced JavaScript Mastery",
      date: "April 28, 2025",
      time: "10:00 AM - 11:30 AM",
      duration: "90 minutes",
      questions: 25,
      type: "Multiple Choice & Coding",
      status: "upcoming",
      passingScore: 70
    },
    {
      id: 2,
      title: "Python Data Analysis",
      courseTitle: "Data Science Foundations",
      date: "May 3, 2025",
      time: "2:00 PM - 3:30 PM",
      duration: "90 minutes",
      questions: 30,
      type: "Multiple Choice & Practical",
      status: "upcoming",
      passingScore: 65
    }
  ];

  const completedTests = [
    {
      id: 3,
      title: "JavaScript Fundamentals",
      courseTitle: "Advanced JavaScript Mastery",
      date: "April 10, 2025",
      duration: "60 minutes",
      questions: 20,
      score: 92,
      status: "passed",
      passingScore: 70
    },
    {
      id: 4,
      title: "ES6+ Features Quiz",
      courseTitle: "Advanced JavaScript Mastery",
      date: "April 15, 2025",
      duration: "45 minutes",
      questions: 15,
      score: 88,
      status: "passed",
      passingScore: 70
    },
    {
      id: 5,
      title: "Statistics Foundations",
      courseTitle: "Data Science Foundations",
      date: "March 25, 2025",
      duration: "60 minutes",
      questions: 20,
      score: 85,
      status: "passed",
      passingScore: 65
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
          <p className="mt-2 text-blue-100">Track your progress, manage your courses, and prepare for upcoming tests</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === "courses" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <BookMarked size={18} className="mr-2" />
              MY COURSES
            </button>
            <button 
              onClick={() => setActiveTab("tests")}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === "tests" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <FileText size={18} className="mr-2" />
              MY TESTS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        {activeTab === "courses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Enrolled Courses</h2>
              <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {enrolledCourses.length} Active Courses
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-600" />
                Learning Progress Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Average Progress</div>
                    <div className="text-lg font-bold text-blue-600">
                      {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Modules Completed</div>
                    <div className="text-lg font-bold text-green-600">
                      {enrolledCourses.flatMap(course => course.modules).filter(module => module.completed).length}/
                      {enrolledCourses.flatMap(course => course.modules).length}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(enrolledCourses.flatMap(course => course.modules).filter(module => module.completed).length / enrolledCourses.flatMap(course => course.modules).length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Tests Passed</div>
                    <div className="text-lg font-bold text-purple-600">
                      {completedTests.filter(test => test.status === "passed").length}/
                      {completedTests.length + upcomingTests.length}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(completedTests.filter(test => test.status === "passed").length / (completedTests.length + upcomingTests.length)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Listing */}
            <div className="space-y-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <div className="relative h-full">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <div>
                            <div className="text-white text-sm font-medium">Progress: {course.progress}%</div>
                            <div className="w-full bg-gray-200/50 rounded-full h-1.5 mt-1">
                              <div 
                                className={`h-1.5 rounded-full ${course.progress > 75 ? "bg-green-500" : course.progress > 25 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center">
                            <Play size={16} className="mr-1" />
                            Continue
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1 text-gray-400" />
                          Last accessed: {course.lastAccessed}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1 text-gray-400" />
                          Deadline: {course.deadline}
                        </div>
                      </div>
                      
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-3">Course Modules</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.modules.map((module, idx) => (
                            <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-lg">
                              {module.completed ? (
                                <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0"></div>
                              )}
                              <div className="flex-grow">
                                <div className="text-sm font-medium">{module.name}</div>
                                {module.completed && (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    Score: <span className="font-medium text-blue-600">{module.score}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tests" && (
          <div>
            {/* Upcoming Tests */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <AlertCircle size={22} className="mr-2 text-orange-500" />
                  Upcoming Tests
                </h2>
                <div className="text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                  {upcomingTests.length} Scheduled
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingTests.map((test) => (
                      <tr key={test.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{test.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {test.courseTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{test.date}</div>
                          <div className="text-sm text-gray-500">{test.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {test.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{test.questions} questions</div>
                          <div className="text-sm text-gray-500">{test.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-lg">
                            Prepare
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Completed Tests */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <BookCheck size={22} className="mr-2 text-green-500" />
                  Completed Tests
                </h2>
                <div className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                  {completedTests.length} Completed
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTests.map((test) => (
                  <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{test.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{test.courseTitle}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          test.status === "passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {test.status === "passed" ? "Passed" : "Failed"}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Your Score</span>
                          <span className="font-medium">{test.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              test.score >= test.passingScore + 10 ? "bg-green-500" : 
                              test.score >= test.passingScore ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${test.score}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-gray-500">0%</span>
                          <span className="text-gray-500 relative">
                            <span className="absolute transform -translate-x-1/2" style={{ left: `${test.passingScore}%` }}>
                              Pass: {test.passingScore}%
                            </span>
                          </span>
                          <span className="text-gray-500">100%</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 text-sm">
                        <div className="flex justify-between">
                          <div className="text-gray-500">Date Taken</div>
                          <div>{test.date}</div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="text-gray-500">Duration</div>
                          <div>{test.duration}</div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="text-gray-500">Questions</div>
                          <div>{test.questions}</div>
                        </div>
                      </div>
                      
                      <button className="mt-6 w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg text-sm">
                        View Detailed Results
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}