// components/TrendingJobCard.jsx
import React from 'react';

const TrendingJobCard = ({ job }) => {
  return (
    <div className="bg-white p-5 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold">{job.title}</h3>
        <div>
          {job.new && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">New Job</span>}
          {job.featured && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Featured</span>}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mb-3">{job.company}</p>
      
      <div className="flex flex-wrap gap-3 text-xs mb-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
          <span>{job.salary}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">1 day ago</span>
        <button className="text-xs text-blue-500 hover:text-blue-700 px-3 py-1 border border-blue-500 rounded hover:bg-blue-50 transition-colors">View Job</button>
      </div>
    </div>
  );
};

export default TrendingJobCard;