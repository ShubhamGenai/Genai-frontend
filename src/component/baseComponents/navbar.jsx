import { useState, useEffect, useContext } from "react";
import {
  MdOutlineShoppingCart, MdMenu, MdClose, MdAccountCircle, MdLogout,
  MdSettings, MdDashboard, MdHelpOutline, MdBookmark, MdNotifications
} from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from '../../context/MainContext';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signOut } = useContext(mainContext);
  const navigate = useNavigate();  // ✅ Corrected Navigation Hook

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
    { icon: <MdDashboard className="w-5 h-5" />, label: "Dashboard", link: "/dashboard" },
    { icon: <MdAccountCircle className="w-5 h-5" />, label: "Profile", link: "/profile" },
    { icon: <MdBookmark className="w-5 h-5" />, label: "Saved Courses", link: "/saved-courses" },
    { icon: <MdNotifications className="w-5 h-5" />, label: "Notifications", link: "/notifications" },
    { icon: <MdSettings className="w-5 h-5" />, label: "Settings", link: "/settings" },
    { icon: <MdHelpOutline className="w-5 h-5" />, label: "Help Center", link: "/help" },
    { icon: <MdLogout className="w-5 h-5 text-red-600" />, label: "Logout", link: "/", onClick: handleSignout }
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed top-0 w-full bg-white z-50 transition-shadow ${isScrolled ? "shadow-md" : "shadow-none"}`}>
        <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 py-3">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-semibold text-lg">GenAi Learning</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex flex-1 justify-center items-center gap-6 lg:gap-12">
            {["Learn", "Tests", "Jobs", "Leaderboard"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
                {item}
              </Link>
            ))}
          </div>

          {/* Right Side Icons & Profile */}
          <div className="flex items-center gap-4 sm:gap-5">
            <MdOutlineShoppingCart className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="menu-btn sm:hidden">
              {isOpen ? <MdClose className="w-6 h-6 text-gray-700" /> : <MdMenu className="w-6 h-6 text-gray-700" />}
            </button>

            {/* User Profile */}
            {user.role ? (
              <div className="hidden sm:block relative">
                <button className="profile-btn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="User" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <MdAccountCircle className="w-6 h-6 text-blue-600" />
                  )}
                  <span className="text-sm font-medium">{user.name?.split(' ')[0] || 'User'}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    {profileMenuItems.map((item, index) => (
                      <div key={index}>
                        {index === profileMenuItems.length - 1 && <div className="border-t border-gray-100 my-1"></div>}
                        <Link to={item.link} className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${item.className || 'text-gray-700'}`} onClick={item.onClick}>
                          {item.icon} {item.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login-landing" className="hidden sm:block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 text-sm sm:text-base">
                Sign Up
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Spacer for Fixed Header */}
      <div className="h-16"></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform mobile-menu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 sm:hidden flex flex-col items-center pt-6 z-50`}
      >
        {/* Top Section: Logo & Close Icon */}
        <div className="flex items-center justify-between w-full px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 ">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">GenAi</span>
          </Link>

          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <MdClose className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile User Profile Section */}
        {user.role && (
          <div className="mt-6 w-full px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name || "User"} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MdAccountCircle className="w-8 h-8 text-blue-600" />
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-medium text-gray-800">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-col w-full mt-6 gap-4">
  {/* Navigation Links */}
  {[
    { to: "/learn", label: "Learn" },
    { to: "/tests", label: "Tests" },
    { to: "/jobs", label: "Jobs" },
    { to: "/leader-board", label: "Leaderboard" },
  ].map((item, index) => (
    <Link
      key={index}
      to={item.to}
      className="text-gray-600 px-8 py- text-lg font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105"
      onClick={() => setIsOpen(false)}
    >
      {item.label}
    </Link>
  ))}

  {/* Conditional Profile Options or Sign-Up Button */}
  {user.role ? (
    <div className="w-full px-4 mt-4 flex flex-col gap-2">
      {profileMenuItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className={`flex items-center gap-2 px-4 py-2 ${item.className || "text-gray-700"} hover:bg-gray-100 rounded transition-all duration-300 hover:scale-105`}
          onClick={handleSignout}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  ) : (
    <Link to="/login-landing" onClick={() => setIsOpen(false)} className="self-center mt-6">
      <button
        className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium relative overflow-hidden transition-all duration-300 
        hover:text-white before:absolute before:inset-0 before:bg-blue-600 before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 
        shadow-md hover:shadow-lg hover:scale-105"
      >
        <span className="relative z-10">Sign Up</span>
      </button>
    </Link>
  )}
</div>

      </div>
    </>
  );
}
