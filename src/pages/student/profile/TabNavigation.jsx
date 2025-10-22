import React from "react";
import { User, Home, Building, Star } from "lucide-react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "personal", label: "Personal Info", icon: User },
    { key: "address", label: "Address", icon: Home },
    { key: "education", label: "Education", icon: Building },
    { key: "skills", label: "Skills", icon: Star }
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-wrap border-b border-gray-200">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === key
                ? "border-b-3 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;