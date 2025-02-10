// src/App.jsx
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-white py-8  mt-40">
      <div className=" mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between ml-20 mr-20">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-7">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-2">
                🎓
              </div>
              <h2 className="text-xl font-bold">GenAi Learning</h2>
            </div>
            <p className="text-gray-600">
              Our platform provides comprehensive<br/> resources and tools to<br/> help you prepare for the JEE exam with<br/> confidence.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-2 mt-14">Resources</h3>
              <ul className="text-gray-600">
                <li>Learn</li>
                <li>Tests</li>
                <li>Jobs</li>
                <li>Leaderboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 mt-14">Company</h3>
              <ul className="text-gray-600">
                <li>About us</li>
                <li>Contact us</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 mt-14">Company</h3>
              <ul className="text-gray-600">
                <li>Privacy policy</li>
                <li>Terms and conditions</li>
                <li>Refund and returns </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 mt-14">Support</h3>
              <ul className="text-gray-600">
                <li>Pricing</li>
                <li>Documentation</li>
                <li>Guides</li>
              </ul>
            </div>
          </div>
        </div>
         {/* Copyright Section */}
         <div className="mt-12 border-t border-gray-200 pt-8 ">
          <p className="text-gray-600 text-left ml-20">
            © 2025 GenAi Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;