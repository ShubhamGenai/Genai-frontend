// components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-5 rounded shadow-sm mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-3">
        <Link to="/job-details">
        <div>
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        </Link>
        <div className="flex space-x-2">
          {job.new && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">New Job</span>}
          {job.featured && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Featured</span>}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 text-sm mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
          <span>{job.salary}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">1 day ago</span>
        <div className="flex items-center">
          <div className="bg-gray-200 text-xs px-3 py-1 rounded mr-3">Good Match</div>
          <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors">Incomplete profile to apply</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;