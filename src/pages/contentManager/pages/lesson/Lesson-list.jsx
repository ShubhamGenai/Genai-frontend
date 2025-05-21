import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // axios.get('/api/lessons')
    //   .then((res) => setLessons(res.data))
    //   .catch((err) => console.error(err));

    const demoLessons = [
  {
    title: "Introduction to React",
    videoUrl: "https://example.com/videos/react-intro.mp4",
    duration: 30,
    practiceQuestions: [
      { question: "What is React?", description: "Explain the purpose of React in frontend development." },
      { question: "What are components?", description: "Describe React components." }
    ],
    quiz: []
  },
  {
    title: "JavaScript Basics",
    videoUrl: "https://example.com/videos/js-basics.mp4",
    duration: 45,
    practiceQuestions: [
      { question: "What is a closure?", description: "Explain closures in JavaScript." }
    ],
    quiz: []
  },
  {
    title: "Node.js Introduction",
    videoUrl: "https://example.com/videos/nodejs-intro.mp4",
    duration: 40,
    practiceQuestions: [],
    quiz: []
  }
];
setLessons(demoLessons)
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lessons</h1>
        <Link to="/content/lessons/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          + Add Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <p className="text-gray-600">No lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white border rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800">{lesson.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Duration: {lesson.duration} min</p>
              <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">Watch Video</a>
              <Link
                to={`/lessons/edit/${lesson._id}`}
                className="text-sm text-blue-600 hover:underline mt-4 inline-block"
              >
                Edit Lesson
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonList;