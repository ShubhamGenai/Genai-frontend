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
    <div className="text-center">
      <h3 className="text-3xl font-bold">{displayValue.toLocaleString()}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Stats = ({ statsData }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <StatItem value={statsData.jobs} label="Jobs" />
      <StatItem value={statsData.studentsApplied} label="Students Applied" />
      <StatItem value={statsData.hired} label="Hired" />
    </section>
  );
};

export default Stats;
