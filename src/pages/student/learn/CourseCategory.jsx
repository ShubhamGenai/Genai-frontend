import React from 'react';

const CourseCategory = ({ name, active }) => {
  return (
    <button
      className={`px-8 py-3 rounded-[10px] text-base whitespace-nowrap border transition font-medium shadow-sm
        ${active ? "bg-black text-white border-gray-900" : "bg-white border-gray-900 border-radis-[5px] text-gray-700 hover:bg-gray-100"}
      `}
    >
      {name}
    </button>
  );
};

export default CourseCategory;