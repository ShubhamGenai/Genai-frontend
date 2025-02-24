import React from 'react';
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

const HomepgMain1 = () => {
  return (
    <div className="">
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
      
    </div>
  );
};

export default HomepgMain1;
