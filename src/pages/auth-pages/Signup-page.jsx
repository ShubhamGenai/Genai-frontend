import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../constants/ApiConstants';
import axios from 'axios';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreed: false,
    role:role
  });


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
                className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm">
                <img src="/icons/gmail.png" alt="Google" className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition text-sm">
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>

          </form>
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
              <button type="button" className="text-blue-600 hover:underline">
              {loading && <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>}
                Resend OTP
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
