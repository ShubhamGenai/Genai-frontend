import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      answer: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'options') {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        answer: '',
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const quizData = { title, duration, questions };

    try {
      // Send POST request to backend
      await axios.post('/api/quizzes', quizData);
      alert('Quiz created successfully!');
      // Clear form
      setTitle('');
      setDuration('');
      setQuestions([
        {
          questionText: '',
          options: ['', '', '', ''],
          answer: '',
        },
      ]);
    } catch (error) {
      console.error(error);
      alert('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>
      <form onSubmit={handleSubmit}>
        {/* Quiz Title & Duration */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Quiz Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Duration (minutes)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            min={1}
          />
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, i) => (
            <div key={i} className="border p-4 rounded relative bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Question {i + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 hover:underline"
                    onClick={() => removeQuestion(i)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium">Question Text</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(i, 'questionText', e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((opt, j) => (
                  <div key={j}>
                    <label className="block text-sm font-medium">Option {j + 1}</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      value={opt}
                      onChange={(e) => handleOptionChange(i, j, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium">Correct Answer</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={q.answer}
                  onChange={(e) =>
                    handleQuestionChange(i, 'answer', e.target.value)
                  }
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
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Question
          </button>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
