import React, { useState } from 'react';
import { CheckCircle, XCircle, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';
import QuestionImageUpload from './QuestionImageUpload';

const ParsedQuestionPreview = ({ questions, onQuestionsChange, onRemoveQuestion }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [imageUploadForQuestion, setImageUploadForQuestion] = useState(null);

  const handleQuestionEdit = (index, field, value) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[index].options = value;
    } else if (field === 'answer') {
      updated[index].answer = value.toUpperCase();
    } else {
      updated[index][field] = value;
    }
    onQuestionsChange(updated);
  };

  const handleOptionEdit = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    onQuestionsChange(updated);
  };

  const handleAddOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    onQuestionsChange(updated);
  };

  const handleRemoveOption = (qIndex, optIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 2) {
      updated[qIndex].options.splice(optIndex, 1);
      onQuestionsChange(updated);
    }
  };

  const handleImageUploaded = (questionIndex, imageUrl) => {
    const updated = [...questions];
    updated[questionIndex].imageUrl = imageUrl;
    onQuestionsChange(updated);
    setImageUploadForQuestion(null);
  };

  const validateQuestion = (question) => {
    const hasText = question.questionText && question.questionText.trim().length > 0;
    const hasOptions = question.options && question.options.length >= 2;
    const hasValidOptions = question.options && question.options.every(opt => opt && opt.trim().length > 0);
    const hasAnswer = question.answer && ['A', 'B', 'C', 'D'].includes(question.answer.toUpperCase());
    const answerMatchesOption = question.answer && question.options && 
      question.options[['A', 'B', 'C', 'D'].indexOf(question.answer.toUpperCase())];

    return {
      isValid: hasText && hasOptions && hasValidOptions && hasAnswer && answerMatchesOption,
      errors: {
        noText: !hasText,
        noOptions: !hasOptions,
        invalidOptions: !hasValidOptions,
        noAnswer: !hasAnswer,
        answerMismatch: !answerMatchesOption
      }
    };
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const validation = validateQuestion(question);
        const isEditing = editingIndex === index;

        return (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              validation.isValid
                ? 'border-green-500/40 bg-green-500/5'
                : 'border-red-500/40 bg-red-500/5'
            }`}
          >
            {/* Question Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-300">
                  Question {question.questionNumber || index + 1}
                </span>
                {validation.isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingIndex(isEditing ? null : index)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {onRemoveQuestion && (
                  <button
                    onClick={() => onRemoveQuestion(index)}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Validation Errors */}
            {!validation.isValid && (
              <div className="mb-3 text-xs text-red-400 space-y-1">
                {validation.errors.noText && <p>• Question text is required</p>}
                {validation.errors.noOptions && <p>• At least 2 options are required</p>}
                {validation.errors.invalidOptions && <p>• All options must have text</p>}
                {validation.errors.noAnswer && <p>• Valid answer (A, B, C, or D) is required</p>}
                {validation.errors.answerMismatch && <p>• Answer must match one of the options</p>}
              </div>
            )}

            {/* Question Text */}
            {isEditing ? (
              <textarea
                value={question.questionText || ''}
                onChange={(e) => handleQuestionEdit(index, 'questionText', e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 mb-3"
                placeholder="Enter question text..."
                rows={3}
              />
            ) : (
              <p className="text-sm text-slate-200 mb-3">{question.questionText || 'No question text'}</p>
            )}

            {/* Question Image */}
            {question.imageUrl && (
              <div className="mb-3">
                <img
                  src={question.imageUrl}
                  alt="Question diagram"
                  className="max-w-full h-auto max-h-48 rounded-lg border border-slate-600/30"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Image Upload Button */}
            <button
              onClick={() => setImageUploadForQuestion(index)}
              className="mb-3 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3" />
              {question.imageUrl ? 'Change Image' : 'Add Diagram/Image'}
            </button>

            {/* Options */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Options:</label>
              {question.options && question.options.map((option, optIndex) => {
                const optionLetter = ['A', 'B', 'C', 'D'][optIndex] || String.fromCharCode(65 + optIndex);
                const isCorrect = question.answer && question.answer.toUpperCase() === optionLetter;

                return (
                  <div
                    key={optIndex}
                    className={`flex items-center gap-2 p-2 rounded ${
                      isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/40 border border-slate-600/30'
                    }`}
                  >
                    <span className="text-xs font-medium text-slate-400 w-6">{optionLetter}.</span>
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={option || ''}
                          onChange={(e) => handleOptionEdit(index, optIndex, e.target.value)}
                          className="flex-1 bg-slate-700/40 border border-slate-600/30 rounded px-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                          placeholder={`Option ${optionLetter}`}
                        />
                        {question.options.length > 2 && (
                          <button
                            onClick={() => handleRemoveOption(index, optIndex)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="flex-1 text-xs text-slate-200">{option || 'Empty option'}</span>
                    )}
                    {isCorrect && !isEditing && (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}
              
              {isEditing && question.options.length < 4 && (
                <button
                  onClick={() => handleAddOption(index)}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  + Add Option
                </button>
              )}
            </div>

            {/* Answer Selection */}
            {isEditing && (
              <div className="mt-3">
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Correct Answer:</label>
                <select
                  value={question.answer || ''}
                  onChange={(e) => handleQuestionEdit(index, 'answer', e.target.value)}
                  className="bg-slate-800/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="">Select answer</option>
                  {question.options && question.options.map((_, optIndex) => {
                    const optionLetter = ['A', 'B', 'C', 'D'][optIndex] || String.fromCharCode(65 + optIndex);
                    return (
                      <option key={optIndex} value={optionLetter}>
                        {optionLetter}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Marks */}
            {isEditing && (
              <div className="mt-3">
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Marks:</label>
                <input
                  type="number"
                  value={question.marks || 1}
                  onChange={(e) => handleQuestionEdit(index, 'marks', parseInt(e.target.value) || 1)}
                  min="1"
                  className="bg-slate-800/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-20"
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Image Upload Modal */}
      {imageUploadForQuestion !== null && (
        <QuestionImageUpload
          questionId={`question-${imageUploadForQuestion}`}
          existingImageUrl={questions[imageUploadForQuestion]?.imageUrl}
          onImageUploaded={(imageUrl) => handleImageUploaded(imageUploadForQuestion, imageUrl)}
          onClose={() => setImageUploadForQuestion(null)}
        />
      )}
    </div>
  );
};

export default ParsedQuestionPreview;

