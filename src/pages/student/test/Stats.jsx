import React, { useState, useEffect } from 'react';

const StatItem = ({ value, label }) => {
  // Add animation to count up from 0
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // ms
    const steps = 50;
    const stepValue = value / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">{displayValue.toLocaleString()}</h3>
      <p className="text-gray-600 text-lg font-medium">{label}</p>
    </div>
  );
};

const Stats = ({ statsData }) => {
  return (
    <section className="bg-white  p-8 my-12 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl">
        <StatItem value={statsData.jobs} label="Jobs" />
        <StatItem value={statsData.studentsApplied} label="Students Applied" />
        <StatItem value={statsData.hired} label="Hired" />
      </div>
    </section>
  );
};

export default Stats;
