import React from 'react';
import CourseCategory from './CourseCategory';

const PopularTopics = () => {
  const categories = [
    "Data Science",
    "Management",
    "Web Development",
    "Marketing",
    "DevOps",
    "Networking",
    "Cyber Security",
    "ChatGPT & AI"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">Popular topics</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CourseCategory
            key={category}
            name={category}
            active={category === "Data Science"}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTopics;