import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LessonForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    title: '',
    videoUrl: '',
    duration: '',
    practiceQuestions: [{ question: '', description: '' }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load existing lesson if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/lessons/${id}`)
        .then((res) => {
          const { title, videoUrl, duration, practiceQuestions } = res.data;
          setLessonData({
            title,
            videoUrl,
            duration,
            practiceQuestions: practiceQuestions.length > 0 ? practiceQuestions : [{ question: '', description: '' }],
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load lesson data');
          setLoading(false);
        });
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  // Handle practice questions change
  const handlePracticeQuestionChange = (index, field, value) => {
    const newQuestions = [...lessonData.practiceQuestions];
    newQuestions[index][field] = value;
    setLessonData({ ...lessonData, practiceQuestions: newQuestions });
  };

  // Add new practice question
  const addPracticeQuestion = () => {
    setLessonData({
      ...lessonData,
      practiceQuestions: [...lessonData.practiceQuestions, { question: '', description: '' }],
    });
  };

  // Remove practice question
  const removePracticeQuestion = (index) => {
    const newQuestions = lessonData.practiceQuestions.filter((_, i) => i !== index);
    setLessonData({ ...lessonData, practiceQuestions: newQuestions.length ? newQuestions : [{ question: '', description: '' }] });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const apiCall = id
      ? axios.put(`/api/lessons/${id}`, lessonData)
      : axios.post('/api/lessons', lessonData);

    apiCall
      .then(() => {
        setLoading(false);
        navigate('/lessons');
      })
      .catch(() => {
        setError('Failed to save lesson');
        setLoading(false);
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Lesson' : 'Add Lesson'}</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={lessonData.videoUrl}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={lessonData.duration}
            onChange={handleChange}
            min={0}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Practice Questions</label>
          {lessonData.practiceQuestions.map((pq, index) => (
            <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
              <input
                type="text"
                placeholder="Question"
                value={pq.question}
                onChange={(e) => handlePracticeQuestionChange(index, 'question', e.target.value)}
                required
                className="w-full mb-2 border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description (optional)"
                value={pq.description}
                onChange={(e) => handlePracticeQuestionChange(index, 'description', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removePracticeQuestion(index)}
                className="mt-2 text-red-600 hover:underline"
                disabled={lessonData.practiceQuestions.length === 1}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPracticeQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add Practice Question
          </button>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {id ? 'Update Lesson' : 'Create Lesson'}
        </button>
      </form>
    </div>
  );
};

export default LessonForm;
