export const LEARN_COURSES = [
  {
    id: 1,
    category: 'neet',
    title: 'NEET 2025 Complete Preparation',
    description: 'Comprehensive NEET 2025 preparation covering Physics, Chemistry, and Biology with practice tests and strategy sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    duration: '120 hours',
    level: 'Intermediate',
    price: { actual: 9999, discounted: 4999 },
    ratings: [
      { rating: 5, user: { name: 'Aisha' }, date: '2025-01-05', comment: 'Great coverage and clear explanations.' },
      { rating: 4, user: { name: 'Rohan' }, date: '2025-01-07', comment: 'Loved the mock tests and tips.' }
    ],
    enrolledStudents: 15400,
    instructor: { name: 'Dr. Rajesh Kumar', title: 'MBBS, MD (AIIMS)', coursesCount: 6 },
    features: [
      'Complete PCB syllabus with NCERT focus',
      '2000+ MCQs and 10 full-length mocks',
      'Weekly doubt-clearing live sessions',
      'Exam strategies and time management'
    ],
    learningOutcomes: [
      'Master NCERT concepts with application skills',
      'Improve speed and accuracy for NEET',
      'Develop exam temperament and strategy'
    ],
    requirements: [
      'Class 11/12 PCB background recommended',
      'Basic familiarity with NCERT texts'
    ],
    modules: [
      {
        id: 'neet-phy',
        title: 'Physics for NEET',
        lessons: [
          { title: 'Kinematics Essentials' },
          { title: 'Work, Energy and Power' },
          { title: 'Electrostatics Basics' }
        ]
      },
      {
        id: 'neet-chem',
        title: 'Chemistry for NEET',
        lessons: [
          { title: 'Organic GOC Quick Start' },
          { title: 'Physical: Thermodynamics' },
          { title: 'Inorganic Periodic Trends' }
        ]
      },
      {
        id: 'neet-bio',
        title: 'Biology for NEET',
        lessons: [
          { title: 'Cell: Structure and Function' },
          { title: 'Genetics Fundamentals' },
          { title: 'Human Physiology Overview' }
        ]
      }
    ]
  },
  {
    id: 2,
    category: 'jee-advanced',
    title: 'JEE Advanced Mathematics Mastery',
    description: 'Advanced math concepts for JEE with problem-solving drills and previous-year coverage.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
    duration: '100 hours',
    level: 'Advanced',
    price: { actual: 8999, discounted: 4499 },
    ratings: [
      { rating: 5, user: { name: 'Ankit' }, date: '2025-01-06', comment: 'Top-notch problem sets!' },
      { rating: 5, user: { name: 'Megha' }, date: '2025-01-08', comment: 'Crystal clear explanations.' }
    ],
    enrolledStudents: 12300,
    instructor: { name: 'Prof. Amit Singh', title: 'IIT Bombay, 10+ yrs exp', coursesCount: 9 },
    features: [
      'Proof-oriented understanding',
      'PYQ breakdowns and tricks',
      'Topic-wise assignments'
    ],
    learningOutcomes: [
      'Strengthen problem-solving for Advanced-level questions',
      'Build intuition for calculus, algebra, and geometry'
    ],
    requirements: [
      'JEE Main level mathematics',
      'Comfort with algebraic manipulation'
    ],
    modules: [
      { id: 'jee-calc', title: 'Calculus', lessons: [ { title: 'Limits and Continuity' }, { title: 'Applications of Derivatives' }, { title: 'Definite Integrals' } ] },
      { id: 'jee-alg', title: 'Algebra', lessons: [ { title: 'Complex Numbers' }, { title: 'Matrices and Determinants' }, { title: 'Sequences and Series' } ] },
      { id: 'jee-geo', title: 'Coordinate Geometry', lessons: [ { title: 'Conic Sections' }, { title: 'Vectors & 3D Geometry' } ] }
    ]
  },
  {
    id: 3,
    category: 'digital-marketing',
    title: 'Digital Marketing Masterclass 2025',
    description: 'Hands-on digital marketing with SEO, SEM, social and analytics for 2025 trends.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    duration: '60 hours',
    level: 'Beginner',
    price: { actual: 7999, discounted: 3999 },
    ratings: [
      { rating: 4, user: { name: 'Ira' }, date: '2025-01-04', comment: 'Useful checklists and templates.' },
      { rating: 5, user: { name: 'Kunal' }, date: '2025-01-09', comment: 'Great SEO and ads modules.' }
    ],
    enrolledStudents: 8900,
    instructor: { name: 'Priya Sharma', title: 'Growth Marketer', coursesCount: 4 },
    features: [ 'Campaign planning', 'SEO + SEM', 'Content & Social', 'Analytics dashboards' ],
    learningOutcomes: [ 'Plan and launch campaigns', 'Measure ROI with analytics' ],
    requirements: [ 'No prior experience required' ],
    modules: [
      { id: 'dm-seo', title: 'SEO Basics', lessons: [ { title: 'Keyword Research' }, { title: 'On-Page Optimization' } ] },
      { id: 'dm-ads', title: 'Paid Ads', lessons: [ { title: 'Google Ads Primer' }, { title: 'Facebook & Instagram Ads' } ] },
      { id: 'dm-ana', title: 'Analytics', lessons: [ { title: 'GA4 Setup' }, { title: 'Attribution Basics' } ] }
    ]
  },
  {
    id: 4,
    category: 'web-development',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Full-stack curriculum covering frontend, backend, databases, and deployment.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    duration: '150 hours',
    level: 'Intermediate',
    price: { actual: 12999, discounted: 5999 },
    ratings: [
      { rating: 5, user: { name: 'Aman' }, date: '2025-01-03', comment: 'Projects are very practical.' },
      { rating: 5, user: { name: 'Nina' }, date: '2025-01-07', comment: 'Great MERN coverage.' }
    ],
    enrolledStudents: 18200,
    instructor: { name: 'Arjun Patel', title: 'Full Stack Engineer', coursesCount: 7 },
    features: [ 'MERN stack', 'Auth & Security', 'CI/CD', 'Cloud deploy' ],
    learningOutcomes: [ 'Build and deploy full-stack apps', 'Follow best practices' ],
    requirements: [ 'Basic HTML/CSS/JS' ],
    modules: [
      { id: 'wd-fe', title: 'Frontend', lessons: [ { title: 'React Fundamentals' }, { title: 'State & Hooks' }, { title: 'Routing' } ] },
      { id: 'wd-be', title: 'Backend', lessons: [ { title: 'Node & Express' }, { title: 'REST APIs' } ] },
      { id: 'wd-db', title: 'Database & Deploy', lessons: [ { title: 'MongoDB Basics' }, { title: 'Deployment to Vercel' } ] }
    ]
  },
  {
    id: 5,
    category: 'data-science',
    title: 'Data Science with Python Complete Course',
    description: 'End-to-end data science with Python, pandas, ML models, and visualizations.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    duration: '130 hours',
    level: 'Advanced',
    price: { actual: 10999, discounted: 5499 },
    ratings: [
      { rating: 5, user: { name: 'Ritika' }, date: '2025-01-04', comment: 'Loved the ML sections.' },
      { rating: 4, user: { name: 'Dev' }, date: '2025-01-06', comment: 'Pandas section is thorough.' }
    ],
    enrolledStudents: 14500,
    instructor: { name: 'Dr. Meera Reddy', title: 'Data Scientist', coursesCount: 5 },
    features: [ 'Pandas & NumPy', 'Scikit-learn models', 'Matplotlib & Seaborn', 'End-to-end projects' ],
    learningOutcomes: [ 'Analyze datasets', 'Build and evaluate ML models' ],
    requirements: [ 'Python basics' ],
    modules: [
      { id: 'ds-py', title: 'Python for DS', lessons: [ { title: 'Python Refresher' }, { title: 'NumPy Fundamentals' } ] },
      { id: 'ds-eda', title: 'EDA & Viz', lessons: [ { title: 'Pandas EDA' }, { title: 'Plotting with Matplotlib' } ] },
      { id: 'ds-ml', title: 'Machine Learning', lessons: [ { title: 'Regression' }, { title: 'Classification' } ] }
    ]
  },
  {
    id: 6,
    category: 'upsc',
    title: 'UPSC Civil Services Complete Preparation',
    description: 'Holistic UPSC prep with GS, CSAT, current affairs, and essay writing.',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop',
    duration: '200 hours',
    level: 'Advanced',
    price: { actual: 14999, discounted: 6999 },
    ratings: [
      { rating: 4, user: { name: 'Pooja' }, date: '2025-01-03', comment: 'Current affairs coverage is strong.' },
      { rating: 5, user: { name: 'Sanjay' }, date: '2025-01-08', comment: 'Very systematic approach.' }
    ],
    enrolledStudents: 9800,
    instructor: { name: 'Vikram Malhotra', title: 'Civics Educator', coursesCount: 3 },
    features: [ 'GS I-IV modules', 'CSAT practice', 'Essay strategy', 'Daily current affairs' ],
    learningOutcomes: [ 'Integrated GS coverage', 'Answer writing skills' ],
    requirements: [ 'General studies background helpful' ],
    modules: [
      { id: 'upsc-gs', title: 'General Studies', lessons: [ { title: 'Polity Overview' }, { title: 'Modern History' } ] },
      { id: 'upsc-csat', title: 'CSAT', lessons: [ { title: 'Quant Basics' }, { title: 'Reasoning Drills' } ] },
      { id: 'upsc-essay', title: 'Essay', lessons: [ { title: 'Structuring Essays' }, { title: 'Practice Topics' } ] }
    ]
  },
  {
    id: 7,
    category: 'class-10',
    title: 'Class 10 Science & Mathematics',
    description: 'CBSE Class 10 Science and Maths coverage with sample papers and revision.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    duration: '90 hours',
    level: 'Beginner',
    price: { actual: 5999, discounted: 2999 },
    ratings: [
      { rating: 5, user: { name: 'Ria' }, date: '2025-01-02', comment: 'Helped score an A1!' },
      { rating: 5, user: { name: 'Kabir' }, date: '2025-01-05', comment: 'Sample papers are excellent.' }
    ],
    enrolledStudents: 16500,
    instructor: { name: 'Prof. Sanjay Gupta', title: 'CBSE Expert', coursesCount: 10 },
    features: [ 'Chapter-wise notes', 'NCERT solutions', 'Sample papers', 'Quick revision' ],
    learningOutcomes: [ 'Concept clarity', 'Exam readiness' ],
    requirements: [ 'NCERT textbooks' ],
    modules: [
      { id: '10-sci', title: 'Science', lessons: [ { title: 'Chemical Reactions' }, { title: 'Life Processes' } ] },
      { id: '10-math', title: 'Mathematics', lessons: [ { title: 'Quadratic Equations' }, { title: 'Trigonometry' } ] }
    ]
  },
  {
    id: 8,
    category: 'graphic-design',
    title: 'Graphic Design Fundamentals',
    description: 'Learn typography, color theory, layout, and practical tools for graphic design.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    duration: '80 hours',
    level: 'Beginner',
    price: { actual: 6999, discounted: 3499 },
    ratings: [
      { rating: 4, user: { name: 'Anvi' }, date: '2025-01-04', comment: 'Good intro to tools.' },
      { rating: 5, user: { name: 'Mohit' }, date: '2025-01-09', comment: 'Loved the projects.' }
    ],
    enrolledStudents: 11200,
    instructor: { name: 'Sneha Krishnan', title: 'Designer', coursesCount: 2 },
    features: [ 'Typography basics', 'Color & layout', 'Figma/Adobe intro' ],
    learningOutcomes: [ 'Design modern layouts', 'Build a mini portfolio' ],
    requirements: [ 'Computer with internet' ],
    modules: [
      { id: 'gd-fund', title: 'Foundations', lessons: [ { title: 'Typography 101' }, { title: 'Color Theory' } ] },
      { id: 'gd-tools', title: 'Tools', lessons: [ { title: 'Figma Basics' }, { title: 'Adobe Illustrator Intro' } ] }
    ]
  },
  {
    id: 9,
    category: 'stock-market',
    title: 'Stock Market Investing for Beginners',
    description: 'Basics of equity markets, fundamental analysis, and simple strategies for beginners.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    duration: '110 hours',
    level: 'Beginner',
    price: { actual: 9999, discounted: 4999 },
    ratings: [
      { rating: 4, user: { name: 'Yash' }, date: '2025-01-03', comment: 'Clear and practical.' },
      { rating: 5, user: { name: 'Sara' }, date: '2025-01-06', comment: 'Good risk management section.' }
    ],
    enrolledStudents: 13700,
    instructor: { name: 'Rahul Verma', title: 'Market Analyst', coursesCount: 3 },
    features: [ 'Market basics', 'Fundamental analysis', 'Simple strategies' ],
    learningOutcomes: [ 'Understand equities', 'Build a basic portfolio' ],
    requirements: [ 'No prior investing experience' ],
    modules: [
      { id: 'sm-basics', title: 'Basics', lessons: [ { title: 'How Markets Work' }, { title: 'Investment Vehicles' } ] },
      { id: 'sm-funda', title: 'Fundamentals', lessons: [ { title: 'Balance Sheet Basics' }, { title: 'Ratios' } ] }
    ]
  },
  {
    id: 10,
    category: 'ui-ux',
    title: 'UI/UX Design Complete Course',
    description: 'End-to-end UI/UX flow from research to prototyping and usability testing.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400&h=300&fit=crop',
    duration: '95 hours',
    level: 'Intermediate',
    price: { actual: 8999, discounted: 4499 },
    ratings: [
      { rating: 5, user: { name: 'Zara' }, date: '2025-01-02', comment: 'User research module is gold.' },
      { rating: 5, user: { name: 'Om' }, date: '2025-01-05', comment: 'Great prototyping lessons.' }
    ],
    enrolledStudents: 10500,
    instructor: { name: 'Ananya Desai', title: 'UX Lead', coursesCount: 6 },
    features: [ 'User research', 'Wireframes & prototypes', 'Usability testing' ],
    learningOutcomes: [ 'Design user-centric interfaces', 'Validate designs with users' ],
    requirements: [ 'Basic design familiarity helpful' ],
    modules: [
      { id: 'ux-research', title: 'Research', lessons: [ { title: 'User Interviews' }, { title: 'Personas' } ] },
      { id: 'ux-proto', title: 'Prototyping', lessons: [ { title: 'Wireframing' }, { title: 'Figma Prototypes' } ] }
    ]
  },
  {
    id: 11,
    category: 'jee-main',
    title: 'JEE Main Physics Preparation',
    description: 'Physics concepts and practice aligned to JEE Main with topic-wise tests.',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
    duration: '85 hours',
    level: 'Intermediate',
    price: { actual: 7999, discounted: 3999 },
    ratings: [
      { rating: 4, user: { name: 'Naman' }, date: '2025-01-03', comment: 'Good problem variety.' },
      { rating: 5, user: { name: 'Tia' }, date: '2025-01-06', comment: 'Clear explanations.' }
    ],
    enrolledStudents: 11800,
    instructor: { name: 'Dr. Suresh Patel', title: 'PhD, Physics', coursesCount: 8 },
    features: [ 'Concept + PYQs', 'Topic-wise tests', 'Formula sheets' ],
    learningOutcomes: [ 'Strengthen core physics', 'Improve test-taking skills' ],
    requirements: [ 'Class 11/12 Physics basics' ],
    modules: [
      { id: 'jm-mech', title: 'Mechanics', lessons: [ { title: 'Laws of Motion' }, { title: 'Work & Energy' } ] },
      { id: 'jm-em', title: 'Electricity & Magnetism', lessons: [ { title: 'Electrostatics' }, { title: 'Current Electricity' } ] }
    ]
  },
  {
    id: 12,
    category: 'class-12-commerce',
    title: 'Class 12 Commerce Complete Course',
    description: 'Accountancy, Business Studies, Economics with revision and question banks.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    duration: '100 hours',
    level: 'Intermediate',
    price: { actual: 6999, discounted: 3499 },
    ratings: [
      { rating: 5, user: { name: 'Ishaan' }, date: '2025-01-02', comment: 'Accounting modules are brilliant.' },
      { rating: 4, user: { name: 'Maya' }, date: '2025-01-05', comment: 'Very exam-focused.' }
    ],
    enrolledStudents: 9200,
    instructor: { name: 'CA Priya Agarwal', title: 'Chartered Accountant', coursesCount: 3 },
    features: [ 'Accountancy deep-dive', 'BST quick notes', 'Economics practice' ],
    learningOutcomes: [ 'Exam-ready concepts', 'Time-saving revision' ],
    requirements: [ 'Class 12 Commerce stream' ],
    modules: [
      { id: 'c12-acc', title: 'Accountancy', lessons: [ { title: 'Partnership Accounts' }, { title: 'Company Accounts' } ] },
      { id: 'c12-bst', title: 'Business Studies', lessons: [ { title: 'Principles of Management' }, { title: 'Marketing' } ] },
      { id: 'c12-eco', title: 'Economics', lessons: [ { title: 'Microeconomics' }, { title: 'Macroeconomics' } ] }
    ]
  },
  {
    id: 13,
    category: 'web-development',
    title: 'Introduction to Generative AI',
    description: 'An introduction to the fascinating world of Generative AI, covering basic concepts, models, and applications.',
    imageUrl: 'https://images.unsplash.com/photo-1620712948141-edc49a5f7e91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '10 hours',
    level: 'Beginner',
    price: { actual: 1999, discounted: 0 },
    ratings: [
      { rating: 4, user: { name: 'Aditi' }, date: '2025-01-10', comment: 'Very insightful and easy to understand.' },
      { rating: 5, user: { name: 'Samir' }, date: '2025-01-12', comment: 'Great examples and hands-on approach.' }
    ],
    enrolledStudents: 25000,
    instructor: { name: 'Google AI', title: 'AI Research Team', coursesCount: 1 },
    features: [
      'Understand core Generative AI concepts',
      'Explore various Generative models (GANs, VAEs, Transformers)',
      'Learn about applications in art, text, and code generation',
      'No prior AI experience required'
    ],
    learningOutcomes: [
      'Gain foundational knowledge in Generative AI',
      'Be able to differentiate between various Generative models',
      'Understand the ethical considerations of Generative AI'
    ],
    requirements: [
      'Basic computer literacy',
      'Enthusiasm for AI and new technologies'
    ],
    modules: [
      { id: 'genai-intro', title: 'Introduction to AI', lessons: [ { title: 'What is AI?' }, { title: 'History of AI' } ] },
      { id: 'genai-models', title: 'Generative Models', lessons: [ { title: 'GANs' }, { title: 'VAEs' }, { title: 'Transformers' } ] },
      { id: 'genai-apps', title: 'Applications', lessons: [ { title: 'Art Generation' }, { title: 'Text Generation' }, { title: 'Code Generation' } ] }
    ]
  }
];
