import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomepgMain1 from './pages/homepage/main';
import LoginLandingPage from './pages/auth-pages/Loginlanding';
import SignupPage from './pages/auth-pages/Signup-page';
import { NavBar } from './component/baseComponents/navbar';
import Footer from './component/baseComponents/footer';
import './App.css';
import LoginPage from './pages/auth-pages/Login-page';

function AppContent() {
  const location = useLocation();

  const hideNavAndFooterRoutes = ["/signup", "/login"];
  const hideOnlyFooterRoutes = ["/login-landing"];

  const hideNavAndFooter = hideNavAndFooterRoutes.includes(location.pathname);
  const hideFooter = hideOnlyFooterRoutes.includes(location.pathname);

  return (
   <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<HomepgMain1 />} />
        <Route path="/login-landing" element={<LoginLandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes here as needed */}
      </Routes>
      {!hideNavAndFooter && !hideFooter && <Footer />}
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
