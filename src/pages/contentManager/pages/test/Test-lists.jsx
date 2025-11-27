import React, { useEffect, useState } from "react";
import axios from "axios";

const levels = ["Beginner", "Intermediate", "Advanced", "Intermediate to Advanced"];

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    const demoTests = [
  {
    title: "JEE Main 2025",
    company: "NTA",
    description: "Joint Entrance Exam for Engineering colleges",
    duration: 180,
    numberOfQuestions: 90,
    price: { actual: 1500, discounted: 1200 },
    image: "https://res.cloudinary.com/djkbpwqpm/image/upload/v1746691763/jee_kai0bt.png",
    level: "Intermediate to Advanced",
    features: ["Mock Test", "Detailed Solutions", "Timed Exam"],
    skills: ["Physics", "Chemistry", "Mathematics"],
    certificate: true,
    instructor: "6421e3c5e5e4b2f001234567", // Use a valid ObjectId from your User collection
    quizzes: [],
    enrolledStudents: [],
    ratings: [],
    averageRating: 4.3,
    totalReviews: 120,
    passingScore: 60,
    totalMarks: 300
  },
  {
    title: "SSC CGL Tier 1",
    company: "SSC",
    description: "Combined Graduate Level Exam for government jobs",
    duration: 120,
    numberOfQuestions: 100,
    price: { actual: 800, discounted: 700 },
    image: "https://res.cloudinary.com/demo/image/upload/v1616612345/ssc_cgl.png",
    level: "Intermediate",
    features: ["Practice Tests", "Previous Year Papers"],
    skills: ["General Awareness", "Quantitative Aptitude", "English"],
    certificate: true,
    instructor: "6421e3c5e5e4b2f001234568",
    quizzes: [],
    enrolledStudents: [],
    ratings: [],
    averageRating: 4.0,
    totalReviews: 50,
    passingScore: 45,
    totalMarks: 200
  },
  {
    title: "Basic English Grammar Test",
    company: "EduLearn",
    description: "Test your English grammar fundamentals",
    duration: 30,
    numberOfQuestions: 40,
    price: { actual: 300, discounted: 0 },
    image: "https://res.cloudinary.com/demo/image/upload/v1616612345/english_grammar.png",
    level: "Beginner",
    features: ["Instant Results", "Grammar Explanations"],
    skills: ["English Grammar", "Vocabulary"],
    certificate: false,
    instructor: "6421e3c5e5e4b2f001234569",
    quizzes: [],
    enrolledStudents: [],
    ratings: [],
    averageRating: 3.8,
    totalReviews: 15,
    passingScore: 30,
    totalMarks: 40
  }
];
    try {
    //   const res = await axios.get("/api/tests");
      setTests(demoTests);
    } catch (error) {
      console.error("Failed to fetch tests", error);
    }
  };

  // Filter tests based on search term and level filter
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = levelFilter ? test.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Tests</h1>
        <p className="text-slate-400 text-base font-light">Manage your test collection</p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-5 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        >
          <option value="">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Test Cards */}
      {filteredTests.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-400 text-base">No tests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTests.map((test, index) => (
            <div key={index} className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02]">
              <img
                src={test.image}
                alt={test.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{test.title}</h2>
                <p className="text-slate-400 text-sm font-medium mb-4">{test.company}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300"><span className="font-semibold">Duration:</span> {test.duration} mins</p>
                  <p className="text-slate-300"><span className="font-semibold">Level:</span> {test.level}</p>
                  <p className="text-slate-300">
                    <span className="font-semibold">Price:</span> ₹{test.price.discounted}{" "}
                    {test.price.discounted < test.price.actual && (
                      <span className="line-through text-slate-500 ml-2">
                        ₹{test.price.actual}
                      </span>
                    )}
                  </p>
                  <p className="text-slate-300"><span className="font-semibold">Total Questions:</span> {test.numberOfQuestions}</p>
                  <p className="text-slate-300"><span className="font-semibold">Passing Score:</span> {test.passingScore}</p>
                  <p className="text-slate-300"><span className="font-semibold">Average Rating:</span> {test.averageRating.toFixed(1)} / 5 ({test.totalReviews} reviews)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestList;
