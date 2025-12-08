import React, { useState, useEffect } from "react";
import axios from "axios";
import { CONTENTMANAGER } from "../../constants/ApiConstants";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-800/95 backdrop-blur-md w-full max-w-4xl p-8 rounded-xl shadow-2xl border border-slate-600/50 relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 text-2xl font-bold z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="overflow-y-auto flex-1 pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const QuizSelectorPopup = ({ isOpen, onClose, selectedQuizzes = [], onSelect }) => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuizIds, setSelectedQuizIds] = useState(
    selectedQuizzes.map(q => typeof q === 'string' ? q : q._id || q.id)
  );

  // Fetch quizzes when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchQuizzes();
      // Initialize selected quizzes from props
      setSelectedQuizIds(selectedQuizzes.map(q => typeof q === 'string' ? q : q._id || q.id));
    }
  }, [isOpen, selectedQuizzes]);

  const fetchQuizzes = async () => {
    setIsLoadingQuizzes(true);
    try {
      const response = await axios.get(CONTENTMANAGER.GET_QUIZ);
      // GET_QUIZ returns an array of quizzes directly
      const quizzes = Array.isArray(response.data) ? response.data : [];
      setAvailableQuizzes(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      alert("Failed to load quizzes. Please try again.");
    } finally {
      setIsLoadingQuizzes(false);
    }
  };

  const handleToggleQuiz = (quizId) => {
    setSelectedQuizIds((prev) => {
      if (prev.includes(quizId)) {
        return prev.filter((id) => id !== quizId);
      } else {
        return [...prev, quizId];
      }
    });
  };

  const handleConfirm = () => {
    const selected = availableQuizzes.filter((quiz) =>
      selectedQuizIds.includes(quiz._id)
    );
    onSelect(selected);
    onClose();
  };

  const filteredQuizzes = availableQuizzes.filter((quiz) =>
    quiz.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Select Quizzes</h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Loading state */}
        {isLoadingQuizzes ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            {searchTerm ? "No quizzes found matching your search." : "No quizzes available."}
          </div>
        ) : (
          <>
            {/* Quiz list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredQuizzes.map((quiz) => {
                const isSelected = selectedQuizIds.includes(quiz._id);
                const questionCount = Array.isArray(quiz.questions) ? quiz.questions.length : 0;
                
                return (
                  <div
                    key={quiz._id}
                    onClick={() => handleToggleQuiz(quiz._id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500/50"
                        : "bg-slate-700/40 border-slate-600/30 hover:bg-slate-700/60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleQuiz(quiz._id)}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1 h-4 w-4 text-indigo-600 border-slate-600 rounded focus:ring-indigo-500"
                        />
                        <div className="ml-3 flex-1">
                          <h3 className="text-base font-semibold text-white">
                            {quiz.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-4 text-xs text-slate-400">
                            {quiz.duration && (
                              <span>Duration: {quiz.duration} min</span>
                            )}
                            <span>Questions: {questionCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected summary */}
            {selectedQuizIds.length > 0 && (
              <div className="mt-4 p-4 bg-slate-700/40 rounded-lg border border-slate-600/30">
                <p className="text-sm font-semibold text-slate-300 mb-2">
                  Selected: {selectedQuizIds.length} quiz{selectedQuizIds.length !== 1 ? "zes" : ""}
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableQuizzes
                    .filter((q) => selectedQuizIds.includes(q._id))
                    .map((quiz) => (
                      <span
                        key={quiz._id}
                        className="px-2 py-1 bg-indigo-600/20 text-indigo-300 text-xs rounded border border-indigo-500/30"
                      >
                        {quiz.title}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-600/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 text-sm font-semibold text-white hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Add Selected ({selectedQuizIds.length})
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default QuizSelectorPopup;
