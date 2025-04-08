import React from 'react';

const StatsSection = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">
        <div>
          <h2 className="text-3xl font-bold">5,000</h2>
          <p className="text-gray-600">Enrolled Courses</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">6,500</h2>
          <p className="text-gray-600">Free Courses</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">4,000</h2>
          <p className="text-gray-600">Earned Skills</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;