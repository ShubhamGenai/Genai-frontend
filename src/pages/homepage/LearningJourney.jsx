import React from "react";
import { GraduationCap } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Part3() {


  return (
    <div className="">
      <div className="bg-blue-600">
        <div className="flex justify-center items-center w-full">
          {/* Job Section */}
          <div className="bg-blue-600 text-white p-8 shadow flex flex-col md:flex-row items-center md:gap-x-60">
            <div className="flex-1 mb-6 p-10 md:mb-0 md:ml-20">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl">
                  <span className="font-bold">Unlock Exclusive </span> Benefits with <br />
                  <span className="">Elite Subscription</span>
                </h2>
              </div>
              <p className="mb-4 text-1xl">
                Upgrade to Elite and enjoy priority access, premium content, and exclusive
                <br /> perks designed for our top-tier members. Elevate your experience today!
              </p>
              <div className="flex space-x-2 mt-7">
                <button className="w-[190px] px-6 py-4 text-white border border-white rounded-lg">
                  Learn More
                </button>
                <button className="w-[190px] px-6 py-4 text-blue-600 bg-white border border-white rounded-lg flex items-center justify-center gap-2">
                  Join Elite Now <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:mr-20">
              <img src="./courses/journney.png" alt="Professional with laptop" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </div>

      
        <div className="bg-gray-900 text-white font-semibold py-3 flex mt-2 justify-center items-center space-x-4 text-sm">
          <span>ADAPTIVE LEARNING</span>
          <span className="text-lg">•</span>
          <span>AI DRIVEN CAREER GUIDANCE</span>
          <span className="text-lg">•</span>
          <span>EXCLUSIVE COMMUNITY</span>
          <span className="text-lg">•</span>
          <span>24*7 SUPPORT</span>
          <span className="text-lg">•</span>
          <span>LIFETIME ACCESS</span>
        </div>

     
    </div>
  );
}
