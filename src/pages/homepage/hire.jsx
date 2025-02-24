import React from 'react';

const HireSection = () => {
  return (
    <div className="flex items-center w-full pb-16">
      <div className="w-full mx-auto max-w-[1520px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Learners Section */}
          <div className="bg-blue-600 text-white p-6 sm:p-8 md:p-12 lg:p-32">
            <div className="max-w-md mx-auto md:ml-0">
              <h4 className="text-sm font-semibold mb-4 tracking-wider">FOR LEARNERS</h4>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight">
                <span className="font-bold">Empower</span> Your<br className="hidden sm:block" /> Learning Journey
              </h2>
              <p className="mb-6 text-sm sm:text-base opacity-90">
                The Mentor: Top mentors, curated courses,
                and<br/> personalized guidance to elevate your
                academic<br/> and professional growth. Start
                your success story<br/> today.
              </p>
              <button className="bg-transparent border border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold flex items-center mt-6 sm:mt-10 hover:bg-white/10 transition-colors">
                Start Learning <span className="ml-2">→</span>
              </button>
            </div>
          </div>

          {/* Employers Section */}
          <div className="bg-[rgba(167,221,183,0.1)] text-black p-6 sm:p-8 md:p-12 lg:pt-32">
            <div className="max-w-md ml-0 md:ml-32 md:mr-0">
              <h4 className="text-sm text-green-600 font-semibold mb-4 tracking-wider">FOR EMPLOYERS</h4>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight">
                <span className="font-bold">Hire</span> Top Talent, Smarter<br className="hidden sm:block" />  and Faster
              </h2>
              <p className="mb-6 text-sm sm:text-base text-gray-700">
                Discover pre-assessed candidates tailored
                to your<br/> needs with AI-powered precision.
                Save time,<br/> reduce effort, and build your
                dream team today.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold flex items-center mt-6 sm:mt-10 transition-colors">
                Start Hiring <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireSection;
