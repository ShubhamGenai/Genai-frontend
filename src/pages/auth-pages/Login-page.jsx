import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../component/ui/styles/Particles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../constants/ApiConstants';
import { mainContext } from '../../context/MainContext';
import { auth,signInWithPopup,provider } from '../../config/firebase';
import { LuGraduationCap } from 'react-icons/lu';

const LoginPage = () => {
  const { setUser, setToken, user } = useContext(mainContext); // Added 'user' to context
  const [googleLoading,setGoogleLoading]= useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToPayment, setRedirectToPayment] = useState(null);
  
  // Mobile login states
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState('');
  const [mobileLoading, setMobileLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Effect to capture redirect information from location state on component mount
  useEffect(() => {
    if (location.state?.itemId && location.state?.itemType) {
      console.log('LoginPage: Captured redirect state for payment:', location.state);
      setRedirectToPayment({
        itemId: location.state.itemId,
        itemType: location.state.itemType,
      });
    }
  }, [location.state]);

  // Effect to handle redirection after user logs in
  useEffect(() => {
    console.log('LoginPage: useEffect for redirection triggered. User:', user, 'RedirectToPayment:', redirectToPayment);
    if (user?.role) {
      if (redirectToPayment) {
        // If there's pending payment redirect, navigate there
        console.log(`LoginPage: User logged in, redirecting to payment for ${redirectToPayment.itemType} ID ${redirectToPayment.itemId}`);
        const { itemId, itemType } = redirectToPayment;
        navigate(`/payment/initiate/${itemType}/${itemId}`, { replace: true });
      } else {
        // User logged in but no specific payment redirect, go to default dashboard
        console.log('LoginPage: User logged in, no pending payment, redirecting to default dashboard.');
        const roleRedirects = {
          admin: "/admin",
          content: "/content",
          employer: "/employer/home",
          student: "/student",
        };
        navigate(roleRedirects[user.role] || "/", { replace: true });
      }
    }
  }, [user, redirectToPayment, navigate, location.pathname]); // Added location.pathname to dependency array

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
        // The useEffect above will now handle the navigation after login state updates
        // No direct navigate('/') here anymore
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
    
    const { token, user: backendUser } = res.data;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(backendUser));

    setUser(backendUser);
    setToken(token);

    toast.success('Google login successful!');
    // The useEffect above will now handle the navigation after login state updates
    // No direct navigate("/") here anymore
    
  } catch (err) {
    console.error("Google login error:", err);
    
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

  const handleMobileLogin = () => {
    setShowMobileLogin(true);
    setShowOtpSection(false);
    setMobileNumber('');
    setOtp('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMobileLoading(true);
    setError(null);

    if (!mobileNumber?.trim()) {
      const message = "Mobile number is required!";
      setError(message);
      toast.error(message);
      setMobileLoading(false);
      return;
    }

    // Validate mobile number (basic validation)
    if (!/^\d{10}$/.test(mobileNumber.trim())) {
      const message = "Please enter a valid 10-digit mobile number!";
      setError(message);
      toast.error(message);
      setMobileLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/send-otp`, {
        mobile: mobileNumber.trim()
      });

      if (response.data?.success) {
        toast.success('OTP sent successfully!');
        setShowOtpSection(true);
      } else {
        toast.error(response.data?.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error("Send OTP error:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setMobileLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError(null);

    if (!otp?.trim()) {
      const message = "Please enter the OTP!";
      setError(message);
      toast.error(message);
      setOtpLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/verify-otp`, {
        mobile: mobileNumber.trim(),
        otp: otp.trim()
      });

      if (response.data?.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));

        toast.success('Login successful!');
        setShowMobileLogin(false);
        setShowOtpSection(false);
      } else {
        toast.error(response.data?.message || 'Invalid OTP.');
      }
    } catch (error) {
      console.error("Verify OTP error:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setOtpLoading(false);
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
            <h2 className="text-2xl font-semibold mb-2">{showMobileLogin ? 'Mobile Login' : 'Log In'}</h2>
            <p className="text-gray-700 text-base mb-3">
              {showMobileLogin ? 'Enter your mobile number to receive OTP' : 'Enter your credentials to access your account'}
            </p>

           {/* Normal Login Form */}
           {!showMobileLogin && (
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
          onClick={handleMobileLogin}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Mobile</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <Link to="/signup?role=student" className="text-blue-600 hover:underline text-sm">
          Sign up
        </Link>
      </p>
    </form>
           )}
      
      {/* Mobile Login Form */}
      {showMobileLogin && (
        <div>
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                id="mobile-number"
                name="mobile"
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength="10"
                required
                disabled={showOtpSection}
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            {!showOtpSection && (
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium text-base hover:bg-blue-700 transition"
                disabled={mobileLoading}
              >
                {mobileLoading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
                Send OTP
              </button>
            )}
          </form>
          
          {/* OTP Section */}
          {showOtpSection && (
            <form onSubmit={handleVerifyOtp} className="mt-4 pt-4 border-t border-gray-300 space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg flex items-center justify-center font-medium text-base hover:bg-green-700 transition"
                disabled={otpLoading}
              >
                {otpLoading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
                Verify & Login
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-2 text-blue-600 text-sm hover:underline"
                disabled={mobileLoading}
              >
                Resend OTP
              </button>
            </form>
          )}
          
          <button
            type="button"
            onClick={() => {
              setShowMobileLogin(false);
              setShowOtpSection(false);
              setError(null);
              setMobileNumber('');
              setOtp('');
            }}
            className="w-full mt-4 py-2 text-gray-600 text-sm hover:underline"
          >
            ← Back to Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Don't have an account?{" "}
            <Link to="/signup?role=student" className="text-blue-600 hover:underline text-sm">
              Sign up
            </Link>
          </p>
        </div>
      )}
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
