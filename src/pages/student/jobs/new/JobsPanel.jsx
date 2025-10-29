import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Building2, ChevronDown, ChevronUp, Filter, TrendingUp, Users, Briefcase, Search, Loader } from 'lucide-react';

const JobsPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('ui-ux-designer');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('most-popular');
  const [expandedFilters, setExpandedFilters] = useState({
    jobProfile: true,
    experience: false,
    duration: false
  });

  // Job categories
  const jobCategories = [
    { id: 'ui-ux-designer', label: 'UI/UX Designer', active: true },
    { id: 'management', label: 'Management', active: false },
    { id: 'web-development', label: 'Web Development', active: false },
    { id: 'marketing', label: 'Marketing', active: false },
    { id: 'govt-exams', label: 'Govt. Exams', active: false },
    { id: 'chatgpt-ai', label: 'ChatGPT & AI', active: false }
  ];

  // Simulate API fetch
  useEffect(() => {
    fetchJobs();
  }, [selectedCategory]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock jobs data
      const mockJobs = [
        {
          id: 1,
          title: "UI/UX Designer",
          company: "Company name private limited",
          location: "Gurgaon",
          experience: "1-2 years",
          salary: { min: 500000, max: 800000 },
          postedTime: "1 day ago",
          isPremium: true,
          matchPercentage: 75,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Figma", "Adobe XD", "Prototyping"],
          companySize: "51-200 employees"
        },
        {
          id: 2,
          title: "Senior UI/UX Designer",
          company: "TechCorp Solutions Pvt Ltd",
          location: "Bangalore",
          experience: "3-5 years",
          salary: { min: 800000, max: 1200000 },
          postedTime: "2 days ago",
          isPremium: false,
          matchPercentage: 92,
          matchLevel: "Excellent Match",
          logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Sketch", "InVision", "User Research"],
          companySize: "201-500 employees"
        },
        {
          id: 3,
          title: "Product Designer",
          company: "StartupXYZ Technologies",
          location: "Mumbai",
          experience: "2-4 years",
          salary: { min: 600000, max: 1000000 },
          postedTime: "3 days ago",
          isPremium: true,
          matchPercentage: 68,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Figma", "Principle", "Design Systems"],
          companySize: "11-50 employees"
        },
        {
          id: 4,
          title: "UX Researcher",
          company: "Design Studios India",
          location: "Pune",
          experience: "1-3 years",
          salary: { min: 450000, max: 700000 },
          postedTime: "4 days ago",
          isPremium: false,
          matchPercentage: 85,
          matchLevel: "Great Match",
          logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["User Research", "Analytics", "A/B Testing"],
          companySize: "51-200 employees"
        },
        {
          id: 5,
          title: "Junior UX Designer",
          company: "Creative Agency Solutions",
          location: "Delhi",
          experience: "0-1 years",
          salary: { min: 300000, max: 500000 },
          postedTime: "5 days ago",
          isPremium: false,
          matchPercentage: 58,
          matchLevel: "Fair Match",
          logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Photoshop", "Illustrator", "Basic Prototyping"],
          companySize: "11-50 employees"
        },
        {
          id: 6,
          title: "Lead Product Designer",
          company: "InnovateTech Private Limited",
          location: "Hyderabad",
          experience: "5-8 years",
          salary: { min: 1200000, max: 1800000 },
          postedTime: "1 week ago",
          isPremium: true,
          matchPercentage: 95,
          matchLevel: "Perfect Match",
          logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Design Leadership", "Strategy", "Team Management"],
          companySize: "201-500 employees"
        },
        {
          id: 7,
          title: "UX/UI Designer - Fintech",
          company: "FinanceFlow Technologies",
          location: "Chennai",
          experience: "2-4 years",
          salary: { min: 700000, max: 1100000 },
          postedTime: "1 week ago",
          isPremium: false,
          matchPercentage: 78,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Fintech Design", "Mobile UI", "Web Design"],
          companySize: "101-200 employees"
        },
        {
          id: 8,
          title: "Visual Designer",
          company: "BrandCraft Design Studio",
          location: "Kolkata",
          experience: "1-3 years",
          salary: { min: 400000, max: 650000 },
          postedTime: "1 week ago",
          isPremium: false,
          matchPercentage: 62,
          matchLevel: "Fair Match",
          logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          skills: ["Branding", "Visual Design", "Typography"],
          companySize: "11-50 employees"
        }
      ];

      setJobs(mockJobs);
      setLoading(false);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      setLoading(false);
    }
  };

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const formatSalary = (salary) => {
    const formatAmount = (amount) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(0)},${(amount % 100000).toString().padStart(2, '0').slice(0, 2)},000`;
      }
      return amount.toLocaleString();
    };
    return `${formatAmount(salary.min)} - ${formatAmount(salary.max)}`;
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 90) return 'stroke-green-500';
    if (percentage >= 75) return 'stroke-blue-500';
    if (percentage >= 60) return 'stroke-yellow-500';
    return 'stroke-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
                 <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                 <p className="text-gray-600 text-lg">Loading jobs...</p>
               </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchJobs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-[#2962FF] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Left Section - Text */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 text-white">
                Explore Career Opportunities
              </h1>
              <p className="text-base sm:text-lg text-white font-normal max-w-2xl">
                Discover your dream job with AI-powered matching, personalized recommendations, and comprehensive job listings across industries.
              </p>
            </div>
            
            {/* Right Section - Stats */}
            <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-5">
              {/* Job Openings */}
              <div className="flex flex-row items-start gap-2.5">
                <div className="bg-[#5C9EFF] rounded-lg p-2 flex-shrink-0 shadow-md flex items-center justify-center">
                  <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">500+</div>
                  <div className="text-xs lg:text-sm text-white font-normal mt-0.5">Job Openings</div>
                </div>
              </div>
              
              {/* Top Companies */}
              <div className="flex flex-row items-start gap-2.5">
                <div className="bg-[#5C9EFF] rounded-lg p-2 flex-shrink-0 shadow-md flex items-center justify-center">
                  <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">200+</div>
                  <div className="text-xs lg:text-sm text-white font-normal mt-0.5">Top Companies</div>
                </div>
              </div>
              
              {/* Placement Rate */}
              <div className="flex flex-row items-start gap-2.5">
                <div className="bg-[#5C9EFF] rounded-lg p-2 flex-shrink-0 shadow-md flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">90%</div>
                  <div className="text-xs lg:text-sm text-white font-normal mt-0.5">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Jobs Categories</h2>
          <div className="flex flex-wrap gap-3">
            {jobCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">All Filters</h2>
              </div>

              <div className="space-y-4">
                {/* Job Profile Filter */}
                <div className="border-b pb-4">
                  <button
                    onClick={() => toggleFilter('jobProfile')}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
                  >
                    <span>Job Profile</span>
                    {expandedFilters.jobProfile ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedFilters.jobProfile && (
                    <div className="mt-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>UI/UX Designer</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Product Designer</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Visual Designer</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Experience Filter */}
                <div className="border-b pb-4">
                  <button
                    onClick={() => toggleFilter('experience')}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
                  >
                    <span>Experience</span>
                    {expandedFilters.experience ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedFilters.experience && (
                    <div className="mt-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>0-1 years</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>1-3 years</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>3-5 years</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>5+ years</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Duration Filter */}
                <div>
                  <button
                    onClick={() => toggleFilter('duration')}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
                  >
                    <span>Duration</span>
                    {expandedFilters.duration ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedFilters.duration && (
                    <div className="mt-3 space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Full-time</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Part-time</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Contract</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Internship</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Listing */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {jobs.length} results for Data Analyst Jobs
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="most-popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
                  <div className="flex items-start justify-between">
                    {/* Left Section */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Company Logo */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                          {job.isPremium && (
                            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                              premium
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{job.company}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatSalary(job.salary)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{job.postedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Match Indicator */}
                    <div className="flex flex-col items-center gap-3 ml-6">
                      {/* Circular Progress */}
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="stroke-gray-200"
                            fill="none"
                            strokeWidth="3"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={getMatchBgColor(job.matchPercentage)}
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${job.matchPercentage}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-sm font-bold ${getMatchColor(job.matchPercentage)}`}>
                            {job.matchPercentage}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-sm font-semibold ${getMatchColor(job.matchPercentage)}`}>
                          {job.matchLevel}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Complete profile for better match
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1">
                          Complete here
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPlatform;