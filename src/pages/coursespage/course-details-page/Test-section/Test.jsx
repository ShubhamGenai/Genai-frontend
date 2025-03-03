import React from 'react';

// First component: TestSection
export const TestSection = () => {
  const tests = [
    { id: 1, title: 'Data Analyst Skill Tests 1', questions: 30, time: '2 Hours' },
    { id: 2, title: 'Data Analyst Skill Tests 2', questions: 30, time: '2 Hours' },
    { id: 3, title: 'Data Analyst Skill Tests 3', questions: 30, time: '2 Hours' },
    { id: 4, title: 'Data Analyst Skill Tests 4', questions: 30, time: '2 Hours' },
  ];

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold mb-2">Data Analyst Tests</h2>
      <p className="text-gray-600 mb-6">Take AI-generated tests to assess your skills:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tests.map((test) => (
          <div key={test.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">{test.title}</h3>
            <div className="flex flex-col text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {test.questions} Questions
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {test.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};