import React, { useState, useEffect } from 'react';

const MyDocuments = () => {
  const [loading, setLoading] = useState(true);
  const [docStats, setDocStats] = useState({});
  const [quickAccessFolders, setQuickAccessFolders] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const dummyDocStats = {
        totalDocuments: 15,
        storageUsed: '24.5 MB',
        folders: 4,
      };

      const dummyQuickAccessFolders = [
        {
          id: 1,
          name: 'Resume',
          files: 2,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75l4.5-4.5m0 0l4.5 4.5m-4.5-4.5v11.25m-6 2.25h12a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>)
        },
        {
          id: 2,
          name: 'Certificates',
          files: 4,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75l4.5-4.5m0 0l4.5 4.5m-4.5-4.5v11.25m-6 2.25h12a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>)
        },
        {
          id: 3,
          name: 'Exam Documents',
          files: 3,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75l4.5-4.5m0 0l4.5 4.5m-4.5-4.5v11.25m-6 2.25h12a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>)
        },
        {
          id: 4,
          name: 'Portfolio',
          files: 5,
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75l4.5-4.5m0 0l4.5 4.5m-4.5-4.5v11.25m-6 2.25h12a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>)
        },
      ];

      const dummyRecentDocuments = [
        {
          id: 1,
          name: 'Resume_2024.pdf',
          type: 'PDF',
          size: '2.4 MB',
          uploadedDate: 'Nov 20, 2024',
          folder: 'Resume',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-1.5m7.5-10.5H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h1.5" /></svg>),
        },
        {
          id: 2,
          name: 'NEET_Admit_Card.pdf',
          type: 'PDF',
          size: '1.2 MB',
          uploadedDate: 'Nov 18, 2024',
          folder: 'Exam Documents',
          icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-1.5m7.5-10.5H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h1.5" /></svg>),
        },
      ];

      setDocStats(dummyDocStats);
      setQuickAccessFolders(dummyQuickAccessFolders);
      setRecentDocuments(dummyRecentDocuments);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Documents</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading documents...</p>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Total Documents</p>
              <p className="text-2xl font-bold">{docStats.totalDocuments}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Storage Used</p>
              <p className="text-2xl font-bold">{docStats.storageUsed}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Folders</p>
              <p className="text-2xl font-bold">{docStats.folders}</p>
            </div>
          </div>

          {/* Quick Access */}
          <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {quickAccessFolders.map((folder) => (
              <div key={folder.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                <div className={`p-3 rounded-md ${folder.iconBg} ${folder.iconColor}`}>
                  {folder.icon}
                </div>
                <div>
                  <p className="font-semibold">{folder.name}</p>
                  <p className="text-gray-500 text-sm">{folder.files} files</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Documents */}
          <h2 className="text-2xl font-bold mb-4">Recent Documents</h2>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center">
                  {doc.icon}
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-gray-500 text-sm">{doc.type} &middot; {doc.size} &middot; Uploaded {doc.uploadedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs font-medium text-gray-800">{doc.folder}</span>
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43-.001.639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
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

export default MyDocuments;
