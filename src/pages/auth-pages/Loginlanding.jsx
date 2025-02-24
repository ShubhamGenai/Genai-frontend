import React from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'

const LoginLandingPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div className="w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">

              {/* Student Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center items-center bg-blue-600 bg-opacity-5 text-white p-10 md:p-20 w-full h-full"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6 text-center">
              For <span className="font-semibold">Students</span>
            </h2>
            <p className="text-lg md:text-xl font-light mb-8 max-w-md text-center">
              Join millions of students, practice coding skills, prepare for interviews, and land your dream job.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-2 md:py-3 bg-white text-blue-600 text-lg rounded-lg font-light hover:bg-gray-200 transition-colors"
            >
              Login
            </motion.button>
            <p className="mt-4 text-md font-normal">Don't have an account?</p>
            <p className="text-md font-normal">
              <Link  to="/create-account?user=student" className="font-bold hover:text-green-400">Sign up</Link>
            </p>
          </motion.div>
          
          {/* Employer Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center text-black p-10 md:p-20 w-full h-full"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6 text-center">
              For <span className="font-semibold text-green-600">Employers</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-500 mb-8 max-w-md">
              We help companies identify and hire the best developers with the right skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white text-lg rounded-lg font-light hover:bg-blue-500 transition-colors"
            >
              Login
            </motion.button>
            <p className="mt-4 text-md font-normal">Don't have an account?</p>
            <p className="text-md font-normal">
              <a href="#" className="font-bold hover:text-green-600">Contact sales</a>
              {' '}or{' '}
              <a href="#" className="font-bold hover:text-green-600">Get free trial</a>
            </p>
          </motion.div>

        
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPage;
