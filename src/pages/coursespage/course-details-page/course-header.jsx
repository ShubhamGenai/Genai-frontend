import React from 'react';
export const CourseHeader = () => {
    return (
      <div  className="w-full bg-cover bg-center  -mt-20 py-20 md:py-24"
      style={{ backgroundImage: "url('your-image-url.jpg')" }}
    >
         
     
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Analyst Mastery Course</h1>
        
        <p className="text-gray-700 mb-4 text-sm">
          Become a job-ready Data Analyst with hands-on projects, real-world case studies, and AI-powered learning tools. Master Excel, SQL, Python, Power BI, and more!
        </p>
        
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm font-medium">Rahul Chouhan</span>
          <span className="text-gray-500 text-xs ml-2">Instructor</span>
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span>Hands-on projects & real-world case studies</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span>Learn SQL, Excel, Python, Power BI & Tableau</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span>AI-powered career recommendations</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span>Includes skill tests & job placement assistance</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Duration</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">2 Hours</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Reviews</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">4.8 (2,356)</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Level</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">Beginner</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Students</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">3,560</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };