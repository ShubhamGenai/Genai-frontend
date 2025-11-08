import React, { useState, useEffect } from 'react';

const MyJobApplications = () => {
  const [loading, setLoading] = useState(true);
  const [applicationStats, setApplicationStats] = useState({});
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const dummyStats = {
        totalApplications: 8,
        inReview: 3,
        shortlisted: 2,
        interviews: 1,
      };

      const dummyApplications = [
        {
          id: 1,
          title: 'AI/ML Engineer',
          type: 'Full-time',
          company: 'Google',
          location: 'Bangalore, India',
          salary: '₹25-35 LPA',
          appliedDate: 'Nov 20, 2024',
          match: 92,
          status: 'In Review',
          nextStep: 'Technical Interview scheduled for Nov 28',
          lastUpdated: '2 days ago',
        },
        {
          id: 2,
          title: 'Digital Marketing Specialist',
          type: 'Full-time',
          company: 'Amazon',
          location: 'Mumbai, India',
          salary: '₹10-15 LPA',
          appliedDate: 'Nov 18, 2024',
          match: 80,
          status: 'Shortlisted',
          nextStep: null,
          lastUpdated: '3 days ago',
        },
      ];

      setApplicationStats(dummyStats);
      setJobApplications(dummyApplications);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Job Applications</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading job applications...</p>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <p className="text-2xl font-bold">{applicationStats.totalApplications}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                {/* Icon for Total Applications */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 7.5V12m0 0l3 4.5V12m-3 0h6m6 0L12 7.5V12m0 0l3 4.5V12m-3 0h6m-6 0v-4.5m0 4.5V12m0 0h6m-6 0v-4.5m0 4.5V12m0 0h6m-6 0v-4.5M12 21.75l-4.5-4.5V12.75l4.5 4.5 4.5-4.5V12.75l-4.5 4.5 4.5-4.5V12.75l-4.5 4.5-4.5-4.5V12.75m0-9l4.5 4.5V12l-4.5 4.5-4.5-4.5V12l4.5-4.5 4.5-4.5V12" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Review</p>
                <p className="text-2xl font-bold">{applicationStats.inReview}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                {/* Icon for In Review */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43-.001.639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Shortlisted</p>
                <p className="text-2xl font-bold">{applicationStats.shortlisted}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                {/* Icon for Shortlisted */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Interviews</p>
                <p className="text-2xl font-bold">{applicationStats.interviews}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                {/* Icon for Interviews */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Looking for more opportunities banner */}
          <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Looking for more opportunities?</h2>
              <p className="text-sm">Browse our latest job postings</p>
            </div>
            <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-md hover:bg-gray-100">
              Explore Jobs
            </button>
          </div>

          {/* Your Applications Section */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Applications</h2>
            <div className="flex space-x-2">
              <button className="bg-gray-200 text-gray-800 py-1.5 px-3 rounded-md text-sm">Filter</button>
              <button className="bg-gray-200 text-gray-800 py-1.5 px-3 rounded-md text-sm">Sort</button>
            </div>
          </div>

          <div className="space-y-4">
            {jobApplications.map((application) => (
              <div key={application.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 p-3 rounded-md mr-4">
                    {/* Placeholder for company logo/icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-19.5 0A2.25 2.25 0 005.25 18H18a2.25 2.25 0 002.25 2.25M2.25 21h19.5m-19.5 0A2.25 2.25 0 005.25 18H18a2.25 2.25 0 002.25 2.25m0-15v2.25m0-15v2.25m0-15v2.25m0-15v2.25m0-15v2.25M4.5 9.75l7.5-7.5 7.5 7.5m-15 10.5h15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{application.title}
                      <span className="ml-2 text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{application.type}</span>
                    </h3>
                    <p className="text-gray-600 text-sm">{application.company}</p>
                  </div>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium
                      ${application.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}
                    `}>
                    {application.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>{application.location}</p>
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.172-.879-1.172-2.303 0-3.182s2.91-1.171 4.242 0Z" /></svg>{application.salary}</p>
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>{application.appliedDate}</p>
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>{application.match}% Match</p>
                </div>
                {application.nextStep && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.374c-.866-1.5-3.032-1.5-3.898 0L2.697 16.001zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-blue-800 text-sm font-medium">Next Step: {application.nextStep}</p>
                  </div>
                )}
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <p>Last updated {application.lastUpdated}</p>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-3 rounded-md text-sm">
                    View Job Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyJobApplications;
