import React, { useContext, useEffect, useState } from 'react';
import '@fontsource/inter';
import HeroSection from './homepage_sections/hero';
import CompanyLogos from './homepage_sections/company-logos';
import WhyGenAiLearning from './homepage_sections/whygenai';
import TestimonialsSection from './homepage_sections/testimonials';
import StatsSection from './homepage_sections/stats';
import AudiencePrograms from './homepage_sections/AudiencePrograms';
import AIFeatures from './homepage_sections/AIFeatures';
import PopularCourses from './homepage_sections/PopularCourses';
import PricingPlans from './homepage_sections/PricingPlans';
import LeaderboardSection from './homepage_sections/LeaderboardSection';
import CTABanner from './homepage_sections/CTABanner';
import NewsletterSignup from './homepage_sections/NewsletterSignup';
import { mainContext } from '../../context/MainContext';

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
