import React, { useState, useEffect, useContext } from "react";
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Calendar, 
  Building, 
  Award, 
  BookOpen, 
  FileText, 
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Download,
  Eye,
  Trash2,
  Upload,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { mainContext } from "../../../context/MainContext";

const ProfilePage = () => {

    const {user} = useContext(mainContext)

  const [activeTab, setActiveTab] = useState("dashboard");
  const [editProfile, setEditProfile] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);
  const [editSkillsMode, setEditSkillsMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    role: "Full Stack Developer",
    bio: "Passionate developer with 3+ years of experience in React, Node.js, and cloud technologies. Love building scalable applications and learning new technologies.",
    avatar: "/profile.jpg",
    github: "https://github.com/varsha",
    linkedin: "https://linkedin.com/in/varsha",
    website: "https://varsha.dev",
    joinDate: "2022-01-15"
  });

  const [skills, setSkills] = useState([
    { name: "React", level: "advanced", category: "frontend" },
    { name: "JavaScript", level: "advanced", category: "programming" },
    { name: "Node.js", level: "intermediate", category: "backend" },
    { name: "Python", level: "intermediate", category: "programming" },
    { name: "AWS", level: "beginner", category: "cloud" },
    { name: "MongoDB", level: "intermediate", category: "database" }
  ]);

  const [educationData, setEducationData] = useState([
    {
      _id: "e1",
      degree: "Master of Computer Science",
      institution: "Stanford University",
      startYear: "2022",
      endYear: "2024",
      gpa: "3.8",
      description: "Specialized in Machine Learning and Distributed Systems"
    },
    {
      _id: "e2",
      degree: "Bachelor of Technology",
      institution: "Indian Institute of Technology",
      startYear: "2018",
      endYear: "2022",
      gpa: "3.6",
      description: "Computer Science and Engineering"
    }
  ]);

  const enrolledCourses = [
    { 
      _id: "c1", 
      title: "Advanced React Patterns", 
      description: "Master advanced React patterns and performance optimization",
      progress: 85,
      instructor: "John Doe",
      duration: "12 weeks",
      rating: 4.8,
      enrolled: "2024-11-01"
    },
    { 
      _id: "c2", 
      title: "System Design Masterclass", 
      description: "Learn to design scalable distributed systems",
      progress: 60,
      instructor: "Jane Smith",
      duration: "16 weeks",
      rating: 4.9,
      enrolled: "2024-10-15"
    },
    { 
      _id: "c3", 
      title: "Cloud Architecture with AWS", 
      description: "Complete guide to building cloud-native applications",
      progress: 30,
      instructor: "Mike Johnson",
      duration: "10 weeks",
      rating: 4.7,
      enrolled: "2024-12-01"
    }
  ];

  const enrolledTests = [
    { 
      _id: "t1", 
      title: "JavaScript Advanced Concepts", 
      status: "Passed", 
      score: 92,
      maxScore: 100,
      completedDate: "2024-11-15",
      timeSpent: "45 min"
    },
    { 
      _id: "t2", 
      title: "React Certification Test", 
      status: "Pending",
      scheduledDate: "2024-12-20",
      duration: "60 min"
    },
    { 
      _id: "t3", 
      title: "System Design Assessment", 
      status: "Failed", 
      score: 65,
      maxScore: 100,
      completedDate: "2024-10-28",
      timeSpent: "90 min"
    }
  ];

  const certificates = [
    {
      _id: "cert1",
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024-11-01",
      expiryDate: "2027-11-01",
      credentialId: "AWS-SA-123456",
      url: "https://aws.amazon.com/verification",
      verified: true
    },
    {
      _id: "cert2",
      title: "React Professional Developer",
      issuer: "Meta",
      date: "2024-09-15",
      credentialId: "META-REACT-789",
      url: "https://developers.facebook.com/certification",
      verified: true
    }
  ];

  const appliedJobs = [
    {
      _id: "j1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      status: "Interview Scheduled",
      appliedDate: "2024-11-20",
      salary: "$120k - $150k",
      location: "Remote",
      type: "Full-time"
    },
    {
      _id: "j2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      status: "Under Review",
      appliedDate: "2024-11-18",
      salary: "$100k - $130k",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      _id: "j3",
      title: "React Developer",
      company: "Design Studio",
      status: "Rejected",
      appliedDate: "2024-10-25",
      salary: "$90k - $110k",
      location: "New York, NY",
      type: "Contract"
    }
  ];

  // Animation classes
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter functions
  const filteredCourses = enrolledCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = appliedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status.toLowerCase().replace(/\s+/g, '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handlers
  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const saveProfile = () => {
    setEditProfile(false);
  };

  const handleEducationChange = (e, id) => {
    const updated = educationData.map((edu) =>
      edu._id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEducationData(updated);
  };

  const saveEducation = (id) => {
    setEditEducationId(null);
  };

  const addNewEducation = () => {
    const newId = `e${educationData.length + 1}`;
    setEducationData([...educationData, {
      _id: newId,
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      gpa: "",
      description: ""
    }]);
    setEditEducationId(newId);
    setShowAddEducation(false);
  };

  const deleteEducation = (id) => {
    setEducationData(educationData.filter(edu => edu._id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, {
        name: newSkill,
        level: skillLevel,
        category: "other"
      }]);
      setNewSkill("");
      setShowAddSkill(false);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'passed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'under review': return 'text-blue-600 bg-blue-50';
      case 'interview scheduled': return 'text-purple-600 bg-purple-50';
      case 'shortlisted': return 'text-indigo-600 bg-indigo-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSkillLevelWidth = (level) => {
    switch (level) {
      case 'beginner': return '33%';
      case 'intermediate': return '66%';
      case 'advanced': return '100%';
      default: return '33%';
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-red-400';
      case 'intermediate': return 'bg-yellow-400';
      case 'advanced': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  // Stats calculation
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const passedTests = enrolledTests.filter(t => t.status === 'Passed').length;
  const avgProgress = Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length);

  return (
    <div className={`min-h-screen  transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Enhanced Profile Header */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="h-32 "></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              <div className="relative mb-16">
                <img
                  src={profileData.avatar || "/default-avatar.png"}
                  alt="User avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <Upload className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                {editProfile ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="role"
                        value={profileData.role}
                        onChange={handleProfileChange}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditProfile(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
                    <p className="text-xl text-blue-600 font-semibold mb-3">{profileData.role}</p>
                    <p className="text-gray-600 mb-4 max-w-2xl">{profileData.bio}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {profileData.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {profileData.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {profileData.github && (
                        <a href={profileData.github} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {profileData.linkedin && (
                        <a href={profileData.linkedin} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {profileData.website && (
                        <a href={profileData.website} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <Globe className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setEditProfile(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Courses Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tests Passed</p>
                <p className="text-2xl font-bold text-blue-600">{passedTests}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Certificates</p>
                <p className="text-2xl font-bold text-purple-600">{certificates.length}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-600">{avgProgress}%</p>
              </div>
              <Star className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { key: "dashboard", label: "Dashboard", icon: User },
              { key: "courses", label: "Courses", icon: BookOpen },
              { key: "tests", label: "Tests", icon: FileText },
              { key: "certificates", label: "Certificates", icon: Award },
              { key: "education", label: "Education", icon: Building },
              { key: "skills", label: "Skills", icon: Star },
              { key: "jobs", label: "Job Applications", icon: Briefcase }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === key
                    ? "border-b-3 border-blue-600 text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
                
                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Completed JavaScript Test</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Started AWS Course</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <Award className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Earned React Certificate</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Skills Overview</h4>
                    <div className="space-y-3">
                      {skills.slice(0, 6).map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-full rounded-full ${getSkillLevelColor(skill.level)}`}
                                style={{ width: getSkillLevelWidth(skill.level) }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 capitalize">{skill.level}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">My Courses</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <div key={course._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg text-gray-800">{course.title}</h4>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {course.duration}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            {course.instructor}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-yellow-600">
                            <Star className="w-4 h-4 fill-current" />
                            {course.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tests Tab */}
            {activeTab === "tests" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Test Results</h3>
                <div className="space-y-4">
                  {enrolledTests.map((test) => (
                    <div key={test._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-800 mb-2">{test.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            {test.completedDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {test.completedDate}
                              </span>
                            )}
                            {test.timeSpent && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {test.timeSpent}
                              </span>
                            )}
                          </div>
                          {test.score && (
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Score</span>
                                <span className="font-medium">{test.score}/{test.maxScore}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    test.score >= 80 ? 'bg-green-500' : 
                                    test.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${(test.score / test.maxScore) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">My Certificates</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <div key={cert._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-yellow-500" />
                          <h4 className="font-semibold text-lg text-gray-800">{cert.title}</h4>
                        </div>
                        {cert.verified && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{cert.issuer}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Issued: {cert.date}
                        </div>
                        {cert.expiryDate && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Expires: {cert.expiryDate}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          ID: {cert.credentialId}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </a>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Education</h3>
                  <button
                    onClick={() => setShowAddEducation(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Education
                  </button>
                </div>

                {showAddEducation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 mb-3">Click "Add Education" to create a new entry that you can edit.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={addNewEducation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Entry
                      </button>
                      <button
                        onClick={() => setShowAddEducation(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {educationData.map((edu) => (
                    <div key={edu._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      {editEducationId === edu._id ? (
                        <div className="space-y-4">
                          <input
                            name="degree"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(e, edu._id)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            name="institution"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(e, edu._id)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              name="startYear"
                              placeholder="Start Year"
                              value={edu.startYear}
                              onChange={(e) => handleEducationChange(e, edu._id)}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              name="endYear"
                              placeholder="End Year"
                              value={edu.endYear}
                              onChange={(e) => handleEducationChange(e, edu._id)}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              name="gpa"
                              placeholder="GPA"
                              value={edu.gpa}
                              onChange={(e) => handleEducationChange(e, edu._id)}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <textarea
                            name="description"
                            placeholder="Description"
                            value={edu.description}
                            onChange={(e) => handleEducationChange(e, edu._id)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="3"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEducation(edu._id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={() => setEditEducationId(null)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Building className="w-6 h-6 text-blue-600" />
                              <div>
                                <h4 className="font-semibold text-lg text-gray-800">{edu.degree}</h4>
                                <p className="text-gray-600">{edu.institution}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditEducationId(edu._id)}
                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteEducation(edu._id)}
                                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {edu.startYear} - {edu.endYear || "Present"}
                            </span>
                            {edu.gpa && (
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                GPA: {edu.gpa}
                              </span>
                            )}
                          </div>
                          
                          {edu.description && (
                            <p className="text-gray-600">{edu.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Skills</h3>
                  <button
                    onClick={() => setShowAddSkill(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>

                {showAddSkill && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Skill
                      </button>
                      <button
                        onClick={() => {
                          setShowAddSkill(false);
                          setNewSkill("");
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 capitalize">{skill.level}</span>
                          <span className="text-gray-500 capitalize">{skill.category}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${getSkillLevelColor(skill.level)}`}
                            style={{ width: getSkillLevelWidth(skill.level) }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === "jobs" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <h3 className="text-xl font-semibold">Job Applications</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="under-review">Under Review</option>
                      <option value="interview-scheduled">Interview Scheduled</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-lg text-gray-800">{job.title}</h4>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Applied: {job.appliedDate}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <span className="font-semibold text-green-600">{job.salary}</span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;