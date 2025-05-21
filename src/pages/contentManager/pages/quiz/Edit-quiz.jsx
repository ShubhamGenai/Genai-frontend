import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quizzes/${id}`);
        const { title, duration, questions } = res.data;
        setTitle(title);
        setDuration(duration);
        setQuestions(questions);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        alert('Error loading quiz');
      }
    };
    fetchQuiz();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], answer: '' },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/api/quizzes/${id}`, {
        title,
        duration,
        questions,
      });
      alert('Quiz updated successfully!');
      navigate('/quiz-list'); // Change this route as per your app
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Quiz Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Duration (minutes)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min={1}
            required
          />
        </div>

        {questions.map((q, i) => (
          <div key={i} className="border p-4 my-4 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Question {i + 1}</h3>
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => removeQuestion(i)}
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Question text"
              className="w-full border px-3 py-2 rounded mb-3"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(i, 'questionText', e.target.value)
              }
              required
            />
            <div className="grid grid-cols-2 gap-4 mb-3">
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Option ${j + 1}`}
                  className="border px-3 py-2 rounded"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  required
                />
              ))}
            </div>
            <select
              className="w-full border px-3 py-2 rounded"
              value={q.answer}
              onChange={(e) => handleQuestionChange(i, 'answer', e.target.value)}
              required
            >
              <option value="">Select correct answer</option>
              {q.options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="button"
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 mt-4"
          onClick={addQuestion}
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="block mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Update Quiz'}
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
