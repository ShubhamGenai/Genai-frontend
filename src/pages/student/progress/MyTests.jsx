import React, { useState, useEffect } from 'react';

const MyTests = () => {
  const [loading, setLoading] = useState(true);
  const [takenTests, setTakenTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyTests = [
        {
          id: 1,
          title: 'React Fundamentals Quiz',
          score: 85,
          dateTaken: '2023-10-25',
          image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Quiz+1',
        },
        {
          id: 2,
          title: 'JavaScript Advanced Exam',
          score: 72,
          dateTaken: '2023-10-18',
          image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Exam+JS',
        },
        {
          id: 3,
          title: 'CSS Styling Challenge',
          score: 95,
          dateTaken: '2023-10-10',
          image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=CSS+Test',
        },
      ];
      setTakenTests(dummyTests);
      setLoading(false);
    };

    fetchTests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Tests</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading tests...</p>
      ) : takenTests.length === 0 ? (
        <p className="text-center text-gray-600">You haven't taken any tests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {takenTests.map((test) => (
            <div key={test.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={test.image} alt={test.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h2 className="text-lg font-semibold mb-1">{test.title}</h2>
                <p className="text-gray-600 text-xs mb-0.5">Score: {test.score}%</p>
                <p className="text-gray-600 text-xs mb-3">Date Taken: {test.dateTaken}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded">
                  Review Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTests;
