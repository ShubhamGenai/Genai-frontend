import React from 'react';
import { GraduationCap, Award, Briefcase, ArrowRight, BookOpen } from 'lucide-react';

const items = [
  {
    icon: BookOpen,
    title: 'School Students (11-12)',
    desc: 'NCERT-aligned curriculum with interactive lessons and doubt-clearing AI assistant',
  },
  {
    icon: Award,
    title: 'Competitive Exam Aspirants',
    desc: 'Comprehensive preparation for NEET, JEE, SSC, IBPS with AI-powered mock tests',
  },
  {
    icon: Briefcase,
    title: 'Working Professionals',
    desc: 'Upskill with Digital Marketing, AI Workflows, and cutting-edge tech courses',
  },
];

export default function AudiencePrograms() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef5ff] via-[#f2f7ff] to-[#eaf2ff]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
          Our Platform, <span className="text-blue-600 font-semibold">Many Possibilities</span>
        </h2>
        <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
          Empowering learners across all age groups with cutting-edge AI technology
        </p>

        {/* Content grid */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(30,64,175,0.25)] group cursor-pointer">
              <img 
                src="/public/learn/hero.jpeg" 
                alt="Learning" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Right list */}
          <div className="order-1 lg:order-2 space-y-6">
            {items.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-5 h-5 text-blue-700 group-hover:text-emerald-800 group-hover:scale-110 transition-all duration-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">{title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1 group-hover:text-gray-700 transition-colors duration-300">{desc}</p>
                </div>
              </div>
            ))}

            <button className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 group">
              Explore All Programs 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


