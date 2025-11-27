import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  CollectionIcon, 
  VideoCameraIcon, 
  QuestionMarkCircleIcon,
  ClipboardCheckIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  LibraryIcon,
  AcademicCapIcon,
  ClipboardListIcon,
  MusicNoteIcon,
  PhotographIcon,
  MicrophoneIcon
} from '@heroicons/react/outline';

import { createContext, useContext } from 'react';
import { mainContext } from '../../../context/MainContext';
import { CalendarIcon, ChartBarIcon, CheckCircleIcon, CogIcon, PencilIcon } from 'lucide-react';

export const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSidebar();
  const { user, signOut } = useContext(mainContext);
  const scrollContainerRef = useRef(null);
  
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus(prev => {
      // If clicking on already open menu, close it
      if (prev[menuName]) {
        return { [menuName]: false };
      }
      // Otherwise, close all other menus and open this one
      return { [menuName]: true };
    });
  };

  // Auto-scroll disabled to allow viewing all menus at once
  // useEffect(() => {
  //   const openMenuName = Object.keys(openSubmenus).find(key => openSubmenus[key]);
  //   if (openMenuName && scrollContainerRef.current) {
  //     const menuElement = scrollContainerRef.current.querySelector(`[data-menu="${openMenuName}"]`);
  //     if (menuElement) {
  //       setTimeout(() => {
  //         menuElement.scrollIntoView({
  //           behavior: 'smooth',
  //           block: 'nearest',
  //           inline: 'nearest'
  //         });
  //       }, 150);
  //     }
  //   }
  // }, [openSubmenus]);

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: HomeIcon 
    },
    { 
      name: 'Courses', 
      path: '/content/courses-list', 
      icon: BookOpenIcon,
      submenus: [
        { name: 'All Courses', path: '/content/courses-list', icon: BookOpenIcon },
        { name: 'Create Course', path: '/content/courses/add', icon: PlusIcon },
        { name: 'Categories', path: '/content/courses/categories', icon: CollectionIcon }
      ]
    },
    { 
      name: 'Modules', 
      path: '/content/modules', 
      icon: CollectionIcon,
      submenus: [
        { name: 'All Modules', path: '/content/modules', icon: CollectionIcon },
        { name: 'Create Module', path: '/content/modules/add', icon: PlusIcon },
        { name: 'Templates', path: '/content/modules/templates', icon: DocumentDuplicateIcon }
      ]
    },
    { 
      name: 'Lessons', 
      path: '/content/lessons', 
      icon: VideoCameraIcon,
      submenus: [
        { name: 'All Lessons', path: '/content/lessons', icon: VideoCameraIcon },
        { name: 'Create Lesson', path: '/content/lessons/add', icon: PlusIcon },
        { name: 'Resources', path: '/content/lessons/resources', icon: DocumentDuplicateIcon }
      ]
    },
    { 
      name: 'Quizzes', 
      path: '/content/quizzes', 
      icon: QuestionMarkCircleIcon,
      submenus: [
        { name: 'All Quizzes', path: '/content/quizzes', icon: QuestionMarkCircleIcon },
        { name: 'Create Quiz', path: '/content/quizzes/add', icon: PlusIcon },
        { name: 'Question Bank', path: '/content/quizzes/question-bank', icon: ClipboardListIcon }
      ]
    },
    { 
      name: 'Tests', 
      path: '/content/test-list', 
      icon: ClipboardCheckIcon,
      submenus: [
        { name: 'All Tests', path: '/content/test-list', icon: ClipboardCheckIcon },
        { name: 'Create Test', path: '/content/tests/add', icon: PlusIcon },
        { name: 'Bulk Upload', path: '/content/tests/bulk-upload', icon: DocumentDuplicateIcon },
        { name: 'Analytics', path: '/content/tests/analytics', icon: ChartBarIcon }
      ]
    },
    { 
      name: 'Library', 
      path: '/library', 
      icon: LibraryIcon,
      submenus: [
        { name: 'All Files', path: '/library/resources', icon: LibraryIcon },
        { name: 'Documents', path: '/library/documents', icon: DocumentDuplicateIcon },
        { name: 'Media', path: '/library/videos', icon: VideoCameraIcon },
        { name: 'Audio', path: '/library/audio', icon: MusicNoteIcon },
        { name: 'Images', path: '/library/images', icon: PhotographIcon }
      ]
    },
    { 
      name: 'Classes', 
      path: '/classes', 
      icon: AcademicCapIcon,
      submenus: [
        { name: 'All Classes', path: '/classes/all', icon: AcademicCapIcon },
        { name: 'Create Class', path: '/classes/create', icon: PlusIcon },
        { name: 'Schedule', path: '/classes/schedules', icon: CalendarIcon },
        { name: 'Attendance', path: '/classes/attendance', icon: ClipboardListIcon }
      ]
    },
    { 
      name: 'Exam Types', 
      path: '/exam-types', 
      icon: ClipboardListIcon,
      submenus: [
        { name: 'Multiple Choice', path: '/exam-types/mcq', icon: CheckCircleIcon },
        { name: 'Essay', path: '/exam-types/essay', icon: PencilIcon },
        { name: 'Practical', path: '/exam-types/practical', icon: CogIcon },
        { name: 'Oral', path: '/exam-types/oral', icon: MicrophoneIcon },
        { name: 'Mixed', path: '/exam-types/mixed', icon: CollectionIcon }
      ]
    }
  ];

  const renderMenuItem = (item, index) => {
    const Icon = item.icon;
    const hasSubmenus = item.submenus && item.submenus.length > 0;
    const isSubmenuOpen = openSubmenus[item.name];
    const isActive = location.pathname === item.path || 
                    location.pathname.startsWith(`${item.path}/`) ||
                    (hasSubmenus && item.submenus.some(sub => location.pathname === sub.path));

    return (
      <li key={item.name} className="mb-0.5" data-menu={item.name}>
        {/* Main menu item */}
        <div
          className={`sidebar-menu-item group flex items-center rounded-md transition-all duration-200 cursor-pointer mx-1 ${
            isActive 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          } ${isOpen ? 'px-2.5 py-2' : 'justify-center py-2.5 px-1.5'}`}
          onClick={() => {
            if (hasSubmenus && isOpen) {
              toggleSubmenu(item.name);
            } else {
              navigate(item.path);
              if (window.innerWidth < 768) {
                setIsOpen(false);
              }
            }
          }}
          title={!isOpen ? item.name : ""}
          tabIndex={0}
          role="button"
          aria-expanded={hasSubmenus ? isSubmenuOpen : undefined}
        >
          <Icon className={`h-4 w-4 flex-shrink-0 ${isOpen ? 'mr-2.5' : ''} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
          {isOpen && (
            <>
              <span className="flex-1 text-xs font-medium truncate">{item.name}</span>
              {hasSubmenus && (
                <div className={`ml-1.5 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon className="h-3.5 w-3.5" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Submenu items */}
        {hasSubmenus && isOpen && (
          <div 
            className={`submenu-transition overflow-hidden ${
              isSubmenuOpen ? 'opacity-100 mb-1' : 'opacity-0'
            }`}
            style={{
              maxHeight: isSubmenuOpen ? `${item.submenus.length * 28 + 4}px` : '0px'
            }}
          >
            <ul className="mt-0.5 ml-4 space-y-0.5 pb-0.5">
              {item.submenus.map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubActive = location.pathname === subItem.path;
                
                return (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`sidebar-menu-item flex items-center px-2.5 py-1.5 text-xs rounded-md transition-all duration-200 group ${
                        isSubActive
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'text-slate-400 hover:bg-slate-700/30 hover:text-white'
                      }`}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <SubIcon className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                      <span className="truncate">{subItem.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-slate-800 text-white p-2.5 rounded-lg shadow-lg md:hidden hover:bg-slate-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-40 h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out shadow-xl border-r border-slate-700/50 ${
          isOpen ? 'w-56' : 'w-14'
        }`}
      >
        {/* Desktop Toggle Button */}
        <button 
          className="absolute -right-3 top-6 bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded-full border-2 border-slate-600 shadow-lg hidden md:flex transition-colors z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen 
            ? <ChevronLeftIcon className="h-3.5 w-3.5" /> 
            : <ChevronRightIcon className="h-3.5 w-3.5" />
          }
        </button>

        {/* Logo */}
        <div className={`px-3 py-3 border-b border-slate-700/50 flex items-center ${!isOpen && 'justify-center'}`}>
          {isOpen ? (
            <div className="flex items-center">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2.5">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  GenAI CMS
                </h1>
                <p className="text-xs text-slate-400 leading-3">Content Management</p>
              </div>
            </div>
          ) : (
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="sidebar-scroll h-full pt-2 pb-20 overflow-y-auto"
          >
            <ul className="space-y-0.5 px-0.5">
              {menuItems.map((item, index) => renderMenuItem(item, index))}
            </ul>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className={`absolute bottom-0 left-0 right-0 p-2.5 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm ${!isOpen && 'flex justify-center'}`}>
          {isOpen && user && (
            <div className="mb-2 flex items-center px-2 py-1.5">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-medium text-xs">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate leading-3">{user.email}</p>
              </div>
            </div>
          )}
          
          <button 
            className={`group flex items-center text-slate-300 hover:text-white hover:bg-red-500/20 rounded-md transition-all duration-200 ${
              isOpen ? 'w-full px-2 py-1.5' : 'p-1.5 justify-center'
            }`}
            onClick={handleSignout}
            title={!isOpen ? "Logout" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 flex-shrink-0 ${isOpen ? 'mr-2' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 002 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            {isOpen && <span className="text-xs font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;