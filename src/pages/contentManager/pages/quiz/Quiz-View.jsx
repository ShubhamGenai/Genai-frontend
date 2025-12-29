import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import FormulaRenderer from "../../../../component/contentManagerComponents/FormulaRenderer";

const QuizView = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-semibold text-white">
                    <span className="mr-2">Q{index + 1}.</span>
                    <span className="inline-block">
                      <FormulaRenderer text={q.questionText || ''} className="text-white" />
                    </span>
                  </h2>
                </div>

                {/* Display question image if available */}
                {q.imageUrl && q.imageUrl.trim() !== '' && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-slate-900/50 border border-slate-600/30 p-3">
                    <img
                      src={q.imageUrl}
                      alt={`Question ${index + 1} diagram`}
                      className="max-w-full max-h-64 object-contain rounded mx-auto"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', q.imageUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

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
            ))
          ) : (
            <p className="text-slate-300 text-base">
              This quiz does not contain any questions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;


