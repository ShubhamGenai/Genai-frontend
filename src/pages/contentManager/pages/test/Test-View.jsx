import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon, QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const TestView = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuizzes, setExpandedQuizzes] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching test with ID:", testId);
        const res = await axios.get(`${CONTENTMANAGER.GET_TEST_BY_ID}/${testId}`);
        console.log("API Response:", res.data);
        const testData = res.data.test || res.data;
        console.log("Test data:", testData);
        console.log("Quizzes:", testData.quizzes);
        if (testData.quizzes && testData.quizzes.length > 0) {
          console.log("First quiz:", testData.quizzes[0]);
          console.log("First quiz questions:", testData.quizzes[0].questions?.length || 0);
        }
        setTest(testData);
      } catch (err) {
        console.error("Failed to fetch test details", err);
        console.error("Error response:", err.response?.data);
        setError(err.response?.data?.error || "Failed to load test details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchTest();
    }
  }, [testId]);

  const toggleQuiz = (quizId) => {
    setExpandedQuizzes(prev => ({
      ...prev,
      [quizId]: !prev[quizId]
    }));
  };

  const toggleQuestion = (questionKey) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
          <button
            onClick={() => navigate("/content/test-list")}
            className="mb-4 inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to tests
          </button>
          <p className="text-red-300 text-base font-semibold">
            {error || "Test not found"}
          </p>
        </div>
      </div>
    );
  }

  const priceDisplay =
    test.price && typeof test.price === "object"
      ? test.price.discounted
      : test.price;

  // Handle quizzes - could be array of IDs or populated objects
  const quizzes = Array.isArray(test.quizzes) 
    ? test.quizzes.filter(q => q && typeof q === 'object' && q.title) 
    : [];

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/content/test-list")}
            className="inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to tests
          </button>
          <span className="text-xs text-slate-400">
            Test ID: <span className="font-mono">{test._id}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left: main info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
                {test.title}
              </h1>
              <p className="text-slate-400 text-sm">{test.company}</p>
            </div>

            <p className="text-slate-200 text-sm whitespace-pre-line">
              {test.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-200 mt-2">
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Duration</p>
                <p className="font-semibold">{test.duration} min</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Questions</p>
                <p className="font-semibold">{test.numberOfQuestions}</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Level</p>
                <p className="font-semibold">{test.level}</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Price</p>
                <p className="font-semibold">₹{priceDisplay}</p>
              </div>
              {test.passingScore && (
                <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                  <p className="text-slate-400 text-[11px]">Passing Score</p>
                  <p className="font-semibold">{test.passingScore}</p>
                </div>
              )}
              {test.totalMarks && (
                <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                  <p className="text-slate-400 text-[11px]">Total Marks</p>
                  <p className="font-semibold">{test.totalMarks}</p>
                </div>
              )}
            </div>

            {Array.isArray(test.features) && test.features.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Features
                </p>
                <div className="flex flex-wrap gap-2">
                  {test.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-800/60 text-[11px] text-slate-200 border border-slate-600/40"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(test.skills) && test.skills.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {test.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-800/60 text-[11px] text-slate-200 border border-slate-600/40"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: image & rating */}
          <div className="w-full lg:w-72 space-y-4">
            {test.image && (
              <div className="rounded-xl overflow-hidden border border-slate-600/40 bg-slate-800/80">
                <img
                  src={test.image}
                  alt={test.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            )}

            <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-600/40 text-xs text-slate-200">
              <p className="font-semibold mb-1">Rating</p>
              <p>
                {test.averageRating?.toFixed
                  ? test.averageRating.toFixed(1)
                  : test.averageRating || 0}{" "}
                / 5 (
                {typeof test.totalReviews === "number"
                  ? test.totalReviews
                  : 0}{" "}
                reviews)
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Certificate:{" "}
                <span className="font-semibold">
                  {test.certificate ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quizzes Section */}
        {quizzes.length > 0 && (
          <div className="mt-8 border-t border-slate-600/30 pt-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
              Test Quizzes ({quizzes.length})
            </h2>
            <div className="space-y-4">
              {quizzes.map((quiz, quizIndex) => {
                const quizId = quiz._id || quizIndex;
                const isQuizExpanded = expandedQuizzes[quizId];
                const questions = Array.isArray(quiz.questions) ? quiz.questions : [];

                return (
                  <div
                    key={quizId}
                    className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="bg-indigo-600/20 text-indigo-300 rounded-lg px-3 py-1 text-sm font-semibold mr-3">
                            Quiz {quizIndex + 1}
                          </div>
                          <h3 className="text-lg font-bold text-white">
                            {quiz.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400 ml-16">
                          {quiz.duration && (
                            <span>Duration: {quiz.duration} min</span>
                          )}
                          <span>Questions: {questions.length}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleQuiz(quizId)}
                        className="ml-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/60"
                        aria-label={isQuizExpanded ? "Hide quiz details" : "Show quiz details"}
                      >
                        {isQuizExpanded ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {isQuizExpanded && questions.length > 0 && (
                      <div className="mt-4 space-y-4 pl-4 border-l-2 border-indigo-500/30">
                        {questions.map((question, qIndex) => {
                          const questionKey = `${quizId}-${qIndex}`;
                          const isQuestionExpanded = expandedQuestions[questionKey];
                          const options = Array.isArray(question.options) ? question.options : [];
                          const answer = question.answer || "";

                          return (
                            <div
                              key={qIndex}
                              className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/20"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <span className="bg-indigo-500/20 text-indigo-300 rounded px-2 py-0.5 text-xs font-semibold mr-2">
                                      Q{qIndex + 1}
                                    </span>
                                    <p className="text-base font-semibold text-white">
                                      {question.questionText || "Question text not available"}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleQuestion(questionKey)}
                                  className="ml-4 p-1.5 text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-600/60"
                                  aria-label={isQuestionExpanded ? "Hide options" : "Show options"}
                                >
                                  {isQuestionExpanded ? (
                                    <ChevronUpIcon className="h-4 w-4" />
                                  ) : (
                                    <ChevronDownIcon className="h-4 w-4" />
                                  )}
                                </button>
                              </div>

                              {isQuestionExpanded && (
                                <div className="mt-3 space-y-2 pl-6">
                                  <div>
                                    <p className="text-xs font-semibold text-slate-400 mb-2">Options:</p>
                                    <div className="space-y-2">
                                      {options.map((option, optIndex) => {
                                        const isCorrect = option === answer || option.trim() === answer.trim();
                                        return (
                                          <div
                                            key={optIndex}
                                            className={`p-2 rounded-lg border ${
                                              isCorrect
                                                ? "bg-green-500/20 border-green-500/50"
                                                : "bg-slate-800/60 border-slate-600/30"
                                            }`}
                                          >
                                            <div className="flex items-center">
                                              <span className="text-xs font-semibold text-slate-400 mr-2 w-6">
                                                {String.fromCharCode(65 + optIndex)}.
                                              </span>
                                              <span className={`text-sm ${
                                                isCorrect ? "text-green-300 font-semibold" : "text-slate-200"
                                              }`}>
                                                {option || "Empty option"}
                                              </span>
                                              {isCorrect && (
                                                <span className="ml-2 text-xs text-green-400 font-semibold">
                                                  ✓ Correct Answer
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  {answer && (
                                    <div className="mt-3 pt-3 border-t border-slate-600/30">
                                      <p className="text-xs font-semibold text-slate-400 mb-1">Correct Answer:</p>
                                      <p className="text-sm text-green-300 font-semibold">{answer}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {isQuizExpanded && questions.length === 0 && (
                      <div className="mt-4 pl-4 text-sm text-slate-400 italic">
                        No questions available for this quiz.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {quizzes.length === 0 && (
          <div className="mt-8 border-t border-slate-600/30 pt-8">
            <p className="text-slate-400 text-sm italic">
              No quizzes associated with this test.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestView;
