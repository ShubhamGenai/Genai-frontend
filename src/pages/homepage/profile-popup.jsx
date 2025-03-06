import React, { useState, useContext, useEffect } from 'react';
import { mainContext } from '../../context/MainContext';
import { X, ChevronRight, User, Mail, BookOpen, Code, Shield } from 'lucide-react';

export default function ProfilePopup({ onSubmit, onClose }) {
  const { user } = useContext(mainContext);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Handle escape key press for closing
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, []);
  
  // Handle close with confirmation if needed
  const handleClose = () => {
    // Optional: Add confirmation if user has entered data
    if (currentStep > 1) {
      if (window.confirm('Are you sure you want to close? Your progress will be lost.')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: e.target.name.value,
      email: e.target.email.value,
      course: e.target.course?.value,
      experience: e.target.experience?.value
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                ${currentStep > index + 1 
                  ? 'bg-green-500 text-white' 
                  : currentStep === index + 1 
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                    : 'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`h-1 w-12 mx-2 transition-all duration-300 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="space-y-6">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <p>This information helps us personalize your learning experience and provide important security updates.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900">Basic Information</h3>
                  <p className="text-gray-700 mb-6">Let us know who you are so we can personalize your hacking experience.</p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <User size={80} className="text-indigo-600" />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-4">Your information is securely stored and will only be used to enhance your platform experience.</p>
                  <div className="p-3 bg-indigo-100 rounded-lg text-sm text-indigo-800">
                    <p className="font-medium">💡 Pro Tip</p>
                    <p>Use your school email for access to additional student resources.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Next <ChevronRight className="ml-2" size={18} />
              </button>
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="space-y-6">
                <div className="mb-6">
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Primary Course</label>
                  <select
                    id="course"
                    name="course"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  >
                    <option value="">Select your course</option>
                    <option value="web-security">Web Security</option>
                    <option value="network-penetration">Network Penetration</option>
                    <option value="cryptography">Cryptography</option>
                    <option value="reverse-engineering">Reverse Engineering</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    id="experience"
                    name="experience"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  >
                    <option value="">Select your experience</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <p>Your course selection helps us tailor challenges to your specific interests and skill level.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900">Course Information</h3>
                  <p className="text-gray-700 mb-6">Select your primary course and experience level to access relevant challenges and materials.</p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <BookOpen size={80} className="text-indigo-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-800 mb-1">Web Security</h4>
                    <p className="text-xs text-gray-600">XSS, CSRF, SQL injection</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-800 mb-1">Network</h4>
                    <p className="text-xs text-gray-600">Scanning, exploitation</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-800 mb-1">Cryptography</h4>
                    <p className="text-xs text-gray-600">Ciphers, hashing, PKI</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-800 mb-1">Reverse Eng.</h4>
                    <p className="text-xs text-gray-600">Binary analysis, debugging</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Next <ChevronRight className="ml-2" size={18} />
              </button>
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="space-y-6">
                <div className="p-5 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <h4 className="font-medium text-green-800 mb-2 text-lg">You're almost ready!</h4>
                  <p className="text-green-700">Review your information and submit to start your Learning journey.</p>
                </div>
                
                <div className="bg-gray-900 text-green-400 p-5 rounded-lg font-mono text-sm shadow-lg overflow-hidden">
                  <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-gray-700">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="text-gray-400 text-xs">Terminal</div>
                  </div>
                  <div className="mb-2"> Initializing profile setup...</div>
                  <div className="mb-2"> User authentication: <span className="text-white">VERIFIED</span></div>
                  <div className="mb-2"> Profile data: <span className="text-white">VALIDATED</span></div>
                  <div className="mb-2"> System access: <span className="text-yellow-400">PENDING</span></div>
                  <div className="mb-2"> Security clearance: <span className="text-gray-400">AWAITING CONFIRMATION</span></div>
                  <div className="animate-pulse"> _</div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-start">
                  <div className="mr-2 mt-1">⚠️</div>
                  <p>By completing this profile, you agree to follow our  guidelines and code of conduct.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900">Complete Setup</h3>
                  <p className="text-gray-700 mb-6">Submit your profile to gain access to our exclusive hacking challenges and learning resources.</p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <Shield size={80} className="text-indigo-600" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-indigo-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</div>
                      <p>You'll gain access to your personalized dashboard</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</div>
                      <p>Your initial set of challenges will be unlocked</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</div>
                      <p>You can join the community forum and connect with peers</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                Complete Setup
              </button>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleClose}>
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0  backdrop-blur-sm"></div>

      {/* Main content container with black border */}
      <div
        className="relative bg-white border-1 border-black rounded-2xl w-full max-w-6xl h-fit h-[650px] mx-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none z-10 bg-gray-100 p-2 rounded-full transition-all hover:scale-110 shadow-md"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content container */}
        <div className="h-full flex flex-col p-10 overflow-hidden">
          {/* Header Section */}
          <div className="flex-none text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Complete Your Gen{" "}
              <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                Ai
              </span>{" "}
              Profile
            </h2>
            <p className="text-gray-600 mt-2">
              Set up your profile to unlock personalized challenges and track your progress.
            </p>

            {renderStepIndicator()}
          </div>

          {/* Scrollable content */}
          <div className="flex-grow overflow-y-auto mt-6 pr-2">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex-grow">{renderStepContent()}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}