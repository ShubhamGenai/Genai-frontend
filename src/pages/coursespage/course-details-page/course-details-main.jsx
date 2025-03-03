import React, { useEffect } from 'react';
import { CourseHeader } from './course-header';
import { CourseContent } from './course-content';
import { CoursePricing } from './course-pricing';
import { TestSection } from './Test-section/Test';
import ReviewSection from './Test-section/Review-section';

export const CourseDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="min-h-screen font-sans relative">
      {/* Full-width header background container */}
      <div className="w-full bg-gray-200 absolute top-0 h-100 z-0"></div>

      <div className="max-w-6xl mx-auto p-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-7/12">
            <CourseHeader />
            <CourseContent />
           
          </div>

          {/* Right Column - Sticky Pricing Section */}
          <div className="md:w-5/12">
            <div className="md:sticky md:top-8 relative z-20  pt-6">
              <CoursePricing />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Review Section */}
      <div className="w-full bg-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
        <TestSection />
          <ReviewSection />
        </div>
      </div>

      {/* Full-Width FAQ Section */}
      <div className="w-full bg-gray-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">FAQ Section</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="h-14 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-14 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-14 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-14 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
