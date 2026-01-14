import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { mainContext } from "../../../context/MainContext";
import { USERENDPOINTS, AUTHENDPOINTS } from "../../../constants/ApiConstants";
import PendingTestPaymentModal from "./PendingTestPaymentModal";
import GoalSelectionModal from "./GoalSelectionModal";
import MyCourses from "../progress/MyCourses";
import MyTests from "../progress/MyTests";
import MyJobApplications from "../progress/MyJobApplications";
import ProfileComponent from "./ProfileComponent";
import { 
  BookOpenIcon, 
  FileTextIcon, 
  BriefcaseIcon, 
  TrophyIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  StarIcon,
  TargetIcon,
  ChevronRightIcon,
  RefreshCwIcon
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, setUser } = useContext(mainContext);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [pendingTest, setPendingTest] = useState(null);
  const [pendingTestLoading, setPendingTestLoading] = useState(false);
  const [showPendingTestModal, setShowPendingTestModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState(null);

  const navItems = [
    { name: "Overview" },
    { name: "My Courses" },
    { name: "My Tests" },
    { name: "My Applications" },
    { name: "Profile" },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (activeTab !== "Overview" || !token || !user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(USERENDPOINTS.GET_DASHBOARD_OVERVIEW, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success && response.data.data) {
          setDashboardData(response.data.data);
        } else {
          setError('Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard overview:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [activeTab, token, user]);

  // Show onboarding / goal selection modal once after student logs in (only first time)
  useEffect(() => {
    if (!user || !token) return;

    // Only students see this popup
    if (user.role !== "student") return;

    // Don't keep bothering the user – one time flag in localStorage
    const hasCompletedLocal = localStorage.getItem("learningGoalOnboardingCompleted");
    if (hasCompletedLocal === "true") return;

    // If backend already marks onboarding as done, skip
    if (user.onboardingCompleted) return;

    // Check if modal was already shown once (don't auto-open again)
    const modalShownOnce = localStorage.getItem("goalModalShownOnce");
    if (modalShownOnce === "true") return;

    // Otherwise, open modal for the first time only
    setShowGoalModal(true);
    localStorage.setItem("goalModalShownOnce", "true");
  }, [user, token]);

  // Check for pending test in localStorage and show payment popup if needed
  useEffect(() => {
    const checkPendingTest = async () => {
      try {
        if (!user || !token) return;

        const pendingTestId = localStorage.getItem("pendingTestId");
        const pendingTestType = localStorage.getItem("pendingTestType");

        // Only handle pending tests that require payment
        if (!pendingTestId || pendingTestType !== "paid") return;

        setPendingTestLoading(true);

        // Fetch test details
        const testRes = await axios.get(
          `${USERENDPOINTS.GETTESTSBYID}/${pendingTestId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const testData = testRes.data?.test || testRes.data;
        if (!testData) {
          // If test not found, clear pending state
          localStorage.removeItem("pendingTestId");
          localStorage.removeItem("pendingTestType");
          return;
        }

        // Check if user already enrolled/purchased this test
        let alreadyEnrolled = false;
        try {
          const enrolledRes = await axios.get(
            USERENDPOINTS.GET_ENROLLED_TESTS,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (enrolledRes.data?.success && Array.isArray(enrolledRes.data.tests)) {
            const enrolledTests = enrolledRes.data.tests;
            alreadyEnrolled = enrolledTests.some((t) => {
              const id = t._id || t.id;
              return id && String(id) === String(pendingTestId);
            });
          }
        } catch (enrollErr) {
          console.error("Error checking enrolled tests for pending test:", enrollErr);
        }

        if (alreadyEnrolled) {
          // User already has this test – clear pending state and don't show payment popup
          localStorage.removeItem("pendingTestId");
          localStorage.removeItem("pendingTestType");
          toast.info("You are already enrolled in this test.");
          return;
        }

        // Not enrolled – show modal with test info for payment
        setPendingTest(testData);
        setShowPendingTestModal(true);
      } catch (err) {
        console.error("Error handling pending test on dashboard:", err);
      } finally {
        setPendingTestLoading(false);
      }
    };

    checkPendingTest();
  }, [user, token]);

  // Fetch AI Career Recommendations function (extracted for reuse)
  const fetchCareerRecommendations = async () => {
    if (!token || !user) {
      return;
    }

    setRecommendationsLoading(true);
    setRecommendationsError(null);

    try {
      const response = await axios.get(USERENDPOINTS.GET_AI_CAREER_RECOMMENDATIONS, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.recommendations) {
        setCareerRecommendations(response.data.recommendations);
        toast.success('Recommendations refreshed successfully!');
      } else {
        setRecommendationsError('Failed to load recommendations');
        // Fallback to default recommendations
        setCareerRecommendations([
          {
            title: "Software Engineering",
            match: 92,
            description: "Strong programming skills and problem-solving ability.",
            tags: ["Python", "DSA", "Web Development"],
            color: "text-blue-600"
          },
          {
            title: "Data Science",
            match: 85,
            description: "Good mathematical foundation and analytical thinking.",
            tags: ["Statistics", "Python", "Machine Learning"],
            color: "text-blue-600"
          },
          {
            title: "Product Management",
            match: 78,
            description: "Business understanding and digital marketing expertise.",
            tags: ["Analytics", "Strategy", "Communication"],
            color: "text-blue-600"
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching career recommendations:', err);
      setRecommendationsError('Failed to load recommendations');
      toast.error('Failed to refresh recommendations. Please try again.');
      // Fallback to default recommendations
      setCareerRecommendations([
        {
          title: "Software Engineering",
          match: 92,
          description: "Strong programming skills and problem-solving ability.",
          tags: ["Python", "DSA", "Web Development"],
          color: "text-blue-600"
        },
        {
          title: "Data Science",
          match: 85,
          description: "Good mathematical foundation and analytical thinking.",
          tags: ["Statistics", "Python", "Machine Learning"],
          color: "text-blue-600"
        },
        {
          title: "Product Management",
          match: 78,
          description: "Business understanding and digital marketing expertise.",
          tags: ["Analytics", "Strategy", "Communication"],
          color: "text-blue-600"
        }
      ]);
    } finally {
      setRecommendationsLoading(false);
    }
  };

  // Fetch AI Career Recommendations on mount and tab change
  useEffect(() => {
    if (activeTab !== "Overview" || !token || !user) {
      return;
    }
    fetchCareerRecommendations();
  }, [activeTab, token, user]);

  // Default/fallback data
  const summaryCards = dashboardData?.summaryCards ? [
    {
      title: "Total Courses",
      value: dashboardData.summaryCards.totalCourses.value.toString(),
      subtitle: dashboardData.summaryCards.totalCourses.subtitle,
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      title: "Tests Taken",
      value: dashboardData.summaryCards.testsTaken.value.toString(),
      subtitle: dashboardData.summaryCards.testsTaken.subtitle,
      icon: FileTextIcon,
      color: "text-blue-600"
    },
    {
      title: "Job Applications",
      value: dashboardData.summaryCards.jobApplications.value.toString(),
      subtitle: dashboardData.summaryCards.jobApplications.subtitle,
      icon: BriefcaseIcon,
      color: "text-blue-600"
    },
    {
      title: "Avg. Test Score",
      value: dashboardData.summaryCards.avgTestScore.value,
      subtitle: dashboardData.summaryCards.avgTestScore.subtitle,
      icon: TrophyIcon,
      color: "text-green-600",
      trend: dashboardData.summaryCards.avgTestScore.trend
    }
  ] : [
    {
      title: "Total Courses",
      value: "0",
      subtitle: "0 completed",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      title: "Tests Taken",
      value: "0",
      subtitle: "0 completed",
      icon: FileTextIcon,
      color: "text-blue-600"
    },
    {
      title: "Job Applications",
      value: "0",
      subtitle: "0 applied",
      icon: BriefcaseIcon,
      color: "text-blue-600"
    },
    {
      title: "Avg. Test Score",
      value: "0%",
      subtitle: "0%",
      icon: TrophyIcon,
      color: "text-green-600"
    }
  ];

  const conceptClarity = dashboardData?.conceptClarity || [];
  const recentTests = dashboardData?.recentTestScores || [];
  const learningJourney = dashboardData?.learningJourney ? dashboardData.learningJourney.map(stage => ({
    ...stage,
    color: stage.completed ? "border-green-500" : stage.progress > 0 ? "border-blue-500" : "border-gray-300",
    icon: stage.completed ? CheckCircleIcon : stage.progress > 0 ? ClockIcon : TargetIcon,
    iconColor: stage.completed ? "text-green-600" : stage.progress > 0 ? "text-blue-600" : "text-gray-400"
  })) : [];

  const actionableItems = dashboardData?.actionableItems ? dashboardData.actionableItems.map(item => ({
    ...item,
    icon: item.icon === "BookOpenIcon" ? BookOpenIcon : item.icon === "FileTextIcon" ? FileTextIcon : BriefcaseIcon,
    color: "text-blue-600"
  })) : [];

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Learning Goal / Onboarding Modal - 3 Step Wizard */}
      <GoalSelectionModal
        open={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        token={token}
        user={user}
        setUser={setUser}
      />
      
      {/* Header with navigation and onboarding button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-full p-1 flex space-x-1 shadow-sm w-full sm:w-fit overflow-x-auto sm:overflow-visible">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
                ${activeTab === item.name
                  ? "bg-blue-50 text-blue-800"
                  : "text-gray-600 hover:bg-gray-50"}
              `}
            >
              {item.name}
            </button>
          ))}
        </div>
        
        {/* Show "Complete Preferences" button if onboarding is not completed */}
        {user?.role === "student" && !user?.onboardingCompleted && (
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
          >
            <TargetIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Complete Preferences</span>
            <span className="sm:hidden">Preferences</span>
          </button>
        )}
      </div>

      <PendingTestPaymentModal
        open={showPendingTestModal}
        pendingTest={pendingTest}
        loading={pendingTestLoading}
        onClose={() => {
          // User chose "Maybe later" – clear pending test from localStorage
          localStorage.removeItem("pendingTestId");
          localStorage.removeItem("pendingTestType");
          setShowPendingTestModal(false);
        }}
        onGoToPayment={() => {
          setShowPendingTestModal(false);
          const testId = pendingTest?._id || pendingTest?.id;
          if (testId) {
            navigate(`/student/test-details?id=${testId}`);
          }
        }}
      />

      {/* Conditional rendering based on activeTab */}
      {activeTab === "Overview" && (
        <>
          {loading && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-gray-600">Loading dashboard data...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Summary Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{card.title}</h3>
                      <div className="flex items-baseline space-x-1 sm:space-x-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</span>
                        <span className="text-xs sm:text-sm text-gray-500">/ {card.subtitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${card.color}`} />
                      {card.trend === "up" && (
                        <TrendingUpIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concept Clarity & Recent Test Scores Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {/* Concept Clarity */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Concept Clarity</h3>
              <div className="space-y-3 sm:space-y-4">
                {conceptClarity.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate flex-1">{item.subject}</span>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <span className={`text-xs sm:text-sm font-medium ${item.levelColor}`}>{item.level}</span>
                        <span className="text-xs sm:text-sm text-gray-600">{item.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className={`h-1.5 sm:h-2 rounded-full ${item.progressColor}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Test Scores */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Test Scores</h3>
              <div className="space-y-3 sm:space-y-4">
                {recentTests.length > 0 ? (
                  recentTests.map((test, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1 truncate">{test.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">{test.subjects}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-base sm:text-lg font-bold ${test.scoreColor}`}>{test.score}%</span>
                            {test.status && (
                              <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                                test.status === 'passed' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {test.status === 'passed' ? 'Passed' : 'Failed'}
                              </span>
                            )}
                          </div>
                        </div>
                        {test.submissionId && (
                          <Link
                            to="/student/test-results"
                            state={{ 
                              submissionId: test.submissionId,
                              test: { _id: test.testId, title: test.title },
                              fromHistory: true 
                            }}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap flex-shrink-0"
                          >
                            View Results
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No test submissions yet</p>
                )}
                <button 
                  onClick={() => setActiveTab("My Tests")}
                  className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 flex items-center"
                >
                  View All Tests
                  <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Learning Journey Row */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Learning Journey</h3>
            <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mx-2 sm:mx-0 px-2 sm:px-0 scrollbar-hide">
              {learningJourney.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div key={index} className="flex items-center flex-shrink-0">
                    <div className={`border-2 rounded-lg p-3 sm:p-4 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] ${stage.color} ${stage.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stage.iconColor} flex-shrink-0`} />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{stage.stage}</h4>
                          <p className="text-xs text-gray-600 truncate">{stage.courses}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div 
                          className={`h-1.5 sm:h-2 rounded-full ${stage.progress > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{ width: `${stage.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {index < learningJourney.length - 1 && (
                      <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-1 sm:mx-2 flex-shrink-0 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Career Path Recommendations Row */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">AI Career Path Recommendations</h3>
              <button
                onClick={fetchCareerRecommendations}
                disabled={recommendationsLoading}
                className="flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh recommendations"
              >
                <RefreshCwIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${recommendationsLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
            {recommendationsError && !recommendationsLoading && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-lg mb-4 text-xs sm:text-sm">
                {recommendationsError}
              </div>
            )}
            {recommendationsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-xs sm:text-sm text-gray-600">Generating personalized recommendations...</p>
              </div>
            ) : careerRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {careerRecommendations.map((career, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate flex-1">{career.title}</h4>
                      <span className={`text-base sm:text-lg font-bold ${career.color || "text-blue-600"} flex-shrink-0`}>{career.match}% match</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{career.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {career.tags && career.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs sm:text-sm text-gray-500">No recommendations available at the moment.</p>
              </div>
            )}
          </div>

          {/* Actionable Items Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {actionableItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-lg bg-blue-50 flex-shrink-0`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{item.count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
            </>
          )}
        </>
      )}

      {activeTab === "My Courses" && <MyCourses />}
      {activeTab === "My Tests" && <MyTests />}
      {activeTab === "My Applications" && <MyJobApplications />}
      {activeTab === "Profile" && (
        <ProfileComponent 
          user={user} 
          profileData={profileData}
          loading={profileLoading}
          error={profileError}
        />
      )}
    </div>
  );
};

export default Dashboard;
