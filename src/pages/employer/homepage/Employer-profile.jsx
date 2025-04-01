import React, { useState } from 'react';

const EmployerProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  // Sample employer data - this would typically come from an API or props
  const employer = {
    name: "Genai",
    logo: "/api/placeholder/120/120",
    coverImage: "/api/placeholder/800/200",
    tagline: "Building the future, one innovation at a time",
    founded: "1985",
    size: "1,000-5,000 employees",
    industry: "Technology",
    headquarters: "San Francisco, CA",
    website: "www.acmecorp.example",
    about: "Acme Corporation is a leading technology company specializing in cutting-edge software solutions. With over 35 years of experience, we've helped transform businesses across various industries through innovative technology and exceptional service.",
    mission: "Our mission is to empower organizations through technology that simplifies complex processes and drives meaningful growth.",
    culture: "At Acme, we foster a culture of innovation, collaboration, and continuous learning. We believe in work-life balance and creating an inclusive environment where diverse perspectives thrive.",
    benefits: [
      "Competitive salary and equity packages",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "401(k) matching",
      "Unlimited PTO policy",
      "Regular team building events",
      "Wellness programs"
    ],
    jobOpenings: [
      { id: 1, title: "Senior Software Engineer", department: "Engineering", location: "San Francisco, CA", type: "Full-time" },
      { id: 2, title: "Product Manager", department: "Product", location: "Remote", type: "Full-time" },
      { id: 3, title: "UX Designer", department: "Design", location: "New York, NY", type: "Full-time" },
      { id: 4, title: "Marketing Specialist", department: "Marketing", location: "Chicago, IL", type: "Full-time" },
      { id: 5, title: "Data Analyst Intern", department: "Data Science", location: "Remote", type: "Internship" }
    ],
    testimonials: [
      { id: 1, text: "Working at Acme has been the highlight of my career. The collaborative environment and challenging projects keep me engaged every day.", author: "Jane Smith, Software Engineer", avatar: "/api/placeholder/60/60" },
      { id: 2, text: "I've grown more in my two years at Acme than in my previous decade of work. The mentorship and learning opportunities here are unmatched.", author: "John Doe, Product Manager", avatar: "/api/placeholder/60/60" }
    ],
    socialMedia: [
      { platform: "LinkedIn", url: "#", icon: "LinkedIn" },
      { platform: "Twitter", url: "#", icon: "Twitter" },
      { platform: "Instagram", url: "#", icon: "Instagram" }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image and Logo */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-300 overflow-hidden">
          <img 
            src={employer.coverImage} 
            alt="Company cover" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2 bg-white p-2 rounded-lg shadow-md">
          <img 
            src={employer.logo} 
            alt={`${employer.name} logo`} 
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
      
      {/* Company Header */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{employer.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{employer.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {employer.industry}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {employer.size}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Est. {employer.founded}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 space-y-2">
            <a href="#jobs" className="block w-full md:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">
              View Job Openings
            </a>
            <a href={`https://${employer.website}`} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition">
              Visit Website
            </a>
          </div>
        </div>
        
        {/* Company Info Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('culture')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'culture' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Culture & Benefits
              </button>
              <button 
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Job Openings
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About Us</h2>
                  <p className="text-gray-700 leading-relaxed">{employer.about}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed">{employer.mission}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Headquarters</h3>
                    <p className="text-gray-600">{employer.headquarters}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Founded</h3>
                    <p className="text-gray-600">{employer.founded}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Company Size</h3>
                    <p className="text-gray-600">{employer.size}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'culture' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Culture</h2>
                  <p className="text-gray-700 leading-relaxed">{employer.culture}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Benefits & Perks</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {employer.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'jobs' && (
              <div id="jobs">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Current Openings</h2>
                <div className="mt-4 space-y-4">
                  {employer.jobOpenings.map(job => (
                    <div key={job.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <a href="#" className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Apply Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Employee Testimonials</h2>
                <div className="mt-6 space-y-6">
                  {employer.testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{testimonial.author}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{employer.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{employer.headquarters}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                {employer.socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="text-gray-400 hover:text-gray-500"
                    aria-label={`${employer.name} on ${social.platform}`}
                  >
                    <span className="sr-only">{social.platform}</span>
                    <div className="h-6 w-6 bg-gray-300 rounded-full" aria-hidden="true"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;