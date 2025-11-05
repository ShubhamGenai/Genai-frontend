import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ChevronRight, ChevronDown, Check, Folder, FolderOpen, Book, MapPin, Calendar, DollarSign, Building2, TrendingUp, Briefcase, Share, Loader,  } from 'lucide-react';

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

      // Comprehensive mock jobs data
      const mockAllJobs = [
        {
          id: 1,
          title: "UI/UX Designer",
          company: "Company name private limited",
          location: "Gurgaon, Haryana",
          experience: "1-2 years",
          salary: { min: 500000, max: 800000 },
          postedTime: "1 day ago",
          isPremium: true,
          matchPercentage: 75,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "Hybrid",
          applicants: 127,
          positions: 5,
          deadline: "Feb 15, 2025",
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
          similarJobs: []
        },
        {
          id: 2,
          title: "Senior UI/UX Designer",
          company: "TechCorp Solutions Pvt Ltd",
          location: "Bangalore, Karnataka",
          experience: "3-5 years",
          salary: { min: 800000, max: 1200000 },
          postedTime: "2 days ago",
          isPremium: false,
          matchPercentage: 92,
          matchLevel: "Excellent Match",
          logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "Remote",
          applicants: 85,
          positions: 2,
          deadline: "Feb 20, 2025",
          aboutRole: "We are looking for a highly skilled Senior UI/UX Designer to lead our design initiatives. You will be responsible for defining and driving the user experience for our flagship products, mentoring junior designers, and collaborating closely with cross-functional teams. A strong background in complex system design and a proven track record of delivering successful products are essential.",
          keyResponsibilities: [
            "Lead the end-to-end design process for key products",
            "Develop and maintain design systems and guidelines",
            "Mentor and guide junior UI/UX designers",
            "Collaborate with product management and engineering to translate requirements into intuitive designs",
            "Conduct advanced user research and competitive analysis",
            "Champion user-centered design principles throughout the organization"
          ],
          requirementsQualifications: [
            "5+ years of experience in UI/UX design, with at least 2 years in a senior or lead role",
            "Expertise in Figma, Sketch, Adobe XD, or similar tools",
            "Extensive experience with design systems, user research methodologies, and prototyping",
            "Strong understanding of front-end development technologies (HTML, CSS, JavaScript)",
            "Excellent leadership, communication, and presentation skills",
            "Bachelor's or Master's degree in Design, HCI, or a related field"
          ],
          requiredSkills: ["Design Leadership", "Design Systems", "User Research", "Figma", "Sketch", "Prototyping", "Information Architecture"],
          companyInfo: "TechCorp Solutions Pvt Ltd is a fast-growing technology company focusing on enterprise solutions. We offer a challenging and rewarding work environment with opportunities for professional growth and innovation.",
          similarJobs: []
        },
        {
          id: 3,
          title: "Product Designer",
          company: "StartupXYZ Technologies",
          location: "Mumbai, Maharashtra",
          experience: "2-4 years",
          salary: { min: 600000, max: 1000000 },
          postedTime: "3 days ago",
          isPremium: true,
          matchPercentage: 68,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "On-site",
          applicants: 95,
          positions: 3,
          deadline: "Mar 1, 2025",
          aboutRole: "Join our innovative startup as a Product Designer. You will be instrumental in shaping the user experience of our cutting-edge products, working closely with a passionate team to bring new ideas to life. We value creativity, problem-solving, and a strong user-centric approach.",
          keyResponsibilities: [
            "Translate product requirements into intuitive and engaging design solutions",
            "Create user flows, wireframes, and prototypes for web and mobile applications",
            "Conduct user testing and gather feedback to refine designs",
            "Collaborate with engineers and product managers throughout the product development lifecycle",
            "Contribute to the overall product strategy and vision"
          ],
          requirementsQualifications: [
            "2-4 years of experience in product design or similar role",
            "Proficiency in design tools like Figma, Sketch, or Adobe XD",
            "Experience with user research, usability testing, and iterative design processes",
            "Strong understanding of UI/UX principles and best practices",
            "Ability to work in a fast-paced startup environment",
            "Bachelor's degree in Design, Computer Science, or a related field"
          ],
          requiredSkills: ["Figma", "Product Design", "User Flows", "Wireframing", "Prototyping", "User Testing"],
          companyInfo: "StartupXYZ Technologies is a rapidly growing tech startup focused on revolutionizing the industry with innovative solutions. We foster a collaborative and dynamic environment where every team member contributes to our success.",
          similarJobs: []
        },
        {
          id: 4,
          title: "UX Researcher",
          company: "Design Studios India",
          location: "Pune, Maharashtra",
          experience: "1-3 years",
          salary: { min: 450000, max: 700000 },
          postedTime: "4 days ago",
          isPremium: false,
          matchPercentage: 85,
          matchLevel: "Great Match",
          logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "Hybrid",
          applicants: 70,
          positions: 1,
          deadline: "Feb 28, 2025",
          aboutRole: "We are seeking a dedicated UX Researcher to join our team and help us gain deep insights into user behaviors and needs. You will plan and execute various research activities, analyze data, and translate findings into actionable design recommendations. If you have a passion for understanding users and improving product experiences, we want to hear from you.",
          keyResponsibilities: [
            "Plan and conduct qualitative and quantitative user research studies (e.g., interviews, surveys, usability tests)",
            "Analyze research data and synthesize findings into clear, actionable insights",
            "Communicate research results to design, product, and engineering teams",
            "Create user personas, journey maps, and other research artifacts",
            "Collaborate with designers to integrate research findings into the design process"
          ],
          requirementsQualifications: [
            "1-3 years of experience in UX research or a related field",
            "Proficiency in various research methodologies and tools",
            "Strong analytical and critical thinking skills",
            "Excellent written and verbal communication abilities",
            "Ability to work independently and as part of a collaborative team",
            "Bachelor's or Master's degree in HCI, Psychology, Cognitive Science, or a related field"
          ],
          requiredSkills: ["User Research", "Usability Testing", "Interviews", "Surveys", "Data Analysis", "User Personas"],
          companyInfo: "Design Studios India is a boutique design agency specializing in creating impactful digital experiences. We pride ourselves on our user-centered approach and creative solutions.",
          similarJobs: []
        },
        {
          id: 5,
          title: "Junior UX Designer",
          company: "Creative Agency Solutions",
          location: "Delhi, NCR",
          experience: "0-1 years",
          salary: { min: 300000, max: 500000 },
          postedTime: "5 days ago",
          isPremium: false,
          matchPercentage: 58,
          matchLevel: "Fair Match",
          logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "On-site",
          applicants: 150,
          positions: 10,
          deadline: "Feb 10, 2025",
          aboutRole: "Kickstart your career in UX design with Creative Agency Solutions! We're looking for enthusiastic and talented Junior UX Designers to join our growing team. You'll work on exciting projects, learn from experienced professionals, and contribute to creating intuitive digital experiences.",
          keyResponsibilities: [
            "Assist in creating wireframes, mockups, and prototypes",
            "Support user research activities and data analysis",
            "Collaborate with senior designers and developers",
            "Contribute to design documentation and presentations",
            "Learn and apply user-centered design principles"
          ],
          requirementsQualifications: [
            "0-1 years of experience in UX design or a strong portfolio demonstrating design skills",
            "Proficiency in design tools like Figma, Adobe XD, or Sketch",
            "Basic understanding of UI/UX principles",
            "Eagerness to learn and grow in a fast-paced environment",
            "Excellent communication and teamwork skills",
            "Bachelor's degree in Design, Multimedia, or a related field (preferred)"
          ],
          requiredSkills: ["Figma", "Adobe XD", "Prototyping", "Wireframing", "Visual Design Basics"],
          companyInfo: "Creative Agency Solutions is a dynamic and award-winning agency known for delivering innovative digital solutions. We believe in nurturing talent and providing opportunities for continuous learning and development.",
          similarJobs: []
        },
        {
          id: 6,
          title: "Lead Product Designer",
          company: "InnovateTech Private Limited",
          location: "Hyderabad, Telangana",
          experience: "5-8 years",
          salary: { min: 1200000, max: 1800000 },
          postedTime: "1 week ago",
          isPremium: true,
          matchPercentage: 95,
          matchLevel: "Perfect Match",
          logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "On-site",
          applicants: 40,
          positions: 1,
          deadline: "Mar 10, 2025",
          aboutRole: "As a Lead Product Designer, you will be responsible for defining the product vision, strategy, and user experience for key product areas. You will lead a team of designers, provide mentorship, and collaborate with product, engineering, and business stakeholders to deliver innovative and impactful solutions. This role requires strong leadership, strategic thinking, and hands-on design expertise.",
          keyResponsibilities: [
            "Define and drive the product design strategy and vision",
            "Lead and mentor a team of product designers",
            "Oversee the end-to-end design process, from research to implementation",
            "Collaborate with cross-functional teams to ensure alignment and successful product delivery",
            "Advocate for users and ensure design decisions are data-driven and user-centered",
            "Present design concepts and strategies to senior leadership"
          ],
          requirementsQualifications: [
            "5-8 years of experience in product design, with significant experience in a leadership role",
            "Proven ability to lead and inspire design teams",
            "Expertise in design tools, design systems, and advanced prototyping techniques",
            "Strong understanding of business strategy and product development lifecycle",
            "Exceptional communication, presentation, and interpersonal skills",
            "Bachelor's or Master's degree in Design, HCI, or a related field"
          ],
          requiredSkills: ["Design Leadership", "Product Strategy", "Design Systems", "Figma", "User Research", "Stakeholder Management"],
          companyInfo: "InnovateTech Private Limited is a leading technology firm known for its groundbreaking products and vibrant work culture. We empower our employees to innovate and make a real difference in the world.",
          similarJobs: []
        },
        {
          id: 7,
          title: "UX/UI Designer - Fintech",
          company: "FinanceFlow Technologies",
          location: "Chennai, Tamil Nadu",
          experience: "2-4 years",
          salary: { min: 700000, max: 1100000 },
          postedTime: "1 week ago",
          isPremium: false,
          matchPercentage: 78,
          matchLevel: "Good Match",
          logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "Hybrid",
          applicants: 60,
          positions: 2,
          deadline: "Mar 5, 2025",
          aboutRole: "We are seeking a talented UX/UI Designer with a passion for Fintech to join our team. You will be responsible for designing intuitive and engaging experiences for our financial products, ensuring a seamless user journey across web and mobile platforms. Experience in the Fintech domain is highly valued.",
          keyResponsibilities: [
            "Design user interfaces and experiences for Fintech web and mobile applications",
            "Conduct user research specific to financial services and user behavior",
            "Create wireframes, prototypes, and high-fidelity designs",
            "Collaborate with product owners and engineers to implement design solutions",
            "Ensure designs comply with accessibility and regulatory standards"
          ],
          requirementsQualifications: [
            "2-4 years of experience in UI/UX design, preferably in Fintech",
            "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
            "Strong portfolio demonstrating Fintech design projects",
            "Understanding of financial concepts and user behavior in Fintech",
            "Excellent communication and collaboration skills",
            "Bachelor's degree in Design, Computer Science, or a related field"
          ],
          requiredSkills: ["Fintech Design", "Mobile UI", "Web Design", "Figma", "User Research", "Prototyping"],
          companyInfo: "FinanceFlow Technologies is a leading Fintech company dedicated to providing innovative financial solutions. We are a fast-paced and challenging environment where technology meets finance to create exceptional user experiences.",
          similarJobs: []
        },
        {
          id: 8,
          title: "Visual Designer",
          company: "BrandCraft Design Studio",
          location: "Kolkata, West Bengal",
          experience: "1-3 years",
          salary: { min: 400000, max: 650000 },
          postedTime: "1 week ago",
          isPremium: false,
          matchPercentage: 62,
          matchLevel: "Fair Match",
          logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop&crop=center",
          category: "ui-ux-designer",
          jobType: "Full-time",
          workMode: "On-site",
          applicants: 110,
          positions: 4,
          deadline: "Feb 25, 2025",
          aboutRole: "BrandCraft Design Studio is looking for a creative Visual Designer to join our team. You will be responsible for developing compelling visual concepts, graphics, and layouts for various digital and print media. If you have a keen eye for aesthetics, a strong portfolio, and a passion for branding, we encourage you to apply.",
          keyResponsibilities: [
            "Develop visual concepts, graphics, and layouts for marketing materials, websites, and social media",
            "Ensure brand consistency across all design touchpoints",
            "Collaborate with marketing and content teams to create engaging visuals",
            "Stay updated with industry trends and design tools",
            "Present design ideas and concepts to clients and stakeholders"
          ],
          requirementsQualifications: [
            "1-3 years of experience in visual design, graphic design, or a similar role",
            "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
            "Strong portfolio demonstrating visual design skills and creativity",
            "Understanding of typography, color theory, and layout principles",
            "Excellent attention to detail and ability to work on multiple projects",
            "Bachelor's degree in Graphic Design, Visual Arts, or a related field"
          ],
          requiredSkills: ["Visual Design", "Graphic Design", "Branding", "Adobe Photoshop", "Adobe Illustrator", "Typography"],
          companyInfo: "BrandCraft Design Studio is a creative agency that helps businesses build strong and memorable brands through exceptional design. We are a team of passionate designers dedicated to delivering high-quality visual solutions.",
          similarJobs: []
        }
      ];

      const foundJob = mockAllJobs.find(j => j.id === parseInt(id));

      if (foundJob) {
        setJob(foundJob);
      } else {
        setError('Job not found.');
      }
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
