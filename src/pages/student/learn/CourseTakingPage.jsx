import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, Book, PlayCircle, Loader, ChevronLeft, MessageSquare } from 'lucide-react';
import { LEARN_COURSES } from './mockCatalog';

const CourseTakingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [activeLesson, setActiveLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // New state for right chatbox

  const allLessons = useMemo(() => {
    const lessons = [];
    course?.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        lessons.push({ ...lesson, moduleId: module.id });
      });
    });
    return lessons;
  }, [course]);

  const currentLessonIndex = useMemo(() => {
    if (!activeLesson) return -1;
    return allLessons.findIndex(
      lesson =>
        lesson.moduleId === activeLesson.moduleId && lesson.id === activeLesson.lessonId
    );
  }, [activeLesson, allLessons]);

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const previousLesson = allLessons[currentLessonIndex - 1];
      setActiveLesson({ moduleId: previousLesson.moduleId, lessonId: previousLesson.id });
      setExpandedModules(prev => ({ ...prev, [previousLesson.moduleId]: true }));
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      setActiveLesson({ moduleId: nextLesson.moduleId, lessonId: nextLesson.id });
      setExpandedModules(prev => ({ ...prev, [nextLesson.moduleId]: true }));
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundCourse = LEARN_COURSES.find(c => String(c.id) === String(id));
        if (foundCourse) {
          setCourse(foundCourse);
          // Set first module/lesson as active by default
          if (foundCourse.modules && foundCourse.modules.length > 0) {
            setExpandedModules({ [foundCourse.modules[0].id]: true });
            if (foundCourse.modules[0].lessons && foundCourse.modules[0].lessons.length > 0) {
              setActiveLesson({ moduleId: foundCourse.modules[0].id, lessonId: foundCourse.modules[0].lessons[0].id });
            }
          }
        } else {
          setError('Course not found.');
        }
      } catch (err) {
        setError('Failed to load course content.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleLessonClick = (moduleId, lessonId) => {
    setActiveLesson({ moduleId, lessonId });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="ml-4 text-lg text-gray-600">Loading course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-700">The course you are looking for does not exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentModule = course.modules.find(mod => mod.id === activeLesson?.moduleId);
  const currentLesson = currentModule?.lessons.find(less => less.id === activeLesson?.lessonId);

  return (
    <div className="flex h-[90vh] bg-gray-100"> {/* Decreased height to 90vh */}
      {/* Left Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 
          ${isSidebarOpen ? 'w-64 min-w-[16rem]' : 'w-0 min-w-0 overflow-hidden'}
        `}
      >
        <div className="p-3">
          <h2 className="text-base font-bold text-gray-900 mb-3">{course.title}</h2>
          <nav className="space-y-0.5">
            {course.modules.map(module => (
              <div key={module.id} className="group">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex items-center justify-between w-full p-1.5 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <span className="flex items-center gap-1.5">
                    {expandedModules[module.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <Book className="w-3 h-3" />
                    {module.title}
                  </span>
                  <span className="text-[0.65rem] text-gray-500">{module.lessons.length} lessons</span>
                </button>
                {expandedModules[module.id] && (
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l border-gray-200 pl-1.5">
                    {module.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(module.id, lesson.id)}
                        className={`flex items-center w-full p-1.5 text-left text-xs text-gray-600 hover:bg-gray-50 rounded-md ${
                          activeLesson?.moduleId === module.id && activeLesson?.lessonId === lesson.id
                            ? 'bg-blue-50 text-blue-700 font-medium' : ''
                        }`}
                      >
                        <PlayCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-3 p-1.5 rounded-md hover:bg-gray-100"
            >
              {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{course.title}</h1>
            {currentLesson && (
              <span className="ml-3 text-gray-600 text-sm">- {currentLesson.title}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Exit Course
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-1.5 rounded-md hover:bg-gray-100"
            >
              {isChatOpen ? <MessageSquare className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Lesson Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{currentLesson?.title || 'Select a Lesson'}</h2>
            <div className="prose max-w-none text-sm">
              {currentLesson ? (
                <p>{currentLesson.content}</p>
              ) : (
                <p className="text-gray-600">Please select a lesson from the sidebar to view its content.</p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={goToPreviousLesson}
              disabled={currentLessonIndex === 0}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentLessonIndex === 0
                  ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous Lesson
            </button>
            <button
              onClick={goToNextLesson}
              disabled={currentLessonIndex === allLessons.length - 1}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentLessonIndex === allLessons.length - 1
                  ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next Lesson
            </button>
          </div>
        </main>
      </div>

      {/* Right Chatbox */}
      <div
        className={`bg-white border-l border-gray-200 overflow-y-auto transition-all duration-300 
          ${isChatOpen ? 'w-80 min-w-[20rem]' : 'w-0 min-w-0 overflow-hidden'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-2 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900">Jarvis AI Assistant</h3>
          </div>
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {/* Chat messages will go here */}
            <div className="flex flex-col items-start">
              <div className="bg-blue-100 text-blue-800 text-xs p-1.5 rounded-lg max-w-[80%]">
                Hi! I'm Jarvis, your AI learning assistant. I'm here to help you understand Python concepts better. Feel free to ask me anything about the course material!
              </div>
            </div>
          </div>
          <div className="p-2 border-t border-gray-200 flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Ask Jarvis anything..."
              className="flex-1 p-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white p-1.5 rounded-md text-xs hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTakingPage;
