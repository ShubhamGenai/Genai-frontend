import React from "react";
import { GraduationCap } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Part3() {
  return (
    <div>
      <div className="bg-blue-600">
        {/* Job Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-blue-600 text-white shadow flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4 md:px-8 lg:px-12">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl">
                  <span className="font-bold">Unlock Exclusive </span> Benefits with{" "}
                  <span className="">Elite Subscription</span>
                </h2>
              </div>
              <p className="mb-6 text-base md:text-lg">
                Upgrade to Elite and enjoy priority access, premium content, and exclusive
                perks designed for our top-tier members. Elevate your experience today!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <button className="w-full sm:w-auto px-4 py-3 md:px-6 md:py-4 text-white border border-white rounded-lg hover:bg-white/10 transition">
                  Learn More
                </button>
                <button className="w-full sm:w-auto px-4 py-3 md:px-6 md:py-4 text-blue-600 bg-white border border-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition">
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

      <div className="bg-gray-900 text-white py-3 mt-2 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-3 md:gap-2 text-xs md:text-sm">
            <span className="px-2">ADAPTIVE LEARNING</span>
            <span className="hidden md:inline text-lg">•</span>
            <span className="px-2">AI DRIVEN CAREER GUIDANCE</span>
            <span className="hidden md:inline text-lg">•</span>
            <span className="px-2">EXCLUSIVE COMMUNITY</span>
            <span className="hidden md:inline text-lg">•</span>
            <span className="px-2">24*7 SUPPORT</span>
            <span className="hidden md:inline text-lg">•</span>
            <span className="px-2">LIFETIME ACCESS</span>
            
          </div>
        </div>
      </div>
    </div>
  );
}