import React, { useState } from 'react';
import { Folder, FileText, ChevronDown, ChevronRight } from 'lucide-react';

const LibraryPage = () => {
  const [expandedCategories, setExpandedCategories] = useState({
    'ncert': true,
    'competitive': false,
    'professional': false,
    'study': false,
    'class8': false,
    'class9': false,
    'class10': false,
    'class11': false,
    'class12': false,
    'jee': false,
    'neet': false,
    'upsc': false,
    'webdev': false,
    'data': false,
    'ai': false,
    'notes': false,
    'guides': false
  });
  const [selectedCategory, setSelectedCategory] = useState('ncert');

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Sub-categories for main categories
  const subCategories = {
    ncert: [
      { id: 'class8', name: 'Class 8', count: 8 },
      { id: 'class9', name: 'Class 9', count: 9 },
      { id: 'class10', name: 'Class 10', count: 10 },
      { id: 'class11', name: 'Class 11', count: 10 },
      { id: 'class12', name: 'Class 12', count: 11 }
    ],
    competitive: [
      { id: 'jee', name: 'JEE Preparation', count: 15 },
      { id: 'neet', name: 'NEET Preparation', count: 12 },
      { id: 'upsc', name: 'UPSC', count: 8 }
    ],
    professional: [
      { id: 'webdev', name: 'Web Development', count: 20 },
      { id: 'data', name: 'Data Science', count: 18 },
      { id: 'ai', name: 'AI & ML', count: 15 }
    ],
    study: [
      { id: 'notes', name: 'Study Notes', count: 25 },
      { id: 'guides', name: 'Exam Guides', count: 18 }
    ]
  };

  // Mock data structure matching the image
  const resources = {
    class8: [
      { id: 1, title: "Mathematics Textbook", subtitle: "Mathematics", size: "12.5 MB", price: "Free", iconColor: "gray" },
      { id: 2, title: "Science Textbook", subtitle: "Science", size: "18.3 MB", price: "Free", iconColor: "gray" },
      { id: 3, title: "English Textbook", subtitle: "English", size: "8.7 MB", price: "Free", iconColor: "gray" },
      { id: 4, title: "Hindi Textbook", subtitle: "Hindi", size: "10.2 MB", price: "Free", iconColor: "gray" },
      { id: 5, title: "Social Studies Textbook", subtitle: "Social Studies", size: "15.8 MB", price: "Free", iconColor: "gray" },
      { id: 6, title: "Mathematics Solutions", subtitle: "Solutions", size: "9.4 MB", price: "₹99", iconColor: "orange" },
      { id: 7, title: "Science Solutions", subtitle: "Solutions", size: "11.2 MB", price: "₹99", iconColor: "orange" },
      { id: 8, title: "Sample Papers Bundle", subtitle: "Practice", size: "6.8 MB", price: "₹149", iconColor: "orange" }
    ],
    class9: [
      { id: 9, title: "Mathematics Textbook", subtitle: "Mathematics", size: "13.2 MB", price: "Free", iconColor: "gray" },
      { id: 10, title: "Science Textbook", subtitle: "Science", size: "19.1 MB", price: "Free", iconColor: "gray" },
      { id: 11, title: "English Textbook", subtitle: "English", size: "9.1 MB", price: "Free", iconColor: "gray" },
      { id: 12, title: "Hindi Textbook", subtitle: "Hindi", size: "10.8 MB", price: "Free", iconColor: "gray" },
      { id: 13, title: "Social Studies Textbook", subtitle: "Social Studies", size: "16.3 MB", price: "Free", iconColor: "gray" },
      { id: 14, title: "Mathematics Solutions", subtitle: "Solutions", size: "10.1 MB", price: "₹99", iconColor: "orange" },
      { id: 15, title: "Science Solutions", subtitle: "Solutions", size: "12.0 MB", price: "₹99", iconColor: "orange" },
      { id: 16, title: "Sample Papers Bundle", subtitle: "Practice", size: "7.2 MB", price: "₹149", iconColor: "orange" },
      { id: 17, title: "Previous Year Papers", subtitle: "Practice", size: "5.5 MB", price: "₹79", iconColor: "orange" }
    ],
    class10: [
      { id: 18, title: "Mathematics Textbook", subtitle: "Mathematics", size: "14.0 MB", price: "Free", iconColor: "gray" },
      { id: 19, title: "Science Textbook", subtitle: "Science", size: "20.0 MB", price: "Free", iconColor: "gray" },
      { id: 20, title: "English Textbook", subtitle: "English", size: "9.5 MB", price: "Free", iconColor: "gray" },
      { id: 21, title: "Hindi Textbook", subtitle: "Hindi", size: "11.2 MB", price: "Free", iconColor: "gray" },
      { id: 22, title: "Social Studies Textbook", subtitle: "Social Studies", size: "17.1 MB", price: "Free", iconColor: "gray" },
      { id: 23, title: "Mathematics Solutions", subtitle: "Solutions", size: "10.8 MB", price: "₹99", iconColor: "orange" },
      { id: 24, title: "Science Solutions", subtitle: "Solutions", size: "12.5 MB", price: "₹99", iconColor: "orange" },
      { id: 25, title: "Sample Papers Bundle", subtitle: "Practice", size: "7.8 MB", price: "₹149", iconColor: "orange" },
      { id: 26, title: "Previous Year Papers", subtitle: "Practice", size: "6.1 MB", price: "₹79", iconColor: "orange" },
      { id: 27, title: "Board Exam Guide", subtitle: "Guide", size: "8.9 MB", price: "₹199", iconColor: "orange" }
    ],
    class11: [
      { id: 28, title: "Physics Textbook", subtitle: "Physics", size: "15.2 MB", price: "Free", iconColor: "gray" },
      { id: 29, title: "Chemistry Textbook", subtitle: "Chemistry", size: "16.8 MB", price: "Free", iconColor: "gray" },
      { id: 30, title: "Mathematics Textbook", subtitle: "Mathematics", size: "14.5 MB", price: "Free", iconColor: "gray" },
      { id: 31, title: "Biology Textbook", subtitle: "Biology", size: "19.3 MB", price: "Free", iconColor: "gray" },
      { id: 32, title: "English Textbook", subtitle: "English", size: "9.8 MB", price: "Free", iconColor: "gray" },
      { id: 33, title: "Physics Solutions", subtitle: "Solutions", size: "11.5 MB", price: "₹99", iconColor: "orange" },
      { id: 34, title: "Chemistry Solutions", subtitle: "Solutions", size: "12.8 MB", price: "₹99", iconColor: "orange" },
      { id: 35, title: "Mathematics Solutions", subtitle: "Solutions", size: "10.9 MB", price: "₹99", iconColor: "orange" },
      { id: 36, title: "Previous Year Papers", subtitle: "Practice", size: "6.5 MB", price: "₹79", iconColor: "orange" },
      { id: 37, title: "JEE Preparation Guide", subtitle: "Guide", size: "9.2 MB", price: "₹249", iconColor: "orange" }
    ],
    class12: [
      { id: 38, title: "Physics Textbook", subtitle: "Physics", size: "16.1 MB", price: "Free", iconColor: "gray" },
      { id: 39, title: "Chemistry Textbook", subtitle: "Chemistry", size: "17.5 MB", price: "Free", iconColor: "gray" },
      { id: 40, title: "Mathematics Textbook", subtitle: "Mathematics", size: "15.3 MB", price: "Free", iconColor: "gray" },
      { id: 41, title: "Biology Textbook", subtitle: "Biology", size: "20.2 MB", price: "Free", iconColor: "gray" },
      { id: 42, title: "English Textbook", subtitle: "English", size: "10.1 MB", price: "Free", iconColor: "gray" },
      { id: 43, title: "Economics Textbook", subtitle: "Economics", size: "12.4 MB", price: "Free", iconColor: "gray" },
      { id: 44, title: "Physics Solutions", subtitle: "Solutions", size: "12.0 MB", price: "₹99", iconColor: "orange" },
      { id: 45, title: "Chemistry Solutions", subtitle: "Solutions", size: "13.2 MB", price: "₹99", iconColor: "orange" },
      { id: 46, title: "Mathematics Solutions", subtitle: "Solutions", size: "11.3 MB", price: "₹99", iconColor: "orange" },
      { id: 47, title: "Board Exam Papers", subtitle: "Practice", size: "7.1 MB", price: "₹149", iconColor: "orange" },
      { id: 48, title: "JEE/NEET Guide", subtitle: "Guide", size: "9.8 MB", price: "₹299", iconColor: "orange" }
    ],
    // Competitive Exams Resources
    jee: [
      { id: 49, title: "Physics JEE Main", subtitle: "Physics", size: "15.2 MB", price: "Free", iconColor: "gray" },
      { id: 50, title: "Chemistry JEE Main", subtitle: "Chemistry", size: "16.8 MB", price: "Free", iconColor: "gray" },
      { id: 51, title: "Mathematics JEE Main", subtitle: "Mathematics", size: "14.5 MB", price: "Free", iconColor: "gray" },
      { id: 52, title: "JEE Advanced Papers", subtitle: "Practice", size: "12.3 MB", price: "₹199", iconColor: "orange" },
      { id: 53, title: "Previous Year Papers", subtitle: "Practice", size: "11.8 MB", price: "₹149", iconColor: "orange" },
      { id: 54, title: "JEE Main Mock Tests", subtitle: "Tests", size: "8.5 MB", price: "₹299", iconColor: "orange" },
      { id: 55, title: "Physics Solved Papers", subtitle: "Solutions", size: "9.2 MB", price: "₹99", iconColor: "orange" },
      { id: 56, title: "Chemistry Solved Papers", subtitle: "Solutions", size: "10.1 MB", price: "₹99", iconColor: "orange" },
      { id: 57, title: "Maths Solved Papers", subtitle: "Solutions", size: "9.8 MB", price: "₹99", iconColor: "orange" },
      { id: 58, title: "JEE Strategy Guide", subtitle: "Guide", size: "7.2 MB", price: "₹249", iconColor: "orange" },
      { id: 59, title: "JEE Advanced Prep", subtitle: "Guide", size: "8.9 MB", price: "₹349", iconColor: "orange" },
      { id: 60, title: "Topic-wise Questions", subtitle: "Practice", size: "6.5 MB", price: "₹149", iconColor: "orange" },
      { id: 61, title: "Formula Sheet", subtitle: "Reference", size: "4.2 MB", price: "Free", iconColor: "gray" },
      { id: 62, title: "Quick Revision Notes", subtitle: "Notes", size: "5.8 MB", price: "₹79", iconColor: "orange" },
      { id: 63, title: "JEE Previous 10 Years", subtitle: "Papers", size: "13.5 MB", price: "₹399", iconColor: "orange" }
    ],
    neet: [
      { id: 64, title: "Physics NEET", subtitle: "Physics", size: "16.2 MB", price: "Free", iconColor: "gray" },
      { id: 65, title: "Chemistry NEET", subtitle: "Chemistry", size: "17.5 MB", price: "Free", iconColor: "gray" },
      { id: 66, title: "Biology NEET", subtitle: "Biology", size: "19.8 MB", price: "Free", iconColor: "gray" },
      { id: 67, title: "NEET Previous Papers", subtitle: "Practice", size: "12.1 MB", price: "₹199", iconColor: "orange" },
      { id: 68, title: "NEET Mock Tests", subtitle: "Tests", size: "9.3 MB", price: "₹299", iconColor: "orange" },
      { id: 69, title: "Biology MCQs", subtitle: "Practice", size: "10.5 MB", price: "₹149", iconColor: "orange" },
      { id: 70, title: "Chemistry MCQs", subtitle: "Practice", size: "9.8 MB", price: "₹149", iconColor: "orange" },
      { id: 71, title: "Physics MCQs", subtitle: "Practice", size: "10.2 MB", price: "₹149", iconColor: "orange" },
      { id: 72, title: "NEET Strategy Guide", subtitle: "Guide", size: "7.5 MB", price: "₹249", iconColor: "orange" },
      { id: 73, title: "Biology Diagrams", subtitle: "Reference", size: "8.2 MB", price: "₹99", iconColor: "orange" },
      { id: 74, title: "Formula Handbook", subtitle: "Reference", size: "5.1 MB", price: "Free", iconColor: "gray" },
      { id: 75, title: "Revision Notes", subtitle: "Notes", size: "6.3 MB", price: "₹79", iconColor: "orange" }
    ],
    upsc: [
      { id: 76, title: "History Notes", subtitle: "History", size: "14.2 MB", price: "Free", iconColor: "gray" },
      { id: 77, title: "Geography Notes", subtitle: "Geography", size: "15.8 MB", price: "Free", iconColor: "gray" },
      { id: 78, title: "Polity Notes", subtitle: "Polity", size: "13.5 MB", price: "Free", iconColor: "gray" },
      { id: 79, title: "Economics Notes", subtitle: "Economics", size: "12.8 MB", price: "Free", iconColor: "gray" },
      { id: 80, title: "UPSC Previous Papers", subtitle: "Practice", size: "11.5 MB", price: "₹249", iconColor: "orange" },
      { id: 81, title: "Current Affairs", subtitle: "Current Affairs", size: "8.9 MB", price: "₹199", iconColor: "orange" },
      { id: 82, title: "Essay Writing Guide", subtitle: "Guide", size: "7.2 MB", price: "₹149", iconColor: "orange" },
      { id: 83, title: "CSAT Papers", subtitle: "Practice", size: "9.1 MB", price: "₹179", iconColor: "orange" }
    ],
    // Professional Skills Resources
    webdev: [
      { id: 84, title: "HTML Basics", subtitle: "HTML", size: "8.5 MB", price: "Free", iconColor: "gray" },
      { id: 85, title: "CSS Fundamentals", subtitle: "CSS", size: "9.2 MB", price: "Free", iconColor: "gray" },
      { id: 86, title: "JavaScript Basics", subtitle: "JavaScript", size: "10.8 MB", price: "Free", iconColor: "gray" },
      { id: 87, title: "React Complete Guide", subtitle: "React", size: "15.3 MB", price: "₹299", iconColor: "orange" },
      { id: 88, title: "Node.js Guide", subtitle: "Node.js", size: "12.5 MB", price: "₹249", iconColor: "orange" },
      { id: 89, title: "MongoDB Tutorial", subtitle: "Database", size: "11.2 MB", price: "₹199", iconColor: "orange" },
      { id: 90, title: "Express.js Guide", subtitle: "Backend", size: "9.8 MB", price: "₹179", iconColor: "orange" },
      { id: 91, title: "Vue.js Basics", subtitle: "Vue.js", size: "10.5 MB", price: "₹199", iconColor: "orange" },
      { id: 92, title: "TypeScript Guide", subtitle: "TypeScript", size: "8.9 MB", price: "₹149", iconColor: "orange" },
      { id: 93, title: "Web Development Projects", subtitle: "Projects", size: "14.2 MB", price: "₹349", iconColor: "orange" },
      { id: 94, title: "REST API Guide", subtitle: "API", size: "7.8 MB", price: "₹149", iconColor: "orange" },
      { id: 95, title: "Git & GitHub", subtitle: "Version Control", size: "6.5 MB", price: "Free", iconColor: "gray" },
      { id: 96, title: "Responsive Design", subtitle: "CSS", size: "8.1 MB", price: "₹99", iconColor: "orange" },
      { id: 97, title: "JavaScript Patterns", subtitle: "JavaScript", size: "9.5 MB", price: "₹179", iconColor: "orange" },
      { id: 98, title: "Full Stack Guide", subtitle: "Full Stack", size: "16.8 MB", price: "₹399", iconColor: "orange" },
      { id: 99, title: "Angular Framework", subtitle: "Angular", size: "13.2 MB", price: "₹279", iconColor: "orange" },
      { id: 100, title: "Next.js Tutorial", subtitle: "Next.js", size: "10.9 MB", price: "₹229", iconColor: "orange" },
      { id: 101, title: "Webpack Guide", subtitle: "Build Tools", size: "7.3 MB", price: "₹129", iconColor: "orange" },
      { id: 102, title: "PWA Development", subtitle: "PWA", size: "8.7 MB", price: "₹199", iconColor: "orange" },
      { id: 103, title: "Web Security", subtitle: "Security", size: "6.9 MB", price: "₹149", iconColor: "orange" }
    ],
    data: [
      { id: 104, title: "Python Basics", subtitle: "Python", size: "11.2 MB", price: "Free", iconColor: "gray" },
      { id: 105, title: "NumPy Guide", subtitle: "NumPy", size: "9.8 MB", price: "₹149", iconColor: "orange" },
      { id: 106, title: "Pandas Tutorial", subtitle: "Pandas", size: "12.5 MB", price: "₹199", iconColor: "orange" },
      { id: 107, title: "Matplotlib Guide", subtitle: "Visualization", size: "8.9 MB", price: "₹149", iconColor: "orange" },
      { id: 108, title: "Machine Learning Basics", subtitle: "ML", size: "14.8 MB", price: "₹299", iconColor: "orange" },
      { id: 109, title: "Data Analysis Projects", subtitle: "Projects", size: "15.2 MB", price: "₹349", iconColor: "orange" },
      { id: 110, title: "SQL for Data Science", subtitle: "SQL", size: "10.5 MB", price: "₹179", iconColor: "orange" },
      { id: 111, title: "Data Visualization", subtitle: "Viz", size: "9.3 MB", price: "₹199", iconColor: "orange" },
      { id: 112, title: "Statistics Guide", subtitle: "Statistics", size: "11.8 MB", price: "₹249", iconColor: "orange" },
      { id: 113, title: "Jupyter Notebooks", subtitle: "Tools", size: "7.5 MB", price: "Free", iconColor: "gray" },
      { id: 114, title: "Excel for Data Analysis", subtitle: "Excel", size: "8.2 MB", price: "₹129", iconColor: "orange" },
      { id: 115, title: "R Programming", subtitle: "R", size: "13.1 MB", price: "₹279", iconColor: "orange" },
      { id: 116, title: "Data Cleaning", subtitle: "Data Prep", size: "9.7 MB", price: "₹179", iconColor: "orange" },
      { id: 117, title: "Deep Learning Intro", subtitle: "Deep Learning", size: "16.5 MB", price: "₹399", iconColor: "orange" },
      { id: 118, title: "TensorFlow Guide", subtitle: "TensorFlow", size: "14.3 MB", price: "₹349", iconColor: "orange" },
      { id: 119, title: "PyTorch Tutorial", subtitle: "PyTorch", size: "13.9 MB", price: "₹349", iconColor: "orange" },
      { id: 120, title: "Scikit-learn Guide", subtitle: "ML Library", size: "10.6 MB", price: "₹229", iconColor: "orange" },
      { id: 121, title: "Data Science Projects", subtitle: "Projects", size: "17.2 MB", price: "₹449", iconColor: "orange" }
    ],
    ai: [
      { id: 122, title: "AI Fundamentals", subtitle: "AI Basics", size: "12.5 MB", price: "Free", iconColor: "gray" },
      { id: 123, title: "Neural Networks", subtitle: "Neural Networks", size: "15.8 MB", price: "₹299", iconColor: "orange" },
      { id: 124, title: "Natural Language Processing", subtitle: "NLP", size: "14.2 MB", price: "₹349", iconColor: "orange" },
      { id: 125, title: "Computer Vision", subtitle: "CV", size: "16.5 MB", price: "₹349", iconColor: "orange" },
      { id: 126, title: "Deep Learning Guide", subtitle: "Deep Learning", size: "18.3 MB", price: "₹399", iconColor: "orange" },
      { id: 127, title: "ChatGPT API Guide", subtitle: "API", size: "8.9 MB", price: "₹199", iconColor: "orange" },
      { id: 128, title: "Machine Learning Algorithms", subtitle: "ML", size: "13.7 MB", price: "₹279", iconColor: "orange" },
      { id: 129, title: "TensorFlow Advanced", subtitle: "TensorFlow", size: "15.1 MB", price: "₹349", iconColor: "orange" },
      { id: 130, title: "PyTorch Advanced", subtitle: "PyTorch", size: "14.8 MB", price: "₹349", iconColor: "orange" },
      { id: 131, title: "AI Projects Collection", subtitle: "Projects", size: "19.5 MB", price: "₹449", iconColor: "orange" },
      { id: 132, title: "Reinforcement Learning", subtitle: "RL", size: "16.2 MB", price: "₹379", iconColor: "orange" },
      { id: 133, title: "AI Ethics Guide", subtitle: "Ethics", size: "7.3 MB", price: "Free", iconColor: "gray" },
      { id: 134, title: "Prompt Engineering", subtitle: "Prompting", size: "9.1 MB", price: "₹179", iconColor: "orange" },
      { id: 135, title: "LLM Fine-tuning", subtitle: "LLM", size: "12.4 MB", price: "₹399", iconColor: "orange" },
      { id: 136, title: "MLOps Guide", subtitle: "MLOps", size: "11.8 MB", price: "₹299", iconColor: "orange" }
    ],
    // Study Materials & Notes Resources
    notes: [
      { id: 137, title: "Physics Notes Class 12", subtitle: "Physics", size: "14.5 MB", price: "Free", iconColor: "gray" },
      { id: 138, title: "Chemistry Notes Class 12", subtitle: "Chemistry", size: "15.2 MB", price: "Free", iconColor: "gray" },
      { id: 139, title: "Mathematics Notes Class 12", subtitle: "Mathematics", size: "13.8 MB", price: "Free", iconColor: "gray" },
      { id: 140, title: "Biology Notes Class 12", subtitle: "Biology", size: "16.5 MB", price: "Free", iconColor: "gray" },
      { id: 141, title: "English Notes Class 12", subtitle: "English", size: "9.2 MB", price: "Free", iconColor: "gray" },
      { id: 142, title: "Physics Notes Class 11", subtitle: "Physics", size: "13.9 MB", price: "Free", iconColor: "gray" },
      { id: 143, title: "Chemistry Notes Class 11", subtitle: "Chemistry", size: "14.7 MB", price: "Free", iconColor: "gray" },
      { id: 144, title: "Mathematics Notes Class 11", subtitle: "Mathematics", size: "13.1 MB", price: "Free", iconColor: "gray" },
      { id: 145, title: "Biology Notes Class 11", subtitle: "Biology", size: "15.8 MB", price: "Free", iconColor: "gray" },
      { id: 146, title: "Social Studies Notes", subtitle: "Social Studies", size: "12.3 MB", price: "Free", iconColor: "gray" },
      { id: 147, title: "History Notes", subtitle: "History", size: "11.8 MB", price: "Free", iconColor: "gray" },
      { id: 148, title: "Geography Notes", subtitle: "Geography", size: "12.5 MB", price: "Free", iconColor: "gray" },
      { id: 149, title: "Polity Notes", subtitle: "Polity", size: "10.9 MB", price: "Free", iconColor: "gray" },
      { id: 150, title: "Economics Notes", subtitle: "Economics", size: "11.2 MB", price: "Free", iconColor: "gray" },
      { id: 151, title: "Science Notes Class 10", subtitle: "Science", size: "13.5 MB", price: "Free", iconColor: "gray" },
      { id: 152, title: "Maths Notes Class 10", subtitle: "Mathematics", size: "12.1 MB", price: "Free", iconColor: "gray" },
      { id: 153, title: "English Notes Class 10", subtitle: "English", size: "8.7 MB", price: "Free", iconColor: "gray" },
      { id: 154, title: "Science Notes Class 9", subtitle: "Science", size: "12.8 MB", price: "Free", iconColor: "gray" },
      { id: 155, title: "Maths Notes Class 9", subtitle: "Mathematics", size: "11.9 MB", price: "Free", iconColor: "gray" },
      { id: 156, title: "Science Notes Class 8", subtitle: "Science", size: "11.5 MB", price: "Free", iconColor: "gray" },
      { id: 157, title: "Maths Notes Class 8", subtitle: "Mathematics", size: "10.8 MB", price: "Free", iconColor: "gray" },
      { id: 158, title: "Revision Notes Bundle", subtitle: "Bundle", size: "18.2 MB", price: "₹199", iconColor: "orange" },
      { id: 159, title: "Quick Revision Notes", subtitle: "Revision", size: "9.5 MB", price: "₹99", iconColor: "orange" },
      { id: 160, title: "Formula Sheets", subtitle: "Formulas", size: "7.8 MB", price: "Free", iconColor: "gray" },
      { id: 161, title: "Important Questions", subtitle: "Questions", size: "8.3 MB", price: "₹79", iconColor: "orange" }
    ],
    guides: [
      { id: 162, title: "JEE Preparation Guide", subtitle: "JEE Guide", size: "12.5 MB", price: "₹299", iconColor: "orange" },
      { id: 163, title: "NEET Preparation Guide", subtitle: "NEET Guide", size: "13.2 MB", price: "₹299", iconColor: "orange" },
      { id: 164, title: "UPSC Preparation Guide", subtitle: "UPSC Guide", size: "14.8 MB", price: "₹349", iconColor: "orange" },
      { id: 165, title: "Class 12 Board Guide", subtitle: "Board Guide", size: "11.5 MB", price: "₹199", iconColor: "orange" },
      { id: 166, title: "Class 10 Board Guide", subtitle: "Board Guide", size: "10.9 MB", price: "₹199", iconColor: "orange" },
      { id: 167, title: "SSC Exam Guide", subtitle: "SSC Guide", size: "12.1 MB", price: "₹249", iconColor: "orange" },
      { id: 168, title: "Banking Exam Guide", subtitle: "Banking Guide", size: "13.7 MB", price: "₹279", iconColor: "orange" },
      { id: 169, title: "Railway Exam Guide", subtitle: "Railway Guide", size: "12.9 MB", price: "₹249", iconColor: "orange" },
      { id: 170, title: "Gate Exam Guide", subtitle: "GATE Guide", size: "14.2 MB", price: "₹299", iconColor: "orange" },
      { id: 171, title: "CAT Preparation Guide", subtitle: "CAT Guide", size: "13.5 MB", price: "₹279", iconColor: "orange" },
      { id: 172, title: "GMAT Preparation Guide", subtitle: "GMAT Guide", size: "12.8 MB", price: "₹299", iconColor: "orange" },
      { id: 173, title: "IELTS Preparation Guide", subtitle: "IELTS Guide", size: "11.2 MB", price: "₹249", iconColor: "orange" },
      { id: 174, title: "TOEFL Preparation Guide", subtitle: "TOEFL Guide", size: "10.5 MB", price: "₹249", iconColor: "orange" },
      { id: 175, title: "Study Strategy Guide", subtitle: "Strategy", size: "8.9 MB", price: "Free", iconColor: "gray" },
      { id: 176, title: "Time Management Guide", subtitle: "Productivity", size: "7.3 MB", price: "Free", iconColor: "gray" },
      { id: 177, title: "Exam Tips & Tricks", subtitle: "Tips", size: "6.8 MB", price: "₹79", iconColor: "orange" },
      { id: 178, title: "Complete Study Plan", subtitle: "Planning", size: "9.1 MB", price: "₹99", iconColor: "orange" },
      { id: 179, title: "Success Stories", subtitle: "Motivation", size: "8.2 MB", price: "Free", iconColor: "gray" }
    ]
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'ncert') {
      return subCategories.ncert.length; // Number of sub-categories
    }
    if (categoryId === 'competitive') {
      return subCategories.competitive.length; // Number of sub-categories
    }
    if (categoryId === 'professional') {
      return subCategories.professional.length; // Number of sub-categories
    }
    if (categoryId === 'study') {
      return subCategories.study.length; // Number of sub-categories
    }
    return resources[categoryId]?.length || 0;
  };

  const getMainCategoryName = (categoryId) => {
    const names = {
      'ncert': 'NCERT & School Books',
      'competitive': 'Competitive Exams',
      'professional': 'Professional Skills',
      'study': 'Study Materials & Notes'
    };
    return names[categoryId] || categoryId;
  };

  const getSubCategoryName = (categoryId) => {
    const allSubCategories = [
      ...subCategories.ncert,
      ...subCategories.competitive,
      ...subCategories.professional,
      ...subCategories.study
    ];
    const subCategory = allSubCategories.find(sub => sub.id === categoryId);
    return subCategory ? subCategory.name : categoryId;
  };

  const isMainCategory = (categoryId) => {
    return ['ncert', 'competitive', 'professional', 'study'].includes(categoryId);
  };

  const selectedResources = isMainCategory(selectedCategory) ? [] : (resources[selectedCategory] || []);
  const selectedSubCategories = isMainCategory(selectedCategory) ? (subCategories[selectedCategory] || []) : [];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">All Resources</h2>
          <p className="text-sm text-gray-500 mb-6">Browse by category</p>

          {/* NCERT & School Books Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('ncert');
                setSelectedCategory('ncert');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'ncert' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.ncert ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'ncert' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  NCERT & School Books
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('ncert')}</span>
            </button>

            {expandedCategories.ncert && (
              <div className="ml-6 mt-1">
                {/* Class 8 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class8');
                      setSelectedCategory('class8');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class8' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class8 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class8' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 8
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class8?.length || 0}</span>
                  </button>

                  {expandedCategories.class8 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class8.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 9 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class9');
                      setSelectedCategory('class9');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class9' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class9 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class9' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 9
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class9?.length || 0}</span>
                  </button>

                  {expandedCategories.class9 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class9.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 10 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class10');
                      setSelectedCategory('class10');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class10' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class10 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class10' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 10
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class10?.length || 0}</span>
              </button>

                  {expandedCategories.class10 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class10.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 11 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class11');
                      setSelectedCategory('class11');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class11' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class11 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class11' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 11
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class11?.length || 0}</span>
                  </button>

                  {expandedCategories.class11 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class11.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 12 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class12');
                      setSelectedCategory('class12');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class12' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class12 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class12' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 12
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class12?.length || 0}</span>
                  </button>

                  {expandedCategories.class12 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class12.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Competitive Exams Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('competitive');
                setSelectedCategory('competitive');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'competitive' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.competitive ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'competitive' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Competitive Exams
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('competitive')}</span>
            </button>

            {expandedCategories.competitive && (
              <div className="ml-6 mt-1">
                {/* JEE Preparation */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('jee');
                      setSelectedCategory('jee');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'jee' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.jee ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'jee' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        JEE Preparation
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.jee?.length || 0}</span>
                  </button>

                  {expandedCategories.jee && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.jee.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* NEET Preparation */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('neet');
                      setSelectedCategory('neet');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'neet' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.neet ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'neet' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        NEET Preparation
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.neet?.length || 0}</span>
                  </button>

                  {expandedCategories.neet && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.neet.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* UPSC */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('upsc');
                      setSelectedCategory('upsc');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'upsc' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.upsc ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'upsc' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        UPSC
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.upsc?.length || 0}</span>
                  </button>

                  {expandedCategories.upsc && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.upsc.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Professional Skills Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('professional');
                setSelectedCategory('professional');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'professional' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.professional ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'professional' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Professional Skills
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('professional')}</span>
            </button>

            {expandedCategories.professional && (
              <div className="ml-6 mt-1">
                {/* Web Development */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('webdev');
                      setSelectedCategory('webdev');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'webdev' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.webdev ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'webdev' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Web Development
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.webdev?.length || 0}</span>
                  </button>

                  {expandedCategories.webdev && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.webdev.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Data Science */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('data');
                      setSelectedCategory('data');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'data' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.data ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'data' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Data Science
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.data?.length || 0}</span>
                  </button>

                  {expandedCategories.data && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.data.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI & ML */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('ai');
                      setSelectedCategory('ai');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'ai' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.ai ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'ai' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        AI & ML
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.ai?.length || 0}</span>
                  </button>

                  {expandedCategories.ai && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.ai.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Study Materials & Notes Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('study');
                setSelectedCategory('study');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'study' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.study ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'study' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Study Materials & Notes
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('study')}</span>
            </button>

            {expandedCategories.study && (
              <div className="ml-6 mt-1">
                {/* Study Notes */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('notes');
                      setSelectedCategory('notes');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'notes' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.notes ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'notes' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Study Notes
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.notes?.length || 0}</span>
                  </button>

                  {expandedCategories.notes && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.notes.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exam Guides */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('guides');
                      setSelectedCategory('guides');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'guides' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.guides ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'guides' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Exam Guides
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.guides?.length || 0}</span>
                  </button>

                  {expandedCategories.guides && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.guides.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {isMainCategory(selectedCategory) 
                ? getMainCategoryName(selectedCategory)
                : getSubCategoryName(selectedCategory)}
            </h1>
            <p className="text-sm text-gray-500">
              {isMainCategory(selectedCategory) 
                ? `${selectedSubCategories.length} items` 
                : `${selectedResources.length} items`}
            </p>
          </div>

          {/* Folder Cards Grid (when main category is selected) */}
          {isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedSubCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  onClick={() => setSelectedCategory(subCategory.id)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
                >
                  {/* Folder Icon */}
                  <div className="flex justify-center mb-4">
                    <Folder className="w-16 h-16 text-blue-600" />
                  </div>

                  {/* Sub-category Name */}
                  <h3 className="font-semibold text-gray-900 text-base mb-2">{subCategory.name}</h3>

                  {/* Item Count */}
                  <p className="text-sm text-gray-500">{subCategory.count} items</p>
                </div>
              ))}
            </div>
          )}

          {/* Resource Grid (when sub-category is selected) */}
          {!isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Document Icon */}
                  <div className="flex justify-center mb-4">
                    <FileText
                      className={`w-16 h-16 ${
                        resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{resource.title}</h3>

                  {/* Subtitle */}
                  <p className="text-xs text-gray-500 mb-4">{resource.subtitle}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">{resource.size}</span>
                    {resource.price === "Free" ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Free</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">{resource.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
