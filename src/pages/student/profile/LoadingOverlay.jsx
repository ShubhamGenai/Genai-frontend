import React from "react";
import { Loader } from "lucide-react";

const LoadingOverlay = ({ loading, message = "Updating..." }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg flex items-center gap-3 shadow-xl">
        <Loader className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-gray-700 font-medium">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;