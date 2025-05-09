// components/FaqSection.jsx
import React from 'react';

const FaqSection = ({ faqs }) => {
  return (
    <section className="bg-white rounded-2xl shadow p-10 my-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">FAQ Section</h2>
      <div className="space-y-4">
        {(faqs || [1, 2, 3, 4]).map((item, idx) => (
          <div 
            key={item.id || idx} 
            className="bg-gray-100 h-14 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center px-6 text-gray-700 text-base font-medium shadow-sm"
            onClick={() => alert(`FAQ item ${item.id || item} clicked`)}
          >
            <span>{item.question || `FAQ Question ${item}`}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;