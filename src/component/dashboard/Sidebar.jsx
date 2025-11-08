import { 
  HomeIcon, 
  BookOpenIcon, 
  FileTextIcon, 
  AwardIcon, 
  UsersIcon, 
  BarChart3Icon, 
  SettingsIcon, 
  LogOutIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  MenuIcon,
  XIcon,
  Rocket,
  MessageSquareIcon,
  UserPlusIcon,
  CalendarIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  TrophyIcon,
  BookIcon, // Added for My Courses
  ClipboardCheckIcon, // Added for My Tests
  BriefcaseIcon, // Added for My Job Applications
  FolderIcon, // Added for My Documents
  ClipboardIcon, // Added for My Notes
  UserIcon, // Added for Profile
  UsersRoundIcon, // Added for All Communities
  GraduationCap, // Added for College
  Building, // Added for Company
  ClipboardList, // Added for Exam Prep
  Sparkles, // Added for Skills
  LibrarySquareIcon, // Added for Library
  MessageSquareTextIcon // Added for AI Chat
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mainContext } from '../../context/MainContext';
import { useContext } from 'react';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useContext(mainContext);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: HomeIcon, 
      path: '/student',
      hasSubmenu: false 
    },
    { 
      id: 'learn', 
      name: 'Learn', 
      icon: BookOpenIcon, 
      path: '/student/learn',
      hasSubmenu: false 
    },
    { 
      id: 'tests', 
      name: 'Tests', 
      icon: FileTextIcon, 
      path: '/student/tests',
      hasSubmenu: false 
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      icon: AwardIcon, 
      path: '/student/jobs',
      hasSubmenu: false 
    },
    
    { 
      id: 'library', 
      name: 'Library', 
      icon: LibrarySquareIcon, 
      path: '/student/library',
      hasSubmenu: false 
    },
    { 
      id: 'ai-chat', 
      name: 'AI Chat', 
      icon: MessageSquareTextIcon, 
      path: '/student/ai-chat',
      hasSubmenu: false 
    },
    { 
      id: 'community', 
      name: 'Community', 
      icon: UsersIcon, 
      path: null,
      hasSubmenu: true,
      submenu: [
        { id: 'community-all', name: 'All Communities', path: '/student/community/all', icon: UsersRoundIcon },
        { id: 'community-college', name: 'College', path: '/student/community/college', icon: GraduationCap },
        { id: 'community-company', name: 'Company', path: '/student/community/company', icon: Building },
        { id: 'community-examprep', name: 'Exam Prep', path: '/student/community/examprep', icon: ClipboardList },
        { id: 'community-skills', name: 'Skills', path: '/student/community/skills', icon: Sparkles }
      ]
    },
    { 
      id: 'progress', 
      name: 'My Progress', 
      icon: BarChart3Icon, 
      path: null,
      hasSubmenu: true,
      submenu: [
        { id: 'progress-mycourses', name: 'My Courses', path: '/student/progress/mycourses', icon: BookIcon },
        { id: 'progress-mytests', name: 'My Tests', path: '/student/progress/mytests', icon: ClipboardCheckIcon },
        { id: 'progress-myjobapplications', name: 'My Job Applications', path: '/student/progress/myjobapplications', icon: BriefcaseIcon },
        { id: 'progress-mydocuments', name: 'My Documents', path: '/student/progress/mydocuments', icon: FolderIcon },
        { id: 'progress-mynotes', name: 'My Notes', path: '/student/progress/mynotes', icon: ClipboardIcon },
        { id: 'progress-profile', name: 'Profile', path: '/student/profile', icon: UserIcon }
      ]
    },
  ];

  const bottomMenuItems = [
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: SettingsIcon, 
      path: '/student/settings',
      hasSubmenu: false 
    },
    { 
      id: 'logout', 
      name: 'Logout', 
      icon: LogOutIcon, 
      path: null,
      hasSubmenu: false,
      isLogout: true
    }
  ];

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update active item based on current path
  useEffect(() => {
    const path = location.pathname;
    
    // Check all menu items and their submenus
    const allItems = [...menuItems, ...bottomMenuItems];
    
    for (const item of allItems) {
      if (item.path === path) {
        setActiveItem(item.id);
        return;
      }
      
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (subItem.path === path) {
            setActiveItem(subItem.id);
            setExpandedMenus({ [item.id]: true });
            return;
          }
        }
      }
    }
  }, [location.pathname]);

  const toggleSubmenu = (itemId) => {
    setExpandedMenus(prev => {
      // If clicking the same item, toggle it
      if (prev[itemId]) {
        return { [itemId]: false };
      }
      // Otherwise, close all others and open this one
      return { [itemId]: true };
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Close all submenus when collapsing
    if (!isCollapsed) {
      setExpandedMenus({});
    }
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuClick = (item) => {
    if (item.isLogout) {
      signOut();
      navigate('/login');
      return;
    }

    if (item.hasSubmenu && !isCollapsed) {
      toggleSubmenu(item.id);
    } else if (!item.hasSubmenu) {
      setActiveItem(item.id);
      navigate(item.path);
      // Close mobile sidebar after navigation
      if (isMobile) {
        setIsMobileOpen(false);
      }
    }
  };

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
          className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-r-full shadow-lg md:hidden hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          {isMobileOpen ? (
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      {/* Sidebar */}
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
          
          {/* Collapse Toggle Button - Hidden on Mobile */}
          {!isMobile && (
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
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isMainActive = activeItem === item.id;
              const isSubmenuActive = item.hasSubmenu && item.submenu.some(subItem => activeItem === subItem.id);
              const isExpanded = expandedMenus[item.id];
              
              return (
                <div key={item.id}>
                  {/* Main Menu Item */}
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-3 rounded-lg text-left transition-colors duration-200 ${isCollapsed ? '' : 'transform transition-transform'} ${isMainActive || isSubmenuActive ? 'bg-gray-100 text-gray-900 shadow-sm -translate-y-0.5' : 'text-gray-700 hover:bg-gray-100'}`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                      <Icon className={`w-5 h-5 ${isMainActive || isSubmenuActive ? 'text-black' : 'text-gray-600'}`} />
                      {!isCollapsed && <span className="font-medium">{item.name}</span>}
                    </div>
                    {item.hasSubmenu && !isCollapsed && (
                      <ChevronRightIcon 
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        } ${isMainActive || isSubmenuActive ? 'text-black' : 'text-gray-400'}`} 
                      />
                    )}
                  </button>

                  {/* Submenu - Show when expanded and not collapsed */}
                  {item.hasSubmenu && !isCollapsed && (
                    <div
                      className={`ml-8 mt-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isExpanded ? 'space-y-1 rounded-md bg-gray-50' : ''}`}
                      style={{ maxHeight: isExpanded ? `${(item.submenu?.length || 0) * 44}px` : '0px' }}
                    >
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeItem === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setActiveItem(subItem.id);
                              navigate(subItem.path);
                              if (isMobile) setIsMobileOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                              isSubActive
                                ? 'bg-gray-100 text-gray-900 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <SubIcon className={`w-4 h-4 ${isSubActive ? 'text-gray-900' : 'text-gray-600'}`} />
                            <span className={isSubActive ? 'font-medium' : ''}>{subItem.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section - Settings and Logout */}
        <div className="px-2 py-4 border-t border-gray-200 flex-shrink-0">
          <div className="space-y-1">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg text-left transition-colors duration-200 ${
                    item.isLogout 
                      ? 'text-red-600 hover:bg-red-50' 
                      : isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`w-5 h-5 ${
                    item.isLogout 
                      ? 'text-red-600' 
                      : isActive ? 'text-white' : 'text-gray-600'
                  }`} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;