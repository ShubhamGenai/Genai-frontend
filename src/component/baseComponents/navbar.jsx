import { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex items-center justify-between mt-0 max-w-full mx-auto px-6 py-4 bg-white z-50 transition-shadow ${hasShadow ? "shadow-md" : ""
        }`}
    >
      <a href="/" className="flex items-center gap-2 z-20 lg:px-24">
        <div className="w-24 h-10 bg-blue-600 rounded-[full]">
          <img src="/logo.webp" alt="GenAi Learning" className="w-full h-full object-cover " />
        </div>
      </a>

      {/* Mobile menu button and cart */}
      <div className="flex items-center gap-4 md:hidden z-20">
        <MdOutlineShoppingCart className="text-gray-500 w-6 h-6" />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-transform duration-300 ease-in-out transform"
        >
          {isMenuOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <IoMdMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Desktop navigation */}
      <div className={`hidden md:flex flex-1 justify-center items-center gap-14 ${isMenuOpen ? "hidden" : ""}`}>
        {[
          { href: "/learn", label: "Learn" },
          { href: "/tests", label: "Tests" },
          { href: "/jobs", label: "Jobs" },
          { href: "/leaderboard", label: "Leaderboard" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="relative text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>


      {/* Mobile navigation - only visible on small screens */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-10 flex flex-col items- p-8 justify-start pt-20 space-y-4 transition-transform duration-300 transform translate-y-0 md:hidden">

          <a href="/learn" className="text-black hover:text-gray-700 text-lg hover:text-white hover:bg-blue-600 py-2 rounded-lg px-2 flex items-center justify-between group shadow-lg ">
            <span>Learn</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="/tests" className="text-black hover:text-gray-700 text-lg hover:text-white hover:bg-blue-600 py-2 rounded-lg px-2 flex items-center justify-between group shadow-lg">
            <span>Tests</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="/jobs" className="text-black hover:text-gray-700 text-lg hover:text-white hover:bg-blue-600 py-2 rounded-lg px-2 flex items-center justify-between group shadow-lg ">
            <span>Jobs</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="/leaderboard" className="text-black hover:text-gray-700 text-lg hover:text-white hover:bg-blue-600 py-2 rounded-lg px-2 flex items-center justify-between group  shadow-lg">
            <span>Leaderboard</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
            Sign in
          </button>
        </div>
      )}

      <div className="hidden md:flex items-center gap-4 z-20 lg:px-24">
        <MdOutlineShoppingCart className="text-gray-500 w-6 h-6 transition-transform duration-300 hover:scale-110 hover:text-blue-500 cursor-pointer" />
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 shining-border button-animate">
          Sign in
        </button>
      </div>
    </nav>
  );
}
