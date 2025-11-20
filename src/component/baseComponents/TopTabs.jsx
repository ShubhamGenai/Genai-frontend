import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopTabs = ({ tabs, activeTabId, onTabClick }) => {
  const navigate = useNavigate();

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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.path)}
              className={`relative text-sm font-light ${activeTabId === tab.id ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
            >
              {tab.label}
              {tab.count != null && (
                <span className={`ml-2 text-[10px] ${activeTabId === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'} px-2 py-0.5 rounded-full align-middle`}>
                  {tab.count} {tab.countLabel || ''}
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
