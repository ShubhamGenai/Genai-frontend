import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-sm rounded-lg p-5 sm:p-7">
    <div className="mb-2">
      <img src={icon} alt={`${title} icon`} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
    </div>
    <h3 className="font-semibold text-base sm:text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-sm">{description}</p>
  </div>
);

const WhyGenAiLearning = () => {
  return (
    <div className="flex justify-center items-center bg-blue-50">
      <div className="mx-auto px-4 sm:px-6 py-20 sm:py-20 grid grid-cols-1 md:grid-cols-2 sm:ml-20 sm:mr-20 max-w-7xl">
        <div className="mt-8 sm:mt-36">
          <h2 className="text-2xl sm:text-4xl mb-4">
            <span className="font-semibold">Why, </span>
            <span className="text-blue-600 font-semibold">GenAi Learning?</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            With 1.8+ Crore Students and one of the best selection rates in <br/>India amongst online learning platforms, you can surely rely on<br/> us to excel.
          </p>
          <Link to="/login-landing">
      
          <button className="bg-blue-600 text-white px-4 sm:px-6 py-4 rounded-md font-semibold flex items-center">
            Get started for free <span className="ml-2 font-semibold">→</span>
          </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 sm:-ml-10">
          <FeatureCard
            icon="./leaderboard/Guidence.png"
            title="Personalized Guidance"
            description="We’ve guided over 4,000 learners to success and gained knowledge."
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
            description="We’ve guided over 4,000 learners to success and gained knowledge."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyGenAiLearning;
