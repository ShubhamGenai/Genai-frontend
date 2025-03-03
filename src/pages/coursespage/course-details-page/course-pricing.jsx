import React from 'react';
export const CoursePricing = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 border-t border-gray-300">
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">₹620</span>
              <span className="text-gray-500 line-through ml-2 text-sm">₹950.00</span>
            </div>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">65% OFF</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">This Course Includes:</h3>
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">Lifetime Access</p>
              <p className="text-xs text-gray-600">Learn at your own pace, anytime, anywhere</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">Certificate of Completion</p>
              <p className="text-xs text-gray-600">Verified proof of your skills</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">Hands-on Projects</p>
              <p className="text-xs text-gray-600">Real-world case studies to build your portfolio</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">AI-Powered Quizzes</p>
              <p className="text-xs text-gray-600">Smart assessments to track progress</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1 mr-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium">Downloadable Resources</p>
              <p className="text-xs text-gray-600">Templates, datasets, and study materials</p>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-gray-700 text-white text-sm font-medium py-2 rounded mb-3">
          Add to Cart
        </button>
        <button className="w-full border border-gray-300 text-sm font-medium py-2 rounded mb-6">
          Buy Now
        </button>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Upgrade to GenAI Plus & Access 100+ Premium Courses!</h3>
          <div className="space-y-3 mb-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>Exclusive AI-powered learning tools</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>Advanced career insights & job matching</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>Priority support & mentorship</span>
            </div>
          </div>
          <button className="w-full border border-gray-300 text-sm font-medium py-2 rounded">
            Subscribe Now
          </button>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Instructor Details</h3>
          <div className="bg-gray-50 rounded-lg p-4 h-48"></div>
        </div>
      </div>
    );
  };