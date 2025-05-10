import React, { useState, useEffect } from 'react';

const StatItem = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // Total animation time (ms)
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
    <div className="text-center">
      <h2 className="text-3xl font-bold">{displayValue.toLocaleString()}</h2>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatItem value={5000} label="Enrolled Courses" />
        <StatItem value={6500} label="Free Courses" />
        <StatItem value={4000} label="Earned Skills" />
      </div>
    </div>
  );
};

export default StatsSection;
