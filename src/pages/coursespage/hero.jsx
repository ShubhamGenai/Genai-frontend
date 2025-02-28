import { useState } from "react";
import React from "react";

const Hero = () => {
  const topics = [
    "Data Science",
    "Management",
    "Web Development",
    "Marketing",
    "Govt. Exams",
    "ChatGPT & AI",
  ];

  const [activeTopic, setActiveTopic] = useState("Data Science");

  return (
    <div>
      <section className="bg-gray-200 -mt-20 py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-[54px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Text, Input, and Button */}
            <div className="flex flex-col items-start">
              <h1 className="text-3xl md:text-4xl text-blue-900 font-semibold">
                Unlock Your Potential with <span className="font-bold"> GenAI Courses!</span>
              </h1>
              <p className="mt-4 text-lg md:text-base text-gray-700 mb-5">
                Your next career move starts with the right course—let’s find yours and
                take the first step toward success with expert-led learning!
              </p>
              <div className="flex items-center bg-white p-2 rounded-lg border border-gray-300 w-full max-w-[540px]">
                <input
                  type="text"
                  placeholder="Search for courses (e.g., Data Science, MBA, AI)"
                  className="flex-1 px-4 py-3 text-base text-gray-600 placeholder-gray-500 focus:outline-none rounded-l-lg"
                />
                <button className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg text-base">
                  Browse Courses
                </button>
              </div>
            </div>
            {/* Right Column: Placeholder for an Image or Content */}
            <div className="flex justify-end">
              <div className="bg-gray-600 rounded-lg max-w-[320px] w-full h-[260px] -mt-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="px-6 py-6 md:py-8 md:px-[104px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Topics</h2>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setActiveTopic(topic)}
              className={`px-5 py-2 text-base border rounded-md font-semibold transition ${
                activeTopic === topic
                  ? "bg-gray-900 text-white"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
