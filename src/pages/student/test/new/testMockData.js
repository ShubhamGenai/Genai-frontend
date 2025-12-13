// Mock category structure for tests
export const mockCategoryStructure = [
  {
    id: 'ncert-school',
    label: 'NCERT & School',
    type: 'folder',
    children: [
      {
        id: 'class-6-8-tests',
        label: 'Class 6-8',
        type: 'folder',
        parent: 'ncert-school',
        children: [
          { id: 'class-6-tests', label: 'Class 6 Tests', type: 'category', parent: 'class-6-8-tests' },
          { id: 'class-7-tests', label: 'Class 7 Tests', type: 'category', parent: 'class-6-8-tests' },
          { id: 'class-8-tests', label: 'Class 8 Tests', type: 'category', parent: 'class-6-8-tests' }
        ]
      },
      {
        id: 'class-9-10-tests',
        label: 'Class 9-10',
        type: 'folder',
        parent: 'ncert-school',
        children: [
          { id: 'class-9-tests', label: 'Class 9 Tests', type: 'category', parent: 'class-9-10-tests' },
          { id: 'class-10-tests', label: 'Class 10 Tests', type: 'category', parent: 'class-9-10-tests' }
        ]
      },
      {
        id: 'class-11-12-tests',
        label: 'Class 11-12',
        type: 'folder',
        parent: 'ncert-school',
        children: [
          { id: 'class-11-science-tests', label: 'Class 11 Science', type: 'category', parent: 'class-11-12-tests' },
          { id: 'class-12-science-tests', label: 'Class 12 Science', type: 'category', parent: 'class-11-12-tests' },
          { id: 'class-12-commerce-tests', label: 'Class 12 Commerce', type: 'category', parent: 'class-11-12-tests' }
        ]
      }
    ]
  },
  {
    id: 'competitive-exams',
    label: 'Competitive Exams',
    type: 'folder',
    children: [
      {
        id: 'medical-entrance-tests',
        label: 'Medical Entrance',
        type: 'folder',
        parent: 'competitive-exams',
        children: [
          { id: 'neet-tests', label: 'NEET Tests', type: 'category', parent: 'medical-entrance-tests' },
          { id: 'aiims-tests', label: 'AIIMS Tests', type: 'category', parent: 'medical-entrance-tests' }
        ]
      },
      {
        id: 'engineering-entrance-tests',
        label: 'Engineering Entrance',
        type: 'folder',
        parent: 'competitive-exams',
        children: [
          { id: 'jee-main-tests', label: 'JEE Main Tests', type: 'category', parent: 'engineering-entrance-tests' },
          { id: 'jee-advanced-tests', label: 'JEE Advanced Tests', type: 'category', parent: 'engineering-entrance-tests' }
        ]
      },
      {
        id: 'government-job-tests',
        label: 'Government Jobs',
        type: 'folder',
        parent: 'competitive-exams',
        children: [
          { id: 'upsc-tests', label: 'UPSC Tests', type: 'category', parent: 'government-job-tests' },
          { id: 'ssc-tests', label: 'SSC Tests', type: 'category', parent: 'government-job-tests' },
          { id: 'banking-tests', label: 'Banking Tests', type: 'category', parent: 'government-job-tests' }
        ]
      }
    ]
  },
  {
    id: 'aptitude-reason',
    label: 'Aptitude & Reasoning',
    type: 'folder',
    children: [
      {
        id: 'logical-reasoning-tests',
        label: 'Logical Reasoning',
        type: 'folder',
        parent: 'aptitude-reason',
        children: [
          { id: 'verbal-reasoning-tests', label: 'Verbal Reasoning', type: 'category', parent: 'logical-reasoning-tests' },
          { id: 'non-verbal-tests', label: 'Non-Verbal Reasoning', type: 'category', parent: 'logical-reasoning-tests' },
          { id: 'analytical-tests', label: 'Analytical Reasoning', type: 'category', parent: 'logical-reasoning-tests' }
        ]
      },
      {
        id: 'quantitative-tests',
        label: 'Quantitative Aptitude',
        type: 'folder',
        parent: 'aptitude-reason',
        children: [
          { id: 'arithmetic-tests', label: 'Arithmetic Tests', type: 'category', parent: 'quantitative-tests' },
          { id: 'algebra-tests', label: 'Algebra Tests', type: 'category', parent: 'quantitative-tests' },
          { id: 'geometry-tests', label: 'Geometry Tests', type: 'category', parent: 'quantitative-tests' }
        ]
      }
    ]
  },
  {
    id: 'technical-skills',
    label: 'Technical Skills',
    type: 'folder',
    children: [
      {
        id: 'programming-tests',
        label: 'Programming',
        type: 'folder',
        parent: 'technical-skills',
        children: [
          { id: 'python-tests', label: 'Python Tests', type: 'category', parent: 'programming-tests' },
          { id: 'java-tests', label: 'Java Tests', type: 'category', parent: 'programming-tests' },
          { id: 'javascript-tests', label: 'JavaScript Tests', type: 'category', parent: 'programming-tests' }
        ]
      },
      {
        id: 'data-science-tests',
        label: 'Data Science',
        type: 'folder',
        parent: 'technical-skills',
        children: [
          { id: 'ml-tests', label: 'Machine Learning', type: 'category', parent: 'data-science-tests' },
          { id: 'statistics-tests', label: 'Statistics Tests', type: 'category', parent: 'data-science-tests' }
        ]
      }
    ]
  }
];

