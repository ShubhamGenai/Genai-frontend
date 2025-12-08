import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon, BookOpenIcon, PlayIcon, ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
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
        console.log("Fetching course with ID:", courseId);
        const res = await axios.get(`${CONTENTMANAGER.GET_COURSE_BY_ID}/${courseId}`);
        console.log("API Response:", res.data);
        const courseData = res.data.course || res.data;
        console.log("Course data:", courseData);
        console.log("Modules:", courseData.modules);
        if (courseData.modules && courseData.modules.length > 0) {
          console.log("First module:", courseData.modules[0]);
          console.log("First module lessons:", courseData.modules[0].lessons);
        }
        setCourse(courseData);
      } catch (err) {
        console.error("Failed to fetch course details", err);
        console.error("Error response:", err.response?.data);
        setError(err.response?.data?.error || "Failed to load course details. Please try again.");
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
  // Handle modules - could be array of IDs or populated objects
  const modules = Array.isArray(course.modules) 
    ? course.modules.filter(m => m && typeof m === 'object' && m.title) 
    : [];
  
  console.log("Rendering with modules:", modules.length);

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

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
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

            {course.courseDescription && (
              <div className="mt-4">
                <h3 className="text-base font-semibold text-slate-300 mb-2">Course Description</h3>
                <p className="text-slate-200 text-sm whitespace-pre-line">
                  {course.courseDescription}
                </p>
              </div>
            )}

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
                  {price.actual && price.discounted && price.actual > price.discounted && (
                    <span className="text-slate-400 line-through ml-1">₹{price.actual}</span>
                  )}
                </p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Duration</p>
                <p className="font-semibold">{course.duration || "-"}</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/60">
                <p className="text-slate-400 text-[11px]">Modules</p>
                <p className="font-semibold">{modules.length}</p>
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

            {course.requirements && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Requirements
                </p>
                <p className="text-xs text-slate-200 whitespace-pre-line">
                  {course.requirements}
                </p>
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
              <p className="mt-2 text-[11px] text-slate-400">
                Certificate:{" "}
                <span className="font-semibold">
                  {course.certificate ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-slate-800/60 rounded-lg text-xs text-slate-400">
            <p>Debug: Modules count: {course.modules?.length || 0}</p>
            <p>Debug: Filtered modules: {modules.length}</p>
            <p>Debug: Course modules type: {Array.isArray(course.modules) ? 'array' : typeof course.modules}</p>
            {course.modules && course.modules.length > 0 && (
              <p>Debug: First module type: {typeof course.modules[0]}</p>
            )}
          </div>
        )}

        {/* Modules and Lessons Section */}
        {modules.length > 0 && (
          <div className="mt-8 border-t border-slate-600/30 pt-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-2" />
              Course Modules ({modules.length})
            </h2>
            <div className="space-y-4">
              {modules.map((module, moduleIndex) => {
                const lessons = module.lessons || [];
                return (
                  <div
                    key={module._id || moduleIndex}
                    className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-indigo-600/20 text-indigo-300 rounded-lg px-3 py-1 text-sm font-semibold mr-3">
                          Module {moduleIndex + 1}
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {module.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400">
                        {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
                      </span>
                    </div>

                    {lessons.length > 0 && (
                      <div className="ml-4 space-y-3">
                        {lessons.map((lesson, lessonIndex) => {
                          const quizzes = lesson.quiz || [];
                          return (
                            <div
                              key={lesson._id || lessonIndex}
                              className="bg-slate-700/40 border border-slate-600/20 rounded-lg p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <PlayIcon className="h-4 w-4 text-indigo-400 mr-2" />
                                    <h4 className="text-base font-semibold text-white">
                                      {lesson.title}
                                    </h4>
                                  </div>
                                  {lesson.duration && (
                                    <div className="flex items-center text-xs text-slate-400 mb-2">
                                      <ClockIcon className="h-3 w-3 mr-1" />
                                      Duration: {lesson.duration} minutes
                                    </div>
                                  )}
                                  {lesson.content && (
                                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                                      {lesson.content.substring(0, 150)}
                                      {lesson.content.length > 150 ? "..." : ""}
                                    </p>
                                  )}
                                  
                                  {/* Practice Questions */}
                                  {Array.isArray(lesson.practiceQuestions) && 
                                   lesson.practiceQuestions.length > 0 && (
                                    <div className="mt-3">
                                      <p className="text-xs font-semibold text-slate-300 mb-1">
                                        Practice Questions: {lesson.practiceQuestions.length}
                                      </p>
                                    </div>
                                  )}

                                  {/* Quizzes */}
                                  {quizzes.length > 0 && (
                                    <div className="mt-3">
                                      <div className="flex items-center mb-2">
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-purple-400 mr-1" />
                                        <p className="text-xs font-semibold text-slate-300">
                                          Quizzes ({quizzes.length})
                                        </p>
                                      </div>
                                      <div className="space-y-2 ml-5">
                                        {quizzes.map((quiz, quizIndex) => (
                                          <div
                                            key={quiz._id || quizIndex}
                                            className="bg-slate-600/30 rounded-lg p-2 border border-slate-500/20"
                                          >
                                            <p className="text-xs font-medium text-purple-300">
                                              {quiz.title}
                                            </p>
                                            {quiz.duration && (
                                              <p className="text-[10px] text-slate-400 mt-1">
                                                Duration: {quiz.duration} min
                                              </p>
                                            )}
                                            {Array.isArray(quiz.questions) && (
                                              <p className="text-[10px] text-slate-400 mt-1">
                                                {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
                                              </p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {modules.length === 0 && course.modules && course.modules.length > 0 && (
          <div className="mt-8 border-t border-slate-600/30 pt-8">
            <p className="text-slate-400 text-sm text-center py-8">
              Modules exist but are not populated. Please check the API response.
            </p>
            <p className="text-slate-500 text-xs text-center">
              Module IDs: {course.modules.map(m => typeof m === 'object' && m._id ? m._id : m).join(', ')}
            </p>
          </div>
        )}

        {(!course.modules || course.modules.length === 0) && (
          <div className="mt-8 border-t border-slate-600/30 pt-8">
            <p className="text-slate-400 text-sm text-center py-8">
              No modules added to this course yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;
