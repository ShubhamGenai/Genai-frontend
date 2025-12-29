import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import FormulaRenderer from "../../../../component/contentManagerComponents/FormulaRenderer";

const QuizQuestionBank = ({ onQuestionsSelected, onClose }) => {
  const navigate = useNavigate();
  
  const [pdfFile, setPdfFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [parseError, setParseError] = useState(null);
  const [parseResult, setParseResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setParseError('Please select a PDF file');
        return;
      }
      setPdfFile(file);
      setParseError(null);
      setParseResult(null);
      setParsedQuestions([]);
      setSelectedQuestions(new Set());
    }
  };

  const handleParsePDF = async () => {
    if (!pdfFile) {
      setParseError('Please select a PDF file first');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setParseResult(null);
    setSelectedQuestions(new Set());

    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);

      const response = await axios.post(CONTENTMANAGER.PARSE_PDF_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setParseResult(response.data.data);
        setParsedQuestions(response.data.data.questions || []);
        
        // Show validation warnings if any
        if (response.data.data.validation && response.data.data.validation.warnings.length > 0) {
          console.warn('Parsing warnings:', response.data.data.validation.warnings);
        }
      } else {
        setParseError('Failed to parse PDF');
      }
    } catch (err) {
      console.error('Error parsing PDF:', err);
      setParseError(err.response?.data?.error || err.message || 'Failed to parse PDF');
    } finally {
      setIsParsing(false);
    }
  };

  const toggleQuestionSelection = (index) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedQuestions(newSelected);
  };

  const selectAll = () => {
    setSelectedQuestions(new Set(parsedQuestions.map((_, index) => index)));
  };

  const deselectAll = () => {
    setSelectedQuestions(new Set());
  };

  const handleAddSelected = () => {
    if (selectedQuestions.size === 0) {
      alert('Please select at least one question');
      return;
    }

    const selected = Array.from(selectedQuestions)
      .map(index => parsedQuestions[index])
      .filter(q => q !== null && q !== undefined);

    if (onQuestionsSelected) {
      onQuestionsSelected(selected);
    }
    
    if (onClose) {
      onClose();
    } else {
      navigate('/content/quizzes');
    }
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {onClose ? (
              <button
                onClick={onClose}
                className="mr-4 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/content/quizzes")}
                className="mr-4 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Quiz Question Bank
            </h1>
          </div>
          {parsedQuestions.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">
                {selectedQuestions.size} of {parsedQuestions.length} selected
              </span>
              <button
                onClick={selectAll}
                className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Select All
              </button>
              <button
                onClick={deselectAll}
                className="px-3 py-1.5 bg-slate-600/80 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Deselect All
              </button>
            </div>
          )}
        </div>

        {/* PDF Upload Section */}
        <div className="bg-slate-800/40 rounded-lg p-6 border border-slate-600/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Upload PDF</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                PDF File
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
                {/* Parse button hidden */}
                {false && pdfFile && (
                  <button
                    type="button"
                    onClick={handleParsePDF}
                    disabled={isParsing}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold flex items-center gap-2"
                  >
                    {isParsing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Parsing...
                      </>
                    ) : (
                      'Parse PDF with Claude'
                    )}
                  </button>
                )}
              </div>
              {pdfFile && (
                <p className="text-xs text-slate-400 mt-2">Selected: {pdfFile.name}</p>
              )}
            </div>

            {parseError && (
              <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 text-sm text-red-200">
                <p className="font-semibold mb-1">Error</p>
                <p>{parseError}</p>
              </div>
            )}

            {parseResult && (
              <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-4 text-sm text-emerald-200">
                <p className="font-semibold mb-1">Success!</p>
                <p>Found {parseResult.totalQuestions} questions from PDF</p>
                {parseResult.validation && parseResult.validation.warnings.length > 0 && (
                  <div className="mt-2 text-xs">
                    <p className="font-semibold">Warnings:</p>
                    <ul className="list-disc list-inside">
                      {parseResult.validation.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        {parsedQuestions.length > 0 && (
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-white">
              Parsed Questions ({parsedQuestions.length})
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {parsedQuestions.map((question, index) => {
                const isSelected = selectedQuestions.has(index);
                
                return (
                  <div
                    key={index}
                    className={`bg-slate-800/40 border rounded-xl p-5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-slate-600/30 hover:border-slate-500/50'
                    }`}
                    onClick={() => toggleQuestionSelection(index)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Selection Checkbox */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600'
                          : 'border-slate-500'
                      }`}>
                        {isSelected && (
                          <CheckIcon className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-indigo-500/20 text-indigo-300 rounded px-2 py-0.5 text-xs font-semibold">
                                Q{index + 1}
                              </span>
                              <span className="text-sm text-slate-400">
                                {question.marks || 1} mark{question.marks !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="text-base font-semibold text-white mb-2">
                              <FormulaRenderer text={question.questionText || ''} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Question Image if available */}
                        {question.imageUrl && question.imageUrl.trim() !== '' && (
                          <div className="mb-3 rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-2">
                            {question.imageUrl.startsWith('http') ? (
                              <img
                                src={question.imageUrl}
                                alt={`Question ${index + 1} diagram`}
                                className="max-w-full max-h-48 object-contain rounded mx-auto"
                                crossOrigin="anonymous"
                                loading="lazy"
                                onError={(e) => {
                                  console.error('Image failed to load:', question.imageUrl);
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <p className="text-xs text-slate-400 italic p-2">
                                Diagram: {question.imageUrl}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Options */}
                        {question.options && question.options.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {question.options.map((option, optIndex) => {
                              const isCorrect = question.answer && 
                                (question.answer.trim() === option.trim() ||
                                 question.answer.toString().trim() === option.toString().trim());
                              
                              return (
                                <div
                                  key={optIndex}
                                  className={`px-3 py-2 rounded-lg text-sm ${
                                    isCorrect
                                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-100'
                                      : 'bg-slate-800/60 border border-slate-600/30 text-slate-200'
                                  }`}
                                >
                                  <span className="font-semibold mr-2">
                                    {String.fromCharCode(65 + optIndex)}.
                                  </span>
                                  <FormulaRenderer 
                                    text={option || ''} 
                                    className={isCorrect ? 'text-emerald-100' : 'text-slate-200'} 
                                  />
                                  {isCorrect && (
                                    <span className="ml-2 text-xs font-semibold text-emerald-300">
                                      ✓ Correct
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Answer */}
                        {question.answer && (
                          <div className="mt-3 pt-3 border-t border-slate-600/30">
                            <p className="text-xs font-semibold text-slate-400 mb-1">Correct Answer:</p>
                            <p className="text-sm text-emerald-300 font-semibold">
                              <FormulaRenderer text={question.answer} className="text-emerald-300" />
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {parsedQuestions.length > 0 && (
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-600/30">
            <button
              onClick={onClose || (() => navigate("/content/quizzes"))}
              className="px-6 py-2.5 bg-slate-700/40 border border-slate-600/30 rounded-xl text-sm font-semibold text-white hover:bg-slate-700/70 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSelected}
              disabled={selectedQuestions.size === 0}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add {selectedQuestions.size > 0 ? `${selectedQuestions.size} ` : ''}Selected Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionBank;

