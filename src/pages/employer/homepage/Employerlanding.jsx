import React from 'react';

const EmployerLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">TalentHub</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#" className="border-b-2 border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Solutions
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Pricing
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-xl font-semibold tracking-wide text-blue-200 sm:text-2xl">Find Your Next Great Hire</span>
                <span className="mt-1 block text-4xl font-extrabold sm:text-5xl xl:text-6xl text-white">
                  Connecting Employers with Top Talent
                </span>
              </h1>
              <p className="mt-3 text-base text-blue-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Post jobs, review applications, and hire the best candidates all in one platform. Join thousands of companies who trust TalentHub for their hiring needs.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <button className="py-3 px-6 bg-white text-blue-700 font-bold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Post a Job Today
                </button>
                <button className="ml-4 py-3 px-6 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700">
                  Learn More
                </button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Company Size
                      </label>
                      <select
                        id="size"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      >
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-500 employees</option>
                        <option>501+ employees</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Free Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose GenAi?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our employer tools are designed to streamline your hiring process.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Global Reach</h3>
                <p className="mt-2 text-base text-gray-500">
                  Access a diverse pool of candidates from around the world. Our platform connects you with talent across all industries.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Fast Hiring</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our AI-powered matching algorithm helps you find the perfect candidates faster, reducing time-to-hire by up to 50%.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Secure Hiring</h3>
                <p className="mt-2 text-base text-gray-500">
                  Advanced verification processes ensure candidate authenticity. Our background check integrations provide peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Leading Companies
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AC
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Acme Corp</h3>
                  <p className="text-sm text-gray-500">Technology</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "TalentHub has transformed our hiring process. We've reduced our time-to-hire by 40% and found exceptional candidates we wouldn't have discovered otherwise."
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">- Sarah Johnson, HR Director</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  GI
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Global Industries</h3>
                  <p className="text-sm text-gray-500">Manufacturing</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The quality of candidates we've found through TalentHub is consistently high. Their platform is intuitive and their customer support is exceptional."
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">- Michael Chen, Talent Acquisition Lead</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  FS
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Future Startups</h3>
                  <p className="text-sm text-gray-500">Fintech</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "As a fast-growing startup, we need to hire quickly without sacrificing quality. TalentHub delivers on both fronts. Highly recommended!"
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">- Alex Rivera, CEO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find your next great hire?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                Get started
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
  
    </div>
  );
};

export default EmployerLandingPage;