import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { LuGraduationCap } from "react-icons/lu";

const Footer = () => {
  return (
    <div className='flex justify-center items-center'>
    <footer className="w-full bg-white py-12 px-26">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Left Section - Logo and Description */}
          <div className="max-w-md mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center">
              <LuGraduationCap className='text-white w-7 h-7'/>
              </div>
              <span className="text-2xl font-semibold">GenAi Learning</span>
            </div>
            <p className="text-gray-600 text-sm">
              Transforming education with AI-powered, personalized learning
              experiences. Explore interactive courses, live mentorship, and
              skill-building programs designed for students and professionals.
              Learn smarter, grow faster!
            </p>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Support Column */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Guides</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms and conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Refund and returns policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between -pt-4">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <FaFacebook className="w-5 h-5" /> Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <FaInstagram className="w-5 h-5" /> Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <FaLinkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <HiMail className="w-5 h-5" /> Email
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 mt-8">
          © 2025 GenAi Learning. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;