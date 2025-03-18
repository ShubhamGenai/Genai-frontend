import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatsCard = ({ title, value, icon, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="mt-1">
          {icon}
        </div>
      </div>
      <div className={`flex items-center mt-4 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <TrendingUp size={16} className="mr-1" />
        ) : (
          <TrendingDown size={16} className="mr-1" />
        )}
        <span>{change} from last month</span>
      </div>
    </div>
  );
};