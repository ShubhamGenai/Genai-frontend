import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Text, Input, and Button */}
      <div className="flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
          Unlock Your Potential with GenAI Courses!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Your next career move starts with the right course—let’s find yours and take the first step toward success with expert-led learning!
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder="Search for courses (e.g., Data Science, MBA, AI)"
            className="w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-700 shadow-sm"
          />
          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-700">
            Browse Courses
          </button>
        </div>
      </div>
      {/* Right Column: Placeholder Image */}
      <div className="bg-gray-600 rounded-lg h-64 w-full"></div>
    </section>
  );
};

export default Hero;
