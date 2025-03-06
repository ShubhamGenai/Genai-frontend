import React, { useContext, useEffect, useState } from 'react';
import '@fontsource/inter'; 
import { NavBar } from '../../component/baseComponents/navbar';
import HeroSection from './hero';
import CompanyLogos from './company-logos';
import LearningSection from './learning-section';
import LearningJourney from './LearningJourney';
import TestSection from './test-section';
import LeaderboardSection from './leaderboard';
import WhyGenAiLearning from './whygenai';
import HireSection from './hire';
import TestimonialsSection from './testimonials';
import Footer from '../../component/baseComponents/footer';
import HomePage from './hompg';
import StatsSection from './stats';
import Section from './category';

import { mainContext } from "../../context/MainContext";
import ProfilePopup from './profile-popup';

const HomepgMain1 = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const {user}= useContext(mainContext)

  useEffect(() => {
   
  
    // Ensure user exists before checking verification status
    if (user.isProfileVerified === false) {
      setShowProfilePopup(true);
    }
  }, [user]);


    // Function to handle profile submission
    const handleProfileSubmit = (userDetails) => {
      // Here you would typically send the details to your backend
      console.log("User details submitted:", userDetails);
      setShowProfilePopup(false);
      
      // You might want to update the user context here
      // For example with a context update function:
      // updateUser({ ...user, isProfileVerified: true, ...userDetails });
    };


    const handleCloseProfilePopup = () => {
      const hasCompletedProfile = localStorage.getItem('profileCompleted');
      
      // If profile is already completed, simply close the popup
      if (hasCompletedProfile) {
        setShowProfilePopup(false);
        return;
      }
      
      // Otherwise, show warning before closing
      const confirmClose = window.confirm(
        'Your profile is not complete. Are you sure you want to close this window? You can complete your profile later from your account settings.'
      );
      
      if (confirmClose) {
        setShowProfilePopup(false);
      }
    };
  
    // Function to open profile popup manually (e.g., from settings)
    const openProfilePopup = () => {
      setShowProfilePopup(true);
    };

  return (
    <div className="font-sans">
      {/* <NavBar/> */}
      <HeroSection/>

      <CompanyLogos/>
   {/* <HomePage/> */}
      <Section/>
      <LearningSection/>
      <TestSection/>
      <LeaderboardSection/>
      <LearningJourney/>
      <StatsSection/>
      <WhyGenAiLearning/>
      
      <TestimonialsSection/>
      <HireSection/>
      {/* <Footer/> */}
       {showProfilePopup && <ProfilePopup onSubmit={handleProfileSubmit}    onClose={handleCloseProfilePopup} />}
    </div>
  );
};

export default HomepgMain1;
