import React, { useState } from "react";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Intermediate to Advanced",
];

const emptyQuestion = {
  questionText: "",
  options: ["", "", "", ""],
  answer: "",
};

const TestCreate = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [level, setLevel] = useState("");
  const [features, setFeatures] = useState("");
  const [skills, setSkills] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [instructorId, setInstructorId] = useState("");
  const [passingScore, setPassingScore] = useState("");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...emptyQuestion }]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !company || !description || !duration || !numberOfQuestions || !priceActual || !priceDiscounted || !level) {
      alert("Please fill all required fields marked with *");
      return;
    }

    if (!quizTitle || questions.length === 0) {
      alert("Please add at least one quiz with questions.");
      return;
    }

    const featuresArr = features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    const skillsArr = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const quizPayload = {
      title: quizTitle,
      duration: quizDuration ? Number(quizDuration) : undefined,
      questions,
    };

    const payload = {
      title,
      company,
      description,
      duration: Number(duration),
      numberOfQuestions: Number(numberOfQuestions),
      price: {
        actual: Number(priceActual),
        discounted: Number(priceDiscounted),
      },
      level,
      features: featuresArr,
      skills: skillsArr,
      certificate,
      instructor: instructorId || undefined,
      quizzes: [quizPayload],
      passingScore: passingScore ? Number(passingScore) : undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await axios.post(CONTENTMANAGER.ADD_TEST, payload);
      console.log("Test created:", res.data);
      alert("Test created successfully");

      // Reset form
      setTitle("");
      setCompany("");
      setDescription("");
      setDuration("");
      setNumberOfQuestions("");
      setPriceActual("");
      setPriceDiscounted("");
      setLevel("");
      setFeatures("");
      setSkills("");
      setCertificate(true);
      setInstructorId("");
      setPassingScore("");
      setQuizTitle("");
      setQuizDuration("");
      setQuestions([emptyQuestion]);
    } catch (err) {
      console.error("Failed to create test", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to create test";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
          Create Test
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                placeholder="e.g. JEE Main 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Company / Organizer *
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                placeholder="e.g. NTA, SSC"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              placeholder="Short description of the test..."
            />
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Duration (min) *
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Number of Questions *
              </label>
              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Passing Score
              </label>
              <input
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                min={0}
              />
            </div>
          </div>

          {/* Price & Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Actual Price (₹) *
              </label>
              <input
                type="number"
                value={priceActual}
                onChange={(e) => setPriceActual(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Discounted Price (₹) *
              </label>
              <input
                type="number"
                value={priceDiscounted}
                onChange={(e) => setPriceDiscounted(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Level *
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
              >
                <option value="">Select level</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Features (comma separated)
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500"
                placeholder="Mock Test, Detailed Solutions, Timed Exam"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500"
                placeholder="Physics, Chemistry, Mathematics"
              />
            </div>
          </div>

          {/* Instructor & certificate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">
                Instructor ID
              </label>
              <input
                type="text"
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500"
                placeholder="MongoDB ObjectId of instructor (optional)"
              />
            </div>
            <div className="flex items-center mt-4 md:mt-6">
              <input
                id="certificate"
                type="checkbox"
                checked={certificate}
                onChange={(e) => setCertificate(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-slate-600 rounded mr-2"
              />
              <label
                htmlFor="certificate"
                className="text-sm font-semibold text-slate-300"
              >
                Certificate provided
              </label>
            </div>
          </div>

          {/* Quiz builder (simple, single quiz) */}
          <div className="border-t border-slate-600/40 pt-4 mt-2">
            <h2 className="text-lg font-semibold text-white mb-3">
              Quiz for this Test
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500"
                  placeholder="e.g. Full-Length Mock"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">
                  Quiz Duration (min)
                </label>
                <input
                  type="number"
                  value={quizDuration}
                  onChange={(e) => setQuizDuration(e.target.value)}
                  className="w-full bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 py-2.5 text-sm text-white"
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">
                      Question {idx + 1}
                    </h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(idx)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Question Text
                    </label>
                    <input
                      type="text"
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(idx, "questionText", e.target.value)
                      }
                      className="w-full bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Options
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <input
                          key={oIdx}
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(idx, oIdx, e.target.value)
                          }
                          className="w-full bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                          placeholder={`Option ${oIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Correct Answer (must match one option)
                    </label>
                    <input
                      type="text"
                      value={q.answer}
                      onChange={(e) =>
                        handleQuestionChange(idx, "answer", e.target.value)
                      }
                      className="w-full bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 text-xs font-semibold text-white hover:bg-slate-600"
            >
              + Add Question
            </button>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-600/40 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCreate;


