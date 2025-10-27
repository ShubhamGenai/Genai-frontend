import { PlayIcon } from "lucide-react";

export const CourseCard = ({ title, description, progress, image, type, difficulty }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 p-6">
        {image && (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {type}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {difficulty}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-purple-600">{progress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
          <PlayIcon className="w-4 h-4" />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
};
