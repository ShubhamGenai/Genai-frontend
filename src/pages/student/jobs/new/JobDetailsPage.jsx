import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ChevronRight, ChevronDown, Check, Loader, Folder, FolderOpen, Book, MapPin, Calendar, DollarSign, Building2, TrendingUp, Briefcase, Share } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('job-description');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock job details data
      const mockJobDetails = {
        id: parseInt(id),
        title: "UI/UX Designer",
        company: "TechCorp Solutions Private Limited",
        location: "Gurgaon, Haryana",
        experience: "1-2 years",
        salary: { min: 500000, max: 800000 },
        postedTime: "1 day ago",
        applicants: 127,
        positions: 5,
        deadline: "Feb 15, 2025",
        matchPercentage: 75,
        matchLevel: "Good Match",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
        category: "ui-ux-designer",
        jobType: "Full-time",
        workMode: "Hybrid",
        aboutRole: "We are seeking a talented and creative UI/UX Designer to join our dynamic team. The ideal candidate will have a passion for creating exceptional user experiences and a strong understanding of user-centered design principles. As a UI/UX Designer at TechCorp Solutions, you will collaborate with product managers, developers, and other stakeholders to design intuitive and engaging digital products. You will be responsible for the entire design process, from initial research and wireframing to final visual design and prototyping.",
        keyResponsibilities: [
          "Conduct user research and gather insights to inform design decisions",
          "Create wireframes, prototypes, and high-fidelity mockups using industry-standard tools",
          "Design intuitive user interfaces that align with brand guidelines and accessibility standards",
          "Collaborate with developers to ensure seamless implementation of designs",
          "Conduct usability testing and iterate based on user feedback",
          "Stay updated with the latest design trends, tools, and best practices",
          "Present design concepts and rationale to stakeholders"
        ],
        requirementsQualifications: [
          "1-2 years of professional experience in UI/UX design",
          "Proficiency in design tools such as Figma, Sketch, Adobe XD, or similar",
          "Strong portfolio demonstrating user-centered design approach",
          "Understanding of responsive design and mobile-first principles",
          "Knowledge of HTML/CSS basics is a plus",
          "Excellent communication and collaboration skills",
          "Bachelor's degree in Design, HCI, or related field (preferred)"
        ],
        requiredSkills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Interaction Design", "Visual Design"],
        companyInfo: "TechCorp Solutions is a leading technology company dedicated to innovation and excellence. We believe in fostering a creative and collaborative environment where our employees can thrive and make a significant impact. Join us to be a part of a team that is shaping the future of digital products.",
        similarJobs: [] // This would typically be fetched separately or filtered from a larger list
      };

      setJob(mockJobDetails);
      setLoading(false);
    } catch (err) {
      setError('Failed to load job details. Please try again later.');
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    const formatAmount = (amount) => {
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(0)}.${(amount % 100000).toString().padStart(2, '0').slice(0, 2)}L`;
      }
      return `₹${amount.toLocaleString()}`;
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
          <p className="text-gray-600 text-lg">Loading job details...</p>
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
            onClick={fetchJobDetails}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <p className="text-gray-600 text-lg">Job not found.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-medium text-gray-900 leading-tight">{job.title}</h1>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column - Job Details */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Posted {job.postedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{job.applicants} applied</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span>{job.positions} openings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Deadline {job.deadline}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('job-description')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'job-description' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Job Description
                  </button>
                  <button
                    onClick={() => setActiveTab('company-info')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'company-info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Company Info
                  </button>
                  <button
                    onClick={() => setActiveTab('similar-jobs')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'similar-jobs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Similar Jobs
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'job-description' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">About the Role</h2>
                    <p className="text-sm text-gray-700 mb-6">{job.aboutRole}</p>

                    <h2 className="text-lg font-medium text-gray-900 mb-3">Key Responsibilities</h2>
                    <ul className="list-none space-y-2 mb-6">
                      {job.keyResponsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-lg font-medium text-gray-900 mb-3">Requirements & Qualifications</h2>
                    <ul className="list-none space-y-2 mb-6">
                      {job.requirementsQualifications.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-lg font-medium text-gray-900 mb-3">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'company-info' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">About {job.company}</h2>
                    <p className="text-sm text-gray-700 mb-6">{job.companyInfo}</p>
                    {/* Add more company details here if available in mockJobDetails */}
                  </div>
                )}

                {activeTab === 'similar-jobs' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">Similar Job Listings</h2>
                    {job.similarJobs.length === 0 ? (
                      <p className="text-sm text-gray-700">No similar jobs found at the moment.</p>
                    ) : (
                      // Render similar jobs here (e.g., a simplified card list)
                      <p>Similar jobs will be displayed here.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              {/* Match Score */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
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
                    <span className={`text-lg font-semibold ${getMatchColor(job.matchPercentage)}`}>
                      {job.matchPercentage}%
                    </span>
                  </div>
                </div>
                <p className={`text-sm font-medium ${getMatchColor(job.matchPercentage)} mb-1`}>
                  {job.matchLevel} for Your Profile
                </p>
                <a href="#" className="text-xs text-blue-600 hover:underline">Improve your match score</a>
              </div>

              {/* Job Summary */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900 mb-3">Job Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Briefcase className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>Employment Type: {job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>Work Mode: {job.workMode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>Applicants: {job.applicants} people applied</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="w-full bg-white text-blue-600 border border-blue-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <Folder className="w-4 h-4" />
                  Save for Later
                </button>
                <button className="w-full bg-white text-gray-800 border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <Share className="w-4 h-4" />
                  Share Job
                </button>
              </div>

              {/* Posted By */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-900 mb-3">Posted by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">HR</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">HR Team</p>
                    <p className="text-xs text-gray-600">TechCorp Solutions</p>
                  </div>
                </div>
              </div>

              {/* Premium Boost */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-base font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Premium Application Boost
                </h3>
                <p className="text-xs text-blue-700 mb-3">Increase your chances by 3x with our premium features</p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Priority application review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Resume highlighting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Direct recruiter connect</span>
                  </li>
                </ul>
                <button className="mt-4 w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
