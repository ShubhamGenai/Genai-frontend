import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon, EyeIcon, XIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import FormulaRenderer from "../../../../component/contentManagerComponents/FormulaRenderer";

const QuizView = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(CONTENTMANAGER.GET_QUIZ);
        const allQuizzes = Array.isArray(res.data) ? res.data : res.data.quizzes || [];
        const found = allQuizzes.find((q) => q._id === quizId);

        if (!found) {
          setError("Quiz not found");
        } else {
          setQuiz(found);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quiz. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
          <button
            onClick={() => navigate("/content/quizzes")}
            className="mb-4 inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to quizzes
          </button>
          <p className="text-red-300 text-base font-semibold">
            {error || "Quiz not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/content/quizzes")}
            className="inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to quizzes
          </button>
          <span className="text-xs text-slate-400">
            Quiz ID: <span className="font-mono">{quiz._id}</span>
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            {quiz.title}
          </h1>
          
          {/* Display quiz-level image if available */}
          {(quiz.imageUrl || quiz.image || quiz.imageURL) && (
            <div className="mb-4 rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-2 relative group">
              <img
                src={quiz.imageUrl || quiz.image || quiz.imageURL}
                alt={`${quiz.title} image`}
                className="max-w-full max-h-48 w-auto object-contain rounded mx-auto"
                crossOrigin="anonymous"
                loading="lazy"
                onError={(e) => {
                  console.error('Quiz image failed to load:', quiz.imageUrl || quiz.image || quiz.imageURL);
                  e.target.style.display = 'none';
                }}
              />
              <button
                onClick={() => setViewingImage(quiz.imageUrl || quiz.image || quiz.imageURL)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="View full size"
              >
                <EyeIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            {quiz.duration && (
              <span className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-600/40">
                ⏱ Duration: {quiz.duration} min
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-600/40">
              ❓ Questions: {quiz.questions?.length || 0}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((q, index) => (
              <div
                key={index}
                className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-5"
              >
                <div className="flex gap-4 items-start">
                  {/* Left column - Question content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-white">
                        <span className="mr-2">Q{index + 1}.</span>
                        <span className="inline-block">
                          <FormulaRenderer text={q.questionText || ''} className="text-white" />
                        </span>
                      </h2>
                    </div>

                    {q.options && q.options.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isCorrect =
                            q.answer &&
                            (q.answer === opt ||
                              q.answer.toString().trim() === opt.toString().trim());

                          return (
                            <li
                              key={optIndex}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                                isCorrect
                                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-100"
                                  : "bg-slate-800/60 border border-slate-600/30 text-slate-200"
                              }`}
                            >
                              <span className="flex items-start gap-2 flex-1">
                                <span className="font-semibold mr-1">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span className="flex-1">
                                  <FormulaRenderer text={opt || ''} className={isCorrect ? "text-emerald-100" : "text-slate-200"} />
                                </span>
                              </span>
                              {isCorrect && (
                                <span className="text-xs font-semibold uppercase ml-2">
                                  Correct
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {q.answer && (
                      <p className="mt-3 text-xs text-emerald-300">
                        Correct answer:{" "}
                        <span className="font-semibold">
                          <FormulaRenderer text={q.answer} className="text-emerald-300" />
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Right column - Image */}
                  {(q.imageUrl || q.image || q.imageURL) && (q.imageUrl?.trim() || q.image?.trim() || q.imageURL?.trim()) && (
                    <div className="flex-shrink-0 w-48">
                      <div className="rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-2 relative group">
                        <img
                          src={q.imageUrl || q.image || q.imageURL}
                          alt={`Question ${index + 1} diagram`}
                          className="max-w-full max-h-48 w-full object-contain rounded mx-auto block"
                          crossOrigin="anonymous"
                          loading="lazy"
                          onError={(e) => {
                            console.error('Question image failed to load:', q.imageUrl || q.image || q.imageURL);
                            e.target.style.display = 'none';
                            const container = e.target.parentElement;
                            if (container) {
                              container.innerHTML = '<div class="text-slate-500 text-xs text-center py-2">Image failed to load</div>';
                            }
                          }}
                        />
                        <button
                          onClick={() => setViewingImage(q.imageUrl || q.image || q.imageURL)}
                          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="View full size"
                        >
                          <EyeIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-300 text-base">
              This quiz does not contain any questions yet.
            </p>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewingImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setViewingImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setViewingImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
              title="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <img
              src={viewingImage}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error('Image failed to load:', viewingImage);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;


