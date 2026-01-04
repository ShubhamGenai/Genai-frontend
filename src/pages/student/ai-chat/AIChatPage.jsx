import React, { useState, useRef, useEffect, useContext } from 'react';
import { Bot, User, Send, Loader, TrendingUp, BookOpen, Award, Target, BarChart3, Sparkles, RefreshCw, Calculator } from 'lucide-react';
import { mainContext } from '../../../context/MainContext';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import FormulaRenderer from '../../../component/contentManagerComponents/FormulaRenderer';

const AIChatPage = () => {
  const { user, token } = useContext(mainContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [loadingPerformance, setLoadingPerformance] = useState(true);
  const [showPerformancePanel, setShowPerformancePanel] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Fetch performance data on mount
  useEffect(() => {
    fetchPerformanceData();
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && !loadingPerformance) {
      const welcomeMessage = {
        id: 1,
        text: `Hello! I'm your AI learning assistant. I can help you with:\n\n• Analyzing your test performance\n• Suggesting study strategies\n• Recommending courses and tests\n• Answering questions about your progress\n• Explaining mathematical concepts with formulas\n\n${performanceData ? `I can see you've attempted ${performanceData.scoreCount} tests with an average score of ${performanceData.avgScore}%. How can I help you improve today?` : 'How can I help you today?'}\n\n💡 Tip: You can ask questions with equations using LaTeX format like $x^2 + y^2 = z^2$ or $$\\int_0^1 x dx$$`,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, [loadingPerformance, performanceData]);

  const fetchPerformanceData = async () => {
    if (!token) {
      setLoadingPerformance(false);
      return;
    }

    try {
      const response = await axios.get(USERENDPOINTS.GET_DASHBOARD_OVERVIEW, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.overview) {
        const overview = response.data.overview;
        setPerformanceData({
          avgScore: overview.avgTestScore || 0,
          scoreCount: overview.completedTests || 0,
          completedCourses: overview.completedCourses || 0,
          coursesInProgress: overview.coursesInProgress || 0,
          recentTestScores: overview.recentTestScores || [],
          enrolledTests: overview.enrolledTests || []
        });
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoadingPerformance(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await axios.post(
        USERENDPOINTS.AI_CHAT,
        {
          message: userMessage.text,
          conversationHistory: conversationHistory
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          text: response.data.response,
          sender: 'ai',
          timestamp: response.data.timestamp || new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);

        // Update performance data if provided
        if (response.data.performanceData) {
          setPerformanceData(response.data.performanceData);
        }
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again in a moment.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How can I improve my test scores?",
    "What are my weak areas?",
    "Explain the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$",
    "What should I study next?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    return 'bg-orange-50 border-orange-200';
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Performance Panel */}
      {showPerformancePanel && performanceData && (
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Your Performance
            </h2>
            <button
              onClick={() => setShowPerformancePanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Performance Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Average Score</span>
                <TrendingUp className={`w-5 h-5 ${getScoreColor(performanceData.avgScore)}`} />
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(performanceData.avgScore)}`}>
                {performanceData.avgScore}%
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Based on {performanceData.scoreCount} test{performanceData.scoreCount !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Courses</span>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {performanceData.completedCourses}
                </div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-600">In Progress</span>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {performanceData.coursesInProgress}
                </div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
            </div>

            {/* Recent Test Scores */}
            {performanceData.recentTestScores && performanceData.recentTestScores.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  Recent Test Scores
                </h3>
                <div className="space-y-2">
                  {performanceData.recentTestScores.slice(0, 5).map((test, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getScoreBgColor(test.score)}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {test.title}
                        </span>
                        <span className={`text-sm font-bold ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {test.subjects || 'General'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Quick Questions
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-2 text-sm text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!showPerformancePanel && (
              <button
                onClick={() => setShowPerformancePanel(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Learning Assistant</h1>
                <p className="text-xs text-gray-500">Powered by Claude AI</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchPerformanceData}
              disabled={loadingPerformance}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh performance data"
            >
              <RefreshCw className={`w-5 h-5 ${loadingPerformance ? 'animate-spin' : ''}`} />
            </button>
            {showPerformancePanel && (
              <button
                onClick={() => setShowPerformancePanel(false)}
                className="hidden lg:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Hide performance panel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {loadingPerformance && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Loading your performance data...</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white shadow-md'
                        : message.isError
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                    }`}
                  >
                    <div className={`text-sm whitespace-pre-wrap break-words leading-relaxed ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-800'
                    }`}>
                      <FormulaRenderer 
                        text={message.text} 
                        className={message.sender === 'user' ? 'text-white [&_span]:text-white' : 'text-gray-800'}
                      />
                    </div>
                    {message.timestamp && (
                      <div className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    )}
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="bg-white p-4 border-t border-gray-200">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... Use $formula$ for equations (e.g., $x^2 + y^2 = z^2$)"
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading || loadingPerformance}
              />
              {(input.includes('$') || input.includes('\\(') || input.includes('\\[')) && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Calculator className="w-5 h-5 text-blue-600" title="Formula detected" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading || loadingPerformance}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </form>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              💡 Tip: Use <code className="bg-gray-100 px-1 rounded">$formula$</code> for inline math or <code className="bg-gray-100 px-1 rounded">$$formula$$</code> for block equations
            </p>
            {input && (input.includes('$') || input.includes('\\(') || input.includes('\\[')) && (
              <div className="text-xs text-blue-600 flex items-center gap-1">
                <Calculator className="w-3 h-3" />
                <span>Formula detected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
