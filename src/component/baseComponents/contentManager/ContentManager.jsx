import React, { useContext, useState } from 'react';
import { BellIcon, MenuIcon, UserCircleIcon } from '@heroicons/react/outline';
import { mainContext } from '../../../context/MainContext';

const ContentManagerNavBar = ({ onMenuClick }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const {user,signOut} = useContext(mainContext)
 const handleSignout = () => {
    signOut();
    navigate("/");  // ✅ useNavigate replaces Navigate component
  };
  return (
    <header className=" fixed top-0 left-0 right-0 bg-opacity-50  h-16 flex items-center px-6 z-40">
      {/* Logo */}
      {/* <div className="flex items-center">
        <img
          src="/logo192.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="font-bold text-lg text-gray-800 hidden sm:block">GenAI</span>
      </div> */}

      {/* Hamburger for sidebar */}
      {/* <button
        className="md:hidden ml-4"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6 text-gray-500" />
      </button> */}

      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <span className="hidden md:block font-medium">{user.name}</span>
          </button>

          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="/content/homescreen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleSignout}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ContentManagerNavBar;