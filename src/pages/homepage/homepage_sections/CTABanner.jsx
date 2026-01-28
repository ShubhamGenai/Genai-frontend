import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Play } from 'lucide-react';

export default function CTABanner() {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/learn');
  };

  const handleScheduleDemo = () => {
    navigate('/learn');
  };

  return (
    <section className="w-full bg-blue-600 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
          Unlock Economic Benefits with<br />
          AI-Powered Learning
        </h2>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto font-light">
          Join thousands of learners who have transformed their careers with our platform
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleStartLearning}
            className="w-full sm:w-auto bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Start Learning Today
          </button>
          
          <button
            onClick={handleScheduleDemo}
            className="w-full sm:w-auto bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
