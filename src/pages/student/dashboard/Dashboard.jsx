import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { mainContext } from "../../../context/MainContext";
import { USERENDPOINTS } from "../../../constants/ApiConstants";
import PendingTestPaymentModal from "./PendingTestPaymentModal";
import MyCourses from "../progress/MyCourses";
import MyTests from "../progress/MyTests";
import MyJobApplications from "../progress/MyJobApplications";
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
  AwardIcon,
  UsersIcon,
  BarChart3Icon,
  ChevronRightIcon
} from "lucide-react";

// Placeholder for Profile component
const ProfileComponent = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
    <p className="text-gray-600">This is your profile page content.</p>
  </div>
);

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(mainContext);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [pendingTest, setPendingTest] = useState(null);
  const [pendingTestLoading, setPendingTestLoading] = useState(false);
  const [showPendingTestModal, setShowPendingTestModal] = useState(false);

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

  // AI Career Recommendations (placeholder - can be enhanced later)
  const careerRecommendations = [
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
  ];

  const actionableItems = dashboardData?.actionableItems ? dashboardData.actionableItems.map(item => ({
    ...item,
    icon: item.icon === "BookOpenIcon" ? BookOpenIcon : item.icon === "FileTextIcon" ? FileTextIcon : BriefcaseIcon,
    color: "text-blue-600"
  })) : [];

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white rounded-full p-1 flex space-x-1 mb-6 shadow-sm w-fit">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeTab === item.name
                ? "bg-blue-50 text-blue-800"
                : "text-gray-600 hover:bg-gray-50"}
            `}
          >
            {item.name}
          </button>
        ))}
      </div>

      <PendingTestPaymentModal
        open={showPendingTestModal}
        pendingTest={pendingTest}
        loading={pendingTestLoading}
        onClose={() => setShowPendingTestModal(false)}
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
            <div className="text-center py-12">
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Summary Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                        <span className="text-sm text-gray-500">/ {card.subtitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon className={`w-8 h-8 ${card.color}`} />
                      {card.trend === "up" && (
                        <TrendingUpIcon className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concept Clarity & Recent Test Scores Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Concept Clarity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Concept Clarity</h3>
              <div className="space-y-4">
                {conceptClarity.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${item.levelColor}`}>{item.level}</span>
                        <span className="text-sm text-gray-600">{item.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.progressColor}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Test Scores */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Scores</h3>
              <div className="space-y-4">
                {recentTests.length > 0 ? (
                  recentTests.map((test, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{test.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{test.subjects}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${test.scoreColor}`}>{test.score}%</span>
                            {test.status && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
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
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View Results
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No test submissions yet</p>
                )}
                <button 
                  onClick={() => setActiveTab("My Tests")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
                >
                  View All Tests
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Learning Journey Row */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Journey</h3>
            <div className="flex items-center space-x-4 overflow-x-auto">
              {learningJourney.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`border-2 rounded-lg p-4 min-w-[200px] ${stage.color} ${stage.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className={`w-6 h-6 ${stage.iconColor}`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                          <p className="text-sm text-gray-600">{stage.courses}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stage.progress > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{ width: `${stage.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {index < learningJourney.length - 1 && (
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 mx-2 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Career Path Recommendations Row */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Career Path Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerRecommendations.map((career, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{career.title}</h4>
                    <span className={`text-lg font-bold ${career.color}`}>{career.match}% match</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Items Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionableItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-blue-50`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.count}</p>
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
      {activeTab === "Profile" && <ProfileComponent />}
    </div>
  );
};

export default Dashboard;
