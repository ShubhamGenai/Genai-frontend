import React, { useState } from 'react';
import { jobData, trendingJobsData, categories, filters, sortOptions } from './Data';
import Header from './JobHearder';
import JobCategories from './JobCategories';
import JobExplorer from './jobExplorer';
import TrendingJobs from './TrendingJobs';
import StatsSection from './Stats';
import FaqSection from './Faq';

const JobsPage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
    <Header/>
      <JobCategories categories={categories} />
      <JobExplorer jobs={jobData} filters={filters} sortOptions={sortOptions} />
      <TrendingJobs jobs={trendingJobsData} />
      <StatsSection />
      <FaqSection />
    </div>
  );
};

export default JobsPage;