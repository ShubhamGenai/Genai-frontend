import axios from 'axios';
import React, { useState } from 'react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import QuestionImageUpload from '../../../../component/contentManagerComponents/QuestionImageUpload';
import FormulaRenderer from '../../../../component/contentManagerComponents/FormulaRenderer';
import FormulaHelper from '../../../../component/contentManagerComponents/FormulaHelper';
import ErrorBoundary from '../../../../component/contentManagerComponents/ErrorBoundary';

export default function AddQuiz() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      answer: '',
      imageUrl: '',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState({ open: false, questionIndex: null });
  const [formulaHelper, setFormulaHelper] = useState({ open: false, targetField: null, questionIndex: null, optionIndex: null });

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
        imageUrl: '',
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

  // Clean and validate data before sending
  const cleanedQuestions = questions.map(q => ({
    questionText: q.questionText.trim(),
    options: q.options.map(opt => opt.trim()).filter(opt => opt !== ''),
    answer: q.answer.trim(),
    imageUrl: q.imageUrl && q.imageUrl.trim() !== '' ? q.imageUrl.trim() : '',
    marks: q.marks || 1
  })).filter(q => q.questionText !== '' && q.options.length >= 2 && q.answer !== '');

  if (cleanedQuestions.length === 0) {
    alert('Please add at least one valid question with text, options, and answer.');
    setLoading(false);
    return;
  }

  const quizData = {
    title: title.trim(),
    duration: parseInt(duration) || 0,
    questions: cleanedQuestions
  };

  // Validate before sending
  if (!quizData.title || quizData.title === '') {
    alert('Please enter a quiz title.');
    setLoading(false);
    return;
  }

  if (!quizData.duration || quizData.duration <= 0) {
    alert('Please enter a valid duration (in minutes).');
    setLoading(false);
    return;
  }

  console.log('Submitting quiz data:', quizData);

  try {
    const response = await axios.post(CONTENTMANAGER.ADD_QUIZ, quizData);
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
        imageUrl: '',
      },
    ]);
  } catch (error) {
    console.error('Error creating quiz:', error);
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.details || 
                        error.message || 
                        'Failed to create quiz. Please check all fields and try again.';
    alert(`Error: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

  const handleImageUploaded = (imageUrl) => {
    if (imageUploadModal.questionIndex !== null && imageUrl) {
      // Validate URL format
      if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        console.error('Invalid image URL format:', imageUrl);
        alert('Invalid image URL received. Please try uploading again.');
        return;
      }
      
      console.log('Setting image URL for question', imageUploadModal.questionIndex, ':', imageUrl);
      const updatedQuestions = [...questions];
      updatedQuestions[imageUploadModal.questionIndex].imageUrl = imageUrl;
      setQuestions(updatedQuestions);
      console.log('Image URL set successfully');
    } else {
      console.error('Failed to set image: questionIndex or imageUrl is null');
    }
  };

  const handleRemoveImage = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].imageUrl = '';
    setQuestions(updatedQuestions);
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-bold text-slate-300">Question Text</label>
                      <button
                        type="button"
                        onClick={() => setFormulaHelper({ open: true, targetField: 'question', questionIndex: i })}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        title="Insert formula"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Formula
                      </button>
                    </div>
                    <input
                      type="text"
                      className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                      value={q.questionText}
                      onChange={(e) => handleQuestionChange(i, 'questionText', e.target.value)}
                      placeholder="Enter your question... (Use $formula$ for math/chemistry)"
                    />
                    {/* Formula Preview */}
                    {q.questionText && (q.questionText.includes('$') || q.questionText.includes('\\(') || q.questionText.includes('\\[')) && (
                      <div className="mt-2 p-2 bg-slate-800/50 rounded text-sm border border-slate-600/30">
                        <div className="text-slate-400 mb-1 text-xs">Preview:</div>
                        <FormulaRenderer text={q.questionText} className="text-slate-200" />
                      </div>
                    )}
                  </div>

                  {/* Image Upload Section */}
                  <div className="mb-3">
                    <label className="block text-sm font-bold text-slate-300 mb-1">Question Image/Diagram (Optional)</label>
                    {q.imageUrl && q.imageUrl.trim() !== '' ? (
                      <div className="space-y-2">
                        <div className="relative border border-slate-600/30 rounded-lg overflow-hidden bg-slate-700/40 p-2">
                          <div className="flex items-center justify-center bg-slate-800/50 rounded min-h-[200px] relative">
                            <img
                              src={q.imageUrl}
                              alt="Question diagram"
                              className="max-w-full max-h-64 object-contain rounded"
                              crossOrigin="anonymous"
                              loading="lazy"
                              onLoad={() => {
                                console.log('Image loaded successfully:', q.imageUrl);
                              }}
                              onError={(e) => {
                                console.error('Image failed to load:', q.imageUrl);
                                const errorDiv = e.target.parentElement.querySelector('.image-error');
                                if (errorDiv) {
                                  errorDiv.classList.remove('hidden');
                                }
                                e.target.style.display = 'none';
                              }}
                            />
                            <div className="hidden image-error absolute inset-0 flex items-center justify-center text-slate-400 text-sm p-4">
                              <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>Failed to load image</p>
                                <p className="text-xs mt-1 text-slate-500 break-all">{q.imageUrl}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setImageUploadModal({ open: true, questionIndex: i })}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 0H8.828a2 2 0 00-1.414.586L6.293 1.707A1 1 0 015.586 2H4z" />
                              <path d="M8 11a3 3 0 100-6 3 3 0 000 6z" />
                              <path d="M15.657 16.667l-4.42-4.422a2 2 0 010-2.828l.707-.707a2 2 0 012.828 0l4.42 4.422a.75.75 0 01-.535 1.248h-2.5a.25.25 0 01-.25-.25v-2.5z" />
                            </svg>
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="flex-1 bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setImageUploadModal({ open: true, questionIndex: i })}
                        className="w-full border-2 border-dashed border-slate-600/60 rounded-lg p-4 bg-slate-700/40 hover:border-indigo-500/70 hover:bg-slate-700/60 transition-colors flex items-center justify-center gap-2 text-sm text-slate-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Add Image/Diagram
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-bold text-slate-300">Options</label>
                      <button
                        type="button"
                        onClick={() => setFormulaHelper({ open: true, targetField: 'option', questionIndex: i })}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        title="Formula helper"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Formula Helper
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, j) => (
                        <div key={j} className="relative">
                          <div className="absolute top-1.5 left-2 flex items-center justify-center w-5 h-5 bg-indigo-600 rounded-full z-10">
                            <span className="text-white font-bold text-xs">{j + 1}</span>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg pl-9 pr-20 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                              value={opt}
                              onChange={(e) => handleOptionChange(i, j, e.target.value)}
                              placeholder={`Option ${j + 1}... (Use $formula$ for formulas)`}
                            />
                            <button
                              type="button"
                              onClick={() => setFormulaHelper({ open: true, targetField: 'option', questionIndex: i, optionIndex: j })}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors"
                              title="Insert formula"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            </button>
                          </div>
                          {/* Formula Preview */}
                          {opt && (opt.includes('$') || opt.includes('\\(') || opt.includes('\\[')) && (
                            <div className="mt-1 p-2 bg-slate-800/50 rounded text-xs border border-slate-600/30">
                              <div className="text-slate-400 mb-1">Preview:</div>
                              <FormulaRenderer text={opt} className="text-slate-200" />
                            </div>
                          )}
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

      {/* Image Upload Modal */}
      {imageUploadModal.open && imageUploadModal.questionIndex !== null && (
        <QuestionImageUpload
          questionId={imageUploadModal.questionIndex}
          existingImageUrl={questions[imageUploadModal.questionIndex]?.imageUrl || ''}
          onImageUploaded={(imageUrl) => {
            handleImageUploaded(imageUrl);
            setImageUploadModal({ open: false, questionIndex: null });
          }}
          onClose={() => setImageUploadModal({ open: false, questionIndex: null })}
        />
      )}

      {/* Formula Helper Modal */}
      {formulaHelper.open && (
        <ErrorBoundary
          fallback={
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-slate-600/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Formula Helper</h2>
                <p className="text-slate-400 mb-4">
                  You can type formulas manually using LaTeX syntax:
                </p>
                <div className="bg-slate-700/40 rounded p-3 text-xs text-slate-300 space-y-1 mb-4">
                  <p>• Inline: $x^2$ or $H_2O$</p>
                  <p>• Block: $$\\int_0^1 x dx$$</p>
                  <p>• Fractions: $\\frac{a}{b}$</p>
                  <p>• Subscripts: $H_2O$, Superscripts: $x^2$</p>
                </div>
                <button
                  onClick={() => setFormulaHelper({ open: false, targetField: null, questionIndex: null, optionIndex: null })}
                  className="w-full px-4 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-700/70 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          }
        >
          <FormulaHelper
            onClose={() => setFormulaHelper({ open: false, targetField: null, questionIndex: null, optionIndex: null })}
            onInsert={(formula) => {
              if (formulaHelper.targetField === 'question' && formulaHelper.questionIndex !== null) {
                const updatedQuestions = [...questions];
                const currentText = updatedQuestions[formulaHelper.questionIndex].questionText || '';
                updatedQuestions[formulaHelper.questionIndex].questionText = currentText + (currentText ? ' ' : '') + formula;
                setQuestions(updatedQuestions);
              } else if (formulaHelper.targetField === 'option' && formulaHelper.questionIndex !== null && formulaHelper.optionIndex !== null) {
                const updatedQuestions = [...questions];
                const currentText = updatedQuestions[formulaHelper.questionIndex].options[formulaHelper.optionIndex] || '';
                updatedQuestions[formulaHelper.questionIndex].options[formulaHelper.optionIndex] = currentText + (currentText ? ' ' : '') + formula;
                setQuestions(updatedQuestions);
              }
            }}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}