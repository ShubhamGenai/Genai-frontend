export const MOCK_TESTS = [
  {
    id: 101,
    title: 'CSS Advanced Level Assessment',
    company: 'Frontend Academy',
    durationMinutes: 60,
    numberOfQuestions: 40,
    level: 'Advanced',
    price: { actual: 499, discounted: 199 },
    features: [
      'Certificate on passing threshold',
      'Detailed solutions and explanations',
      'Timed mode with pause protection',
      'Topic-wise analytics report'
    ],
    skills: ['Selectors', 'Flexbox', 'Grid', 'Animations'],
    description: 'Evaluate your CSS mastery with advanced questions covering layout systems, specificity, performance and more.',
    ratings: [ { rating: 4.8, user: { name: 'Ravi' }, date: '2025-01-05', comment: 'Great variety of questions.' } ],
    includes: [
      'Auto-graded results',
      'Downloadable report',
      '1 free reattempt',
      'Lifetime access to solutions'
    ]
  },
  {
    id: 102,
    title: 'JavaScript Intermediate Quiz',
    company: 'JS Guild',
    durationMinutes: 45,
    numberOfQuestions: 35,
    level: 'Intermediate',
    price: { actual: 399, discounted: 149 },
    features: [ 'ES6+ coverage', 'Edge-case questions', 'Score benchmark' ],
    skills: ['ES6', 'Closures', 'Async/Await'],
    description: 'Assess your JavaScript fundamentals and intermediate concepts with carefully curated questions.',
    ratings: [ { rating: 4.7, user: { name: 'Neha' }, date: '2025-01-04', comment: 'Challenging but fair.' } ],
    includes: [ 'Instant results', 'Topic-wise breakdown', 'Retake once', 'Explain-like-I’m-5 solutions' ]
  }
];
