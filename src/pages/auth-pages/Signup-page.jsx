import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../constants/ApiConstants';
import axios from 'axios';
import { auth, signInWithPopup, provider } from '../../config/firebase';
import { mainContext } from '../../context/MainContext';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Added state for Google loading
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const { setUser, setToken } = useContext(mainContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreed: false,
    role:role
  });

  // Mobile signup states
  const [showMobileSignup, setShowMobileSignup] = useState(false);
  const [mobileFormData, setMobileFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileLoading, setMobileLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const registerUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    // Check for required fields
    if (!formData.fullName || !formData.email || !formData.password || !formData.agreed) {
        setError("All fields are required and must accept terms!");
        toast.error("All fields are required and must accept terms!");
        setLoading(false); // Ensure loading is stopped before returning
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);

        if (response.data.success) {
            toast.success("Registration successful! Verifying OTP...");
            setStep(2); // Move to OTP step if required
        } else {
            setError(response.data.message);
            toast.error(response.data.message);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
};

const handleGoogleSignup = async () => {
  setGoogleLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { displayName, email, uid } = user;

    const res = await axios.post(`${API_BASE_URL}/auth/google`, {
      name: displayName,
      email,
      firebaseUid: uid,
      // role: formData.role // Pass the role from signup form
    });

    const { token, user: backendUser } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(backendUser));
        // ✅ Update context state
    setUser(backendUser);
    setToken(token);

    toast.success('Google signup successful!');
    navigate("/");
  } catch (err) {
    console.error("Google signup error:", err);

    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else if (err.code === 'auth/popup-closed-by-user') {
      toast.error('Signup cancelled by user');
    } else {
      toast.error('Google signup failed. Please try again.');
    }
  } finally {
    setGoogleLoading(false);
  }
};


const verifyOtp = async (e) => {
  setLoading(true);
  e.preventDefault();
  toast.info('Verifying OTP...', { autoClose: 3000 });

  try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
          email: formData.email,
          otp: otp
      });

      if (response.data.success) {
          setOtpVerified(true);
          toast.success('OTP verified successfully!');
         
              navigate("/login"); // Redirect to home after a short delay
         
      } else {
          setError(response.data.message);
          toast.error(response.data.message);
      }
  } catch (error) {
      setError('OTP verification failed. Please try again.');
      toast.error('OTP verification failed. Please try again.');
  } finally {
      setLoading(false);
  }
};

const resendOtp = async () => {
  setLoading(true);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, { email: formData.email });
    if (response.data.success) {
      toast.success('New OTP sent successfully!');
      setResendTimer(60); // Reset timer
    } else {
      toast.error(response.data.message || 'Failed to resend OTP.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to resend OTP.';
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  let timerInterval;
  if (step === 2 && resendTimer > 0) {
    timerInterval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
  }
  return () => clearInterval(timerInterval);
}, [step, resendTimer]);

const handleMobileChange = (e) => {
  const { name, value } = e.target;
  setMobileFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleMobileSignup = () => {
  setShowMobileSignup(true);
  setShowOtpSection(false);
  setMobileFormData({ name: '', email: '', mobile: '' });
  setMobileOtp('');
};

const handleSendMobileOtp = async (e) => {
  e.preventDefault();
  setMobileLoading(true);
  setError('');

  const { name, email, mobile } = mobileFormData;

  if (!name?.trim() || !email?.trim() || !mobile?.trim()) {
    const message = "All fields are required!";
    setError(message);
    toast.error(message);
    setMobileLoading(false);
    return;
  }

  // Validate mobile number (basic validation)
  if (!/^\d{10}$/.test(mobile.trim())) {
    const message = "Please enter a valid 10-digit mobile number!";
    setError(message);
    toast.error(message);
    setMobileLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup/send-otp`, {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      role: role || 'student'
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

const handleVerifyMobileOtp = async (e) => {
  e.preventDefault();
  setOtpLoading(true);
  setError('');

  if (!mobileOtp?.trim()) {
    const message = "Please enter the OTP!";
    setError(message);
    toast.error(message);
    setOtpLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup/verify-otp`, {
      mobile: mobileFormData.mobile.trim(),
      otp: mobileOtp.trim()
    });

    if (response.data?.token) {
      setToken(response.data.token);
      setUser(response.data.user);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || {}));

      toast.success('Signup successful!');
      navigate('/');
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
      <p className="text-gray-600 text-center text-base mb-4">Create an account to start your learning journey</p>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        {step === 1 ? (
          <>
          {!showMobileSignup && (
          <form className="space-y-4" onSubmit={registerUser}>
            <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
            <p className="text-gray-700 text-base mb-3">
              Enter your details to create your account
            </p>

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
                I agree to{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" className="w-full py-2 bg-[#212121] text-white rounded-lg flex items-center justify-center font-medium text-base">
                {loading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
                Sign up
              </button>


            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
                onClick={handleGoogleSignup} >
                {googleLoading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-gray-500 rounded-full" viewBox="0 0 24 24"></svg>}
                <img src="/icons/gmail.png" alt="Google" className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm"
                onClick={handleMobileSignup}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile</span>
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>

          </form>
          )}

          {/* Mobile Signup Form */}
          {showMobileSignup && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Mobile Signup</h2>
              <p className="text-gray-700 text-base mb-3">
                Enter your details to create your account
              </p>
              <form onSubmit={handleSendMobileOtp} className="space-y-4">
                <div>
                  <label htmlFor="mobile-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="mobile-name"
                    name="name"
                    placeholder="Your full name"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    value={mobileFormData.name}
                    onChange={handleMobileChange}
                    required
                    disabled={showOtpSection}
                  />
                </div>
                <div>
                  <label htmlFor="mobile-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="mobile-email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    value={mobileFormData.email}
                    onChange={handleMobileChange}
                    required
                    disabled={showOtpSection}
                  />
                </div>
                <div>
                  <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile-number"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    value={mobileFormData.mobile}
                    onChange={handleMobileChange}
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
                <form onSubmit={handleVerifyMobileOtp} className="mt-4 pt-4 border-t border-gray-300 space-y-4">
                  <div>
                    <label htmlFor="mobile-otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                    <input
                      type="text"
                      id="mobile-otp"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                      value={mobileOtp}
                      onChange={(e) => setMobileOtp(e.target.value)}
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
                    Verify & Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={handleSendMobileOtp}
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
                  setShowMobileSignup(false);
                  setShowOtpSection(false);
                  setError('');
                  setMobileFormData({ name: '', email: '', mobile: '' });
                  setMobileOtp('');
                }}
                className="w-full mt-4 py-2 text-gray-600 text-sm hover:underline"
              >
                ← Back to Sign Up
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
          </>
        ) : (
          // OTP Verification Step
          <form className="space-y-4" onSubmit={verifyOtp}>
            <h2 className="text-2xl font-semibold mb-2">Verify OTP</h2>
            <p className="text-gray-700 text-base mb-3">Enter the OTP sent to {formData.email}</p>

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button type="submit" className="w-full py-2 bg-[#212121] text-white rounded-lg flex items-center justify-center font-medium text-base">
              {loading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
              Verify OTP
            </button>

            <p className="text-center text-sm mt-3">
              Didn't receive the OTP?{" "}
              <button 
                type="button" 
                onClick={resendOtp}
                disabled={loading || resendTimer > 0} // Disable during loading or timer countdown
                className={`text-blue-600 hover:underline ${loading || resendTimer > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-blue-600 rounded-full inline-block" viewBox="0 0 24 24"></svg>
                ) : (
                  resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'
                )}
              </button>
            </p>
          </form>
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

export default SignupPage;
