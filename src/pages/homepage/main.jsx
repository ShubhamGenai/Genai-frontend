import React from 'react';
import { NavBar } from '../../component/baseComponents/navbar';
import HeroSection from '../../component/baseComponents/hero';
import CompanyLogos from './company-logos';
import LearningSection from './learning-section';
import LearningJourney from './LearningJourney';
import TestSection from './test-section';
import LeaderboardSection from './leaderboard';
import WhyGenAiLearning from './whygenai';
import HireSection from './hire';
import TestimonialsSection from './testimonials';
<<<<<<< HEAD:src/pages/homepage/main.jsx
import Footer from '../../component/baseComponents/footer';
=======
import Footer from './footer';
import HomePage from './hompg';
>>>>>>> 763db82b14f3b7fa052cfc7331f53997a26c7827:src/homepg-new/main.jsx

import Section from './category';

const HomepgMain1 = () => {
  return (
    <div className="">
      <NavBar/>
      <HeroSection/>

      <CompanyLogos/>
   {/* <HomePage/> */}
      <Section/>
      <LearningSection/>
      <TestSection/>
      <LeaderboardSection/>
      <LearningJourney/>
      <WhyGenAiLearning/>
      <TestimonialsSection/>
      <HireSection/>
      <Footer/>
      
    </div>
  );
};

export default HomepgMain1;
