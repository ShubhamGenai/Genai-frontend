import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Send, MessageCircle, Book, Clock, Users, CheckCircle } from 'lucide-react';

const CoursePlayer = () => {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [selectedSubLesson, setSelectedSubLesson] = useState(0);
  const [expandedLessons, setExpandedLessons] = useState([0]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Instructor',
      message: 'Welcome to the Python Mastery Course! Feel free to ask any questions.',
      timestamp: '10:30 AM',
      isInstructor: true
    },
    {
      id: 2,
      sender: 'Student',
      message: 'Thanks! I\'m excited to learn Python.',
      timestamp: '10:32 AM',
      isInstructor: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const chatEndRef = useRef(null);

  const courseData = [
    {
      id: 1,
      title: 'Python Basics',
      completed: true,
      subLessons: [
        { id: 0, title: 'What you will learn in this course', duration: '5:00 min', type: 'content' },
        { id: 1, title: 'Practice 1: Python as a calculator', type: 'practice' },
        { id: 2, title: 'Quiz 1: Lesson 1', questions: 5, type: 'quiz' }
      ]
    },
    {
      id: 2,
      title: 'Python Lists',
      completed: false,
      subLessons: [
        { id: 0, title: 'Introduction to Lists', duration: '8:00 min', type: 'content' },
        { id: 1, title: 'List Methods and Operations', duration: '12:00 min', type: 'content' },
        { id: 2, title: 'Practice: Working with Lists', type: 'practice' }
      ]
    },
    {
      id: 3,
      title: 'Functions and Packages',
      completed: false,
      subLessons: [
        { id: 0, title: 'Defining Functions', duration: '10:00 min', type: 'content' },
        { id: 1, title: 'Function Parameters', duration: '7:00 min', type: 'content' },
        { id: 2, title: 'Working with Packages', duration: '15:00 min', type: 'content' }
      ]
    },
    {
      id: 4,
      title: 'NumPy',
      completed: false,
      subLessons: [
        { id: 0, title: 'Introduction to NumPy', duration: '12:00 min', type: 'content' },
        { id: 1, title: 'NumPy Arrays', duration: '18:00 min', type: 'content' }
      ]
    },
    {
      id: 5,
      title: 'Python Advance',
      completed: false,
      subLessons: [
        { id: 0, title: 'Object-Oriented Programming', duration: '20:00 min', type: 'content' },
        { id: 1, title: 'Error Handling', duration: '15:00 min', type: 'content' }
      ]
    }
  ];

  const lessonContent = {
    0: {
      0: {
        title: 'What you will learn in this course',
        content: `
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Welcome to Python Mastery Course</h2>
          <p class="mb-4 text-gray-600 leading-relaxed">In this comprehensive Python course, you'll master the fundamentals and advanced concepts of Python programming.</p>
          
          <h3 class="text-xl font-semibold mb-3 text-gray-800">Course Objectives:</h3>
          <ul class="space-y-2 mb-6">
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span class="text-gray-700">Understand Python syntax and basic programming concepts</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span class="text-gray-700">Master data structures like lists, dictionaries, and sets</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span class="text-gray-700">Learn to create and use functions effectively</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span class="text-gray-700">Work with popular libraries like NumPy</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span class="text-gray-700">Implement object-oriented programming principles</span>
            </li>
          </ul>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h4 class="font-semibold text-blue-800 mb-2">Prerequisites:</h4>
            <p class="text-blue-700">No prior programming experience required! This course is designed for complete beginners.</p>
          </div>

          <h3 class="text-xl font-semibold mb-3 text-gray-800">What makes this course special:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">Hands-on Practice</h4>
              <p class="text-green-700 text-sm">Every lesson includes practical exercises to reinforce your learning.</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-2">Real-world Projects</h4>
              <p class="text-purple-700 text-sm">Build actual applications that you can showcase in your portfolio.</p>
            </div>
          </div>
        `
      }
    }
  };

  const toggleLesson = (lessonIndex) => {
    setExpandedLessons(prev => 
      prev.includes(lessonIndex) 
        ? prev.filter(l => l !== lessonIndex)
        : [...prev, lessonIndex]
    );
  };

  const selectLesson = (lessonIndex, subLessonIndex) => {
    setSelectedLesson(lessonIndex);
    setSelectedSubLesson(subLessonIndex);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isInstructor: false
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const currentContent = lessonContent[selectedLesson]?.[selectedSubLesson];

  return (
    <div className="flex h-screen p-6 bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Book className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Python Mastery Course</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              2h 30m
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              1,234 students
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {courseData.map((lesson, lessonIndex) => (
            <div key={lesson.id} className="mb-2">
              <button
                onClick={() => toggleLesson(lessonIndex)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="font-medium text-gray-800">Lesson {lesson.id}</span>
                </div>
                {expandedLessons.includes(lessonIndex) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              <div className="ml-2 mt-1">
                <h3 className="font-semibold text-gray-700 px-3 py-1">{lesson.title}</h3>
                
                {expandedLessons.includes(lessonIndex) && (
                  <div className="mt-2 space-y-1">
                    {lesson.subLessons.map((subLesson, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => selectLesson(lessonIndex, subIndex)}
                        className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                          selectedLesson === lessonIndex && selectedSubLesson === subIndex
                            ? 'bg-blue-100 border-l-4 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${
                            subLesson.type === 'content' ? 'bg-blue-500' :
                            subLesson.type === 'practice' ? 'bg-green-500' : 'bg-purple-500'
                          }`} />
                          <span className="text-sm font-medium text-gray-700">{subLesson.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {subLesson.duration || (subLesson.questions ? `${subLesson.questions} Questions` : 'Interactive')}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Content Display */}
        <div className={`${showChat ? 'flex-1' : 'w-full'} flex flex-col`}>
          {/* Content Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentContent?.title || 'Select a lesson to begin'}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Lesson {selectedLesson + 1}</span>
                  <span>•</span>
                  <span>Part {selectedSubLesson + 1}</span>
                </div>
              </div>
              <button
                onClick={() => setShowChat(!showChat)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                {showChat ? 'Hide Chat' : 'Show Chat'}
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {currentContent ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">Ready to start learning?</h3>
                  <p className="text-gray-400">Select a lesson from the sidebar to begin your Python journey!</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Previous
              </button>
              <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Course Discussion
              </h3>
              <p className="text-sm text-gray-500 mt-1">Ask questions and get help</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isInstructor ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    msg.isInstructor 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <div className="text-xs opacity-75 mb-1">{msg.sender}</div>
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-xs opacity-50 mt-1">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;