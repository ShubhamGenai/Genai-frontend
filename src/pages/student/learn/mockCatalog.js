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
          { id: 'kin-ess', title: 'Kinematics Essentials', content: 'This lesson covers the fundamental concepts of kinematics, including displacement, velocity, and acceleration. You will learn how to analyze motion in one and two dimensions.' },
          { id: 'work-energy', title: 'Work, Energy and Power', content: 'Explore the principles of work, kinetic energy, potential energy, and power. Understand the work-energy theorem and conservation of mechanical energy.' },
          { id: 'elec-basics', title: 'Electrostatics Basics', content: 'Introduction to electrostatics, Coulomb\'s law, electric field, electric potential, and capacitance. Learn about the behavior of charges at rest.' }
        ]
      },
      {
        id: 'neet-chem',
        title: 'Chemistry for NEET',
        lessons: [
          { id: 'goc-start', title: 'Organic GOC Quick Start', content: 'Fundamental principles of organic chemistry, including IUPAC nomenclature, isomerism, and basic reaction mechanisms.' },
          { id: 'thermody', title: 'Physical: Thermodynamics', content: 'Study the laws of thermodynamics, spontaneity, and free energy. Understand how energy changes in chemical reactions.' },
          { id: 'peri-trends', title: 'Inorganic Periodic Trends', content: 'Overview of periodic table and trends in atomic radius, ionization enthalpy, electronegativity, and electron gain enthalpy.' }
        ]
      },
      {
        id: 'neet-bio',
        title: 'Biology for NEET',
        lessons: [
          { id: 'cell-struc', title: 'Cell: Structure and Function', content: 'Detailed study of prokaryotic and eukaryotic cell structures and their functions. Understand cell organelles and their roles.' },
          { id: 'gen-fund', title: 'Genetics Fundamentals', content: 'Introduction to Mendelian genetics, inheritance patterns, and molecular basis of heredity. Learn about DNA, RNA, and protein synthesis.' },
          { id: 'hum-physio', title: 'Human Physiology Overview', content: 'Broad overview of major human physiological systems including digestive, respiratory, circulatory, and nervous systems.' }
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
      { id: 'jee-calc', title: 'Calculus', lessons: [ { id: 'lim-cont', title: 'Limits and Continuity', content: 'Understand the concepts of limits, continuity, and differentiability. Learn to apply L\'Hôpital\'s rule and intermediate value theorem.' }, { id: 'app-deriv', title: 'Applications of Derivatives', content: 'Explore applications of derivatives in finding tangents, normals, maxima, minima, and rates of change.' }, { id: 'def-int', title: 'Definite Integrals', content: 'Study definite integrals as area under the curve, properties of definite integrals, and fundamental theorem of calculus.' } ] },
      { id: 'jee-alg', title: 'Algebra', lessons: [ { id: 'comp-num', title: 'Complex Numbers', content: 'Introduction to complex numbers, their properties, Argand plane, and De Moivre\'s theorem.' }, { id: 'mat-det', title: 'Matrices and Determinants', content: 'Learn about matrices, types of matrices, operations on matrices, determinants, and their applications in solving linear equations.' }, { id: 'seq-ser', title: 'Sequences and Series', content: 'Study arithmetic progressions, geometric progressions, harmonic progressions, and special series.' } ] },
      { id: 'jee-geo', title: 'Coordinate Geometry', lessons: [ { id: 'conic-sec', title: 'Conic Sections', content: 'Detailed study of parabola, ellipse, and hyperbola, their standard equations, and properties.' }, { id: 'vec-3d', title: 'Vectors & 3D Geometry', content: 'Introduction to vectors, vector algebra, scalar and vector products. Understand lines and planes in three-dimensional geometry.' } ] }
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
      { id: 'dm-seo', title: 'SEO Basics', lessons: [ { id: 'key-res', title: 'Keyword Research', content: 'Learn how to identify relevant keywords for your business and analyze search volume and competition.' }, { id: 'on-page-opt', title: 'On-Page Optimization', content: 'Understand how to optimize website content, meta tags, and internal linking for better search engine rankings.' } ] },
      { id: 'dm-ads', title: 'Paid Ads', lessons: [ { id: 'google-primer', title: 'Google Ads Primer', content: 'Introduction to Google Ads, setting up campaigns, ad groups, and keywords for effective advertising.' }, { id: 'fb-insta', title: 'Facebook & Instagram Ads', content: 'Learn to create and manage ad campaigns on Facebook and Instagram, targeting specific audiences and optimizing for conversions.' } ] },
      { id: 'dm-ana', title: 'Analytics', lessons: [ { id: 'ga4-setup', title: 'GA4 Setup', content: 'Setting up Google Analytics 4, understanding its interface, and tracking key website metrics.' }, { id: 'att-basics', title: 'Attribution Basics', content: 'Understanding different attribution models and how they help in evaluating marketing channel performance.' } ] }
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
      { id: 'wd-fe', title: 'Frontend', lessons: [ { id: 'react-fund', title: 'React Fundamentals', content: 'Learn the core concepts of React, including components, props, and state. Build interactive user interfaces with React.' }, { id: 'state-hooks', title: 'State & Hooks', content: 'Deep dive into React hooks like useState, useEffect, and useContext for managing component state and side effects.' }, { id: 'routing', title: 'Routing', content: 'Implement client-side routing in React applications using React Router. Learn to create dynamic navigation and protected routes.' } ] },
      { id: 'wd-be', title: 'Backend', lessons: [ { id: 'node-express', title: 'Node & Express', content: 'Build robust backend APIs using Node.js and Express.js. Learn about middleware, routing, and handling HTTP requests.' }, { id: 'rest-apis', title: 'REST APIs', content: 'Design and implement RESTful APIs, adhering to best practices for resource identification, representation, and stateless communication.' } ] },
      { id: 'wd-db', title: 'Database & Deploy', lessons: [ { id: 'mongodb-basics', title: 'MongoDB Basics', content: 'Introduction to MongoDB, a NoSQL database. Learn to perform CRUD operations and model data using MongoDB.' }, { id: 'deploy-vercel', title: 'Deployment to Vercel', content: 'Deploy your full-stack applications to Vercel. Learn about environment variables, custom domains, and serverless functions.' } ] }
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
      { id: 'ds-py', title: 'Python for DS', lessons: [ { id: 'py-refresher', title: 'Python Refresher', content: 'A quick review of Python fundamentals essential for data science, including data types, control flow, and functions.' }, { id: 'numpy-fund', title: 'NumPy Fundamentals', content: 'Master NumPy for numerical operations in Python. Learn about arrays, array manipulation, and vectorized operations.' } ] },
      { id: 'ds-eda', title: 'EDA & Viz', lessons: [ { id: 'pandas-eda', title: 'Pandas EDA', content: 'Perform exploratory data analysis using Pandas. Learn data loading, cleaning, transformation, and aggregation techniques.' }, { id: 'plot-mat', title: 'Plotting with Matplotlib', content: 'Create various types of plots and visualizations using Matplotlib for effective data presentation.' } ] },
      { id: 'ds-ml', title: 'Machine Learning', lessons: [ { id: 'regression', title: 'Regression', content: 'Understand linear regression, polynomial regression, and other regression models. Learn to evaluate model performance.' }, { id: 'classification', title: 'Classification', content: 'Explore classification algorithms like logistic regression, decision trees, and support vector machines. Learn about accuracy, precision, and recall.' } ] }
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
      { id: 'upsc-gs', title: 'General Studies', lessons: [ { id: 'polity-over', title: 'Polity Overview', content: 'Comprehensive study of the Indian Constitution, political system, governance, and public administration.' }, { id: 'mod-hist', title: 'Modern History', content: 'Key events and movements in modern Indian history, from the advent of Europeans to independence.' } ] },
      { id: 'upsc-csat', title: 'CSAT', lessons: [ { id: 'quant-basics', title: 'Quant Basics', content: 'Fundamentals of quantitative aptitude including number system, percentages, profit & loss, and time & work.' }, { id: 'reason-drills', title: 'Reasoning Drills', content: 'Practice logical reasoning, analytical ability, decision making, and problem-solving questions.' } ] },
      { id: 'upsc-essay', title: 'Essay', lessons: [ { id: 'struct-ess', title: 'Structuring Essays', content: 'Techniques for structuring effective essays, brainstorming ideas, and developing arguments.' }, { id: 'prac-topics', title: 'Practice Topics', content: 'Practice writing essays on various contemporary and historical topics to improve writing skills.' } ] }
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
      { id: '10-sci', title: 'Science', lessons: [ { id: 'chem-react', title: 'Chemical Reactions', content: 'Study different types of chemical reactions, balancing equations, and factors affecting reaction rates.' }, { id: 'life-proc', title: 'Life Processes', content: 'Explore essential life processes like nutrition, respiration, transportation, and excretion in living organisms.' } ] },
      { id: '10-math', title: 'Mathematics', lessons: [ { id: 'quad-eq', title: 'Quadratic Equations', content: 'Learn to solve quadratic equations by factorization, completing the square, and quadratic formula. Understand the nature of roots.' }, { id: 'trig', title: 'Trigonometry', content: 'Introduction to trigonometric ratios, identities, and their applications in solving problems related to heights and distances.' } ] }
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
      { id: 'gd-fund', title: 'Foundations', lessons: [ { id: 'typo-101', title: 'Typography 101', content: 'Learn the basics of typography, including fonts, typefaces, kerning, leading, and tracking. Understand how to choose and use fonts effectively.' }, { id: 'color-theory', title: 'Color Theory', content: 'Explore color theory concepts like color wheel, color harmonies, and psychological effects of colors. Learn to create appealing color palettes.' } ] },
      { id: 'gd-tools', title: 'Tools', lessons: [ { id: 'figma-basics', title: 'Figma Basics', content: 'Introduction to Figma, a popular design tool. Learn to create frames, shapes, text, and use basic editing features.' }, { id: 'adobe-ill-intro', title: 'Adobe Illustrator Intro', content: 'Get started with Adobe Illustrator for vector graphics. Learn about paths, shapes, colors, and basic drawing tools.' } ] }
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
      { id: 'sm-basics', title: 'Basics', lessons: [ { id: 'how-mkts-work', title: 'How Markets Work', content: 'Understand the basics of stock markets, participants, and how stocks are traded. Learn about primary and secondary markets.' }, { id: 'inv-veh', title: 'Investment Vehicles', content: 'Explore different investment vehicles like stocks, bonds, mutual funds, and ETFs. Understand their characteristics and risks.' } ] },
      { id: 'sm-funda', title: 'Fundamentals', lessons: [ { id: 'bal-sheet', title: 'Balance Sheet Basics', content: 'Learn to read and interpret a company\'s balance sheet, understanding assets, liabilities, and equity.' }, { id: 'ratios', title: 'Ratios', content: 'Analyze financial ratios like P/E ratio, EPS, and debt-to-equity ratio to evaluate a company\'s financial health.' } ] }
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
      { id: 'ux-research', title: 'Research', lessons: [ { id: 'user-interviews', title: 'User Interviews', content: 'Conduct effective user interviews to gather insights into user needs, behaviors, and pain points.' }, { id: 'personas', title: 'Personas', content: 'Create user personas based on research data to represent your target audience and inform design decisions.' } ] },
      { id: 'ux-proto', title: 'Prototyping', lessons: [ { id: 'wireframing', title: 'Wireframing', content: 'Learn to create wireframes for website and app interfaces, focusing on layout, hierarchy, and functionality.' }, { id: 'figma-prototypes', title: 'Figma Prototypes', content: 'Build interactive prototypes in Figma to simulate user flows and test usability before development.' } ] }
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
      { id: 'jm-mech', title: 'Mechanics', lessons: [ { id: 'laws-motion', title: 'Laws of Motion', content: 'Study Newton\'s laws of motion, friction, circular motion, and work-energy principles in mechanics.' }, { id: 'work-energy', title: 'Work & Energy', content: 'Understand the concepts of work, energy, and power. Learn about conservation of mechanical energy and momentum.' } ] },
      { id: 'jm-em', title: 'Electricity & Magnetism', lessons: [ { id: 'electrostatics', title: 'Electrostatics', content: 'Introduction to electric charges, Coulomb\'s law, electric field, electric potential, and capacitance.' }, { id: 'curr-elec', title: 'Current Electricity', content: 'Study electric current, Ohm\'s law, resistance, and circuits. Learn about Kirchhoff\'s laws and electrical measurements.' } ] }
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
      { id: 'c12-acc', title: 'Accountancy', lessons: [ { id: 'part-acc', title: 'Partnership Accounts', content: 'Learn about the formation, admission, retirement, and dissolution of partnership firms. Understand profit sharing and capital accounts.' }, { id: 'comp-acc', title: 'Company Accounts', content: 'Study the accounting treatment of shares and debentures, including issue, forfeiture, and re-issue.' } ] },
      { id: 'c12-bst', title: 'Business Studies', lessons: [ { id: 'prin-mgmt', title: 'Principles of Management', content: 'Explore the principles of management, functions of management, and their application in business organizations.' }, { id: 'marketing', title: 'Marketing', content: 'Introduction to marketing management, marketing mix, product, price, place, and promotion strategies.' } ] },
      { id: 'c12-eco', title: 'Economics', lessons: [ { id: 'micro', title: 'Microeconomics', content: 'Study individual economic units, demand and supply, market structures, and consumer behavior.' }, { id: 'macro', title: 'Macroeconomics', content: 'Understand aggregate economic phenomena like national income, employment, inflation, and government policies.' } ] }
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
      { id: 'genai-intro', title: 'Introduction to AI', lessons: [ { id: 'what-is-ai', title: 'What is AI?', content: 'An overview of what Artificial Intelligence is, its history, and its various subfields.' }, { id: 'hist-ai', title: 'History of AI', content: 'Explore the timeline of AI, from its early conceptualizations to modern breakthroughs.' } ] },
      { id: 'genai-models', title: 'Generative Models', lessons: [ { id: 'gans', title: 'GANs', content: 'Learn about Generative Adversarial Networks (GANs), their architecture, and how they generate realistic data.' }, { id: 'vaes', title: 'VAEs', content: 'Understand Variational Autoencoders (VAEs) for generative modeling, including their probabilistic framework.' }, { id: 'transformers', title: 'Transformers', content: 'Delve into Transformer models, their self-attention mechanism, and their impact on natural language processing and other domains.' } ] },
      { id: 'genai-apps', title: 'Applications', lessons: [ { id: 'art-gen', title: 'Art Generation', content: 'Explore how Generative AI is used to create unique and diverse art pieces, from abstract to realistic.' }, { id: 'text-gen', title: 'Text Generation', content: 'Learn about AI models that can generate coherent and contextually relevant text, useful for content creation and chatbots.' }, { id: 'code-gen', title: 'Code Generation', content: 'Discover how AI assists in generating code, auto-completing functions, and even writing entire programs.' } ] }
    ]
  }
];
