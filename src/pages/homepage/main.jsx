import React, { useContext, useEffect, useState } from 'react';
import '@fontsource/inter';
import { NavBar } from '../../component/baseComponents/navbar';
import HeroSection from './hero';
import CompanyLogos from './company-logos';
import LearningSection from './learning-section';
import LearningJourney from './LearningJourney';
import TestSection from './test-section';
import WhyGenAiLearning from './whygenai';
import HireSection from './hire';
import TestimonialsSection from './testimonials';
import Footer from '../../component/baseComponents/footer';
import HomePage from './hompg';
import StatsSection from './stats';
import Section from './category';

import { mainContext } from "../../context/MainContext";
import ProfilePopup from './profile-popup';
import AudiencePrograms from './AudiencePrograms';
import AIFeatures from './AIFeatures';
import PopularCourses from './PopularCourses';
import PricingPlans from './PricingPlans';
import LeaderboardSection from './LeaderboardSection';
import CTABanner from './CTABanner';
import NewsletterSignup from './NewsletterSignup';

const HomepgMain1 = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const { user } = useContext(mainContext)



  return (
    <div className="font-sans">
      <HeroSection />
      <CompanyLogos />
      <AudiencePrograms />
      <AIFeatures />
      <PopularCourses />
      <PricingPlans />
      <LeaderboardSection />
      <CTABanner />
      <StatsSection />
      <WhyGenAiLearning />
      <TestimonialsSection />
      <NewsletterSignup />

    </div>
  );
};

export default HomepgMain1;
