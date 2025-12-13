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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your tests...</p>
        </div>
      </div>
    );
  }

  if (error && !token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My Tests</h1>
          <p className="text-gray-600">View and manage your purchased tests</p>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {enrolledTests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-light text-gray-900 mb-2">No Tests Purchased</h2>
            <p className="text-gray-600 mb-6">You haven't purchased any tests yet. Browse our test catalog to get started.</p>
            <Link
              to="/student/tests"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Tests
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledTests.map((test) => (
              <div key={test.id || test._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Test Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={test.image || 'https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png'}
                    alt={test.title}
                    className="w-full h-40 object-cover"
                  />
                  {test.isPassed && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-light flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Passed
                      </span>
                    </div>
                  )}
                  {test.paymentStatus === 'completed' && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-light">
                        Purchased
                      </span>
                    </div>
                  )}
                </div>

                {/* Test Content */}
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2 line-clamp-2">{test.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{test.description}</p>

                  {/* Test Stats */}
                  <div className="flex items-center flex-wrap gap-3 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{test.numberOfQuestions || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(test.duration)}</span>
                    </div>
                    {test.totalAttempts > 0 && (
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        <span>{test.totalAttempts} Attempt{test.totalAttempts !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Latest Score */}
                  {test.latestScore !== null && (
                    <div className="mb-3 p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-600">Latest Score:</span>
                        <span className={`font-medium ${test.latestStatus === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                          {test.latestScore}% {test.latestStatus === 'passed' ? '✓' : '✗'}
                        </span>
                      </div>
                      {test.latestAttemptDate && (
                        <div className="text-xs text-gray-500 mb-2">
                          Attempted: {formatDate(test.latestAttemptDate)}
                        </div>
                      )}
                      {test.latestSubmissionId && (
                        <button
                          onClick={() => viewSubmissionDetails(test.latestSubmissionId, test)}
                          className="w-full text-xs bg-blue-600 text-white py-1.5 px-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <BarChart3 className="w-3 h-3" />
                          View Latest Results
                        </button>
                      )}
                    </div>
                  )}

                  {/* Enrolled Date */}
                  <div className="text-xs text-gray-500 mb-3">
                    Purchased: {formatDate(test.enrolledDate)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/student/test-details?id=${test.id || test._id}`}
                      className="flex-1 bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    {test.paymentStatus === 'completed' && (
                      <Link
                        to={`/student/test-taking?id=${test.id || test._id}`}
                        state={{ testId: test.id || test._id, test }}
                        className="flex-1 bg-green-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-1"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Start Test
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTests;
