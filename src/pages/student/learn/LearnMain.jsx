import React, { useState } from 'react';
import ExploreCourses from "./Explore-course";
import HeroSection from "./Hero-Learn";
import PopularTopics from "./Popular-Topics";
import StatsSection from "./Stats";
import TrendingCourses from "./Trending-Courses";
import WhyLearn from "./Why-Learn";
import StudentTestimonials from "./StudentTestimonials";
import FAQSection from "./FAQSection";
import SubscribeBanner from '../test/SubscribeBanner';

const LearnMainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Scroll to explore courses section when searching
    const exploreSection = document.getElementById('explore-courses');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <div id="popular-topics" className="scroll-mt-20 py-8">
        <PopularTopics activeTopic={activeTopic} onTopicSelect={setActiveTopic} />
      </div>
      <div id="explore-courses" className="scroll-mt-20">
        <ExploreCourses searchQuery={searchQuery} activeTopic={activeTopic} />
      </div>
      <div id="trending-courses" className="scroll-mt-20">
        <TrendingCourses />
      </div>
      <div id="stats" className="scroll-mt-20">
        <StatsSection />
      </div>
      <div id="why-learn" className="scroll-mt-20">
        <WhyLearn />
      </div>
      <div id="student-testimonials" className="scroll-mt-20">
        <StudentTestimonials />
      </div>
      <div id="faq-section" className="scroll-mt-20">
        <FAQSection />
      </div>
      <div id="faq-section" className="scroll-mt-20 p-8">
        <SubscribeBanner/>
      </div>
    </div>
  );
};

export default LearnMainPage;
  