import axios from 'axios';
import React, { useState } from 'react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';

export default function AddQuiz() {
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
  if (e) e.preventDefault();
  setLoading(true);

  const quizData = {
    title,
    duration,
    questions
  };

  try {
    const response = await axios.post(CONTENTMANAGER.ADD_QUIZ, quizData); // Update endpoint if needed
    console.log('Quiz data submitted:', response.data);
    alert('Quiz created successfully!');

    // Reset form
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
    console.error('Error creating quiz:', error);
    alert('Failed to create quiz. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
            <h1 className="text-3xl font-bold text-indigo-800 text-center">Create Your Quiz</h1>
            <p className="text-gray-600 text-center mt-2">Design engaging quizzes with multiple-choice questions</p>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Quiz Title & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Quiz Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter time limit..."
                  min={1}
                />
              </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Questions Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Questions</h2>
              
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={i} className="bg-indigo-50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md border border-indigo-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-indigo-700">Question {i + 1}</h3>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 flex items-center transition-colors"
                          onClick={() => removeQuestion(i)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Question Text</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(i, 'questionText', e.target.value)}
                        placeholder="Enter your question..."
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Options</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.options.map((opt, j) => (
                          <div key={j} className="relative">
                            <div className="absolute top-3 left-3 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full">
                              <span className="text-indigo-700 font-medium">{j + 1}</span>
                            </div>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                              value={opt}
                              onChange={(e) => handleOptionChange(i, j, e.target.value)}
                              placeholder={`Option ${j + 1}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(i, 'answer', e.target.value)}
                      >
                        <option value="">Select correct answer</option>
                        {q.options.map((opt, idx) => (
                          opt && <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={addQuestion}
                className="mt-6 flex items-center bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Question
              </button>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white font-medium px-8 py-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Quiz...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Create Quiz
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-600">
            <p>Enhance your teaching experience with interactive quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}