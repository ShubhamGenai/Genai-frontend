import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import QuestionImageUpload from '../../../../component/contentManagerComponents/QuestionImageUpload';
import FormulaRenderer from '../../../../component/contentManagerComponents/FormulaRenderer';
import FormulaHelper from '../../../../component/contentManagerComponents/FormulaHelper';
import ErrorBoundary from '../../../../component/contentManagerComponents/ErrorBoundary';
import QuizQuestionBank from './Quiz-QuestionBank';
import AlertPopup from '../../../../component/common/AlertPopup';

export default function AddQuiz() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      passage: '',
      options: ['', '', '', ''],
      answer: '',
      imageUrl: '',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState({ open: false, questionIndex: null });
  const [formulaHelper, setFormulaHelper] = useState({ open: false, targetField: null, questionIndex: null, optionIndex: null });
  const [questionBankOpen, setQuestionBankOpen] = useState(false);
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiFormData, setAiFormData] = useState({ testName: '', subject: '', numberOfQuestions: '5', mustContainFormulas: false });
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);
  
  // Alert popup state
  const [alertPopup, setAlertPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });

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
        passage: '',
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

  const handleQuestionsFromBank = (selectedQuestions) => {
    // Add selected questions from question bank to the current quiz
    setQuestions([...questions, ...selectedQuestions]);
    setQuestionBankOpen(false);
  };

 const handleSubmit = async (e) => {
  if (e) e.preventDefault();
  setLoading(true);

  // Clean and validate data before sending
  const cleanedQuestions = questions.map(q => ({
    questionText: q.questionText.trim(),
    passage: q.passage && q.passage.trim() !== '' ? q.passage : '', // Preserve passage formatting (line breaks, paragraphs)
    options: q.options.map(opt => opt.trim()).filter(opt => opt !== ''),
    answer: q.answer.trim(),
    imageUrl: q.imageUrl && q.imageUrl.trim() !== '' ? q.imageUrl.trim() : '',
    marks: q.marks || 1
  })).filter(q => q.questionText !== '' && q.options.length >= 2 && q.answer !== '');

  if (cleanedQuestions.length === 0) {
    setAlertPopup({
      isOpen: true,
      title: 'Validation Error',
      message: 'Please add at least one valid question with text, options, and answer.',
      type: 'warning'
    });
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
    setAlertPopup({
      isOpen: true,
      title: 'Validation Error',
      message: 'Please enter a quiz title.',
      type: 'warning'
    });
    setLoading(false);
    return;
  }

  if (!quizData.duration || quizData.duration <= 0) {
    setAlertPopup({
      isOpen: true,
      title: 'Validation Error',
      message: 'Please enter a valid duration (in minutes).',
      type: 'warning'
    });
    setLoading(false);
    return;
  }

  console.log('Submitting quiz data:', quizData);

  try {
    const response = await axios.post(CONTENTMANAGER.ADD_QUIZ, quizData);
    console.log('Quiz data submitted:', response.data);
    toast.success('Quiz created successfully!');

    // Reset form
    setTitle('');
    setDuration('');
    setQuestions([
      {
        questionText: '',
        passage: '',
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
    setAlertPopup({
      isOpen: true,
      title: 'Error',
      message: errorMessage,
      type: 'error'
    });
  } finally {
    setLoading(false);
  }
};

  const handleImageUploaded = (imageUrl) => {
    if (imageUploadModal.questionIndex !== null && imageUrl) {
      // Validate URL format
      if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        console.error('Invalid image URL format:', imageUrl);
        setAlertPopup({
          isOpen: true,
          title: 'Invalid Image URL',
          message: 'Invalid image URL received. Please try uploading again.',
          type: 'error'
        });
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

  // Handle AI question generation
  const handleGenerateQuestions = async () => {
    if (!aiFormData.testName.trim() || !aiFormData.subject.trim() || !aiFormData.numberOfQuestions) {
      setAlertPopup({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please fill in all fields: Test Name, Subject, and Number of Questions',
        type: 'warning'
      });
      return;
    }

    const numQuestions = parseInt(aiFormData.numberOfQuestions);
    if (isNaN(numQuestions) || numQuestions <= 0 || numQuestions > 50) {
      setAlertPopup({
        isOpen: true,
        title: 'Validation Error',
        message: 'Number of questions must be between 1 and 50',
        type: 'warning'
      });
      return;
    }

    setAiGenerating(true);
    try {
      const response = await axios.post(CONTENTMANAGER.GENERATE_QUIZ_QUESTIONS, {
        testName: aiFormData.testName.trim(),
        subject: aiFormData.subject.trim(),
        numberOfQuestions: numQuestions,
        mustContainFormulas: aiFormData.mustContainFormulas
      });

      if (response.data.success && response.data.data && response.data.data.questions) {
        const generated = response.data.data.questions.map((q, index) => ({
          id: `gen-${Date.now()}-${index}`, // Unique ID for each question
          questionText: q.questionText || '',
          passage: q.passage || '',
          options: Array.isArray(q.options) && q.options.length >= 2 
            ? q.options 
            : ['', '', '', ''],
          answer: q.answer || '',
          imageUrl: q.imageUrl || '',
          marks: q.marks || 1
        }));

        // Show review modal instead of directly adding
        setGeneratedQuestions(generated);
        setSelectedQuestions(generated.map((_, index) => index)); // Select all by default
        setAiGeneratorOpen(false);
        setReviewModalOpen(true);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details || 
                          error.message || 
                          'Failed to generate questions. Please try again.';
      setAlertPopup({
        isOpen: true,
        title: 'Error',
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setAiGenerating(false);
    }
  };

  // Regenerate a single question with AI
  const handleRegenerateQuestion = async (questionIndex) => {
    if (!aiFormData.testName.trim() || !aiFormData.subject.trim()) {
      setAlertPopup({
        isOpen: true,
        title: 'Validation Error',
        message: 'Test Name and Subject are required for regeneration',
        type: 'warning'
      });
      return;
    }

    setRegeneratingIndex(questionIndex);
    try {
      const response = await axios.post(CONTENTMANAGER.GENERATE_QUIZ_QUESTIONS, {
        testName: aiFormData.testName.trim(),
        subject: aiFormData.subject.trim(),
        numberOfQuestions: 1, // Generate only 1 question
        mustContainFormulas: aiFormData.mustContainFormulas
      });

      if (response.data.success && response.data.data && response.data.data.questions && response.data.data.questions.length > 0) {
        const newQuestion = response.data.data.questions[0];
        const updatedQuestions = [...generatedQuestions];
        updatedQuestions[questionIndex] = {
          id: generatedQuestions[questionIndex].id, // Keep the same ID
          questionText: newQuestion.questionText || '',
          passage: newQuestion.passage || '',
          options: Array.isArray(newQuestion.options) && newQuestion.options.length >= 2 
            ? newQuestion.options 
            : ['', '', '', ''],
          answer: newQuestion.answer || '',
          imageUrl: newQuestion.imageUrl || '',
          marks: newQuestion.marks || 1
        };
        setGeneratedQuestions(updatedQuestions);
        toast.success('Question regenerated successfully!');
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error regenerating question:', error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details || 
                          error.message || 
                          'Failed to regenerate question. Please try again.';
      setAlertPopup({
        isOpen: true,
        title: 'Error',
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setRegeneratingIndex(null);
    }
  };

  // Toggle question selection in review
  const toggleQuestionSelection = (index) => {
    setSelectedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Add selected questions to quiz
  const handleAddSelectedQuestions = () => {
    const questionsToAdd = generatedQuestions.filter((_, index) => selectedQuestions.includes(index));
    setQuestions([...questions, ...questionsToAdd]);
    setReviewModalOpen(false);
    setGeneratedQuestions([]);
    setSelectedQuestions([]);
    setAiFormData({ testName: '', subject: '', numberOfQuestions: '5', mustContainFormulas: false });
    toast.success(`Successfully added ${questionsToAdd.length} question(s) to your quiz!`);
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

                  {/* Passage Section (Optional) */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-bold text-slate-300">
                        Passage (Optional)
                        <span className="text-xs text-slate-400 font-normal ml-1">- For reading comprehension questions</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormulaHelper({ open: true, targetField: 'passage', questionIndex: i })}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        title="Insert formula"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Formula
                      </button>
                    </div>
                    <textarea
                      rows={6}
                      className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-y font-normal leading-relaxed"
                      value={q.passage || ''}
                      onChange={(e) => handleQuestionChange(i, 'passage', e.target.value)}
                      placeholder="Enter passage text (e.g., reading comprehension passage, case study, etc.)... Press Enter for new paragraphs. (Use $formula$ for math/chemistry)"
                      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                    />
                    {/* Formula Preview for Passage */}
                    {q.passage && (q.passage.includes('$') || q.passage.includes('\\(') || q.passage.includes('\\[')) && (
                      <div className="mt-2 p-2 bg-slate-800/50 rounded text-sm border border-slate-600/30">
                        <div className="text-slate-400 mb-1 text-xs">Preview:</div>
                        <div className="whitespace-pre-wrap">
                          <FormulaRenderer text={q.passage} className="text-slate-200" />
                        </div>
                      </div>
                    )}
                    {/* Plain text preview when no formulas */}
                    {q.passage && q.passage.trim() !== '' && !q.passage.includes('$') && !q.passage.includes('\\(') && !q.passage.includes('\\[') && (
                      <div className="mt-2 p-2 bg-slate-800/50 rounded text-sm border border-slate-600/30">
                        <div className="text-slate-400 mb-1 text-xs">Preview:</div>
                        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">{q.passage}</div>
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
                              loading="lazy"
                              referrerPolicy="no-referrer"
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
            
            <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={addQuestion}
                className="flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Question
            </button>
              <button
                type="button"
                onClick={() => setAiGeneratorOpen(true)}
                className="flex items-center bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-700 transition-all text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Generate with AI
              </button>
              {/* Question Bank button commented out */}
              {/* <button
                type="button"
                onClick={() => setQuestionBankOpen(true)}
                className="flex items-center bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-700 transition-all text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Question Bank (PDF)
              </button> */}
            </div>
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
              } else if (formulaHelper.targetField === 'passage' && formulaHelper.questionIndex !== null) {
                const updatedQuestions = [...questions];
                const currentText = updatedQuestions[formulaHelper.questionIndex].passage || '';
                updatedQuestions[formulaHelper.questionIndex].passage = currentText + (currentText ? ' ' : '') + formula;
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

      {/* Question Bank Modal */}
      {questionBankOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-full p-4">
            <QuizQuestionBank
              onQuestionsSelected={handleQuestionsFromBank}
              onClose={() => setQuestionBankOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Review Generated Questions Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] border border-slate-600/30 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
              <h2 className="text-xl font-bold text-white">Review Generated Questions</h2>
              <button
                onClick={() => {
                  setReviewModalOpen(false);
                  setGeneratedQuestions([]);
                  setSelectedQuestions([]);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-300">
                  Select questions to add to your quiz. You can regenerate individual questions if needed.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedQuestions(generatedQuestions.map((_, i) => i))}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Select All
                  </button>
                  <span className="text-slate-500">|</span>
                  <button
                    onClick={() => setSelectedQuestions([])}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {generatedQuestions.map((q, index) => (
                <div key={q.id} className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(index)}
                      onChange={() => toggleQuestionSelection(index)}
                      className="mt-1 h-4 w-4 text-indigo-600 border-slate-600 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-400">Question {index + 1}</span>
                        <button
                          onClick={() => handleRegenerateQuestion(index)}
                          disabled={regeneratingIndex === index}
                          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
                        >
                          {regeneratingIndex === index ? (
                            <>
                              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Regenerating...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 5.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-5.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                              </svg>
                              Regenerate
                            </>
                          )}
                        </button>
                      </div>
                      {q.passage && q.passage.trim() !== '' && (
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-white mb-2">Passage:</p>
                          <div className="text-sm text-slate-200 bg-slate-800/50 rounded p-3 whitespace-pre-wrap leading-relaxed border border-slate-600/30">
                            {(q.passage.includes('$') || q.passage.includes('\\(') || q.passage.includes('\\[')) ? (
                              <FormulaRenderer text={q.passage} className="text-slate-200" />
                            ) : (
                              <div className="text-slate-200">{q.passage}</div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-white mb-1">Question:</p>
                        <div className="text-sm text-slate-200 bg-slate-800/50 rounded p-2">
                          <FormulaRenderer text={q.questionText} className="text-slate-200" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-white mb-1">Options:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className={`text-xs p-2 rounded ${opt === q.answer ? 'bg-emerald-600/20 border border-emerald-500/40' : 'bg-slate-800/50'}`}>
                              <span className="font-semibold text-slate-400">{String.fromCharCode(65 + optIdx)}:</span>{' '}
                              <FormulaRenderer text={opt} className="text-slate-200 inline" />
                              {opt === q.answer && (
                                <span className="ml-2 text-emerald-400 text-xs font-semibold">✓ Correct</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-600/30">
              <p className="text-sm text-slate-300">
                {selectedQuestions.length} of {generatedQuestions.length} question(s) selected
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setReviewModalOpen(false);
                    setGeneratedQuestions([]);
                    setSelectedQuestions([]);
                  }}
                  className="px-4 py-2 bg-slate-700/40 text-white rounded-lg font-semibold hover:bg-slate-700/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSelectedQuestions}
                  disabled={selectedQuestions.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Selected ({selectedQuestions.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Question Generator Modal */}
      {aiGeneratorOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-slate-600/30">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
              <h2 className="text-xl font-bold text-white">Generate Questions with AI</h2>
              <button
                onClick={() => {
                  setAiGeneratorOpen(false);
                  setAiFormData({ testName: '', subject: '', numberOfQuestions: '5', mustContainFormulas: false });
                }}
                className="text-slate-400 hover:text-white transition-colors"
                disabled={aiGenerating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Test Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={aiFormData.testName}
                  onChange={(e) => setAiFormData({ ...aiFormData, testName: e.target.value })}
                  className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g., JEE Main, NEET, SSC"
                  disabled={aiGenerating}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={aiFormData.subject}
                  onChange={(e) => setAiFormData({ ...aiFormData, subject: e.target.value })}
                  className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  disabled={aiGenerating}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Number of Questions <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={aiFormData.numberOfQuestions}
                  onChange={(e) => setAiFormData({ ...aiFormData, numberOfQuestions: e.target.value })}
                  className="w-full bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="1-50"
                  min={1}
                  max={50}
                  disabled={aiGenerating}
                />
                <div className="mt-2 flex items-center">
                  <input
                    id="mustContainFormulas"
                    type="checkbox"
                    checked={aiFormData.mustContainFormulas}
                    onChange={(e) => setAiFormData({ ...aiFormData, mustContainFormulas: e.target.checked })}
                    className="h-4 w-4 text-emerald-600 border-slate-600 rounded focus:ring-emerald-500"
                    disabled={aiGenerating}
                  />
                  <label
                    htmlFor="mustContainFormulas"
                    className="ml-2 text-sm font-bold text-slate-300"
                  >
                    Must contain formulas
                  </label>
                </div>
                <p className="mt-1 text-xs text-slate-400">Enter a number between 1 and 50</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-slate-600/30">
                <button
                  onClick={() => {
                    setAiGeneratorOpen(false);
                    setAiFormData({ testName: '', subject: '', numberOfQuestions: '5', mustContainFormulas: false });
                  }}
                  disabled={aiGenerating}
                  className="flex-1 bg-slate-700/40 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateQuestions}
                  disabled={aiGenerating}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {aiGenerating ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Generate Questions
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Alert Popup */}
      <AlertPopup
        isOpen={alertPopup.isOpen}
        onClose={() => setAlertPopup(prev => ({ ...prev, isOpen: false }))}
        title={alertPopup.title}
        message={alertPopup.message}
        type={alertPopup.type}
      />
    </div>
  );
}