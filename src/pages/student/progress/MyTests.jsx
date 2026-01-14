import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, FileText, Award, Star, PlayCircle, Loader, CheckCircle, XCircle, ChevronDown, ChevronUp, BarChart3, Calendar } from 'lucide-react';
import axios from 'axios';
import { mainContext } from '../../../context/MainContext';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';

const MyTests = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(mainContext);
  const [loading, setLoading] = useState(true);
  const [enrolledTests, setEnrolledTests] = useState([]);
  const [error, setError] = useState(null);
  const [expandedTests, setExpandedTests] = useState({});
  const [submissionHistory, setSubmissionHistory] = useState({});
  const [loadingHistory, setLoadingHistory] = useState({});

  useEffect(() => {
    const fetchEnrolledTests = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!token || !user) {
          setError('Please login to view your tests');
          setLoading(false);
          return;
        }

        const response = await axios.get(USERENDPOINTS.GET_ENROLLED_TESTS, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success && response.data.tests) {
          setEnrolledTests(response.data.tests);
        } else {
          setEnrolledTests([]);
        }
      } catch (err) {
        console.error('Error fetching enrolled tests:', err);
        setError('Failed to load your tests. Please try again.');
        setEnrolledTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledTests();
  }, [token, user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const toggleTestExpansion = (testId) => {
    setExpandedTests(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));

    // Fetch submission history if not already loaded
    if (!expandedTests[testId] && !submissionHistory[testId] && !loadingHistory[testId]) {
      fetchSubmissionHistory(testId);
    }
  };

  const fetchSubmissionHistory = async (testId) => {
    setLoadingHistory(prev => ({ ...prev, [testId]: true }));
    try {
      const response = await axios.get(`${USERENDPOINTS.GET_TEST_SUBMISSION_HISTORY}/${testId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSubmissionHistory(prev => ({
          ...prev,
          [testId]: response.data
        }));
      }
    } catch (err) {
      console.error('Error fetching submission history:', err);
      toast.error('Failed to load submission history');
    } finally {
      setLoadingHistory(prev => ({ ...prev, [testId]: false }));
    }
  };

  const viewSubmissionDetails = (submissionId, test) => {
    navigate('/student/test-results', {
      state: {
        submissionId,
        test,
        fromHistory: true
      }
    });
  };

  if (loading) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <div className="text-center py-8 sm:py-12">
          <Loader className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 animate-spin mx-auto mb-3 sm:mb-4" />
          <p className="text-xs sm:text-sm text-gray-600">Loading your tests...</p>
        </div>
      </div>
    );
  }

  if (error && !token) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <div className="text-center bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm max-w-md mx-auto">
          <p className="text-red-600 text-sm sm:text-base mb-3 sm:mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">My Tests</h1>
        <p className="text-xs sm:text-sm text-gray-600">View and manage your purchased tests</p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
          <p>{error}</p>
        </div>
      )}

      {enrolledTests.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 shadow-sm text-center">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">No Tests Purchased</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">You haven't purchased any tests yet. Browse our test catalog to get started.</p>
          <Link
            to="/student/tests"
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            Browse Tests
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {enrolledTests.map((test) => (
            <div key={test.id || test._id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              {/* Test Image */}
              <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                <img
                  src={test.image || 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png'}
                  alt={test.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png';
                  }}
                />
                {test.isPassed && (
                  <div className="absolute top-1.5 right-1.5">
                    <span className="bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Passed
                    </span>
                  </div>
                )}
              </div>

              {/* Test Content */}
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem]">{test.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 mb-2 line-clamp-2 min-h-[2rem]">{test.description}</p>

                {/* Test Stats */}
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-2 text-[9px] sm:text-[10px] text-gray-600">
                  <div className="flex items-center gap-0.5">
                    <FileText className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{test.numberOfQuestions || 0} Q</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{formatDuration(test.duration)}</span>
                  </div>
                  {test.totalAttempts > 0 && (
                    <div className="flex items-center gap-0.5">
                      <PlayCircle className="w-2.5 h-2.5 flex-shrink-0" />
                      <span>{test.totalAttempts}</span>
                    </div>
                  )}
                </div>

                {/* Latest Score */}
                {test.latestScore !== null ? (
                  <div className="mb-2 p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] mb-1">
                      <span className="text-gray-600">Latest:</span>
                      <span className={`font-medium ${test.latestStatus === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                        {test.latestScore}% {test.latestStatus === 'passed' ? '✓' : '✗'}
                      </span>
                    </div>
                    {test.latestAttemptDate && (
                      <div className="text-[9px] sm:text-[10px] text-gray-500 mb-1.5">
                        {formatDate(test.latestAttemptDate)}
                      </div>
                    )}
                    {test.latestSubmissionId && (
                      <button
                        onClick={() => viewSubmissionDetails(test.latestSubmissionId, test)}
                        className="w-full text-[9px] sm:text-[10px] bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <BarChart3 className="w-2.5 h-2.5" />
                        View Results
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mb-2 min-h-[3rem]"></div>
                )}

                {/* Enrolled Date */}
                <div className="text-[9px] sm:text-[10px] text-gray-500 mb-2">
                  {test.enrolledDate ? `Enrolled: ${formatDate(test.enrolledDate)}` : 'Enrolled: N/A'}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 mt-auto">
                  <Link
                    to={`/student/test-details?id=${test.id || test._id}`}
                    className="flex-1 bg-blue-600 text-white text-[9px] sm:text-[10px] py-1.5 px-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/student/test-taking?id=${test.id || test._id}`}
                    state={{ testId: test.id || test._id, test }}
                    className="flex-1 bg-green-600 text-white text-[9px] sm:text-[10px] py-1.5 px-2 rounded-md hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <PlayCircle className="w-3 h-3" />
                    <span className="hidden sm:inline">Start</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTests;
