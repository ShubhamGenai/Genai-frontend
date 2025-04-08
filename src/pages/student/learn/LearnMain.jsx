import React, { useState } from 'react';
import ExploreCourses from "./Explore-course";
import HeroSection from "./Hero-Learn";
import PopularTopics from "./Popular-Topics";
import StatsSection from "./Stats";
import TrendingCourses from "./Trending-Courses";
import WhyLearn from "./Why-Learn";

const LearnMainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
      <div id="popular-topics" className="scroll-mt-20">
        <PopularTopics />
      </div>
      <div id="explore-courses" className="scroll-mt-20">
        <ExploreCourses searchQuery={searchQuery} />
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
    </div>
  );
};

export default LearnMainPage;
  