import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex justify-center items-center">
      <footer className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-between mb-6 sm:mb-8">
            {/* Left Section - Logo and Description */}
            <div className="max-w-md mb-6 sm:mb-8 lg:mb-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <Link to="/" className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                    Gen{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
                      AI
                    </span>
                  </h1>
                </Link>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Our platform provides comprehensive resources and tools to help you prepare for exams and advance your career with confidence.
              </p>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Services Column */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><Link to="/learn" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Learn</Link></li>
                  <li><Link to="/tests" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Tests</Link></li>
                  {/* <li><Link to="/jobs" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Jobs</Link></li> */}
                  <li><Link to="/library" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Library</Link></li>
                </ul>
              </div>
              
              {/* Support Column */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Guides</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Help Center</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Careers</a></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Refund Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-200 pt-6 sm:pt-8">
            <div className="flex space-x-4 sm:space-x-6 mb-4 sm:mb-0">
              {[
                { icon: <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />, link: "#", label: "Facebook" },
                { icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />, link: "#", label: "Instagram" },
                { icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />, link: "#", label: "LinkedIn" },
                { icon: <HiMail className="w-4 h-4 sm:w-5 sm:h-5" />, link: "#", label: "Email" },
              ].map(({ icon, link, label }, index) => (
                <a 
                  key={index} 
                  href={link} 
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group"
                  aria-label={label}
                >
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                    {icon}
                  </div>
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-center sm:text-right text-xs sm:text-sm text-gray-600">
              © 2025 GenAI Learning. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
