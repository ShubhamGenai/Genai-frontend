import React from 'react';
import TestCard from './TestCard';

const TestListing = ({ tests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tests.map(test => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  );
};

export default TestListing;