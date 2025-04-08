import React from 'react';

const CourseCategory = ({ name, active }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {name}
    </button>
  );
};

export default CourseCategory;