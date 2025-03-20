// components/TrendingJobs.jsx
import React from 'react';
import TrendingJobCard from './TrendingJobCards';

const TrendingJobs = ({ jobs }) => {
  return (
    <section className="bg-gray-200 py-10 px-8 md:px-16 mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Trending Jobs</h2>
        <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center transition-colors">
          Explore Trending Jobs 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">The better your skill, the brighter your career. Try the Dashboard, showcase your skills, and grab exclusive job offers from leading recruiters.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map(job => (
          <TrendingJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default TrendingJobs;