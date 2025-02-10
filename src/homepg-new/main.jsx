import React from 'react';
import { NavBar } from './navbar';
import HeroSection from './hero';
import CompanyLogos from './company-logos';
import LearningSection from './learning-section';
import LearningJourney from './LearningJourney';
import TestSection from './test-section';
import Leaderboard from './leaderboard';
import WhyGenAiLearning from './whygenai';
import HireSection from './hire';
import TestimonialsSection from './testimonials';
import Footer from './footer';

import Section from './category';

const HomepgMain1 = () => {
  return (
    <div className="">
      <NavBar/>
      <HeroSection/>
      <CompanyLogos/>
   
      <Section/>
      <LearningSection/>
      <TestSection/>
      <LearningJourney/>
      
      <Leaderboard />
      <WhyGenAiLearning/>
      <TestimonialsSection/>
      <HireSection/>
      <Footer/>
    </div>
  );
};

export default HomepgMain1;
