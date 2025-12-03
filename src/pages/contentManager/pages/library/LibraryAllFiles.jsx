import React, { useMemo, useState } from "react";

// Simple in-memory mock data for now – later you can replace with real API calls
const initialFiles = [
  {
    id: "1",
    name: "JEE Physics Notes.pdf",
    type: "pdf",
    className: "Class 11",
    category: "Physics",
    size: "2.4 MB",
    uploadedAt: "2025-02-01",
  },
  {
    id: "2",
    name: "NEET Biology Summary.pdf",
    type: "pdf",
    className: "Class 12",
    category: "Biology",
    size: "1.8 MB",
    uploadedAt: "2025-02-03",
  },
  {
    id: "3",
    name: "English Grammar Cheatsheet.pdf",
    type: "pdf",
    className: "Common",
    category: "English",
    size: "900 KB",
    uploadedAt: "2025-01-20",
  },
];

const defaultClasses = ["All", "Class 11", "Class 12", "Common"];
const defaultCategories = ["All", "Physics", "Biology", "English"];

const LibraryAllFiles = () => {
  const [files] = useState(initialFiles);
  const [classes] = useState(defaultClasses);
  const [categories] = useState(defaultCategories);
  const [classFilter, setClassFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch =
        !searchTerm ||
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All" || file.className === classFilter;

      const matchesCategory =
        categoryFilter === "All" || file.category === categoryFilter;

      return matchesSearch && matchesClass && matchesCategory;
    });
  }, [files, classFilter, categoryFilter, searchTerm]);

  const totalCount = files.length;

  return (
    <div className="w-full min-h-full pb-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Library – All Files
          </h1>
          <p className="text-slate-400 text-base font-light">
            Browse all uploaded files and filter them by class and category.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="col-span-2 px-4 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls === "All" ? "All Classes" : cls}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-slate-700/40 border border-slate-600/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="mb-4 text-sm text-slate-300">
        Showing{" "}
        <span className="font-semibold">
          {filteredFiles.length}
        </span>{" "}
        of <span className="font-semibold">{totalCount}</span> files
      </div>

      {/* Files table */}
      {filteredFiles.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-400 text-base">
            No files match the selected filters.
          </p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Uploaded
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-slate-700/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    {file.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {file.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {file.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 uppercase">
                    {file.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {file.uploadedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LibraryAllFiles;


