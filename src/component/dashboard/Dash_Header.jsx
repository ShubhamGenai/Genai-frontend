import { UserCircleIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon, SearchIcon } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext, useState, useRef, useEffect } from "react";
import { mainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import DashboardNotifications from "./DashboardNotifications";

export const Header = () => {
  const { user, signOut } = useContext(mainContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/student/profile');
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    // Navigate to settings page when implemented
    setIsDropdownOpen(false);
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-3 md:px-4 py-1.5 md:py-1.5">
      <div className="flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex items-center space-x-1.5 md:space-x-2 min-w-0 flex-1">
          <h2 className="text-lg sm:text-md lg:text-lg font-normal text-black truncate">
            <span className="hidden sm:inline">Welcome back, </span>
            <span className="sm:hidden">Hi, </span>
            {user?.name || user?.firstName || 'Student'}!
          </h2>
        </div>
        
        {/* Right Section - Actions */}
        <div className="flex items-center space-x-1.5 md:space-x-2">
          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <FaMagnifyingGlass className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, jobs..."
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 text-xs"
            />
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
          
          {/* Notifications */}
          <DashboardNotifications />
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1.5 md:space-x-2 p-1 md:p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              {/* Desktop Profile Info */}
              <div className="hidden md:block text-right">
                <p className="text-xxs font-normal text-black">
                  {user?.name || user?.firstName || 'Student'}
                </p>
                <p className="text-[0.6rem] text-gray-700">
                  {user?.email || 'student@example.com'}
                </p>
              </div>
              
              {/* Mobile Profile Info */}
              <div className="md:hidden text-right">
                <p className="text-xxs font-normal text-black">
                  {user?.name || user?.firstName || 'Student'}
                </p>
              </div>
              
              <div className="flex items-center space-x-0.5">
                <UserCircleIcon className="w-3.5 h-3.5 md:w-4 h-4 text-gray-700" />
                <ChevronDownIcon className={`w-1.5 h-1.5 md:w-2 h-2 text-gray-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {/* User Info */}
                <div className="px-2.5 py-1.5 border-b border-gray-100">
                  <p className="text-xxs font-normal text-black">
                    {user?.name || user?.firstName || 'Student'}
                  </p>
                  <p className="text-[0.6rem] text-gray-700 truncate">
                    {user?.email || 'student@example.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-0.5">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <UserIcon className="w-2.5 h-2.5 mr-1" />
                    View Profile
                  </button>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <SettingsIcon className="w-2.5 h-2.5 mr-1" />
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-100 my-0.5"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-2.5 py-0.5 text-xxs text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOutIcon className="w-2.5 h-2.5 mr-1" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden mt-2.5 pt-2.5 border-t border-gray-200">
          <div className="relative">
            <FaMagnifyingGlass className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, jobs..."
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};