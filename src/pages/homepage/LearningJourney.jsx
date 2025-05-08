import React from "react";
import { GraduationCap } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Part3() {

  const features = [
    { label: "ADAPTIVE LEARNING", href: "/adaptive-learning" },
    { label: "AI DRIVEN CAREER GUIDANCE", href: "/career-guidance" },
    { label: "EXCLUSIVE COMMUNITY", href: "/community" },
    { label: "24*7 SUPPORT", href: "/support" },
    { label: "LIFE TIME ACCESS", href: "/lifetime-access" },
  ];
  
  return (
    <div>
      <div className="bg-blue-600">
        {/* Job Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-blue-600 text-white  flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4 md:px-8 lg:px-12">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl md:text-4xl">
                <span className='font-semibold'>Unlock</span><span className="font-bold"> Exclusive Benefits </span> <span className='font-semibold'>with<br /></span>
                  <span className="font-bold">Elite Subscription</span>
                </h2>
              </div>
              <p className="mb-6 text-base md:text-lg">
                Upgrade to Elite and enjoy priority access, premium content, and exclusive
                perks designed for our top-tier members. Elevate your experience today!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-7">
                <button className="w-full sm:w-48 px-4 py-3 md:px-6 md:py-4 text-white border border-white rounded-lg hover:bg-white/10 transition">
                  Learn More
                </button>
                <button className="w-full sm:w-48 px-4 py-3 md:px-6 md:py-4 text-blue-600 bg-white border border-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                  Join Elite Now <FaArrowRightLong className="ml-1" />
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center px-4 md:px-8">
              <img
                src="./courses/journney.png"
                alt="Professional with laptop"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-5 mt-2 overflow-x-auto">
      <div className="container mx-auto px-6 md:px-32">
        <motion.div
          className="flex flex-wrap font-bold justify-center md:justify-between items-center gap-2 md:gap-2 text-xs md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hidden md:inline text-lg">•</span>
          {features.map((item, idx) => (
            <React.Fragment key={item.label}>
              <Link
                to={item.href}
                className="px-2 relative transition duration-200 hover:text-yellow-400"
              >
                <span className="after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-200">
                  {item.label}
                </span>
              </Link>
              {idx < features.length - 1 && (
                <span className="hidden md:inline text-lg">•</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
}