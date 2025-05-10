import React from 'react';
import CourseCategory from './CourseCategory';

const PopularTopics = ({ activeTopic, onTopicSelect }) => {
  const categories = [
    
    "Data Science",
    "Management",
    "Web Development",
    "Marketing",
    "Govt. Exams",
    "ChatGPT & AI"
  ];

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <h2 className="text-2xl font-bold mb-4 text-left">Popular topics</h2>
      <div className="flex flex-nowrap  gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onTopicSelect(category)}
          >
            <CourseCategory
              name={category}
              active={activeTopic === category}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTopics;