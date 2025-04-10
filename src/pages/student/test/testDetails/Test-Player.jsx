import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { USERENDPOINTS } from "../../../../constants/ApiConstants";

const TestPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState("01:00:00"); // Starting with 1 hour
  const [startTime, setStartTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed values
  const totalQuestions = quizzes.flatMap(quiz => quiz.questions || []).length;
  const answeredCount = Object.values(selectedAnswers).filter(v => v !== null).length;
  const notAnsweredCount = totalQuestions - answeredCount;
  const markedCount = markedQuestions.filter(id => !Object.keys(selectedAnswers).find(k => k === id && selectedAnswers[k] !== null)).length;
  const markedAndAnsweredCount = markedQuestions.filter(id => Object.keys(selectedAnswers).find(k => k === id && selectedAnswers[k] !== null)).length;
  const currentQuestion = getCurrentQuestion();

  function getQuizIdsFromUrl() {
    const params = new URLSearchParams(location.search);
    return params.get("id")?.split(",") || [];
  }

  function getCurrentQuestion() {
    if (!quizzes.length) return null;
    const allQuestions = quizzes.flatMap(quiz => quiz.questions || []);
    return allQuestions[currentQuestionIndex] || null;
  }

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizIds = getQuizIdsFromUrl();
      if (!quizIds.length) return;

      setLoading(true);
      try {
        const response = await axios.post(USERENDPOINTS.GET_QUIZ, { ids: quizIds });
        setQuizzes(response.data);
        
        // Initialize answers
        const initialAnswers = {};
        response.data.forEach(quiz => {
          quiz.questions?.forEach(q => { initialAnswers[q._id] = null; });
        });
        setSelectedAnswers(initialAnswers);
        setStartTime(new Date());
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        setError("Error loading quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
    
    // Initialize timer with 1 hour
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1); // Set end time to 1 hour from now
    
    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000)); // Ensure non-negative
      
      if (diff <= 0) {
        // Time's up, auto-submit the test
        clearInterval(timer);
        setTimeLeft("00:00:00");
        handleSubmitTest();
        return;
      }
      
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [location.search]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleMarkQuestion = () => {
    if (!currentQuestion) return;
    
    setMarkedQuestions(prev => 
      prev.includes(currentQuestion._id) 
        ? prev.filter(id => id !== currentQuestion._id) 
        : [...prev, currentQuestion._id]
    );
    
    goToNext();
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestionStatus = (index) => {
    const allQuestions = quizzes.flatMap(quiz => quiz.questions || []);
    const question = allQuestions[index];
    if (!question) return "unanswered";

    const isAnswered = selectedAnswers[question._id] !== null;
    const isMarked = markedQuestions.includes(question._id);

    if (isAnswered && isMarked) return "marked-answered";
    if (isAnswered) return "answered";
    if (isMarked) return "marked";
    return "unanswered";
  };

  const handleSubmitTest = async () => {
    if (isSubmitting) return;
    
    // Skip confirmation if auto-submitting due to time expiration
    if (timeLeft !== "00:00:00" && !window.confirm("Are you sure you want to submit the test? You cannot change your answers after submission.")) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const allQuestions = quizzes.flatMap(quiz => quiz.questions || []);
      
      // Format answers for submission
      const formattedAnswers = Object.keys(selectedAnswers).map(questionId => {
        const question = allQuestions.find(q => q._id === questionId);
        const questionIndex = allQuestions.findIndex(q => q._id === questionId);
        
        return {
          questionId,
          quizId: question?.quizId || quizzes[0]?._id,
          questionIndex,
          selectedOption: selectedAnswers[questionId],
          isCorrect: question?.answer === selectedAnswers[questionId]
        };
      });
      
      // Submission payload
      const submissionData = {
        quizIds: quizzes.map(quiz => quiz._id),
        answers: formattedAnswers,
        startTime: startTime?.toISOString(),
        endTime: new Date().toISOString(),
        duration: timeLeft === "00:00:00" ? "01:00:00" : timeLeft, // If time's up, record full duration
        markedQuestions
      };
      console.log(submissionData,"dta");
      
      const response = await axios.post(USERENDPOINTS.SUBMIT_QUIZ, submissionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      alert(timeLeft === "00:00:00" 
        ? "Time's up! Your test has been automatically submitted." 
        : "Test submitted successfully!");
        
      navigate("/dashboard/results", { state: { submissionId: response.data.submissionId } });
      
    } catch (err) {
      console.error("Failed to submit test", err);
      alert("Failed to submit test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading quiz...</div>;
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }
  
  if (!quizzes.length) {
    return <div className="flex justify-center items-center h-screen">No quizzes found.</div>;
  }

  // Calculate timer color based on time left
  const getTimerColor = () => {
    const [hours, minutes] = timeLeft.split(':').map(Number);
    if (hours === 0 && minutes < 5) return 'bg-red-100 text-red-600'; // Less than 5 minutes
    if (hours === 0 && minutes < 15) return 'bg-yellow-100 text-yellow-600'; // Less than 15 minutes
    return 'bg-green-50 text-green-600'; // More than 15 minutes
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-5 overflow-y-auto flex flex-col text-[15px]">
  {/* Student info */}
  <div className="flex items-center mb-6 pb-3 border-b border-gray-200">
    <div className="w-10 h-10 bg-gray-600 rounded-full mr-4 flex items-center justify-center text-white text-base font-semibold">
      {localStorage.getItem('userName')?.charAt(0) || 'U'}
    </div>
    <span className="text-base font-medium text-gray-800">{localStorage.getItem('userName') || 'Student'}</span>
  </div>

  {/* Stats */}
  <div className="mb-6 space-y-4 text-sm">
  <div className="flex justify-between border-b border-gray-200 pb-4">
    <span className="text-gray-700 font-medium">Answered</span>
    <span className="text-gray-900 font-semibold">{answeredCount}</span>
  </div>
  <div className="flex justify-between border-b border-gray-200 pb-4">
    <span className="text-gray-700 font-medium">Not Answered</span>
    <span className="text-gray-900 font-semibold">{notAnsweredCount}</span>
  </div>
  <div className="flex justify-between border-b border-gray-200 pb-4">
    <span className="text-gray-700 font-medium">Marked</span>
    <span className="text-gray-900 font-semibold">{markedCount}</span>
  </div>
  <div className="flex justify-between border-b border-gray-200 pb-4">
    <span className="text-gray-700 font-medium">Marked & Answered</span>
    <span className="text-gray-900 font-semibold">{markedAndAnsweredCount}</span>
  </div>
</div>


  {/* Question navigation */}
  <div className="mb-6 flex-grow">
    <p className="text-base font-semibold mb-4 pb-2 border-b border-gray-200">Questions</p>
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: totalQuestions }, (_, i) => {
        const status = getQuestionStatus(i);
        let buttonClasses = "py-2 text-sm rounded border";

        if (currentQuestionIndex === i) {
          buttonClasses += " bg-blue-600 text-white border-blue-600 font-semibold";
        } else if (status === 'answered') {
          buttonClasses += " bg-blue-100 text-blue-800 border-blue-200";
        } else if (status === 'marked') {
          buttonClasses += " bg-yellow-100 text-yellow-800 border-yellow-200";
        } else if (status === 'marked-answered') {
          buttonClasses += " bg-green-100 text-green-800 border-green-200";
        } else {
          buttonClasses += " bg-white text-gray-700 border-gray-300";
        }

        return (
          <button
            key={i}
            className={buttonClasses}
            onClick={() => goToQuestion(i)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  </div>

  {/* Submit button */}
  <button
    className={`w-full py-3 rounded font-semibold text-white text-base ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'}`}
    onClick={handleSubmitTest}
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Submit Test'}
  </button>
</div>

      
      {/* Main content */}
      <div className="flex-1 flex flex-col p-5 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100">
          <h2 className="text-xl font-semibold">{quizzes[0]?.title || "CSS Test"}</h2>
          <div className={`px-3 py-1 rounded font-medium text-sm ${getTimerColor()}`}>
            Time Left: {timeLeft}
          </div>
        </div>
        
        {/* Question area */}
        {currentQuestion && (
          <div className="flex-1 border border-gray-200 rounded-lg p-5 mb-5 bg-white shadow-sm">
            <div className="mb-5">
              <p className="text-gray-500 text-sm mb-2">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <p className="text-base font-semibold mb-3">
                {currentQuestion.questionText || "Which of the following are true about CSS property 'Object-fit'?"}
              </p>
              <p className="text-sm text-gray-600 inline-block bg-gray-50 px-3 py-1 rounded">
                Pick ONE OR MORE options
              </p>
            </div>
            
            {/* Options */}
            <div className="space-y-3">
              {(currentQuestion.options || [
                "Object-fit: contain; does not preserve the aspect ratio of the image; it stretches the image to cover the entire width and height of the container.",
                "Object-fit: contain; preserves the aspect ratio of the image and makes sure no clipping happens to the whole image.",
                "Object-fit: cover; avoids the image getting squeezed, but it could end up clipping the image.",
                "Object-fit: cover; avoids clipping the image by sacrificing the aspect ratio."
              ]).map((option, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion._id] === idx 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleOptionSelect(currentQuestion._id, idx)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name={`question-${currentQuestion._id}`}
                      checked={selectedAnswers[currentQuestion._id] === idx}
                      onChange={() => handleOptionSelect(currentQuestion._id, idx)}
                      className="mr-3"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <button 
            className={`flex items-center px-4 py-2 rounded text-md font-bold border ${
              markedQuestions.includes(currentQuestion?._id) 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            onClick={handleMarkQuestion}
          >
            <span className="mr-1">⭐</span>
            <span className="text-sm">Mark for Review & Next</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded border text-md font-bold ${
                currentQuestionIndex > 0
                  ? 'bg-white border-gray-200 hover:bg-gray-50 cursor-pointer'
                  : 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
              }`}
              onClick={goToPrev}
              disabled={currentQuestionIndex === 0}
            >
              ← Prev
            </button>
            
            <button 
              className={`px-4 py-2 rounded text-md font-bold ${
                currentQuestionIndex < totalQuestions - 1
                  ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                  : 'bg-blue-300 text-white opacity-70 cursor-not-allowed'
              }`}
              onClick={goToNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
            >
              Save & Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlayer;