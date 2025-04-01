import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const EmployerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);
  
  // Close menu when resizing to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group transition duration-300">
          <svg className="h-8 w-8 text-white group-hover:text-blue-200 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold tracking-wide text-white group-hover:text-blue-200 transition-colors duration-300">GenAi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* <Link to="/post-job" className="text-white hover:text-blue-200 font-medium transition-colors duration-300 py-2">Post a Job</Link> */}
          <Link to="/applications" className="text-white hover:text-blue-200 font-medium transition-colors duration-300 py-2">Applications</Link>
          <Link to="/schedule-interview" className="text-white hover:text-blue-200 font-medium transition-colors duration-300 py-2">Schedule Interview</Link>
          
          {/* Action Button */}
          <Link to="/employer/post-job" className="bg-white text-blue-700 hover:bg-blue-100 font-semibold px-4 py-2 rounded-md transition-colors duration-300 shadow-sm">
            + New Job
          </Link>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="h-10 w-10 rounded-full bg-blue-600 border-2 border-white overflow-hidden shadow-md hover:border-blue-200 transition-colors duration-300">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <svg className={`h-5 w-5 text-blue-200 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-md shadow-xl border border-gray-200 py-1 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-xs text-gray-500 truncate">jane.smith@company.com</p>
                </div>
                <Link 
                  to="/employer/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <div className="border-t border-gray-100 mt-1"></div>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => alert('Logged out')}
                >
                  <svg className="mr-3 h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none p-2 hover:bg-blue-800 rounded-md transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-800 to-blue-900 shadow-inner">
          <nav className="container mx-auto px-6 py-3 flex flex-col divide-y divide-blue-700/50">
            {/* <Link to="/post-job" className="py-3 flex items-center text-white hover:text-blue-200 transition-colors">
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Post a Job
            </Link> */}
            <Link to="/applications" className="py-3 flex items-center text-white hover:text-blue-200 transition-colors">
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Applications
            </Link>
            <Link to="/schedule-interview" className="py-3 flex items-center text-white hover:text-blue-200 transition-colors">
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Interview
            </Link>
            <div className="pt-1 pb-3">
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="py-2 flex items-center text-white hover:text-blue-200 transition-colors">
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <Link to="/settings" className="py-2 flex items-center text-white hover:text-blue-200 transition-colors">
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <button
                  className="w-full py-2 flex items-center text-red-300 hover:text-red-200 transition-colors"
                  onClick={() => alert('Logged out')}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
              <div className="mt-4">
                <Link to="/post-job" className="w-full flex items-center justify-center px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 shadow-sm font-medium transition-colors">
                  + New Job
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default EmployerNavbar;