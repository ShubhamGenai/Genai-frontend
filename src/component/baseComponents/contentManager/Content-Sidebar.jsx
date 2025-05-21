import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ChevronRightIcon
} from '@heroicons/react/outline';

// Create a context to share sidebar state across components
import { createContext, useContext } from 'react';
import { mainContext } from '../../../context/MainContext';

export const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, setIsOpen } = useSidebar();

    const {user,signOut} = useContext(mainContext)
   const handleSignout = () => {
      signOut();
      navigate("/");  // ✅ useNavigate replaces Navigate component
    };
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Courses', path: '/content/courses-list', icon: BookOpenIcon },
    { name: 'Modules', path: '/modules', icon: CollectionIcon },
    { name: 'Lessons', path: '/lessons', icon: VideoCameraIcon },
    { name: 'Quizzes', path: '/quizzes', icon: QuestionMarkCircleIcon },
    { name: 'Tests', path: '/tests', icon: ClipboardCheckIcon },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-indigo-800 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-40 h-screen bg-indigo-800 text-white transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Desktop Toggle Button */}
        <button 
          className="absolute -right-3 top-12 bg-indigo-800 text-white p-1 rounded-full border border-indigo-700 hidden md:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen 
            ? <ChevronLeftIcon className="h-4 w-4" /> 
            : <ChevronRightIcon className="h-4 w-4" />
          }
        </button>

        {/* Logo */}
        <div className={`px-4 py-4 border-b border-indigo-700 flex items-center ${!isOpen && 'justify-center'}`}>
          {isOpen ? (
            <h1 className="text-2xl font-bold">Genai-CMS</h1>
          ) : (
            <h1 className="text-xl font-bold">G</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              location.pathname.startsWith(`${item.path}/`);
              
              return (
                <li key={item.name} className="px-2 py-1">
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-700 text-white' 
                        : 'text-indigo-100 hover:bg-indigo-700'
                    } ${isOpen ? 'px-4 py-3' : 'justify-center py-3'}`}
                    onClick={() => {
                      // Close sidebar on mobile after click
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                    title={!isOpen ? item.name : ""}
                  >
                    <Icon className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t border-indigo-700 ${!isOpen && 'flex justify-center'}`}>
          <button className="flex items-center text-indigo-100 hover:text-white" title={!isOpen ? "Logout" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isOpen ? 'mr-2' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 002 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            {isOpen && <span onClick={handleSignout}>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;