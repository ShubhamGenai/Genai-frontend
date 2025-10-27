import { useState, useEffect, useContext } from "react";
import {
  MdOutlineShoppingCart, MdMenu, MdClose, MdAccountCircle, MdLogout,
  MdSettings, MdDashboard, MdHelpOutline, MdBookmark, MdNotifications
} from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { mainContext } from '../../context/MainContext';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isProfileOpen]);

  // ✅ Fixed sign-out function
  const handleSignout = () => {
    signOut();
    navigate("/");  // ✅ useNavigate replaces Navigate component
  };

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
      <header className={`fixed top-0 w-full bg-white p-1.5 z-50 transition-shadow ${isScrolled ? "shadow-md" : "shadow-none"}`}>
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-2">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-semibold text-2xl ">GenAi Learning</span>
          </Link>


          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {["Home","Learn", "Jobs", ].map((item) => {
              const path = `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link 
                  key={item} 
                  to={path} 
                  className={`text-[15px] relative group ${
                    isActive 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-500 hover:text-gray-900 font-light'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ease-out
                    ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}>
                  </span>
                </Link>
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
            <button onClick={() => setIsOpen(!isOpen)} className="menu-btn md:hidden">
              {isOpen ? <MdClose className="w-5 h-5 text-gray-700" /> : <MdMenu className="w-5 h-5 text-gray-700" />}
            </button>

            {/* User Profile or Auth Buttons */}
            {user.role ? (
              <div className="hidden md:block relative">
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
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-3 p-2 py-1.5 text-gray-500   rounded-lg font-medium hover:bg-blue-50 hover:text-gray-800 text-md">
                  Sign In
                </Link>
                <Link to="/login-landing" className="px-4 p-2 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 text-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Adjust spacer height */}
      <div className="h-12"></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-white to-blue-50 shadow-lg transform mobile-menu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 sm:hidden flex flex-col z-50`}
      >
        {/* Top Section: Logo & Close Icon */}
        <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-100">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">GenAi</span>
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
            {[
              { to: "/learn", label: "Learn", icon: "🎓" },         
              { to: "/jobs", label: "Jobs", icon: "💼" },
            ].map((item, index) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[15px]">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  )}
                </Link>
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
                className="block text-center mb-3 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/login-landing" 
                className="block text-center px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
