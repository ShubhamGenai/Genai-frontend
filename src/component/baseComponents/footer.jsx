import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { LuGraduationCap } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="flex justify-center items-center">
      <footer className="w-full bg-white py-12 px-4 md:px-26">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row justify-between mb-8">
            {/* Left Section - Logo and Description */}
            <div className="max-w-md mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-8 -mt-7">
                <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center">
                  <LuGraduationCap className="text-white w-7 h-7" />
                </div>
                <span className="text-2xl font-semibold">GenAi Learning</span>
              </div>
              <p className="text-gray-600 text-sm">
                Our platform provides comprehensive resources and tools to<br/>
                help you prepare for the JEE exam with confidence.
              </p>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {/* Services Column */}
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Learn</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Test</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Jobs</a></li>
                </ul>
              </div>
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

          {/* Social Links with Updated Design */}
          <div className="flex flex-col md:flex-row md:items-center justify-between -pt-4 -mt-12">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[
                { icon: <FaFacebook />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedin />, link: "#" },
                { icon: <HiMail />, link: "#" },
              ].map(({ icon, link }, index) => (
                <a key={index} href={link} className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition">
                  <div className="w-9 h-9 md:w-40 md:h-40 text-black flex items-center justify-center rounded">
                    {icon}
                  </div>
                </a>
              ))}
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
