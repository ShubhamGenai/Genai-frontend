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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tests</h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 mb-4 md:mb-0 flex-grow"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="border rounded px-3 py-2"
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
        <p className="text-gray-600">No tests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <div key={test._id} className="border rounded shadow p-4 flex flex-col">
              <img
                src={test.image}
                alt={test.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{test.title}</h2>
              <p className="text-gray-500">{test.company}</p>
              <p className="mt-2">Duration: {test.duration} mins</p>
              <p>Level: {test.level}</p>
              <p>
                Price: ₹{test.price.discounted}{" "}
                {test.price.discounted < test.price.actual && (
                  <span className="line-through text-gray-500 ml-2">
                    ₹{test.price.actual}
                  </span>
                )}
              </p>
              <p>Total Questions: {test.numberOfQuestions}</p>
              <p>Passing Score: {test.passingScore}</p>
              <p>Average Rating: {test.averageRating.toFixed(1)} / 5 ({test.totalReviews} reviews)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestList;
