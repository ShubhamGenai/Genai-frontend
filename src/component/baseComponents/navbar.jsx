import { useState, useEffect, useContext } from "react";
import {
  MdOutlineShoppingCart, MdMenu, MdClose, MdAccountCircle, MdLogout,
  MdSettings, MdDashboard, MdHelpOutline, MdBookmark, MdNotifications,
  MdExpandMore, MdExpandLess
} from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { 
  BookOpenIcon, 
  FileTextIcon, 
  BriefcaseIcon, 
  UsersIcon,
  LibraryIcon,
  GraduationCapIcon,
  BuildingIcon,
  AwardIcon,
  StarIcon
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { mainContext } from '../../context/MainContext';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, signOut } = useContext(mainContext);
  const navigate = useNavigate();
  const location = useLocation();  // Add this to track current route

  // Add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu, .menu-btn")) {
        setIsOpen(false);
      }
      if (isProfileOpen && !event.target.closest(".profile-dropdown, .profile-btn")) {
        setIsProfileOpen(false);
      }
      if (activeDropdown && !event.target.closest(".dropdown-menu, .dropdown-btn")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isProfileOpen, activeDropdown]);

  // ✅ Fixed sign-out function
  const handleSignout = () => {
    signOut();
    navigate("/");  // ✅ useNavigate replaces Navigate component
  };

  // Navigation menu items with dropdowns
  const navigationItems = [
    {
      name: "Learn",
      icon: BookOpenIcon,
      path: "/learn",
      hasDropdown: false
    },
    {
      name: "Tests",
      icon: FileTextIcon,
      path: "/tests",
      hasDropdown: false
    },
    {
      name: "Jobs",
      icon: BriefcaseIcon,
      path: "/jobs",
      hasDropdown: false
    },
    {
      name: "Library",
      icon: LibraryIcon,
      path: "/library",
      hasDropdown: false
    },
    {
      name: "Community",
      icon: UsersIcon,
      path: "/community",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Communities", icon: UsersIcon, path: "/community/all" },
        { name: "College", icon: GraduationCapIcon, path: "/community/college" },
        { name: "Company", icon: BuildingIcon, path: "/community/company" },
        { name: "Exam Prep", icon: FileTextIcon, path: "/community/exam-prep" },
        { name: "Skills", icon: AwardIcon, path: "/community/skills" }
      ]
    }
  ];

  // Profile menu items
  const profileMenuItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: "Dashboard", link: "/student/list" },
    { icon: <MdAccountCircle className="w-5 h-5" />, label: "Profile", link: "/student/profile" },
    { icon: <MdBookmark className="w-5 h-5" />, label: "Saved Courses", link: "/saved-courses" },
    { icon: <MdNotifications className="w-5 h-5" />, label: "Notifications", link: "/notifications" },
    { icon: <MdSettings className="w-5 h-5" />, label: "Settings", link: "/settings" },
    { icon: <MdHelpOutline className="w-5 h-5" />, label: "Help Center", link: "/help" },
    { icon: <MdLogout className="w-5 h-5 text-red-600" />, label: "Logout", link: "/", onClick: handleSignout }
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed top-0 w-full bg-white/50 backdrop-blur-md p-1.5 z-50 transition-all duration-300 ${isScrolled ? "shadow-md bg-white/70 backdrop-blur-lg" : "shadow-none"}`}>
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-2">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
           <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
          Gen{' '}
          <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
            AI
          </span>
        </h1>
          </Link>


          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.hasDropdown && item.dropdownItems?.some(subItem => location.pathname === subItem.path));
              const isDropdownOpen = activeDropdown === item.name;
              
              return (
                <div key={item.name} className="relative">
                  <div className="flex items-center gap-1">
                    <Link 
                      to={item.path}
                      className={`text-[15px] flex items-center gap-1 ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-black'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                      {/* underline removed */}
                    </Link>
                    
                    {item.hasDropdown && (
                      <button
                        className="dropdown-btn p-1 hover:bg-gray-100 rounded"
                        onClick={() => setActiveDropdown(isDropdownOpen ? null : item.name)}
                      >
                        {isDropdownOpen ? (
                          <MdExpandLess className="w-4 h-4 text-gray-500" />
                        ) : (
                          <MdExpandMore className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && isDropdownOpen && (
                    <div className="dropdown-menu absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.dropdownItems?.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon;
                        const isSubActive = location.pathname === dropdownItem.path;
                        
                        return (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.path}
                            className={`flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                              isSubActive ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                          >
                            <DropdownIcon className="w-4 h-4" />
                            {dropdownItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* Only show cart for authenticated users */}
            {user.role && (
              <Link to="/student/cart">
                <MdOutlineShoppingCart className="text-gray-500 w-5 h-5 cursor-pointer" />
              </Link>
            )}
           
            {user.role && (
              <MdNotifications className="text-gray-500 w-5 h-5 cursor-pointer" />
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="menu-btn sm:hidden">
              {isOpen ? <MdClose className="w-5 h-5 text-gray-700" /> : <MdMenu className="w-5 h-5 text-gray-700" />}
            </button>

            {/* User Profile or Auth Buttons */}
            {user.role ? (
              <div className="hidden sm:block relative">
                <button className="profile-btn flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="User" className="w-7 h-7 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <MdAccountCircle className="w-7 h-7 text-gray-400" />
                  )}
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Welcome!</div>
                    <div className="text-xs font-semibold">{user.name || 'Sumit Nema'}</div>
                  </div>
                </button>

                {/* Profile Dropdown */}
               {isProfileOpen && (
  <div className="profile-dropdown absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl py-2 border border-gray-200">
     {profileMenuItems.map((item, index) => (
        <div key={index}>
          {/* Divider before the last item */}
          {index === profileMenuItems.length - 1 && (
            <div className="my-2 border-t border-gray-200" />
          )}

          <Link
            to={item.link}
            onClick={item.onClick}
            className={`flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
              item.className || ''
            }`}
          >
            <span className="text-gray-500 text-base">{item.icon}</span>
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        </div>
      ))}
  </div>
)}

              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-500 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 hover:text-gray-800 transition-colors duration-300">
                  Sign In
                </Link>
                <Link to="/login-landing" className="px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors duration-300">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Adjust spacer height */}
      <div className="h-12 md:h-14"></div>

      {/* Powered by AI Badge (hidden on xs screens) */}
      {/* <div className="hidden sm:block fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
          <StarIcon className="w-4 h-4" />
          Powered by AI
        </div>
      </div> */}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/50 backdrop-blur-lg shadow-lg transform mobile-menu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 sm:hidden flex flex-col z-50`}
      >
        {/* Top Section: Logo & Close Icon */}
        <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-100">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold leading-tight tracking-tight">
              Gen{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
          </Link>

          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
            <MdClose className="w-6 h-6" />
          </button>
        </div>


        {/* Mobile User Profile Section - Only for authenticated users */}
        {user.role && (
          <div className="px-6 py-4 border-b border-gray-100 bg-white/60">
            <div className="flex items-center gap-3">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name || "User"} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  <MdAccountCircle className="w-8 h-8 text-blue-600" />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800">{user.name || 'User'}</p>
                <p className="text-sm text-gray-500 truncate">{user.email || ''}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-col gap-2 px-3">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.hasDropdown && item.dropdownItems?.some(subItem => location.pathname === subItem.path));
              
              return (
                <div key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[15px]">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    )}
                  </Link>
                  
                  {/* Mobile Dropdown Items */}
                  {item.hasDropdown && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.dropdownItems?.map((dropdownItem, subIndex) => {
                        const DropdownIcon = dropdownItem.icon;
                        const isSubActive = location.pathname === dropdownItem.path;
                        
                        return (
                          <Link
                            key={subIndex}
                            to={dropdownItem.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 text-sm
                              ${isSubActive 
                                ? 'bg-blue-50 text-blue-600 font-semibold' 
                                : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <DropdownIcon className="w-4 h-4" />
                            {dropdownItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Profile Menu Items - Only for authenticated users */}
          {user.role ? (
            <div className="mt-6 px-3">
              <div className="text-xs font-medium text-gray-400 px-4 mb-2">ACCOUNT SETTINGS</div>
              <div className="flex flex-col gap-1">
                {profileMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300
                      ${item.label === 'Logout' ? 'text-red-600 hover:bg-red-50 mt-2' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={item.onClick || (() => setIsOpen(false))}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-6 mt-6">
              <Link 
                to="/login" 
                className="block text-center mb-3 px-4 py-2.5 text-sm sm:text-base text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/login-landing" 
                className="block text-center px-4 py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
