import React, { useState, useEffect } from 'react';

const MyNotes = () => {
  const [loading, setLoading] = useState(true);
  const [noteStats, setNoteStats] = useState({});
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const dummyNoteStats = {
        totalNotes: 3,
        coursesWithNotes: 3,
        thisMonth: 0,
      };

      const dummyNotes = [
        {
          id: 1,
          title: 'Newton\'s Laws of Motion',
          course: 'NCERT Class 12 Physics Complete Course',
          content: 'First law states that an object will remain at rest or in uniform motion unless acted upon by an external force. Second law: F=ma. Third law: For every action, there is an equal and opposite reaction.',
          date: 'Oct 20, 2025',
          tags: ['physics', 'mechanics', 'important'],
        },
        {
          id: 2,
          title: 'AI Model Training Steps',
          course: 'The AI Engineer Course 2025: Complete AI Engineer Bootcamp',
          content: '1. Data Collection and Preparation 2. Feature Engineering 3. Model Selection 4. Training with appropriate hyperparameters 5. Validation and Testing 6. Deployment and Monitoring',
          date: 'Oct 23, 2025',
          tags: ['ai', 'machine-learning', 'process'],
        },
        {
          id: 3,
          title: 'SEO Best Practices',
          course: 'Digital Marketing Mastery 2025',
          content: 'Key points for SEO optimization: Use relevant keywords, optimize meta descriptions, create quality content, improve page load speed, ensure mobile responsiveness, build quality backlinks.',
          date: 'Oct 25, 2025',
          tags: ['seo', 'marketing', 'optimization'],
        },
      ];

      setNoteStats(dummyNoteStats);
      setNotes(dummyNotes);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m-3-6h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H7.5" />
            </svg>
            <span>Filter</span>
          </button>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Courses</option>
            <option>Physics</option>
            <option>AI</option>
            <option>Marketing</option>
          </select>
          <button className="flex items-center space-x-1 bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md hover:bg-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 1.523-.296 2.964-.835 4.316l-1.423-1.423A.75.75 0 0017.584 14H12a.75.75 0 00-.75.75V19a.75.75 0 001.28.53l1.423-1.423c1.352.538 2.793.835 4.316.835 3.584 0 6.5-2.916 6.5-6.5 0-3.583-2.916-6.5-6.5-6.5S6 8.417 6 12c0 1.272.378 2.464 1.028 3.473l1.458-1.459a.75.75 0 00-.53-1.28h-4.5a.75.75 0 00-.75.75V19a.75.75 0 00.53.72L5.86 21.439A6.756 6.756 0 0012 21.75c3.584 0 6.5-2.916 6.5-6.5 0-3.583-2.916-6.5-6.5-6.5S6 8.417 6 12z" />
            </svg>
            <span>Connect WhatsApp</span>
          </button>
          <button className="flex items-center space-x-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>New Note</span>
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading notes...</p>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Notes</p>
                <p className="text-2xl font-bold">{noteStats.totalNotes}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75V3.75A2.25 2.25 0 0017.25 1.5H9.75A2.25 2.25 0 007.5 3.75v4.5m0 6.75V12a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 12v6.75A2.25 2.25 0 003.75 21h4.5A2.25 2.25 0 0010.5 18.75V15a2.25 2.25 0 012.25-2.25h4.5A2.25 2.25 0 0119.5 15v3.75m-15.75.364h6.375a.375.375 0 01.375.375V21a.75.75 0 01-.75.75H.75a.75.75 0 01-.75-.75v-4.564a.375.375 0 01.375-.375H7.5Z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Courses with Notes</p>
                <p className="text-2xl font-bold">{noteStats.coursesWithNotes}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.079 0-2.15.221-3.133.664a10.08 10.08 0 00-2.21 1.834c-.252.365-.477.752-.678 1.157 1.144 1.944 3.165 3.18 5.437 3.75H12M12 6.042V12m0-5.958A9.065 9.065 0 0118 3.75c2.122 0 4.162.703 5.865 1.984c.348.29.643.606.875.972 1.035 1.503 1.035 3.197 0 4.7.232.366.527.682.875.972V10.5M12 12H2.25m10.5 0l4.724 4.724a12.513 12.513 0 001.916 1.705V12M12 12V2.25C12 11.417 12 12 12 12.042m0 0l-4.724 4.724A12.513 12.513 0 013.75 18v-7.5M12 12l-4.724-4.724M12 12l4.724-4.724M12 12l-4.724 4.724M12 12l4.724 4.724M12 12l-4.724-4.724M12 12l4.724-4.724M12 12l-4.724 4.724M12 12l4.724-4.724M12 12l-4.724 4.724M12 12l4.724-4.724M12 12l-4.724 4.724M12 12l4.724-4.724M12 12l-4.724 4.724M12 12l4.724-4.724" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">This Month</p>
                <p className="text-2xl font-bold">{noteStats.thisMonth}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 12h.008v.008H12v-.008zM12 15h.008v.008H12v-.008z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M12 2.25V5.25m0 0a3.75 3.75 0 00-3.75 3.75v.75m-7.5-9h14.25a2.25 2.25 0 012.25 2.25v3.75L20.25 4.5h-16.5A2.25 2.25 0 013 6.75v3.75m0 0h1.5a2.25 2.25 0 012.25 2.25V15m0 0h-3.75m-3.75 0V15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 15v3.75m0 0h1.5a2.25 2.25 0 012.25 2.25V21a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 21V6.75A2.25 2.25 0 014.5 4.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{note.course}</p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">{note.content}</p>
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span>{note.date}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyNotes;
