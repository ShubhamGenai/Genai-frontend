import { MdRocketLaunch } from "react-icons/md";
import { CourseCard } from "../../../component/dashboard/CourseCard";
import { StatsCard } from "../../../component/dashboard/StatsCard";
import { RecommendationCard } from "../../../component/dashboard/Recomendation";
import { BriefcaseIcon, ChartBarIcon, StarIcon, TrophyIcon } from "lucide-react";
import { HiAcademicCap } from "react-icons/hi";

const Dashboard = () => {
  const statsData = [
    {
      title: "Active Courses",
      value: "12",
      subtitle: "+3 this week",
      icon: HiAcademicCap,
      gradient: "from-purple-600 to-blue-600",
    },
    {
      title: "Completion Rate",
      value: "67%",
      subtitle: "+12% vs last month",
      icon: ChartBarIcon,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Job Matches",
      value: "42%",
      subtitle: "Match accuracy",
      icon: BriefcaseIcon,
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Learning Streak",
      value: "23",
      subtitle: "Days in a row",
      icon: TrophyIcon,
      gradient: "from-yellow-500 to-orange-600",
    },
  ];

  const coursesData = [
    {
      title: "NEET JEE Complete Preparation",
      description:
        "Comprehensive AI-powered preparation for medical and engineering entrance exams with adaptive testing.",
      progress: 75,
      type: "AI Tutoring",
      difficulty: "Advanced",
    },
    {
      title: "Digital Marketing Masterclass",
      description:
        "Master digital marketing strategies with hands-on projects and real-world case studies.",
      progress: 45,
      type: "Professional",
      difficulty: "Intermediate",
    },
    {
      title: "Data Science & AI/ML",
      description:
        "Learn data science fundamentals and machine learning with Python and TensorFlow.",
      progress: 60,
      type: "Tech Skills",
      difficulty: "Advanced",
    },
  ];

  const aiRecommendations = [
    {
      title: "Python Fundamentals Quiz",
      description: "Test your Python knowledge with adaptive questions",
      type: "Assessment",
      estimatedTime: "15 mins",
    },
    {
      title: "Resume Optimization",
      description: "AI-powered resume review and enhancement",
      type: "Career",
      estimatedTime: "10 mins",
    },
  ];

  const skillRecommendations = [
    {
      title: "React.js Advanced Patterns",
      description: "Learn advanced React patterns and best practices",
      type: "Skill Building",
      estimatedTime: "2 hours",
    },
    {
      title: "System Design Interview Prep",
      description: "Practice system design questions for tech interviews",
      type: "Interview Prep",
      estimatedTime: "45 mins",
    },
  ];

  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Courses Section */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {coursesData.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MdRocketLaunch className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} />
            ))}
          </div>
        </div>

        {/* Skill Development */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <StarIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Skill Development</h3>
          </div>
          <div className="space-y-3">
            {skillRecommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
