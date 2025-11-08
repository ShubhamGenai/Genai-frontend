import { BellIcon, UserCircleIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon, SearchIcon } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext, useState, useRef, useEffect } from "react";
import { mainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

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
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-2 md:py-2">
      <div className="flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
            <span className="hidden sm:inline">Welcome back, </span>
            <span className="sm:hidden">Hi, </span>
            {user?.name || user?.firstName || 'Student'}!
          </h2>
        </div>
        
        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <FaMagnifyingGlass className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <BellIcon className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Desktop Profile Info */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.firstName || 'Student'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'student@example.com'}
                </p>
              </div>
              
              {/* Mobile Profile Info */}
              <div className="md:hidden text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.firstName || 'Student'}
                </p>
              </div>
              
              <div className="flex items-center space-x-1">
                <UserCircleIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                <ChevronDownIcon className={`w-3 h-3 md:w-4 md:h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.firstName || 'Student'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'student@example.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 mr-3" />
                    View Profile
                  </button>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOutIcon className="w-4 h-4 mr-3" />
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
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          <div className="relative">
            <FaMagnifyingGlass className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};