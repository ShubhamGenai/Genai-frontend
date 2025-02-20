import React from 'react';

const HireSection = () => {
  return (
    <div className="flex items-center lg:min-h-screen sm:mt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto">

        {/* Learners Section */}
        <div className="bg-blue-600 text-white p-8 sm:p-16 md:p-32">
          <div className="sm:ml-10 md:ml-32">
            <h4 className="text-sm font-semibold mb-4">FOR LEARNERS</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">
              <span className="font-bold">Empower</span> Your<br /> Learning Journey
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              The Mentor: Top mentors, curated courses,<br />
              and personalized guidance to elevate your<br />
              academic and professional growth. Start<br />
              your success story today.
            </p>
            <button className="bg-transparent border border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold flex items-center mt-10">
              Start Learning <span className="ml-2">→</span>
            </button>
          </div>
        </div>

        {/* Employers Section */}
        <div className="bg-white text-black p-8 sm:p-16 md:p-32">
          <div className="sm:mr-10 md:mr-28">
            <h4 className="text-sm text-green-600 font-semibold mb-4">FOR EMPLOYERS</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">
              <span className="font-bold">Hire</span> Top Talent, Smarter and Faster
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              Discover pre-assessed candidates tailored<br />
              to your needs with AI-powered precision.<br />
              Save time, reduce effort, and build your<br />
              dream team today.
            </p>
            <button className="bg-blue-600 border border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold flex items-center mt-10">
              Start Hiring <span className="ml-2">→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HireSection;