import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../context/MainContext';


const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #2563EB;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
`;

const AuthCallback = () => {

  const navigate = useNavigate();
  const { setToken, fetchUserDetails } = useContext(mainContext);

  useEffect(() => {
    
    const fetchAuthDetails = async () => {
      // Get token and user ID from URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const userId = queryParams.get('id');

      if (token) {
        try {
          // Set token in context
          setToken(token);

          // Fetch user details via context function
          await fetchUserDetails();

          // Redirect to the home or dashboard
          navigate('/');
        } catch (error) {
          console.error('Error handling auth callback:', error);
          navigate('/login'); // Redirect to login on failure
        }
      } else {
        console.error('Token missing from URL');
        navigate('/login'); // Redirect to login if there's an issue
      }
    };

    fetchAuthDetails();
  }, [navigate, setToken, fetchUserDetails]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{spinnerStyles}</style>
      <div className="spinner"></div>
      <p className="ml-4 text-blue-500">Loading...</p>
    </div>
  );
};

export default AuthCallback;







