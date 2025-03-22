import React, { useState, useEffect } from 'react';

const TestPlayer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [answeredCount, setAnsweredCount] = useState(0);
  const totalQuestions = 8;
  
  // Enter fullscreen mode automatically when component mounts
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
          setIsFullscreen(true);
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          await elem.webkitRequestFullscreen();
          setIsFullscreen(true);
        } else if (elem.msRequestFullscreen) { /* IE11 */
          await elem.msRequestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    };
    
    // enterFullscreen(); // Commented out for development, uncomment for production
    
    // Clean up function to exit fullscreen when component unmounts
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.error(err));
      }
    };
  }, []);

  // Timer functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        let { hours, minutes, seconds } = prevTimer;
        seconds++;
        
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }
        
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update answered count when selectedOptions changes
  useEffect(() => {
    const count = Object.keys(selectedOptions).length;
    setAnsweredCount(count);
  }, [selectedOptions]);

  // Toggle fullscreen function
  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          await elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  // Demo questions with complete content
  const questions = [
    {
      id: 1,
      title: 'CSS Animation',
      content: {
        question: 'Which of the following are true about CSS property "Object-fit"?',
        options: [
          {
            text: '"object-fit: contain;" does not preserve the aspect ratio of the image; it stretches the image to cover the entire width and height of the container.',
            id: 'option1'
          },
          {
            text: '"object-fit: contain;" preserves the aspect ratio of the image and makes sure no clipping happens to the whole image.',
            id: 'option2'
          },
          {
            text: '"object-fit: cover;" avoids the image getting squeezed, but it could end up clipping the image.',
            id: 'option3'
          },
          {
            text: '"object-fit: cover;" avoids clipping the image by sacrificing the aspect ratio.',
            id: 'option4'
          }
        ],
        allowMultiple: true
      }
    },
    {
      id: 2,
      title: 'CSS object-fit',
      content: {
        question: 'What is the default value of the object-fit property?',
        options: [
          { text: 'fill', id: 'option1' },
          { text: 'contain', id: 'option2' },
          { text: 'cover', id: 'option3' },
          { text: 'none', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
    {
      id: 3,
      title: 'CSS Ellipsis',
      content: {
        question: 'Which CSS properties are required to create a text ellipsis for a single line of text?',
        options: [
          { text: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;', id: 'option1' },
          { text: 'display: block; overflow: hidden; text-overflow: ellipsis;', id: 'option2' },
          { text: 'white-space: normal; overflow: hidden; text-overflow: ellipsis;', id: 'option3' },
          { text: 'display: inline-block; white-space: nowrap; text-overflow: ellipsis;', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
    {
      id: 4,
      title: 'CSS Text Coloring',
      content: {
        question: 'Which CSS property is used to set the color of text?',
        options: [
          { text: 'text-color', id: 'option1' },
          { text: 'color', id: 'option2' },
          { text: 'font-color', id: 'option3' },
          { text: 'text-style', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
    {
      id: 5,
      title: 'CSS Selection',
      content: {
        question: 'Which pseudo-element is used to style the selected text by a user?',
        options: [
          { text: '::selection', id: 'option1' },
          { text: '::select', id: 'option2' },
          { text: ':selected', id: 'option3' },
          { text: ':highlight', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
    {
      id: 6,
      title: 'CSS Input Placeholder',
      content: {
        question: 'Which pseudo-element allows styling the placeholder text in an input field?',
        options: [
          { text: ':placeholder', id: 'option1' },
          { text: '::input-placeholder', id: 'option2' },
          { text: '::placeholder', id: 'option3' },
          { text: ':input-text', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
    {
      id: 7,
      title: 'CSS Centering',
      content: {
        question: 'Which of the following methods can center an element horizontally and vertically?',
        options: [
          { text: 'display: flex; justify-content: center; align-items: center;', id: 'option1' },
          { text: 'margin: 0 auto; vertical-align: middle;', id: 'option2' },
          { text: 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);', id: 'option3' },
          { text: 'text-align: center; line-height: 100vh;', id: 'option4' }
        ],
        allowMultiple: true
      }
    },
    {
      id: 8,
      title: 'CSS vertical-align',
      content: {
        question: 'When does the vertical-align property work?',
        options: [
          { text: 'It works on all block-level elements', id: 'option1' },
          { text: 'It works on inline and table-cell elements', id: 'option2' },
          { text: 'It only works on flex container children', id: 'option3' },
          { text: 'It works on all elements with position: relative', id: 'option4' }
        ],
        allowMultiple: false
      }
    },
  ];

  const handleOptionChange = (questionId, optionId) => {
    const currentQuestion = questions.find(q => q.id === questionId);
    
    if (currentQuestion.content.allowMultiple) {
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          [optionId]: !prev[questionId]?.[optionId]
        }
      }));
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: { [optionId]: true }
      }));
    }
  };

  const isOptionSelected = (questionId, optionId) => {
    return selectedOptions[questionId]?.[optionId] || false;
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = () => {
    const { hours, minutes, seconds } = timer;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="bg-black text-white px-3 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              CSS Test
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleFullscreen}
              className="border border-gray-300 p-2 rounded-md"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
            <button className="border border-gray-300 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-gray-200">
            {questions.map((q) => (
              <div 
                key={q.id} 
                className={`p-4 border-b border-gray-200 cursor-pointer ${currentQuestion === q.id ? 'bg-gray-100' : ''}`}
                onClick={() => setCurrentQuestion(q.id)}
              >
                <div className="text-sm text-gray-600">Question {q.id}</div>
                <div className="font-medium">{q.title}</div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="w-3/4 p-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">Question {currentQuestion} of {totalQuestions}</div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Answered {answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{formatTime()}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-xs text-gray-600">SN</div>
                  <span className="text-sm text-gray-600 ml-2">Sumit Nema</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium mb-4">{questions[currentQuestion - 1].content.question}</h2>
              
              {questions[currentQuestion - 1].content.allowMultiple && (
                <div className="mb-4 text-sm">
                  Pick <span className="font-bold">ONE OR MORE</span> options
                </div>
              )}
              
              <div className="space-y-4">
                {questions[currentQuestion - 1].content.options.map((option) => (
                  <div key={option.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`${currentQuestion}-${option.id}`}
                        type={questions[currentQuestion - 1].content.allowMultiple ? "checkbox" : "radio"}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={isOptionSelected(currentQuestion, option.id)}
                        onChange={() => handleOptionChange(currentQuestion, option.id)}
                      />
                    </div>
                    <label htmlFor={`${currentQuestion}-${option.id}`} className="ml-3 text-sm font-medium text-gray-700">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button 
                onClick={handlePrev}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={currentQuestion === 1}
              >
                Prev
              </button>
              <button 
                onClick={handleNext}
                className="px-4 py-2 bg-gray-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-gray-700"
                disabled={currentQuestion === totalQuestions}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlayer;