import React from 'react';
export const CourseContent = () => {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Master data wrangling, visualization, and storytelling</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Master data wrangling, visualization, and storytelling</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Work with real datasets to gain hands-on experience</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Work with real datasets to gain hands-on experience</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Build a strong data portfolio for job applications</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span>Build a strong data portfolio for job applications</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Course Description</h2>
          <p className="text-gray-700 mb-4 text-sm">
            This comprehensive Data Analyst course is designed for absolute beginners as well as professionals looking to 
            enhance their skills. By the end of this course, you will be able to analyze data, visualize insights, and make data-driven 
            decisions using industry-standard tools.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Who should take this course?</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Anyone interested in data analysis & visualization</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Students & professionals looking for career growth in analytics</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Entrepreneurs & business owners wanting data-driven strategies</span>
            </li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Requirements</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>No prior experience required</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Basic knowledge of Excel (recommended but not mandatory)</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b pb-2">
              <span>Module 1: Introduction to Data Analysis</span>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Module 2: Excel for Data Analysis</span>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Module 3: SQL for Data Analysis</span>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Module 4: Python for Data Analysis</span>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Module 5: Power BI & Tableau</span>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  