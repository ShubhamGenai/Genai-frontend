import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/outline";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const levels = ["Beginner", "Intermediate", "Advanced", "Intermediate to Advanced"];

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_TESTS);
        const data = Array.isArray(res.data) ? res.data : res.data.tests || [];
        setTests(data);
      } catch (err) {
        console.error("Failed to fetch tests", err);
        setError("Failed to load tests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch =
        test.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.company?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel = levelFilter ? test.level === levelFilter : true;

      return matchesSearch && matchesLevel;
    });
  }, [tests, searchTerm, levelFilter]);

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            Tests
          </h1>
          <p className="text-slate-400 text-sm">
            Compact list of all tests created in the system.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        >
          <option value="">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-red-500/40 rounded-xl shadow-xl p-4 text-center">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      ) : filteredTests.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6 text-center">
          <p className="text-slate-400 text-sm">No tests found.</p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredTests.map((test) => (
                <tr key={test._id} className="hover:bg-slate-700/40 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-white truncate max-w-[180px]">
                    {test.title}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300 truncate max-w-[120px]">
                    {test.company}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-200">
                    {test.level}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-200">
                    {test.duration} min
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-200">
                    {test.numberOfQuestions}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-200">
                    ₹{test.price?.discounted}
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    <Link
                      to={`/content/tests/${test._id}`}
                      className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-slate-800/70 border border-slate-600/40 text-slate-100 hover:bg-slate-700/80 transition-colors"
                      title="View details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>
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

export default TestList;
