import React, { useState, useEffect, useContext } from 'react';
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
  LibraryIcon,
  VideoIcon,
  BookMarkedIcon,
  FileIcon,
  ArchiveIcon,
  Home
} from 'lucide-react';
import { mainContext } from '../../context/MainContext';
import Sidebar from '../dashboard/Sidebar';
import { Header } from '../dashboard/Dash_Header';
import { MdOutlineShoppingCartCheckout, MdSavedSearch } from 'react-icons/md';

const AdaptiveLayout = () => {
  const location = useLocation();
  const { user } = useContext(mainContext);
  const [activeItem, setActiveItem] = useState("learn");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  const isAuthenticated = Boolean(user?.role);

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
    if (path.startsWith("/learn") || path.includes("/course-details") || path.includes("/course-player")) setActiveItem("learn");
    else if (path.startsWith("/tests") || path.includes("/test-details") || path.includes("/test-player")) setActiveItem("tests");
    else if (path.startsWith("/jobs") || path.includes("/job-details")) setActiveItem("jobs");
    else if (path.startsWith("/library")) {
      setActiveItem("library");
      // Check if it's a specific library submenu item
      if (path.includes("/library/all")) setActiveItem("all-library");
      else if (path.includes("/library/courses")) setActiveItem("courses");
      else if (path.includes("/library/books")) setActiveItem("books");
      else if (path.includes("/library/documents")) setActiveItem("documents");
      else if (path.includes("/library/articles")) setActiveItem("articles");
    }
    else if (path.startsWith("/community")) {
      setActiveItem("community");
      // Check if it's a specific community submenu item
      if (path.includes("/community/all")) setActiveItem("all-communities");
      else if (path.includes("/community/college")) setActiveItem("college");
      else if (path.includes("/community/company")) setActiveItem("company");
      else if (path.includes("/community/exam-prep")) setActiveItem("exam-prep");
      else if (path.includes("/community/skills")) setActiveItem("skills");
    }
    else if (path.includes("/leaderboard")) setActiveItem("tests"); // Leaderboard is part of tests section
    else setActiveItem("learn");
  }, [location]);

  // Auto-expand only the relevant submenu when the route changes
  useEffect(() => {
    const path = location.pathname;
    const nextExpanded = {};
    if (path.startsWith("/library")) nextExpanded.library = true;
    else if (path.startsWith("/community")) nextExpanded.community = true;
    setExpandedItems(nextExpanded);
  }, [location]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    const next = !isMobileOpen;
    setIsMobileOpen(next);
    // Ensure full menu (not collapsed) when opening on mobile so submenu icons are visible
    if (next) setIsCollapsed(false);
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => {
      const willExpand = !prev[itemId];
      // Only one submenu open at a time
      if (willExpand) return { [itemId]: true };
      return {};
    });
  };

  // Menu items for guest users
  const guestMenuItems = [
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
      path: "/library",
      hasSubmenu: false,
      submenu: [
        {
          id: "all-library",
          name: "All Resources",
          icon: ArchiveIcon,
          path: "/library/all"
        },
        {
          id: "courses",
          name: "Courses",
          icon: VideoIcon,
          path: "/library/courses"
        },
        {
          id: "books",
          name: "Books",
          icon: BookMarkedIcon,
          path: "/library/books"
        },
        {
          id: "documents",
          name: "Documents",
          icon: FileIcon,
          path: "/library/documents"
        },
        {
          id: "articles",
          name: "Articles",
          icon: FileTextIcon,
          path: "/library/articles"
        }
      ]
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

  // Guest Header Component
  const GuestHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Search Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Home className="text-white w-5 h-5" />
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses, jobs..."
                className="w-full px-4 py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <MdSavedSearch className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Cart and Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <MdOutlineShoppingCartCheckout className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          
          {/* Auth Buttons */}
          {/* <Link 
            to="/login" 
            className="px-3 py-1.5 text-gray-500 rounded-lg font-medium hover:bg-blue-50 hover:text-gray-800 text-md transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/login-landing" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-md transition-colors"
          >
            Sign Up
          </Link> */}
        </div>
      </div>
    </header>
  );

  // Guest Sidebar Component
  const GuestSidebar = () => (
    <div className={`
      ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
      ${isCollapsed ? 'w-16' : 'w-64'}
      bg-white shadow-lg h-full border-r border-gray-200 flex flex-col transition-all duration-300
      ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
    `}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isCollapsed ? (
          <div className="flex items-center justify-center w-full">
            <h1 className="text-xs font-bold tracking-tight">
              Gen{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">AI</span>
            </h1>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
              Gen{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
                AI
              </span>
            </h1>
          </div>
        )}
        
        {/* Collapse Toggle Button */}
        <button
          onClick={toggleCollapse}
          className={`p-1 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? '' : 'transform transition-transform'} ${isCollapsed ? '' : ''}`}
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
          {guestMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isExpanded = expandedItems[item.id];
            
            if (item.hasSubmenu) {
              return (
                <div key={item.id}>
                  {/* Main menu item with expand/collapse */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className={`w-full flex items-center ${(isCollapsed && !isMobile) ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 transform transition-transform ${
                      isActive || isExpanded
                        ? 'bg-gray-100 text-gray-900 shadow-sm -translate-y-0.5'
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
                  
                  {/* Submenu items: icon-only when collapsed on desktop, full on mobile/expanded */}
                  {isCollapsed && !isMobile ? (
                    isExpanded && (
                      <div className="mt-1 space-y-2">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = activeItem === subItem.id;
                          return (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              className={`flex justify-center items-center py-2 rounded-lg transition-colors duration-200 ${
                                isSubActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                              title={subItem.name}
                            >
                              <SubIcon className="w-4 h-4" />
                            </Link>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    // Not collapsed (or on mobile): show full submenu with labels and animation
                    <div
                      className={`ml-4 mt-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isExpanded ? 'space-y-1 rounded-md bg-gray-50' : ''}`}
                      style={{ maxHeight: isExpanded && item.submenu ? `${(item.submenu.length || 0) * 44}px` : '0px' }}
                    >
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

      {/* Bottom Section - Auth Buttons (hidden when collapsed) */}
      {!isCollapsed && (
        <div className="px-2 py-4 border-t border-gray-200 flex-shrink-0">
          <div className="space-y-2">
            <Link
              to="/login"
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 text-gray-700 hover:bg-gray-100`}
              onClick={() => {
                if (isMobile) setIsMobileOpen(false);
              }}
            >
              <span className="text-sm font-medium">Sign In</span>
            </Link>
            
            <Link
              to="/login-landing"
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700`}
              onClick={() => {
                if (isMobile) setIsMobileOpen(false);
              }}
            >
              <span className="text-sm font-medium">Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay with Blur */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-transparent backdrop-blur-md z-40 md:hidden"
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
        {/* Sidebar - Different for authenticated vs guest users */}
        {isAuthenticated ? (
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        ) : (
          <GuestSidebar />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
          {/* Header - Different for authenticated vs guest users */}
          {isAuthenticated ? (
            <Header />
          ) : (
            <GuestHeader />
          )}
          
          {/* Outlet renders the child routes */}
          <main className="flex-1 overflow-y-auto ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdaptiveLayout;
