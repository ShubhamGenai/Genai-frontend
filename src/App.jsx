import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomepgMain1 from './pages/homepage/main';
import LoginLandingPage from './pages/auth-pages/Loginlanding';
import SignupPage from './pages/auth-pages/Signup-page';
import { NavBar } from './component/baseComponents/navbar';
import Footer from './component/baseComponents/footer';
import './App.css';

function AppContent() {
  const location = useLocation();
  // Hide NavBar and Footer on login and signup pages
  const hideNavAndFooter =  location.pathname === "/create-account";

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<HomepgMain1 />} />
        <Route path="/login-landing" element={<LoginLandingPage />} />
        <Route path="/create-account" element={<SignupPage />} />
        {/* Add more routes here as needed */}
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
