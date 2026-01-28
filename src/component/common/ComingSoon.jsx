import React from "react";
import { Rocket } from "lucide-react";

const ComingSoon = ({ title = "Coming soon", description }) => {
  const message =
    description ||
    "We’re working hard to bring this feature to you. Stay tuned!";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-xl mx-auto p-6 sm:p-10 rounded-2xl bg-white shadow-md border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white mb-4 sm:mb-6 shadow-lg shadow-blue-500/30">
          <Rocket className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          {message}
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-50 text-xs sm:text-sm text-gray-500 border border-dashed border-gray-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
          In preview & under active development
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

