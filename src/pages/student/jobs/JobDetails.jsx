import { Circle } from "lucide-react";
import React, { useEffect, useState } from "react";

const JobDetails = () => {
  const jobs = [
    { id: 1, type: "Premium" },
    { id: 2, type: "Free" },
    { id: 3, type: "Premium" },
    { id: 4, type: "Free" },
  ];

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const jobHeader = document.getElementById("job-header");
      if (jobHeader) {
        const offset = jobHeader.offsetTop;
        setIsSticky(window.scrollY > offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-full mx-auto p-4 md:p-6 lg:p-10 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Section - Job Details and More Jobs */}
        <div className="w-full lg:w-2/3 xl:w-3/4 bg-white p-4 md:p-6 rounded-lg relative">
          {/* Sticky Header */}
          <div
            id="job-header"
            className={`p-4 bg-white flex justify-between items-center transition-all duration-300 ${
              isSticky ? "fixed top-15 px-12 left-0 w-full z-10 border-b border-gray-200" : ""
            }`}
          >
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">UI/UX Designer</h1>
              <p className="text-gray-600">Company Name Private Limited</p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-500 text-xs md:text-sm mt-2">
                <span>📍 Gurgaon</span>
                <span>⏳ 1-2 years</span>
                <span>💰 5,00,000 - 8,00,000</span>
              </div>
            </div>
            <button className="bg-black text-white px-4 md:px-6 py-2 rounded-md">
              Apply Now
            </button>
          </div>

          {/* Key Responsibilities */}
          <div className="mt-4 md:mt-6">
            <h2 className="text-base md:text-lg font-semibold">Key Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 text-xs md:text-sm mt-2">
              <li>Collaborate with internal teams and clients to understand project goals and design requirements.</li>
              <li>Lead user research initiatives to identify pain points and needs.</li>
              <li>Design and refine wireframes, prototypes, and UI components.</li>
              <li>Develop user flows, information architectures, and interaction models.</li>
            </ul>
          </div>

          {/* Key Skills */}
          <div className="mt-4 md:mt-6">
            <h2 className="text-base md:text-lg font-semibold">Key Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Figma", "Prototyping", "Wireframing"].map((skill, index) => (
                <span key={index} className="bg-gray-200 text-xs md:text-sm px-3 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* About Company */}
          <div className="mt-4 md:mt-6">
            <h2 className="text-base md:text-lg font-semibold">About Company</h2>
            <p className="text-gray-600 text-xs md:text-sm mt-2">
              Company Name Private Limited is a leading digital solutions provider specializing in UX/UI design, web and app development, and product strategy. Our team focuses on creating engaging user experiences that drive business success.
            </p>
            <p className="text-gray-600 text-xs md:text-sm mt-2">
              Founded in 2015, we have worked with over 500 clients worldwide, helping them build intuitive and innovative digital products.
            </p>
          </div>

          {/* More UI/UX Design Jobs */}
          <div className="mt-6 md:mt-8 border border-dashed border-blue-300 p-3 md:p-4 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">More UI/UX Design Jobs</h2>
            <div className="space-y-3 md:space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-3 md:p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 gap-2"
                >
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">UI/UX Designer</h3>
                    <p className="text-gray-500 text-xs md:text-sm">Company Name Private Limited</p>
                    <div className="text-gray-500 text-xs flex flex-wrap gap-2 md:gap-4 mt-1">
                      <span>📍 Gurgaon</span>
                      <span>⏳ 1-2 years</span>
                      <span>💰 5,00,000 - 8,00,000</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">1 day ago</p>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-center">
                    <span className={`text-xs px-2 py-1 rounded-md ${job.type === "Premium" ? "bg-yellow-300 text-black" : "bg-black text-white"}`}>
                      {job.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Apply Now */}
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold">Apply Now</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-2">Posted: <strong>1 Day ago</strong></p>
          <p className="text-gray-500 text-xs md:text-sm">Openings: <strong>10</strong></p>
          <p className="text-gray-500 text-xs md:text-sm">Applied: <strong>200</strong></p>
          <button className="bg-black text-white px-4 md:px-6 py-2 mt-4 rounded-md w-full">
            Apply Now
          </button>
          <button className="border border-gray-300 px-4 md:px-6 py-2 mt-2 rounded-md w-full">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;