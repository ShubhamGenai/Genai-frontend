import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../constants/ApiConstants";

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_COURSES);
        const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
        const found = data.find((c) => c._id === courseId);
        if (!found) {
          setError("Course not found");
        } else {
          setCourse(found);
        }
      } catch (err) {
        console.error("Failed to fetch course details", err);
        setError("Failed to load course details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
          <button
            onClick={() => navigate("/content/courses-list")}
            className="mb-4 inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to courses
          </button>
          <p className="text-red-300 text-base font-semibold">
            {error || "Course not found"}
          </p>
        </div>
      </div>
    );
  }

  const price = course.price || {};

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/content/courses-list")}
            className="inline-flex items-center text-slate-300 hover:text-white text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to courses
          </button>
          <span className="text-xs text-slate-400">
            Course ID: <span className="font-mono">{course._id}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: main info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
                {course.title}
              </h1>
              <p className="text-slate-400 text-sm">{course.category}</p>
            </div>

            <p className="text-slate-200 text-sm whitespace-pre-line">
              {course.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-200 mt-2">
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Level</p>
                <p className="font-semibold">{course.level}</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Students</p>
                <p className="font-semibold">
                  {Array.isArray(course.enrolledStudents)
                    ? course.enrolledStudents.length
                    : 0}
                </p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Price</p>
                <p className="font-semibold">
                  ₹{price.discounted ?? price.actual ?? 0}
                </p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Created</p>
                <p className="font-semibold">
                  {course.createdAt
                    ? new Date(course.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

            {Array.isArray(course.features) && course.features.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Features
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.features.map((f, idx) => (
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

            {Array.isArray(course.learningOutcomes) &&
              course.learningOutcomes.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-300 mb-1">
                    What you will learn
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                    {course.learningOutcomes.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}

            {Array.isArray(course.targetAudience) &&
              course.targetAudience.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-300 mb-1">
                    Target audience
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                    {course.targetAudience.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Right: image & rating */}
          <div className="w-full lg:w-72 space-y-4">
            {course.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-600/40 bg-slate-800/80">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            )}

            <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-600/40 text-xs text-slate-200">
              <p className="font-semibold mb-1">Rating</p>
              <p>
                {course.averageRating?.toFixed
                  ? course.averageRating.toFixed(1)
                  : course.averageRating || 0}{" "}
                / 5
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Best Seller:{" "}
                <span className="font-semibold">
                  {course.isBestSeller ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;


