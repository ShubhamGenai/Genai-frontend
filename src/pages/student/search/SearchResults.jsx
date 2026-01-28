import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { mainContext } from "../../../context/MainContext";
import { USERENDPOINTS } from "../../../constants/ApiConstants";
import { Loader, BookOpen, FileText, Library, ArrowRight, Star, Clock, Users } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(mainContext);

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [query] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ tests: [], courses: [], library: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [testsRes, coursesRes, libraryRes] = await Promise.all([
          axios.get(USERENDPOINTS.GETTESTS, { headers }),
          axios.get(USERENDPOINTS.GETCOURSES, { headers }),
          axios.get(USERENDPOINTS.GET_LIBRARY_DOCUMENTS, { headers }),
        ]);

        const q = query.toLowerCase();

        const tests = (Array.isArray(testsRes.data) ? testsRes.data : testsRes.data?.tests || []).filter(
          (t) =>
            String(t.title || t.name || "")
              .toLowerCase()
              .includes(q)
        );

        const courses = (Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data?.courses || []).filter(
          (c) =>
            String(c.title || c.name || "")
              .toLowerCase()
              .includes(q)
        );

        const libraryDocs = (Array.isArray(libraryRes.data) ? libraryRes.data : libraryRes.data?.documents || []).filter(
          (d) =>
            String(d.title || d.name || "")
              .toLowerCase()
              .includes(q)
        );

        setResults({ tests, courses, library: libraryDocs });
      } catch (err) {
        console.error("Search results error:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [query, token]);

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600 text-sm">
          Enter a search query in the header to see results.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm">Searching for “{query}”...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md text-center">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { tests, courses, library } = results;
  const hasAny = tests.length || courses.length || library.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Search results for <span className="text-blue-600">“{query}”</span>
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            {tests.length} tests · {courses.length} courses · {library.length} library documents
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {!hasAny && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-sm text-gray-500">
            No matching tests, courses, or library documents found.
          </div>
        )}

        {tests.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-gray-900">Tests</h2>
              </div>
              <span className="text-[11px] text-gray-500">{tests.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tests.map((t) => {
                const id = t._id || t.id;
                const image =
                  t.image ||
                  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      navigate(`/student/test-details?id=${id}`, { state: { testId: id, test: t } })
                    }
                    className="text-left bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img
                        src={image}
                        alt={t.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {t.type || "Test"}
                      </span>
                    </div>
                    <div className="p-2.5 flex flex-col gap-1">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {t.description || "Practice test"}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.duration || 60} min
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {t.averageRating || t.rating || 0}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {courses.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900">Courses</h2>
              </div>
              <span className="text-[11px] text-gray-500">{courses.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map((c) => {
                const id = c._id || c.id;
                const image =
                  c.image ||
                  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigate(`/student/learn/details/${id}`)}
                    className="text-left bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img
                        src={image}
                        alt={c.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5 flex flex-col gap-1">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-gray-600 line-clamp-1">
                        {c.instructor || c.subject || "Course"}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {c.enrolledStudentsCount || c.students || 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {c.duration || 10} hrs
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {c.rating || 0}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {library.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-semibold text-gray-900">Library</h2>
              </div>
              <span className="text-[11px] text-gray-500">{library.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {library.map((d) => {
                const id = d._id || d.id;
                const thumb =
                  d.thumbnailUrl ||
                  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      navigate("/student/library", {
                        state: { search: query, documentId: id },
                      })
                    }
                    className="text-left bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={thumb}
                        alt={d.title || d.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5 flex flex-col gap-1">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {d.title || d.name}
                      </p>
                      <p className="text-[11px] text-gray-600 line-clamp-1">
                        {d.category || d.type || "Document"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

