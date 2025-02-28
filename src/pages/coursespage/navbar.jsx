import { useState, useEffect } from "react";
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { Link } from "react-router-dom";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-btn")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 w-full bg-white z-50  mt-2 transition-shadow ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <nav className="flex items-center justify-between md:px-24 mx-auto px-4 sm:px-6 ">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-semibold text-lg">GenAi Learning</span>
          </Link>


          <div className="p-4">
  <input
    type="text"
    placeholder="Search course here"
    className="w-[320px] px-5 pr-20 py-2 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  />
</div>




          {/* Desktop Nav Links */}
          <div className="hidden sm:flex flex-1 justify-center items-center gap-6 lg:gap-12">
            <Link to="/learn" className="text-gray-600 hover:text-gray-900">
              Learn
            </Link>
            <Link to="/tests" className="text-gray-600 hover:text-gray-900">
              Tests
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-gray-900">
              Jobs
            </Link>
            <Link to="/leader-board" className="text-gray-600 hover:text-gray-900">
              Leaderboard
            </Link>
          </div>

          {/* Right Side (Cart & Menu Button) */}
          <div className="flex items-center gap-4 sm:gap-5">
            <MdOutlineShoppingCart className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />

            <Link to="/leader-board" className="text-gray-600 hover:text-gray-900 px-3">
            Sign Up  
            </Link>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="menu-btn sm:hidden">
              {isOpen ? (
                <MdClose className="w-6 h-6 text-gray-700" />
              ) : (
                <MdMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Desktop Sign-in Button */}
            <Link
              to="/login-landing"
              className="hidden sm:block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 text-sm sm:text-base"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* Spacer for Fixed Header */}
      <div className="h-16"></div>

      {/* Mobile Menu (Opens from Right) */}
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

  {/* Navigation Links */}
  <div className="flex flex-col items-center w-full mt-6 gap-6">
    <Link
      to="/learn"
      className="text-gray-600 hover:text-gray-900 text-lg"
      onClick={() => setIsOpen(false)}
    >
      Learn
    </Link>
    <Link
      to="/tests"
      className="text-gray-600 hover:text-gray-900 text-lg"
      onClick={() => setIsOpen(false)}
    >
      Tests
    </Link>
    <Link
      to="/jobs"
      className="text-gray-600 hover:text-gray-900 text-lg"
      onClick={() => setIsOpen(false)}
    >
      Jobs
    </Link>
    <Link
      to="/leader-board"
      className="text-gray-600 hover:text-gray-900 text-lg"
      onClick={() => setIsOpen(false)}
    >
      Leaderboard
    </Link>

    {/* Mobile Sign-in Button */}
    <Link
      to="/login-landing"
      className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
      onClick={() => setIsOpen(false)}
    >
      Sign Up
    </Link>
  </div>
</div>

    </>
  );
}
