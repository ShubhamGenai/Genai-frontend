import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestPlayer = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timer, setTimer] = useState({ minutes: 45, seconds: 0 });
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [stats, setStats] = useState({
    answered: 0,
    notAnswered: 20,
    marked: 0,
    markedAndAnswered: 0
  });

  // Demo test data matching MongoDB Schema
  const testData = {
    title: "CSS Fundamentals Test",
    questions: [
      {
        questionText: "Which of the following are true about CSS property 'Object-fit'?",
        options: [
          "'object-fit: contain;' does not preserve the aspect ratio of the image; it stretches the image to cover the entire width and height of the container.",
          "'object-fit: contain;' preserves the aspect ratio of the image and makes sure no clipping happens to the whole image.",
          "'object-fit: cover;' avoids the image getting squeezed, but it could end up clipping the image.",
          "'object-fit: cover;' avoids clipping the image by sacrificing the aspect ratio."
        ],
        answer: "2,3", // Indices of correct answers (0-based)
        allowMultiple: true
      },
      {
        questionText: "What is the default value of the object-fit property?",
        options: [
          "fill",
          "contain",
          "cover",
          "none"
        ],
        answer: "0", // Index of correct answer (0-based)
        allowMultiple: false
      },
      {
        questionText: "Which CSS properties are required to create a text ellipsis for a single line of text?",
        options: [
          "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
          "display: block; overflow: hidden; text-overflow: ellipsis;",
          "white-space: normal; overflow: hidden; text-overflow: ellipsis;",
          "display: inline-block; white-space: nowrap; text-overflow: ellipsis;"
        ],
        answer: "0",
        allowMultiple: false
      },
      {
        questionText: "Which of the following are valid ways to apply CSS styles?",
        options: [
          "Inline styles using the style attribute",
          "Internal styles using the <style> tag",
          "External stylesheet linked with <link> tag",
          "Using the @import rule in CSS"
        ],
        answer: "0,1,2,3",
        allowMultiple: true
      },
      {
        questionText: "What is the correct syntax for media queries?",
        options: [
          "@media screen and (min-width: 480px) {...}",
          "@screen-size (min-width: 480px) {...}",
          "@media (screen) and (min-width: 480px) {...}",
          "@viewport (min-width: 480px) {...}"
        ],
        answer: "0",
        allowMultiple: false
      },
      {
        questionText: "Which CSS Grid properties are used to define the number and size of rows in a grid?",
        options: [
          "grid-template-rows",
          "grid-row-template",
          "grid-rows",
          "template-rows"
        ],
        answer: "0",
        allowMultiple: false
      },
      {
        questionText: "Which of the following are valid ways to declare CSS variables?",
        options: [
          "--main-color: #ff0000;",
          "@variable main-color: #ff0000;",
          "$main-color: #ff0000;",
          "var(main-color): #ff0000;"
        ],
        answer: "0",
        allowMultiple: false
      },
      {
        questionText: "Which CSS properties can be animated?",
        options: [
          "width, height, and transform",
          "display and visibility",
          "float and clear",
          "position and z-index"
        ],
        answer: "0",
        allowMultiple: false
      }
    ]
  };

  // Function to get current question data
  const getCurrentQuestion = () => {
    return testData.questions[currentQuestion - 1];
  };

  // Handle option selection
  const handleOptionSelect = (questionId, optionId) => {
    const question = getCurrentQuestion();
    
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      
      if (!newOptions[questionId]) {
        newOptions[questionId] = {};
      }
      
      if (question.allowMultiple) {
        newOptions[questionId] = {
          ...newOptions[questionId],
          [optionId]: !newOptions[questionId][optionId]
        };
      } else {
        // For radio buttons, only one option can be selected
        newOptions[questionId] = { [optionId]: true };
      }
      
      // Update stats
      const answeredQuestions = Object.keys(newOptions).length;
      setStats(prev => ({
        ...prev,
        answered: answeredQuestions,
        notAnswered: testData.questions.length - answeredQuestions
      }));
      
      return newOptions;
    });
  };

  // Check if option is selected
  const isOptionSelected = (questionId, optionId) => {
    return selectedOptions[questionId]?.[optionId] || false;
  };

  // Navigation functions
  const handleNext = () => {
    if (currentQuestion < testData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Enter fullscreen mode automatically when component mounts
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    };
    
    enterFullscreen(); // Enable fullscreen on test start
    
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        enterFullscreen(); // Re-enter fullscreen if user tries to exit
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.error(err));
      }
    };
  }, []);

  // Timer functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer.minutes === 0 && prevTimer.seconds === 0) {
          clearInterval(interval);
          // Handle test submission when time is up
          handleSubmitTest();
          return prevTimer;
        }
        
        let newMinutes = prevTimer.minutes;
        let newSeconds = prevTimer.seconds;
        
        if (newSeconds === 0) {
          newMinutes--;
          newSeconds = 59;
        } else {
          newSeconds--;
        }
        
        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmitTest = () => {
    // Add test submission logic here
    alert("Time's up! Submitting test...");
  };

  const handleMarkForReview = () => {
    setMarkedQuestions(prev => ({
      ...prev,
      [currentQuestion]: !prev[currentQuestion]
    }));
    
    // Update stats
    const isAnswered = Object.keys(selectedOptions).includes(currentQuestion.toString());
    const isMarked = !markedQuestions[currentQuestion];
    
    setStats(prev => ({
      ...prev,
      marked: isMarked ? prev.marked + 1 : prev.marked - 1,
      markedAndAnswered: isAnswered && isMarked ? prev.markedAndAnswered + 1 : prev.markedAndAnswered
    }));
    
    handleNext();
  };

  const formatTime = () => {
    const { minutes, seconds } = timer;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    setShowExitConfirmation(true);
  };

  const handleConfirmExit = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.error(err));
    }
    navigate(-1); // Go back to previous page
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">Back</span>
            </button>
            <h1 className="text-lg md:text-xl font-semibold">{testData.title}</h1>
          </div>
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="hidden md:flex items-center space-x-2">
              {/* <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-sm text-white">SN</span>
              </div> */}
            </div>
            <div className="bg-gray-100 px-3 md:px-4 py-2 rounded-md">
              <span className="font-semibold text-base md:text-lg">{formatTime()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 w-full">
            <h3 className="text-lg font-medium mb-4">Exit Test?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to exit the test? Your progress will not be saved.</p>
            <div className="flex space-x-4">
              <button
                onClick={handleCancelExit}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-150"
              >
                Exit Test
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-16">
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <div className={`w-64 bg-gray-100 min-h-screen fixed left-0 overflow-y-auto z-50 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          {/* User Info */}
          <div className="flex items-center gap-2 p-3 bg-gray-200">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-sm text-white">SN</span>
            </div>
            <span className="text-sm">Sumit Nema</span>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Answered</span>
                <span className="text-sm">{stats.answered}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Not Answered</span>
                <span className="text-sm">{stats.notAnswered}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Marked</span>
                <span className="text-sm">{stats.marked}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Marked & Answered</span>
                <span className="text-sm">{stats.markedAndAnswered}</span>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium mb-3 text-gray-600">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(20)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentQuestion(idx + 1);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-8 h-8 text-sm border ${
                    currentQuestion === idx + 1
                      ? 'bg-gray-700 text-white border-gray-700'
                      : 'bg-white hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-4">
            <button 
              onClick={handleSubmitTest}
              className="w-full py-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors duration-150"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="mb-4">
                <h2 className="text-base md:text-lg font-medium">Question {currentQuestion} of {testData.questions.length}</h2>
                <p className="text-gray-600 mt-2 text-sm md:text-base">{getCurrentQuestion().questionText}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs md:text-sm text-gray-600">
                  {getCurrentQuestion().allowMultiple ? 'Pick ONE OR MORE options' : 'Pick ONE option'}
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                {getCurrentQuestion().options.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <input
                      type={getCurrentQuestion().allowMultiple ? "checkbox" : "radio"}
                      id={`option-${index}`}
                      name={`question-${currentQuestion}`}
                      checked={isOptionSelected(currentQuestion, index)}
                      onChange={() => handleOptionSelect(currentQuestion, index)}
                      className="mt-1 mr-3"
                    />
                    <label htmlFor={`option-${index}`} className="text-sm md:text-base cursor-pointer flex-1">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
              <button 
                onClick={handleMarkForReview}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors duration-150 text-sm md:text-base"
              >
                Mark for Review & Next
              </button>
              <div className="flex space-x-3 md:space-x-4">
                <button 
                  onClick={handlePrev}
                  className="flex-1 md:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-150 text-sm md:text-base"
                  disabled={currentQuestion === 1}
                >
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-150 text-sm md:text-base"
                  disabled={currentQuestion === testData.questions.length}
                >
                  Save & Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlayer;