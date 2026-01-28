import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS, GEUESTENDPOINTS } from '../../constants/ApiConstants';

const TopTabs = ({ tabs: initialTabs, activeTabId, onTabClick, fetchRealData = true }) => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(initialTabs || []);
  const [loading, setLoading] = useState(fetchRealData);

  useEffect(() => {
    // If tabs are provided and fetchRealData is false, use them as-is
    if (!fetchRealData || !initialTabs || initialTabs.length === 0) {
      setTabs(initialTabs || []);
      setLoading(false);
      return;
    }

    // Fetch real data for counts
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const counts = {
          courses: 0,
          tests: 0,
          jobs: 0
        };

        // Fetch courses count
        try {
          const coursesResponse = await axios.get(USERENDPOINTS.GETCOURSES);
          const courses = Array.isArray(coursesResponse.data) 
            ? coursesResponse.data 
            : coursesResponse.data?.courses || [];
          counts.courses = courses.length;
        } catch (err) {
          console.error('Error fetching courses count:', err);
        }

        // Fetch tests count
        try {
          const testsResponse = await axios.get(USERENDPOINTS.GETTESTS);
          const tests = Array.isArray(testsResponse.data) 
            ? testsResponse.data 
            : testsResponse.data?.tests || [];
          counts.tests = tests.length;
        } catch (err) {
          console.error('Error fetching tests count:', err);
        }

        // Fetch jobs count
        try {
          // Fix the endpoint URL (it's missing a slash in the constant)
          const jobsUrl = GEUESTENDPOINTS.GETGUESTJOBS.includes('/api/') 
            ? GEUESTENDPOINTS.GETGUESTJOBS 
            : GEUESTENDPOINTS.GETGUESTJOBS.replace('/apiuser', '/api/user');
          const jobsResponse = await axios.get(jobsUrl);
          const jobs = Array.isArray(jobsResponse.data) 
            ? jobsResponse.data 
            : jobsResponse.data?.jobs || [];
          counts.jobs = jobs.length;
        } catch (err) {
          console.error('Error fetching jobs count:', err);
        }

        // Update tabs with real counts
        const updatedTabs = initialTabs.map(tab => {
          const tabId = tab.id.toLowerCase();
          if (tabId === 'courses' && tab.count != null) {
            return { ...tab, count: counts.courses };
          } else if (tabId === 'tests' && tab.count != null) {
            return { ...tab, count: counts.tests };
          } else if (tabId === 'jobs' && tab.count != null) {
            return { ...tab, count: counts.jobs };
          }
          return tab;
        });

        setTabs(updatedTabs);
      } catch (error) {
        console.error('Error fetching tab counts:', error);
        // Use initial tabs on error
        setTabs(initialTabs);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [initialTabs, fetchRealData]);

  const handleTabClick = (tabId, path) => {
    if (onTabClick) {
      onTabClick(tabId);
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center gap-6 h-12">
          {tabs
            .filter((tab) => tab.id?.toLowerCase() !== 'jobs')
            .map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.path)}
              className={`relative text-sm font-light transition-colors ${activeTabId === tab.id ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
              disabled={loading}
            >
              {tab.label}
              {tab.count != null && (
                <span className={`ml-2 text-[10px] ${activeTabId === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'} px-2 py-0.5 rounded-full align-middle`}>
                  {loading ? '...' : `${tab.count} ${tab.countLabel || ''}`}
                </span>
              )}
              {activeTabId === tab.id && <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-blue-600"></span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTabs;
