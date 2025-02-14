import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { LuGraduationCap } from "react-icons/lu";

const Footer = () => {
  return (
    <div className='flex justify-center items-center'>
      <footer className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-between mb-8 gap-8">
            {/* Left Section - Logo and Description */}
            <div className="w-full lg:max-w-md mb-8 lg:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-600 rounded-full flex items-center justify-center">
                  <LuGraduationCap className='text-white w-6 h-6 sm:w-7 sm:h-7'/>
                </div>
                <span className="text-xl sm:text-2xl font-semibold">GenAi Learning</span>
              </div>
              <p className="text-gray-600 text-sm">
                Transforming education with AI-powered, personalized learning
                experiences. Explore interactive courses, live mentorship, and
                skill-building programs designed for students and professionals.
                Learn smarter, grow faster!
              </p>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Support Column */}
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Guides</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms and conditions</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Refund policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className ="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-0">
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <FaFacebook className="w-5 h-5" /> 
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <FaInstagram className="w-5 h-5" /> 
                <span className="text-sm">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <FaLinkedin className="w-5 h-5" /> 
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <HiMail className="w-5 h-5" /> 
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-600 mt-6 sm:mt-8">
            © 2025 GenAi Learning. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;