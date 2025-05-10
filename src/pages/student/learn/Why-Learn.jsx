import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-all hover:shadow-md">
      <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const WhyLearn = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">ELEVATE YOUR SKILLS</span>
          <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-900">Why Learn with GenAI?</h2>
          <p className="text-gray-600 text-sm">Our AI-powered platform delivers a revolutionary learning experience tailored to your unique goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            }
            title="Personalized AI Learning"
            description="Our advanced AI analyzes your learning patterns and adapts in real-time, creating a completely customized curriculum that evolves with your progress."
          />
          
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            }
            title="Industry-Aligned Projects"
            description="Build a compelling portfolio with projects that solve real-world challenges. Our curriculum is developed in partnership with industry leaders."
          />
          
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            }
            title="Recognized Certifications"
            description="Earn credentials recognized by leading employers across industries and provide verifiable proof of your expertise in today's competitive marketplace."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyLearn;