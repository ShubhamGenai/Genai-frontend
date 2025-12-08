import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';
import QuizSelectorPopup from '../../../../component/contentManagerComponents/QuizSelectorPopup';

const LessonForm = () => {
  const [lesson, setLesson] = useState({
    title: '',
    content: '',
    duration: '',
    practiceQuestions: [],
    quiz: []
  });

  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  // Add a new practice question
  const addPracticeQuestion = () => {
    setLesson(prev => ({
      ...prev,
      practiceQuestions: [
        ...prev.practiceQuestions,
        {
          question: '',
          description: '',
          instructions: '',
          code: '',
          expectedAnswer: ''
        }
      ]
    }));
  };

  // Remove a practice question
  const removePracticeQuestion = (index) => {
    setLesson(prev => ({
      ...prev,
      practiceQuestions: prev.practiceQuestions.filter((_, i) => i !== index)
    }));
  };

  // Update practice question
  const updatePracticeQuestion = (index, field, value) => {
    setLesson(prev => ({
      ...prev,
      practiceQuestions: prev.practiceQuestions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  // Handle quiz selection from modal
  const handleQuizSelect = (quizzes) => {
    setSelectedQuizzes(quizzes);
    // Extract quiz IDs and update lesson state
    const quizIds = quizzes.map(quiz => quiz._id || quiz.id || quiz);
    setLesson(prev => ({
      ...prev,
      quiz: quizIds
    }));
  };

  // Remove quiz reference
  const removeQuizReference = (index) => {
    setLesson(prev => {
      const newQuiz = prev.quiz.filter((_, i) => i !== index);
      // Also update selectedQuizzes to keep them in sync
      setSelectedQuizzes(prevQuizzes => 
        prevQuizzes.filter((_, i) => i !== index)
      );
      return {
        ...prev,
        quiz: newQuiz
      };
    });
  };

  // Handle form submission
 const handleSubmit = async () => {
  // Basic validation
  if (!lesson.title.trim() || !lesson.content.trim()) {
    alert('Please fill in all required fields (Title and Content)');
    return;
  }

  // Validate practice questions
  for (let i = 0; i < lesson.practiceQuestions.length; i++) {
    if (!lesson.practiceQuestions[i].question.trim()) {
      alert(`Please fill in the question for Practice Question ${i + 1}`);
      return;
    }
  }

  try {
    // Prepare lesson data with quiz IDs
    const lessonData = {
      ...lesson,
      quiz: lesson.quiz.map(q => typeof q === 'string' ? q : q._id || q.id || q)
    };
    
    const response = await axios.post(CONTENTMANAGER.ADD_LESSON, lessonData);
    console.log('Lesson created:', response.data);
    alert('Lesson created successfully!');
    setLesson({
      title: '',
      content: '',
      duration: '',
      practiceQuestions: [],
      quiz: []
    });
    setSelectedQuizzes([]);
  } catch (error) {
    console.error('Error creating lesson:', error.response?.data || error.message);
    alert('Failed to create lesson. Check console for details.');
  }
};

  return (
    <div className="w-full min-h-full pb-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white tracking-tight mb-1">Add New Lesson</h1>
        <p className="text-slate-400 text-sm font-light">Create a comprehensive lesson with practice questions and quiz references.</p>
      </div>

      <div className="space-y-3">
        {/* Basic Lesson Information */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-3 rounded-lg shadow-xl">
          <h2 className="text-base font-bold text-white mb-3 tracking-tight">Lesson Information</h2>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={lesson.title}
                onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-1.5 bg-slate-800/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={lesson.duration}
                onChange={(e) => setLesson(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-1.5 bg-slate-800/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="30"
                min="1"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-bold text-slate-300 mb-1">
              Content *
            </label>
            <textarea
              required
              value={lesson.content}
              onChange={(e) => setLesson(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="w-full px-3 py-1.5 bg-slate-800/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="Enter the lesson content..."
            />
          </div>
        </div>

        {/* Practice Questions Section */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-3 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white tracking-tight">Practice Questions</h2>
              <button
                type="button"
                onClick={addPracticeQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus className="w-3 h-3" />
                Add Question
              </button>
            </div>

          {lesson.practiceQuestions.length === 0 ? (
            <p className="text-slate-400 text-center py-4 text-sm">No practice questions added yet. Click "Add Question" to get started.</p>
          ) : (
            <div className="space-y-3">
              {lesson.practiceQuestions.map((question, index) => (
                <div key={index} className="bg-slate-800/40 p-3 rounded-lg border border-slate-600/30">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Question {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePracticeQuestion(index)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-300 mb-1">
                        Question *
                      </label>
                      <input
                        type="text"
                        required
                        value={question.question}
                        onChange={(e) => updatePracticeQuestion(index, 'question', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Enter the question prompt"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={question.description}
                        onChange={(e) => updatePracticeQuestion(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Additional information about the question"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-1">
                        Instructions
                      </label>
                      <textarea
                        value={question.instructions}
                        onChange={(e) => updatePracticeQuestion(index, 'instructions', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Step-by-step instructions"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-1">
                        Code
                      </label>
                      <textarea
                        value={question.code}
                        onChange={(e) => updatePracticeQuestion(index, 'code', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 font-mono transition-all"
                        placeholder="Starter code or example code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-1">
                        Expected Answer
                      </label>
                      <textarea
                        value={question.expectedAnswer}
                        onChange={(e) => updatePracticeQuestion(index, 'expectedAnswer', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-1.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Expected answer or solution"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz References Section */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 p-3 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white tracking-tight">Quiz References</h2>
            <button
              type="button"
              onClick={() => setQuizModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-3 h-3" />
              Select Quizzes
            </button>
          </div>

          {selectedQuizzes.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Selected Quizzes ({selectedQuizzes.length}):
              </h3>
              {selectedQuizzes.map((quiz, index) => (
                <div key={quiz._id || quiz.id || index} className="flex items-center justify-between bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-600/30">
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-white">{quiz.title || 'Untitled Quiz'}</span>
                    {quiz.duration && (
                      <span className="text-xs text-slate-400 ml-2">({quiz.duration} min)</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuizReference(index)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-2"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-4 text-sm">
              No quizzes selected. Click "Select Quizzes" to add quizzes to this lesson.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-600/30">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-sm shadow-xl hover:shadow-2xl"
        >
          <Save className="w-4 h-4" />
          Save Lesson
        </button>
      </div>

      {/* Quiz Selector Modal */}
      <QuizSelectorPopup
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        selectedQuizzes={selectedQuizzes}
        onSelect={handleQuizSelect}
      />
    </div>
  );
};

export default LessonForm;