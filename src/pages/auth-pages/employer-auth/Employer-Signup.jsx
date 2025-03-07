import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email verification, Step 2: Set password
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate organization email format (must contain @ and a domain)
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!regex.test(email)) {
      return "Please enter a valid email address";
    }
    
    // Check if it's likely a personal email domain
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    const domain = email.split('@')[1];
    
    if (personalDomains.includes(domain)) {
      return "Please use your organization email";
    }
    
    return "";
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    setEmailError(error);
    
    if (!error) {
      // In a real app, you would verify the email exists first
      setStep(2);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // In a real app, you would submit the form to your backend here
    alert("Registration successful!");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white">
        <div className="mb-8">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">GA</span>
            </div>
            <span className="ml-2 text-xl font-bold text-blue-800">GenAI Talent</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          {step === 1 ? "Join GenAI Talent" : "Set Your Password"}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {step === 1 
            ? "Find AI-powered talent for your organization in just 48 hours." 
            : "Create a secure password for your employer account."}
        </p>
        
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="yourname@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Continue
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/employer-signin" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
                required
              />
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Create Account
            </button>
            
            <button
              type="button"
              className="w-full mt-3 bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-4 rounded-md transition duration-300"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}
      </div>
      
      {/* Right Panel */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800 opacity-20"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-400 opacity-10"></div>
          <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-10"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-white opacity-5"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center px-8 py-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Hire Top Talent in 48 Hours</h2>
            <p className="text-xl mb-12 text-blue-100">
              Join thousands of companies leveraging AI to revolutionize their hiring process
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-xl">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-14 w-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Fast Recruitment</h3>
                    <p className="text-blue-100">AI-powered matching in just 48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-14 w-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.021A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Extensive Talent Pool</h3>
                    <p className="text-blue-100">Over 5 crore qualified candidates</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-14 w-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Nationwide Coverage</h3>
                    <p className="text-blue-100">Available in 900+ cities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">GP</span>
                </div>
                <div className="ml-4">
                  <div className="text-lg font-semibold text-white">Gaurav Patel</div>
                  <div className="text-sm text-blue-100">HR Director, TechSolutions</div>
                </div>
              </div>
              <blockquote className="text-blue-100 italic">
                "GenAI Talent transformed our hiring process. We found qualified developers in just 2 days compared to weeks with traditional methods. The AI matching is incredibly accurate."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegistration;