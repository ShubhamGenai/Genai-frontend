import React from 'react';
import Hero from './hero';
import Category from './category';
import { NavBar } from './navbar';
import TrendingCourses from './trending';

const CoursesMain = () => {
  return (
    <div className="font-sans">
      <NavBar/>
      <Hero/>
      <Category/>
      <TrendingCourses/>
    </div>
  );
};

export default CoursesMain;
