import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import axios from 'axios';
import { EMPLOYERENDPOINTS } from '../../../constants/ApiConstants';
import { toast } from "react-toastify"; 
import { mainContext } from '../../../context/MainContext';

const EmployerSignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(mainContext);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
  
    // ✅ Validate inputs before sending request
    if (!email) {
      setEmailError("Email is required.");
      setLoading(false);
      return toast.error("Email is required.");
    }
  
    if (!password) {
      setPasswordError("Password is required.");
      setLoading(false);
      return toast.error("Password is required.");
    }
  
  
  
    try {
      const response = await axios.post(EMPLOYERENDPOINTS.EMPLOYER_SIGNIN, {
        email,
        password,
      });
  
      setLoading(false);
  
      if (response.data?.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));

        toast.success('Login successful!');
        navigate('/'); // Ensure you have `useNavigate`
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
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
           <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className=" px-8 text-white z-10"
                >
        
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Welcome back
        </h1>
        
        <p className="text-gray-600 mb-8">
          Sign in to access your employer dashboard
        </p>
        
        <form onSubmit={handleSignIn}>
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Organization Email
    </label>
    <input
      type="email"
      id="email"
      className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
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

  <div className="mb-4">
    <div className="flex items-center justify-between">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <a href="#" className="text-sm text-blue-600 hover:underline">
        Forgot password?
      </a>
    </div>
    <input
      type="password"
      id="password"
      className={`w-full px-4 py-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        setPasswordError('');
      }}
      required
    />
    {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
  </div>

  <div className="flex items-center mb-6">
    <input
      id="rememberMe"
      type="checkbox"
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
    />
    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
      Remember me
    </label>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
  >
    Sign In
  </button>

  <div className="mt-6 text-center">
    <p className="text-sm text-gray-600">
      Don't have an account?{" "}
      <Link to="/employer-signup?role=employer" className="text-blue-600 hover:underline font-medium">
        Register now
      </Link>
    </p>
  </div>
</form>

        </motion.div>
      </div>
      
      {/* Right Panel */}
        {/* Enhanced Right Panel */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800 opacity-20"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-400 opacity-10"></div>
          <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-10"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-white opacity-5"></div>
        </div>
         <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                   
                  >
        <div className="relative h-full flex flex-col justify-center items-center px-8 py-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Transform Your Hiring Process</h2>
            <p className="text-xl mb-12 text-blue-100">
              Leverage AI technology to find the perfect talent for your organization
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">48-Hour Hiring</h3>
                  <p className="text-blue-100 mt-1">Find qualified candidates in just 48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">AI-Powered Matching</h3>
                  <p className="text-blue-100 mt-1">Precision matching using advanced algorithms</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">5+ Crore Candidates</h3>
                  <p className="text-blue-100 mt-1">Access our vast pool of qualified talent</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <span className="text-lg font-medium text-blue-100">Trusted by 7+ lakh employers across 900+ cities</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 h-12 rounded-md flex items-center justify-center backdrop-blur-sm">
                  <div className="w-20 h-6 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerSignIn;