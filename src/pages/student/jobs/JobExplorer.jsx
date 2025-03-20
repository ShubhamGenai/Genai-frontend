import React, { useState } from "react";
import FilterSidebar from "./JobSidebar";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

const JobExplorer = ({ jobs, filters, sortOptions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const jobsPerPage = 5; // Number of jobs per page

  // Calculate total pages dynamically
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Slice jobs based on current page
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <main className="px-8 md:px-16 py-6 flex-grow">
      <h2 className="text-lg font-semibold mb-5">Explore Jobs</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <FilterSidebar filters={filters} />

        {/* Job Listings */}
        <div className="w-full md:w-3/4">
          <div className="bg-white p-4 rounded shadow-sm mb-5 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {jobs.length} results for Data Analyst Jobs
            </span>
            <div className="flex items-center relative">
              <span className="text-sm mr-2">Sort By</span>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded flex items-center"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                {sortBy}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${
                    showSortOptions ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showSortOptions && (
                <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded py-1 z-10 w-40">
                  {sortOptions.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy(option);
                        setShowSortOptions(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Job Cards */}
          {paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </main>
  );
};

export default JobExplorer;
