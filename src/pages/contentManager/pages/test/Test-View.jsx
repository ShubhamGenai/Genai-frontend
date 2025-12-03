import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const TestView = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all tests from content manager endpoint and find by id
        const res = await axios.get(CONTENTMANAGER.GET_TESTS);
        const data = Array.isArray(res.data) ? res.data : res.data.tests || [];
        const found = data.find((t) => t._id === testId);
        if (!found) {
          setError("Test not found");
        } else {
          setTest(found);
        }
      } catch (err) {
        console.error("Failed to fetch test details", err);
        setError("Failed to load test details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchTest();
    }
  }, [testId]);

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

        <div className="flex flex-col lg:flex-row gap-6">
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
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Passing Score</p>
                <p className="font-semibold">{test.passingScore}</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Total Marks</p>
                <p className="font-semibold">{test.totalMarks}</p>
              </div>
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
      </div>
    </div>
  );
};

export default TestView;