// Mock tests data
export const mockTests = [
  {
    id: 1,
    title: "Class 12 Physics Board Exam Mock",
    description: "Complete board exam pattern mock test for Class 12 Physics",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop",
    type: "Mock Test",
    isPremium: true,
    questions: 60,
    duration: 120, // in minutes
    rating: 4.7,
    attempts: 12400,
    level: "Intermediate",
    category: "class-12-science-tests",
    subject: "Physics"
  },
  {
    id: 2,
    title: "NEET Biology Chapter Test",
    description: "Comprehensive test covering all NEET Biology chapters",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    type: "Chapter Test",
    isPremium: false,
    questions: 45,
    duration: 90,
    rating: 4.8,
    attempts: 18200,
    level: "Advanced",
    category: "neet-tests",
    subject: "Biology"
  },
  {
    id: 3,
    title: "JEE Main Mathematics Practice",
    description: "High-quality practice test for JEE Main Mathematics",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    type: "Practice Test",
    isPremium: true,
    questions: 30,
    duration: 75,
    rating: 4.9,
    attempts: 15600,
    level: "Advanced",
    category: "jee-main-tests",
    subject: "Mathematics"
  },
  {
    id: 4,
    title: "Logical Reasoning Aptitude Test",
    description: "Comprehensive logical reasoning test for competitive exams",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    type: "Aptitude Test",
    isPremium: false,
    questions: 50,
    duration: 60,
    rating: 4.6,
    attempts: 9800,
    level: "Beginner",
    category: "verbal-reasoning-tests",
    subject: "Reasoning"
  },
  {
    id: 5,
    title: "Python Programming Assessment",
    description: "Test your Python programming skills with real-world problems",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    type: "Skill Test",
    isPremium: true,
    questions: 25,
    duration: 90,
    rating: 4.8,
    attempts: 7200,
    level: "Intermediate",
    category: "python-tests",
    subject: "Programming"
  },
  {
    id: 6,
    title: "Class 10 Science Mock Test",
    description: "Board exam pattern mock test for Class 10 Science",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    type: "Mock Test",
    isPremium: false,
    questions: 40,
    duration: 180,
    rating: 4.7,
    attempts: 11500,
    level: "Beginner",
    category: "class-10-tests",
    subject: "Science"
  },
  {
    id: 7,
    title: "UPSC Prelims General Studies",
    description: "Complete UPSC Prelims pattern test with current affairs",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
    type: "Prelims Test",
    isPremium: true,
    questions: 100,
    duration: 120,
    rating: 4.9,
    attempts: 8900,
    level: "Advanced",
    category: "upsc-tests",
    subject: "General Studies"
  },
  {
    id: 8,
    title: "Quantitative Aptitude Challenge",
    description: "Test your mathematical and analytical skills",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    type: "Challenge Test",
    isPremium: false,
    questions: 35,
    duration: 45,
    rating: 4.5,
    attempts: 13200,
    level: "Intermediate",
    category: "arithmetic-tests",
    subject: "Mathematics"
  },
  {
    id: 9,
    title: "Data Science Fundamentals Quiz",
    description: "Test your understanding of data science concepts",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    type: "Quiz",
    isPremium: true,
    questions: 20,
    duration: 30,
    rating: 4.8,
    attempts: 5400,
    level: "Advanced",
    category: "ml-tests",
    subject: "Data Science"
  },
  {
    id: 10,
    title: "Banking Exam Preparation Test",
    description: "Complete banking exam preparation with all sections",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    type: "Prep Test",
    isPremium: false,
    questions: 80,
    duration: 150,
    rating: 4.6,
    attempts: 16700,
    level: "Intermediate",
    category: "banking-tests",
    subject: "Banking"
  }
];

