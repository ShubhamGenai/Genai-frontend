
import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, HelpCircle, Menu, Sun, Moon } from 'lucide-react';



export default function AdminNavBar() {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 sticky top-0 z-10">
    <div className="px-4 py-3">
      {/* Desktop Header */}
      <div className="flex items-center justify-between">
        {/* Left side - Logo and mobile menu button */}
        <div className="flex items-center">
      
          <div className="flex items-center">
            <div className="h-10 w-20 mr-2  rounded-md flex items-center justify-center">
              <img src="../logo.webp" alt="GenAI Learning Platform" className="h-10 w-18" />
            </div>
            {/* <span className="font-bold text-xl text-gray-800 dark:text-white hidden md:block">GenAI Admin</span> */}
          </div>
        </div>
        
        {/* Center - Search Bar */}
        {/* <div className="hidden md:block mx-auto max-w-md w-full ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        </div> */}
        
        {/* Right side - Notifications, Settings, Theme Toggle, Profile */}
        <div className="flex items-center space-x-1 md:space-x-3">
       
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          {/* Help */}
          <button 
            className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>
          
          {/* Settings */}
          <button 
            className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="Open user menu"
            >
              <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md border-2 border-white dark:border-gray-700">
                <User size={20} />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
              </div>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                </div>
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Your Profile</a>
                <a href="#account" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Account Settings</a>
                <a href="#help" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Help Center</a>
                <div className="border-t border-gray-100 dark:border-gray-700"></div>
                <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                  <LogOut size={16} className="mr-2" /> Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens */}
      <div className="mt-3 md:hidden">
        {/* <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        </div> */}
      </div>
    </div>
    
 
  </header>

  );
};
