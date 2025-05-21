import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ModuleList = () => {
  const [modules, setModules] = useState([]);

//   useEffect(() => {
//     axios.get('/api/modules').then(res => {
//       setModules(res.data);
//     });
//   }, []);
useEffect(() => {
  // TEMPORARY DEMO DATA
  const demoModules = [
    {
      _id: '1',
      title: 'Introduction to Communication',
      lessons: [{}, {}, {}], // 3 lessons
    },
    {
      _id: '2',
      title: 'Social Etiquette & Behavior',
      lessons: [{}, {}], // 2 lessons
    },
    {
      _id: '3',
      title: 'Digital Literacy Basics',
      lessons: [{}], // 1 lesson
    },
  ];

  // Simulate fetch delay
  setTimeout(() => setModules(demoModules), 500);
}, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Modules</h1>
        <Link to="/modules/add" className="bg-green-600 text-white px-4 py-2 rounded">
          + Add Module
        </Link>
      </div>

      {modules.length === 0 ? (
        <p>No modules found.</p>
      ) : (
        <ul className="space-y-4">
          {modules.map((mod) => (
            <li key={mod._id} className="p-4 border rounded">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{mod.title}</h2>
                <Link to={`/modules/edit/${mod._id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </div>
              <p className="text-sm text-gray-600">{mod.lessons.length} Lessons</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleList;
