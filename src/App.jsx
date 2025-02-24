import { useState } from 'react'
import HomepgMain1 from './pages/homepage/main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import { NavBar } from './component/baseComponents/navbar'
import LoginLandingPage from './pages/auth-pages/Loginlanding';
import Footer from './component/baseComponents/footer';

function App() {
 

  return (
    <>
 <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomepgMain1 />} />
          <Route path="/login-landing" element={<LoginLandingPage />} />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer/>
      </Router>
      
    </>
  )
}

export default App
