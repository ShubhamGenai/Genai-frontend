// Category.jsx
import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState("NEET Preparation");

  const categories = [
    "NEET Preparation",
    "JEE Preparation",
    "School Courses",
    "Digital Skills",
  ];
  
  // State to manage the active category, defaulting to "Data Analyst"
  const [activeCategory, setActiveCategory] = useState('Data Analyst');

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("All Levels");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Example data for courses
  const courses = [
    {
      id: 1,
      label: "Free",
      title: "NEET 2025 Complete Preparation",
      instructor: "Dr. Rajesh Kumar",
      category: "NEET Preparation",
      subject: "Biology",
      learners: "15.4k",
      duration: "120h",
      rating: 4.8,
      ratingCount: "15.4k",
      level: "Intermediate",
      isBestseller: true,
      isEnrolled: true,
      price: 4999,
      originalPrice: 9999,
      image: "./courses/cat.png",
    },
    {
      id: 2,
      label: "Premium",
      title: "NEET Biology – Complete Course",
      instructor: "Dr. Priya Malhotra",
      category: "NEET Preparation",
      subject: "Biology",
      learners: "12.3k",
      duration: "95h",
      rating: 4.9,
      ratingCount: "12.3k",
      level: "Advanced",
      isBestseller: true,
      isEnrolled: false,
      price: 3999,
      originalPrice: 7999,
      image: "./courses/cat.png",
    },
    {
      id: 3,
      label: "Premium",
      title: "JEE Physics Complete Package",
      instructor: "Dr. Anil Kumar",
      category: "JEE Preparation",
      subject: "Physics",
      learners: "10.5k",
      duration: "95h",
      rating: 4.8,
      ratingCount: "10.5k",
      level: "Advanced",
      isBestseller: true,
      isEnrolled: false,
      price: 4299,
      originalPrice: 8599,
      image: "./courses/cat.png",
    },
    {
      id: 4,
      label: "Premium",
      title: "Digital Marketing Masterclass 2025",
      instructor: "Priya Sharma",
      category: "Digital Skills",
      subject: "Marketing",
      learners: "8.9k",
      duration: "60h",
      rating: 4.7,
      ratingCount: "8.9k",
      level: "Beginner",
      isBestseller: true,
      isEnrolled: true,
      price: 3999,
      originalPrice: 7999,
      image: "./courses/cat.png",
    },
    {
      id: 5,
      label: "Premium",
      title: "Data Analyst Mastery Program",
      instructor: "Rohan Singh",
      category: "School Courses",
      subject: "Data Analysis",
      learners: "7.1k",
      duration: "80h",
      rating: 4.8,
      ratingCount: "7.1k",
      level: "Intermediate",
      isBestseller: false,
      isEnrolled: false,
      price: 4599,
      originalPrice: 8999,
      image: "./courses/cat.png",
    },
    {
      id: 6,
      label: "Premium",
      title: "AI & Prompt Engineering Bootcamp",
      instructor: "Ananya Gupta",
      category: "Digital Skills",
      subject: "AI & Prompting",
      learners: "9.2k",
      duration: "50h",
      rating: 4.9,
      ratingCount: "9.2k",
      level: "Advanced",
      isBestseller: false,
      isEnrolled: false,
      price: 5499,
      originalPrice: 9999,
      image: "./courses/cat.png",
    },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        !selectedCategory || selectedCategory === "All" || course.category === selectedCategory;

      const matchesSubject =
        selectedSubject === "All Subjects" || course.subject === selectedSubject;

      const matchesLevel =
        selectedLevelFilter === "All Levels" || course.level === selectedLevelFilter;

      const matchesPrice =
        selectedPriceFilter === "All" ||
        (selectedPriceFilter === "Free" && course.label === "Free") ||
        (selectedPriceFilter === "Paid" && course.label !== "Free");

      const matchesSearch =
        !searchQuery.trim() ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.instructor || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesSubject &&
        matchesLevel &&
        matchesPrice &&
        matchesSearch
      );
    });
  }, [courses, selectedCategory, selectedSubject, selectedLevelFilter, selectedPriceFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header + Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Explore Courses
              </h1>
              <p className="text-sm text-gray-500">
                Discover courses to boost your skills.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(categories[0]);
                setSelectedSubject("All Subjects");
                setSelectedLevelFilter("All Levels");
                setSelectedPriceFilter("All");
                setSearchQuery("");
              }}
              className="self-start md:self-auto inline-flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Filter row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            {/* Find Courses */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                Find Courses:
              </span>
              <select
                className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setActiveCategory(e.target.value);
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option>All Subjects</option>
              <option>Biology</option>
              <option>Physics</option>
              <option>Marketing</option>
              <option>Data Analysis</option>
              <option>AI &amp; Prompting</option>
            </select>

            {/* Level */}
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value)}
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Price */}
            <select
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPriceFilter}
              onChange={(e) => setSelectedPriceFilter(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>

            {/* Search */}
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full h-9 rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                className="px-4 h-9 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <p className="text-xs text-gray-600">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/learn/details/${course.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group fade-in-up"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                {/* Bestseller badge */}
                {course.isBestseller && (
                  <span className="absolute top-2 left-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-semibold uppercase text-yellow-900 shadow-sm">
                    Bestseller
                  </span>
                )}

                {/* Enrolled / Free badge */}
                <span
                  className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase shadow-sm ${
                    course.label === "Free"
                      ? "bg-emerald-500 text-white"
                      : course.isEnrolled
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  {course.label === "Free"
                    ? "Free"
                    : course.isEnrolled
                    ? "Enrolled"
                    : "Premium"}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600">
                  {course.title}
                </h3>
                {course.instructor && (
                  <p className="text-[11px] text-gray-500">
                    {course.instructor}
                  </p>
                )}

                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.064 9.394c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.967z" />
                    </svg>
                    <span className="font-medium">{course.rating}</span>
                    <span className="ml-1 text-gray-400">
                      ({course.ratingCount})
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span>{course.learners} learners</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{course.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {course.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Simple static pagination (visual only) */}
        <div className="flex items-center justify-center mt-8 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-900">1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
