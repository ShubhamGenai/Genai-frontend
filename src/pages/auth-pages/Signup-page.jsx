import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../component/ui/styles/Particles';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Animation */}
      <div className="hidden lg:flex lg:w-2/2 relative bg-black items-center justify-">
        <div className="absolute inset-0">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text- px-8 text-white z-10"
        >
          <h1 className="text-6xl font-bold mb-3">Welcome to</h1>
          <h2 className="text-6xl font-bold mb-4">
            Gen
            <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
              Ai
            </span> Community
          </h2>
          <p className="text-lg opacity-80 mb-4">Home to AI enthusiasts worldwide</p>
          <button className="text-blue-400 hover:text-blue-600 transition-colors text-sm">
            Learn more
          </button>
        </motion.div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="flex  mb-6">
              <img src="/logo.webp" alt="GenAI Logo" className="w-20 h-10" />
            </Link>
              
            <h1 className="text-3xl text-blue-600 font-bold  mb-1">Join us</h1>
            <h2 className="text-lg text- mb-4">Create a GenAI account</h2>
            <p className="text-gray-600 text-sm text- mb-6">
              Be part of a growing community of AI enthusiasts and developers
            </p>

            <form className="space-y-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                value={formData.password}
                onChange={handleChange}
              />

              <div className="flex items-center text-xs">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
                  className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.agreed}
                  onChange={handleChange}
                />
                <label htmlFor="agreed" className="ml-2 text-gray-600">
                  I agree to <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign up
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button className="w-full px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm">
                <img src="/icons/chrome.png" alt="Google" className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm">
                  <img src="/icons/github.png" alt="GitHub" className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm">
                  <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
              </div>

              <p className="text-center text-xs text-gray-600 mt-3">
                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
