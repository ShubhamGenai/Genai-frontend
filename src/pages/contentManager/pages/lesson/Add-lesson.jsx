import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { CONTENTMANAGER } from '../../../../constants/ApiConstants';
import axios from 'axios';

const LessonForm = () => {
  const [lesson, setLesson] = useState({
    title: '',
    content: '',
    duration: '',
    practiceQuestions: [],
    quiz: []
  });

  const [quizInput, setQuizInput] = useState('');

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

  // Add quiz reference
  const addQuizReference = () => {
    if (quizInput.trim()) {
      setLesson(prev => ({
        ...prev,
        quiz: [...prev.quiz, quizInput.trim()]
      }));
      setQuizInput('');
    }
  };

  // Remove quiz reference
  const removeQuizReference = (index) => {
    setLesson(prev => ({
      ...prev,
      quiz: prev.quiz.filter((_, i) => i !== index)
    }));
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
    const response = await axios.post(CONTENTMANAGER.ADD_LESSON, lesson); // Change endpoint if needed
    console.log('Lesson created:', response.data);
    alert('Lesson created successfully!');
    setLesson({
        title: '',
    content: '',
    duration: '',
    practiceQuestions: [],
    quiz: []})
  } catch (error) {
    console.error('Error creating lesson:', error.response?.data || error.message);
    alert('Failed to create lesson. Check console for details.');
  }
};

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Lesson</h1>
        <p className="text-gray-600">Create a comprehensive lesson with practice questions and quiz references.</p>
      </div>

      <div className="space-y-8">
        {/* Basic Lesson Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lesson Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={lesson.title}
                onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={lesson.duration}
                onChange={(e) => setLesson(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
                min="1"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              required
              value={lesson.content}
              onChange={(e) => setLesson(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the lesson content..."
            />
          </div>
        </div>

        {/* Practice Questions Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Practice Questions</h2>
            <button
              type="button"
              onClick={addPracticeQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          {lesson.practiceQuestions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No practice questions added yet. Click "Add Question" to get started.</p>
          ) : (
            <div className="space-y-6">
              {lesson.practiceQuestions.map((question, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Question {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removePracticeQuestion(index)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question *
                      </label>
                      <input
                        type="text"
                        required
                        value={question.question}
                        onChange={(e) => updatePracticeQuestion(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter the question prompt"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={question.description}
                        onChange={(e) => updatePracticeQuestion(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Additional information about the question"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instructions
                      </label>
                      <textarea
                        value={question.instructions}
                        onChange={(e) => updatePracticeQuestion(index, 'instructions', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Step-by-step instructions"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code
                      </label>
                      <textarea
                        value={question.code}
                        onChange={(e) => updatePracticeQuestion(index, 'code', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Starter code or example code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Answer
                      </label>
                      <textarea
                        value={question.expectedAnswer}
                        onChange={(e) => updatePracticeQuestion(index, 'expectedAnswer', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz References</h2>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={quizInput}
              onChange={(e) => setQuizInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Quiz ID (e.g., 507f1f77bcf86cd799439011)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuizReference())}
            />
            <button
              type="button"
              onClick={addQuizReference}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Quiz
            </button>
          </div>

          {lesson.quiz.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Referenced Quizzes:</h3>
              {lesson.quiz.map((quizId, index) => (
                <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                  <span className="font-mono text-sm text-gray-700">{quizId}</span>
                  <button
                    type="button"
                    onClick={() => removeQuizReference(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="w-5 h-5" />
          Save Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonForm;