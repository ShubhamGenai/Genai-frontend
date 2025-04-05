import { useState, useEffect } from 'react';
import { MdEmojiEvents, MdSchool, MdAssignment, MdTrendingUp, MdStar, MdPeople, MdTimer, MdCheckCircle, 
  MdLocalFireDepartment, MdMilitaryTech, MdWorkspaces, MdTrendingFlat, MdSearch, MdFilterList, MdSort } from 'react-icons/md';

const LeaderBoardPage = () => {
  const [activeTab, setActiveTab] = useState('Overall');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });
  const [timeFilter, setTimeFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced demo data with achievements
  const topPerformers = [
    { id: 1, name: "Rahul Sharma", score: 98, courses: 12, tests: 45, streak: 30, rank: 1, avatar: "https://i.pravatar.cc/150?img=1", achievements: ["Python Master", "100 Days Streak", "Top Contributor"] },
    { id: 2, name: "Priya Patel", score: 96, courses: 10, tests: 42, streak: 28, rank: 2, avatar: "https://i.pravatar.cc/150?img=2", achievements: ["JavaScript Pro", "Quiz Champion"] },
    { id: 3, name: "Amit Kumar", score: 94, courses: 11, tests: 40, streak: 25, rank: 3, avatar: "https://i.pravatar.cc/150?img=3", achievements: ["React Expert", "Fast Learner"] },
    { id: 4, name: "Sneha Gupta", score: 92, courses: 9, tests: 38, streak: 20, rank: 4, avatar: "https://i.pravatar.cc/150?img=4", achievements: ["Data Science Enthusiast"] },
    { id: 5, name: "Raj Malhotra", score: 90, courses: 8, tests: 36, streak: 18, rank: 5, avatar: "https://i.pravatar.cc/150?img=5", achievements: ["Full Stack Developer"] },
    { id: 6, name: "Anita Singh", score: 88, courses: 8, tests: 35, streak: 15, rank: 6, avatar: "https://i.pravatar.cc/150?img=6", achievements: ["UI/UX Specialist"] },
    { id: 7, name: "Vikram Verma", score: 86, courses: 7, tests: 33, streak: 12, rank: 7, avatar: "https://i.pravatar.cc/150?img=7", achievements: ["Mobile App Developer"] },
    { id: 8, name: "Meera Reddy", score: 84, courses: 7, tests: 32, streak: 10, rank: 8, avatar: "https://i.pravatar.cc/150?img=8", achievements: ["Backend Expert"] },
    { id: 9, name: "Kiran Shah", score: 82, courses: 6, tests: 30, streak: 8, rank: 9, avatar: "https://i.pravatar.cc/150?img=9", achievements: ["Web Development"] },
    { id: 10, name: "Neha Kapoor", score: 80, courses: 6, tests: 28, streak: 7, rank: 10, avatar: "https://i.pravatar.cc/150?img=10", achievements: ["Data Science"] },
  ];

  const leaderboardData = [
    { id: 4, name: "Sneha Gupta", score: 92, courses: 9, tests: 38, streak: 20, rank: 4, avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Raj Malhotra", score: 90, courses: 8, tests: 36, streak: 18, rank: 5, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Anita Singh", score: 88, courses: 8, tests: 35, streak: 15, rank: 6, avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Vikram Verma", score: 86, courses: 7, tests: 33, streak: 12, rank: 7, avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 8, name: "Meera Reddy", score: 84, courses: 7, tests: 32, streak: 10, rank: 8, avatar: "https://i.pravatar.cc/150?img=8" },
  ];

  // Extended demo data with more details
  const allLeaderboardData = [
    ...leaderboardData,
    { id: 9, name: "Kiran Shah", score: 82, courses: 6, tests: 30, streak: 8, rank: 9, avatar: "https://i.pravatar.cc/150?img=9", lastActive: "2 hours ago", specialty: "Web Development" },
    { id: 10, name: "Neha Kapoor", score: 80, courses: 6, tests: 28, streak: 7, rank: 10, avatar: "https://i.pravatar.cc/150?img=10", lastActive: "1 day ago", specialty: "Data Science" },
    { id: 11, name: "Arjun Reddy", score: 78, courses: 5, tests: 25, streak: 5, rank: 11, avatar: "https://i.pravatar.cc/150?img=11", lastActive: "3 hours ago", specialty: "Mobile Dev" },
    { id: 12, name: "Zara Khan", score: 76, courses: 5, tests: 23, streak: 4, rank: 12, avatar: "https://i.pravatar.cc/150?img=12", lastActive: "5 hours ago", specialty: "UI/UX" },
  ];

  const categories = [
    { name: 'Overall', icon: <MdEmojiEvents className="w-5 h-5" /> },
    { name: 'Courses', icon: <MdSchool className="w-5 h-5" /> },
    { name: 'Tests', icon: <MdAssignment className="w-5 h-5" /> },
    { name: 'Progress', icon: <MdTrendingUp className="w-5 h-5" /> },
  ];

  // Stats cards with more detailed information
  const statsCards = [
    { 
      title: 'Active Learners', 
      value: '2,547', 
      icon: <MdPeople className="w-6 h-6" />, 
      color: 'bg-blue-500',
      trend: '+12% this week',
      detail: '156 new students joined'
    },
    { 
      title: 'Course Completion', 
      value: '85.6%', 
      icon: <MdCheckCircle className="w-6 h-6" />, 
      color: 'bg-green-500',
      trend: '+5% vs last month',
      detail: '234 courses completed'
    },
    { 
      title: 'Test Success Rate', 
      value: '92%', 
      icon: <MdMilitaryTech className="w-6 h-6" />, 
      color: 'bg-purple-500',
      trend: 'Top categories: Python, JavaScript',
      detail: '1,890 tests passed'
    },
    { 
      title: 'Learning Streak', 
      value: '28 Days', 
      icon: <MdLocalFireDepartment className="w-6 h-6" />, 
      color: 'bg-orange-500',
      trend: 'Highest streak: 120 days',
      detail: '45% students maintain streak'
    },
  ];

  // Time filter options
  const timeFilters = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] - b[key];
      }
      return b[key] - a[key];
    });
  };

  // Filter and sort data
  useEffect(() => {
    let result = [...allLeaderboardData];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply time filter (demo implementation)
    if (timeFilter !== 'all') {
      // In real implementation, you would filter based on actual timestamps
      result = result.slice(0, timeFilter === 'week' ? 5 : timeFilter === 'month' ? 8 : result.length);
    }

    // Apply sorting
    result = sortData(result, sortConfig.key, sortConfig.direction);

    setFilteredData(result);
  }, [searchTerm, sortConfig, timeFilter]);

  // Handle sort click
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="min-h-screen mt-10 py-4 px-2 sm:px-4 lg:px-8">
      {/* Header Section with improved styling */}
      <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Leaderboard & Achievements
          </span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
          Track your progress, compete with peers, and unlock achievements
        </p>
      </div>

      {/* Top 10 Performers Section */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Top 10 Performers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {topPerformers.map((performer, index) => {
            const isTop3 = index < 3;
            return (
              <div 
                key={performer.id}
                className={`bg-white rounded-lg shadow-md p-2 sm:p-4 transform transition-all hover:scale-105 ${
                  isTop3 ? 'border border-yellow-400' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm sm:text-lg font-bold mb-2 sm:mb-4 ${
                    index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-400' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Avatar */}
                  <img 
                    src={performer.avatar} 
                    alt={performer.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-blue-100 mb-2 sm:mb-4"
                  />
                  
                  {/* Name and Score */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center">{performer.name}</h3>
                  <div className="text-lg sm:text-xl font-bold text-blue-600 mb-1 sm:mb-2">{performer.score} pts</div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <MdSchool className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{performer.courses}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdAssignment className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{performer.tests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdStar className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{performer.streak} days</span>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="w-full">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {performer.achievements.map((achievement, i) => (
                        <span 
                          key={i}
                          className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-3 sm:p-4 transform transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                    <p className="text-lg sm:text-xl font-bold mt-0.5">{stat.value}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-2 sm:pt-4">
                <div className="flex items-center text-xs sm:text-sm text-green-600">
                  <MdTrendingFlat className="mr-1" />
                  {stat.trend}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Navigation and Table */}
      <div className="max-w-7xl mx-auto mt-4 sm:mt-6">
        {/* Custom Navigation */}
        <div className="flex mb-4 sm:mb-6 bg-white rounded-lg shadow-sm p-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg transition-all duration-200
                ${activeTab === category.name 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {category.icon}
              <span className="text-xs sm:text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
              <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <MdFilterList className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                    <div className="p-3">
                      <h4 className="font-medium mb-2 text-sm">Time Period</h4>
                      {timeFilters.map(filter => (
                        <button
                          key={filter.value}
                          onClick={() => {
                            setTimeFilter(filter.value);
                            setShowFilters(false);
                          }}
                          className={`block w-full text-left px-2 py-1 rounded text-sm ${
                            timeFilter === filter.value ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 px-2 sm:py-4 sm:px-4">Rank</th>
                <th className="py-2 px-2 sm:py-4 sm:px-4">Student</th>
                <th className="py-2 px-2 sm:py-4 sm:px-4 text-center cursor-pointer" onClick={() => handleSort('courses')}>
                  <div className="flex items-center justify-center gap-1">
                    Courses
                    <MdSort className={`w-4 h-4 ${sortConfig.key === 'courses' ? 'text-blue-600' : ''}`} />
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-4 sm:px-4 text-center cursor-pointer" onClick={() => handleSort('tests')}>
                  <div className="flex items-center justify-center gap-1">
                    Tests
                    <MdSort className={`w-4 h-4 ${sortConfig.key === 'tests' ? 'text-blue-600' : ''}`} />
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-4 sm:px-4 text-center cursor-pointer" onClick={() => handleSort('score')}>
                  <div className="flex items-center justify-center gap-1">
                    Score
                    <MdSort className={`w-4 h-4 ${sortConfig.key === 'score' ? 'text-blue-600' : ''}`} />
                  </div>
                </th>
                <th className="py-2 px-2 sm:py-4 sm:px-4 text-center cursor-pointer" onClick={() => handleSort('streak')}>
                  <div className="flex items-center justify-center gap-1">
                    Streak
                    <MdSort className={`w-4 h-4 ${sortConfig.key === 'streak' ? 'text-blue-600' : ''}`} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr 
                  key={student.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs sm:text-sm">
                      {student.rank}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-xs sm:text-sm">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.specialty || 'Student'}</div>
                        <div className="text-[10px] text-gray-400">{student.lastActive || 'Active now'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-center text-xs sm:text-sm">{student.courses}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-center text-xs sm:text-sm">{student.tests}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-center font-semibold text-blue-600 text-xs sm:text-sm">
                    {student.score} pts
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                      <MdStar className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                      {student.streak} days
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
  
  