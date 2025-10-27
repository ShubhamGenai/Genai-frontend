import React from 'react';
import { Link } from 'react-router-dom';
import { LuGraduationCap } from 'react-icons/lu';
import { MdOutlineShoppingCart, MdSearch } from 'react-icons/md';

const GuestHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Search Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          {/* <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className="text-white w-5 h-5" />
            </div>
          </Link>
           */}
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses, jobs..."
                className="w-full px-4 py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <MdSearch className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Cart and Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <MdOutlineShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          
          {/* Auth Buttons */}
          <Link 
            to="/login" 
            className="px-3 py-1.5 text-gray-500 rounded-lg font-medium hover:bg-blue-50 hover:text-gray-800 text-md transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/login-landing" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default GuestHeader;
