import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../component/ui/styles/Particles';
import { Link } from 'react-router-dom';


// const ParticleBackground = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       <div className="absolute inset-0 opacity-30">
//         {[...Array(50)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-purple-400 rounded-full"
//             initial={{ 
//               x: Math.random() * 100 + "%", 
//               y: Math.random() * 100 + "%" 
//             }}
//             animate={{ 
//               x: Math.random() * 100 + "%", 
//               y: Math.random() * 100 + "%" 
//             }}
//             transition={{ 
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

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
      {/* Left Side - Background Animation */}
      <div className="hidden lg:flex lg:w-2/3 relative bg-black">
        {/* <ParticleBackground /> */}
       

<div style={{ width: '100%', height: '900px', position: 'relative' }} >
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
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-3xl text- font-bold mb-4">Welcome to</div>
            <div className="text-5xl text-  font-bold mb-6">Gen<span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
              Ai
            </span> Community</div>
            <p className="text-xl text- opacity-80">Home to AI enthusiasts worldwide</p>
            <button className="text-blue-400 hover:text-blue-600 mt-4 transition-colors">
              Learn more
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/">
            <div className="flex  mb-6">
              <img src="/logo.webp" alt="GenAI Logo" className="w-24 h-12" />
            </div>
            </Link>
              
            <h1 className="text-3xl text-blue-600 font-bold mb-2">Join us</h1>
            <h2 className="text-2xl mb-6">Create a GenAI account</h2>
            <p className="text-gray-600 mb-8">
              Be part of a growing community of AI enthusiasts and developers
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.agreed}
                  onChange={handleChange}
                />
                <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
                  I agree to GenAI's{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign up
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                  <img src="/icons/gmail.png" alt="Google" className="w-5 h-5" />
                  
                  <span>Continue with Google</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                    <img src="/icons/github.png" alt="GitHub" className="w-5 h-5" />
                    <span>GitHub</span>
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                    <img src="/icons/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline">Log in</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;