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

const Dashboard = () => {
  // Summary Cards Data
  const summaryCards = [
    {
      title: "Total Courses",
      value: "6",
      subtitle: "2 completed",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      title: "Tests Taken",
      value: "6",
      subtitle: "2 completed",
      icon: FileTextIcon,
      color: "text-blue-600"
    },
    {
      title: "Job Applications",
      value: "6",
      subtitle: "2 applied",
      icon: BriefcaseIcon,
      color: "text-blue-600"
    },
    {
      title: "Avg. Test Score",
      value: "90%",
      subtitle: "+5%",
      icon: TrophyIcon,
      color: "text-green-600",
      trend: "up"
    }
  ];

  // Concept Clarity Data
  const conceptClarity = [
    {
      subject: "Physics - Mechanics",
      progress: 85,
      level: "Strong",
      levelColor: "text-green-600",
      progressColor: "bg-green-500"
    },
    {
      subject: "Chemistry - Organic",
      progress: 72,
      level: "Good",
      levelColor: "text-blue-600",
      progressColor: "bg-blue-500"
    },
    {
      subject: "Mathematics - Calculus",
      progress: 65,
      level: "Improving",
      levelColor: "text-orange-600",
      progressColor: "bg-orange-500"
    },
    {
      subject: "Digital Marketing - SEO",
      progress: 90,
      level: "Strong",
      levelColor: "text-green-600",
      progressColor: "bg-green-500"
    }
  ];

  // Recent Test Scores
  const recentTests = [
    {
      title: "JEE Main Mock Test 2024",
      subjects: "Physics, Chemistry, Mathematics",
      score: 92,
      scoreColor: "text-green-600"
    },
    {
      title: "NEET Chemistry Practice",
      subjects: "Organic & Inorganic Chemistry",
      score: 88,
      scoreColor: "text-blue-600"
    }
  ];

  // Learning Journey
  const learningJourney = [
    {
      stage: "Foundation",
      courses: "3 courses",
      progress: 75,
      color: "border-green-500",
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
      completed: true
    },
    {
      stage: "Intermediate",
      courses: "4 courses",
      progress: 60,
      color: "border-blue-500",
      icon: ClockIcon,
      iconColor: "text-blue-600",
      completed: false
    },
    {
      stage: "Advanced",
      courses: "0 courses",
      progress: 0,
      color: "border-gray-300",
      icon: TargetIcon,
      iconColor: "text-gray-400",
      completed: false
    },
    {
      stage: "Specialization",
      courses: "0 courses",
      progress: 0,
      color: "border-gray-300",
      icon: AwardIcon,
      iconColor: "text-gray-400",
      completed: false
    }
  ];

  // AI Career Recommendations
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

  // Actionable Items
  const actionableItems = [
    {
      title: "Continue Learning",
      count: "4 courses in progress",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      title: "Resume Tests",
      count: "4 tests pending",
      icon: FileTextIcon,
      color: "text-blue-600"
    },
    {
      title: "Complete Applications",
      count: "4 drafts to finish",
      icon: BriefcaseIcon,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="p-6 space-y-8">
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
            {recentTests.map((test, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-gray-900 mb-1">{test.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{test.subjects}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${test.scoreColor}`}>{test.score}%</span>
                </div>
              </div>
            ))}
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
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
    </div>
  );
};

export default Dashboard;
