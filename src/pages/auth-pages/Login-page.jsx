import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../component/ui/styles/Particles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../constants/ApiConstants';
import { mainContext } from '../../context/MainContext';
import { auth,signInWithPopup,provider } from '../../config/firebase';
import { LuGraduationCap } from 'react-icons/lu';

const LoginPage = () => {
  const { setUser, setToken } = useContext(mainContext);
  const [googleLoading,setGoogleLoading]= useState(false);
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
  // const handleGoogleLogin = () => {
  //   setGoogleLoading(true);
  //   try {
  //     // Redirect to backend Google OAuth route
  //     window.location.href = `${API_BASE_URL}/auth/google`;
  //   } catch (error) {
  //     toast.error('Google Login Error:', error);
  //     toast('An error occurred during Google login');
  //   } finally {
  //     setGoogleLoading(false);
  //   }
  // };


  const handleGoogleLogin = async () => {
  setGoogleLoading(true);
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { displayName, email, uid } = user;

    const res = await axios.post(`${API_BASE_URL}/auth/google`, {
      name: displayName,
      email,
      firebaseUid: uid,
    });

    console.log(res.data);
    
    // ✅ Correct destructuring based on backend response format
    const { token, user: backendUser } = res.data;
    
    // ✅ Set localStorage with proper data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(backendUser));

    // ✅ Update context state
    setUser(backendUser);
    setToken(token);

    // ✅ Show success message
    toast.success('Google login successful!');
    
    // ✅ Navigate to home
    navigate("/");
    
  } catch (err) {
    console.error("Google login error:", err);
    
    // ✅ Handle different types of errors
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else if (err.code === 'auth/popup-closed-by-user') {
      toast.error('Login cancelled by user');
    } else {
      toast.error('Google login failed. Please try again.');
    }
  } finally {
    setGoogleLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FA]">

      <Link to="/" className="flex items-center justify-center mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
          Gen{' '}
          <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-700 transition-all duration-500">
            AI
          </span>
        </h1>
      </Link>
      {/* <h1 className="text-lg font-semibold text-center text-blue-600 mb-0">LearnAI</h1> */}
      <p className="text-gray-600 text-center text-base mb-4">Welcome back! Sign in to continue learning</p>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-2">Log In</h2>
            <p className="text-gray-700 text-base mb-3">
              Enter your credentials to access your account
            </p>

           <form className="space-y-4" onSubmit={loginUser}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}

      <button type="submit" className="w-full py-2 bg-[#212121] text-white rounded-lg flex items-center justify-center font-medium text-base">
                {loading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
              Log In
              </button>


      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 text-sm">OR CONTINUE WITH</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
          onClick={handleGoogleLogin}  >
          {googleLoading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-gray-500 rounded-full" viewBox="0 0 24 24"></svg>}
          <img src="/icons/gmail.png" alt="Google" className="w-4 h-4" />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
        >
          <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4" />
          <span>LinkedIn</span>
        </button>
      </div>
     

      <p className="text-center text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <Link to="/signup?role=student" className="text-blue-600 hover:underline text-sm">
          Sign up
        </Link>
      </p>
    </form>
          </div>
          <p className="text-center text-sm text-gray-500 mt-5">
        <Link to="/" className="hover:underline text-sm">
          ← Back to home
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
