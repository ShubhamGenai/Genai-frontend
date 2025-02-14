import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ onClose }) => {
  const features = [
    "Fast Performance",
    "Responsive Design",
    "User-Friendly Interface",
    "Seamless Navigation",
    "Powerful Features",
  ];

  return (
    <div className="fixed inset-0  bg-opacity-100 flex items-center justify-center z-50" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative animate-fadeIn">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Welcome to Our Website!</h2>
        <p className="mb-6 text-gray-700">Here are some amazing features you'll love:</p>

        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-blue-500">✔️</span>
              <span className="text-gray-800">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          Explore Now
        </button>
      </div>

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Popup;
