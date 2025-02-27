import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../component/ui/styles/Particles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../constants/ApiConstants';
import { mainContext } from '../../context/MainContext';

const LoginPage = () => {
  const { setUser, setToken } = useContext(mainContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const email = formData.email?.trim();
    const password = formData.password?.trim();

    if (!email || !password) {
      const message = "Email and password are required!";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    try {
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

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
      console.error("Login error:", error.response?.data || error); // Debugging
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    try {
      // Redirect to backend Google OAuth route
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (error) {
      toast.error('Google Login Error:', error);
      toast('An error occurred during Google login');
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen">
      {/* Left Side - Animation */}
      <div className="hidden lg:flex lg:w-2/2 relative bg-black items-center ">
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
          className=" px-8 text-white z-10"
        >
          <h1 className="text-6xl font-bold mb-3">Welcome back to</h1>
          <h2 className="text-6xl font-bold mb-4">
            Gen
            <span className="bg-gradient-to-r from-[hsla(221,83%,53%,1)] to-[hsla(155,100%,31%,1)] text-transparent bg-clip-text">
              Ai
            </span> 
          </h2>
          <p className="text-lg opacity-80 mb-4">Reconnect with AI enthusiasts worldwide</p>
          <button className="text-blue-400 hover:text-blue-600 transition-colors text-lg">
            Learn more
          </button>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="flex  mb-6">
              <img src="/logo.webp" alt="GenAI Logo" className="w-24 h-12" />
            </Link>
            
            <h1 className="text-3xl text-blue-600 font-bold  mb-1">Welcome Back</h1>
            <h2 className="text-lg  mb-4">Log in to your GenAI account</h2>
            <p className="text-gray-600 text-sm  mb-6">
              It's nice to see you again. Ready to Learn?
            </p>

           <form className="space-y-3" onSubmit={loginUser}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="text-right text-xs">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>} {/* Show error message */}

      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                {loading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
              Login
              </button>


      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
        onClick={handleGoogleLogin}  >
        <img src="/icons/chrome.png" alt="Google" className="w-4 h-4" />
        <span>Continue with Google</span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
        >
          <img src="/icons/github.png" alt="GitHub" className="w-4 h-4" />
          <span>GitHub</span>
        </button>
        <button
          type="button"
          className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
        >
          <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4" />
          <span>LinkedIn</span>
        </button>
      </div>

      <p className="text-center text-xs text-gray-600 mt-3">
        Don't have an account?{" "}
        <Link to="/signup?role=student" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
