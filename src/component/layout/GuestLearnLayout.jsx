import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  FileTextIcon, 
  BriefcaseIcon, 
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  Rocket,
  GraduationCapIcon,
  BuildingIcon,
  AwardIcon,
  LibraryIcon
} from 'lucide-react';
import GuestHeader from './GuestHeader';

const GuestLearnLayout = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("learn");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update active sidebar item based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Determine active item based on the main route
    if (path.startsWith("/learn")) setActiveItem("learn");
    else if (path.startsWith("/tests")) setActiveItem("tests");
    else if (path.startsWith("/test-details")) setActiveItem("tests");
    else if (path.startsWith("/jobs")) setActiveItem("jobs");
    else if (path.startsWith("/library")) setActiveItem("library");
    else if (path.startsWith("/course-details")) setActiveItem("learn"); // Course details is part of learn
    else if (path.startsWith("/job-details")) setActiveItem("jobs"); // Job details is part of jobs
    else if (path.startsWith("/community")) {
      setActiveItem("community");
      // Check if it's a specific community submenu item
      if (path.includes("/community/all")) setActiveItem("all-communities");
      else if (path.includes("/community/college")) setActiveItem("college");
      else if (path.includes("/community/company")) setActiveItem("company");
      else if (path.includes("/community/exam-prep")) setActiveItem("exam-prep");
      else if (path.includes("/community/skills")) setActiveItem("skills");
    }
    else setActiveItem("learn");
  }, [location]);

  // Auto-expand submenu when submenu item is active
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/community")) {
      setExpandedItems(prev => ({ ...prev, community: true }));
    }
  }, [location]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Menu items for guest users
  const menuItems = [
    {
      id: "learn",
      name: "Learn",
      icon: BookOpenIcon,
      path: "/learn"
    },
    {
      id: "tests",
      name: "Tests",
      icon: FileTextIcon,
      path: "/tests"
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: BriefcaseIcon,
      path: "/jobs"
    },
    {
      id: "library",
      name: "Library",
      icon: LibraryIcon,
      path: "/library"
    },
    {
      id: "community",
      name: "Community",
      icon: UsersIcon,
      path: "/community",
      hasSubmenu: true,
      submenu: [
        {
          id: "all-communities",
          name: "All Communities",
          icon: UsersIcon,
          path: "/community/all"
        },
        {
          id: "college",
          name: "College",
          icon: GraduationCapIcon,
          path: "/community/college",
          hasNotification: true
        },
        {
          id: "company",
          name: "Company",
          icon: BuildingIcon,
          path: "/community/company"
        },
        {
          id: "exam-prep",
          name: "Exam Prep",
          icon: FileTextIcon,
          path: "/community/exam-prep"
        },
        {
          id: "skills",
          name: "Skills",
          icon: AwardIcon,
          path: "/community/skills"
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay with Blur */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button - Centered */}
      {isMobile && (
        <button
          onClick={toggleMobile}
          className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50 p-3 bg-white rounded-full shadow-lg border border-gray-200 md:hidden hover:bg-gray-50 transition-colors"
        >
          {isMobileOpen ? (
            <XIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          bg-white shadow-lg h-full border-r border-gray-200 flex flex-col transition-all duration-300
          ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
        `}>
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Gen{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
                    AI
                  </span>
                </h1>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
            
            {/* Collapse Toggle Button */}
            <button
              onClick={toggleCollapse}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const isExpanded = expandedItems[item.id];
                
                if (item.hasSubmenu) {
                  return (
                    <div key={item.id}>
                      {/* Main menu item with expand/collapse */}
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        title={isCollapsed ? item.name : ''}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-600'}`} />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium flex-1">{item.name}</span>
                            {isExpanded ? (
                              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                            )}
                          </>
                        )}
                      </button>
                      
                      {/* Submenu items */}
                      {!isCollapsed && isExpanded && item.submenu && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = activeItem === subItem.id;
                            
                            return (
                              <Link
                                key={subItem.id}
                                to={subItem.path}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                                  isSubActive
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                                onClick={() => {
                                  if (isMobile) setIsMobileOpen(false);
                                }}
                              >
                                <SubIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">{subItem.name}</span>
                                {subItem.hasNotification && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={isCollapsed ? item.name : ''}
                      onClick={() => {
                        if (isMobile) setIsMobileOpen(false);
                      }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-600'}`} />
                      {!isCollapsed && <span className="font-medium">{item.name}</span>}
                    </Link>
                  );
                }
              })}
            </div>
          </nav>

          {/* Bottom Section - Auth Buttons */}
          <div className="px-2 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="space-y-2">
              <Link
                to="/login"
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 text-gray-700 hover:bg-gray-100`}
                title={isCollapsed ? 'Sign In' : ''}
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
              >
                <span className="text-sm font-medium">Sign In</span>
              </Link>
              
              <Link
                to="/login-landing"
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700`}
                title={isCollapsed ? 'Sign Up' : ''}
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
              >
                <span className="text-sm font-medium">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
          {/* Header */}
          <GuestHeader />
          
          {/* Outlet renders the child routes */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default GuestLearnLayout;
