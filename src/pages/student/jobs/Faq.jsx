// components/FaqSection.jsx
import React from 'react';

const FaqSection = () => {
  return (
    <section className="py-10 px-8 md:px-16 bg-gray-50">
      <div className="flex items-center mb-8">
      
        <h2 className="text-xl font-bold">FAQ Section</h2>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3, 4].map(item => (
          <div 
            key={item} 
            className="bg-gray-200 h-14 rounded cursor-pointer hover:bg-gray-300 transition-colors flex items-center px-5"
            onClick={() => alert(`FAQ item ${item} clicked`)}
          >
            <span className="text-gray-400">FAQ Question {item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;