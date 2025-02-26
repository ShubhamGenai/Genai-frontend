import React, { useState } from "react";

const Section = () => {
  const [activeTab, setActiveTab] = useState("student");

  const tabs = [
    { id: "student", label: "Student" },
    { id: "jobseekers", label: "Job Seekers" },
    { id: "employer", label: "Employer" },
  ];

  const getTabContent = (tabId) => {
    switch (tabId) {
      case "student":
        return {
          title: "Learn & Grow",
          items: [
            "Buy Expert-Led Courses",
            "Get Certifications",
            "Gain Job-Ready Skills",
          ],
        };
      case "jobseekers":
        return {
          title: "Find Opportunities",
          items: ["Browse Job Listings", "Submit Applications", "Track Progress"],
        };
      case "employer":
        return {
          title: "Hire Talent",
          items: ["Post Job Openings", "Review Applications", "Schedule Interviews"],
        };
      default:
        return { title: "", items: [] };
    }
  };

  const currentContent = getTabContent(activeTab);

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen px-2 sm:px-4">
      {/* Intro Section */}
      <div className="bg-gray-100 w-full pt-20 pb-4 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl lg:ml-8 mb-4 sm:mb-8 text-gray-900">
          <span className='font-semibold'>One Platform, Many </span><span className="text-green-500 font-bold">Possibilities</span>
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-full sm:max-w-3xl lg:ml-8 mx-auto lg:mx-0">
            The ultimate platform for students, job seekers, and employers. Gain skills, land jobs, and find top talent—all in one seamless experience.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex justify-center items-center bg-gray-100 w-full pb-5">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8 max-w-7xl w-full px-2 sm:px-4">
          {/* Image Section */}
          <div className="p-2 sm:p-3 rounded-2xl">
            <div className="bg-white p-2 border-white rounded-3xl">
              <div className="w-full max-w-full sm:max-w-[679.38px] h-auto rounded-lg">
                <img
                  src="classlive.png"
                  alt="Description"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col space-y-4 w-full max-w-full sm:max-w-[501px] mt-5">
            <div className="p-4 sm:p-6">
              {/* Tabs */}
              <div className="flex flex-col sm:flex-row rounded-3xl bg-white p-1 w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 sm:py-5 px-4 rounded-3xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-800 hover:bg-blue-600"
                    } font-semibold text-sm sm:text-md`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Card */}
              <div className="py-4 sm:py-6">
                <div className="bg-white rounded-3xl p-4 sm:p-6 pb-8 sm:pb-14">
                  <h2 className="text-xl sm:text-2xl text-gray-600 mb-4 sm:mb-6">{currentContent.title}</h2>

                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[15px] top-[25px] w-[1.5px] h-[calc(100%-40px)] bg-gray-200"></div>

                    {/* Items */}
                    <div className="space-y-6 sm:space-y-8">
                      {currentContent.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 relative mb-4 sm:mb-6">
                          <div className="w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] rounded-full bg-emerald-400 flex items-center justify-center z-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 sm:h-4 w-3 sm:w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-sm sm:text-lg text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
