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
    <div className="w-full min-h-full pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-white text-center tracking-tight mb-1">Create Your Quiz</h1>
          <p className="text-slate-400 text-center text-sm font-light">Design engaging quizzes with multiple-choice questions</p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl p-3">
          {/* Quiz Title & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Quiz Title</label>
              <input
                type="text"
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Duration (minutes)</label>
              <input
                type="number"
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter time limit..."
                min={1}
              />
            </div>
          </div>

          <hr className="border-slate-600/30 mb-3" />

          {/* Questions Section */}
          <div className="mb-3">
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">Questions</h2>
            
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="bg-slate-800/40 rounded-lg p-3 shadow-sm transition-all hover:shadow-md border border-slate-600/30">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-white">Question {i + 1}</h3>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-300 flex items-center transition-colors text-xs"
                          onClick={() => removeQuestion(i)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                    
                  <div className="mb-3">
                    <label className="block text-sm font-bold text-slate-300 mb-1">Question Text</label>
                    <input
                      type="text"
                      className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                      value={q.questionText}
                      onChange={(e) => handleQuestionChange(i, 'questionText', e.target.value)}
                      placeholder="Enter your question..."
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-bold text-slate-300 mb-1">Options</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, j) => (
                        <div key={j} className="relative">
                          <div className="absolute top-1.5 left-2 flex items-center justify-center w-5 h-5 bg-indigo-600 rounded-full">
                            <span className="text-white font-bold text-xs">{j + 1}</span>
                          </div>
                          <input
                            type="text"
                            className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                            value={opt}
                            onChange={(e) => handleOptionChange(i, j, e.target.value)}
                            placeholder={`Option ${j + 1}...`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-1">Correct Answer</label>
                    <select
                      className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
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
              className="mt-3 flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Question
            </button>
          </div>

          <hr className="border-slate-600/30 mb-3" />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Quiz...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Create Quiz
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-3 text-center text-slate-400 text-sm">
          <p>Enhance your teaching experience with interactive quizzes</p>
        </div>
      </div>
    </div>
  );
}