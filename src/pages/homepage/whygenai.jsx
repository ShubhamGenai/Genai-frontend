import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-sm hover:shadow-lg rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-7 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
    <div className="mb-3 sm:mb-4">
      <img src={icon} alt={`${title} icon`} className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain group-hover:scale-110 transition-transform duration-300" />
    </div>
    <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
    <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
  </div>
);

const WhyGenAiLearning = () => {
  return (
    <div className="flex justify-center items-center bg-blue-50">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl">
        <div className="mt-0 sm:mt-8 lg:mt-16 xl:mt-24">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-3 sm:mb-4 lg:mb-6">
            <span className="font-semibold">Why, </span>
            <span className="text-blue-600 font-semibold">GenAi Learning?</span>
          </h2>
          <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            With 1.8+ Crore Students and one of the best selection rates in India amongst online learning platforms, you can surely rely on us to excel.
          </p>
          <Link to="/login-landing">
            <button className="bg-blue-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-semibold flex items-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get started for free <span className="ml-2 font-semibold group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-7">
          <FeatureCard
            icon="./leaderboard/Guidence.png"
            title="Personalized Guidance"
            description="We've guided over 4,000 learners to success and gained knowledge."
          />
          <FeatureCard
            icon="./leaderboard/Mentors.png"
            title="Expert Mentors"
            description="Our network of industry leaders ensures your growth."
          />
          <FeatureCard
            icon="./leaderboard/Results.png"
            title="Proven Results"
            description="Trusted by learners and professionals worldwide."
          />
          <FeatureCard
            icon="./leaderboard/Pguide.png"
            title="Personalized Guidance"
            description="We've guided over 4,000 learners to success and gained knowledge."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyGenAiLearning;
