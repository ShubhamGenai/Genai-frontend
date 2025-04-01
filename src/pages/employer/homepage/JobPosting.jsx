import React, { useState } from 'react';

const JobPostingPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    location: '',
    employmentType: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically send the data to an API
    console.log("Job posting data:", formData);
    alert("Job posting created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="pb-5 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Post a New Job
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below to create a new job posting. All fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                  Job Title *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="department"
                    id="department"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="City, State, Remote, etc."
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                  Employment Type *
                </label>
                <div className="mt-1">
                  <select
                    id="employmentType"
                    name="employmentType"
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={formData.employmentType}
                    onChange={handleChange}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience Level *
                </label>
                <div className="mt-1">
                  <select
                    id="experience"
                    name="experience"
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select experience level</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Executive</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="e.g. $50,000 - $70,000 per year"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Job Description *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Describe the role, responsibilities, and ideal candidate..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Requirements *
                </label>
                <div className="mt-1">
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="List skills, qualifications, education, etc."
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tip: Use bullet points for better readability (• Requirement one • Requirement two)
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Benefits
                </label>
                <div className="mt-1">
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={4}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Health insurance, paid time off, 401(k), etc."
                    value={formData.benefits}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 bg-gray-50 p-4 rounded-md mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="featured" className="font-medium text-gray-700">Feature this job posting</label>
                    <p className="text-gray-500">Featured job postings appear at the top of search results and include a highlighted badge. ($49.99 additional fee)</p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow mt-6 p-6">
            <h2 className="text-lg font-medium text-gray-900">Job Posting Tips</h2>
            <div className="mt-4 space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <strong>Be specific in your job title</strong> - Use industry-standard titles that candidates are searching for.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <strong>Highlight your company culture</strong> - Candidates want to know what it's like to work at your company.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <strong>Be transparent about salary</strong> - Job postings with salary information receive 30% more applications.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <strong>Keep requirements realistic</strong> - List only must-have qualifications to avoid deterring qualified candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPage;