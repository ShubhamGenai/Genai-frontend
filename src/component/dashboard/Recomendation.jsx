import { ClockIcon, LightbulbIcon } from "lucide-react";

export const RecommendationCard = ({ title, description, type, estimatedTime }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <LightbulbIcon className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">{type}</span>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <ClockIcon className="w-3 h-3" />
            <span>{estimatedTime}</span>
          </div>
        </div>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
          Start
        </button>
      </div>
    </div>
  );
};