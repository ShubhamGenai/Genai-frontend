// components/StatsSection.jsx
import React from 'react';

const StatsSection = () => {
  return (
    <section className="py-16 px-8 md:px-16 bg-white">
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-3xl font-bold mb-1">5,000</h3>
          <p className="text-gray-500">Jobs</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-1">6,500</h3>
          <p className="text-gray-500">Students Applied</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-1">4,000</h3>
          <p className="text-gray-500">Hired</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;