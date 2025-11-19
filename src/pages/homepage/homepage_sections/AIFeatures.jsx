import React from 'react';
import { Brain, Target, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Tutoring',
    description: 'Get instant answers to your doubts with our intelligent AI tutor available 24/7',
    color: 'blue',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    icon: Target,
    title: 'Adaptive Learning',
    description: 'Content that adapts to your learning pace and style for maximum retention',
    color: 'green',
    bgColor: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Track your progress with detailed insights and personalized recommendations',
    color: 'blue',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  }
];

export default function AIFeatures() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-3">
            Uploading your Future with AI -{' '}
            <span className="text-blue-600 font-medium">Simpler, Faster, Better</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Experience the next generation of learning with our advanced AI technology
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-lg p-4 lg:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
