import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const defaultClasses = ["All", "Class 11", "Class 12", "Common"];

const LibraryAllFiles = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classes] = useState(defaultClasses);
  const [classFilter, setClassFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all categories from files
  const categories = useMemo(() => {
    const cats = new Set();
    files.forEach(file => {
      if (file.category) {
        cats.add(file.category);
      }
    });
    return ["All", ...Array.from(cats).sort()];
  }, [files]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(CONTENTMANAGER.GET_LIBRARY_DOCUMENTS);
        setFiles(res.data || []);
      } catch (err) {
        console.error("Failed to fetch library documents:", err);
        setError(err.response?.data?.error || "Failed to load library documents. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch =
        !searchTerm ||
        file.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All" || file.class === classFilter;

      const matchesCategory =
        categoryFilter === "All" || file.category === categoryFilter;

      return matchesSearch && matchesClass && matchesCategory;
    });
  }, [files, classFilter, categoryFilter, searchTerm]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalCount = files.length;

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-full pb-8">
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
          <p className="text-red-300 text-base font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full pb-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Library – All Files
          </h1>
          <p className="text-slate-400 text-base font-light">
            Browse all uploaded files and filter them by class and category. Total: {totalCount} document{totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate("/content/library/upload")}
          className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all"
        >
          + Upload New Document
        </button>
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

      {/* Files table */}
      {filteredFiles.length === 0 ? (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-400 text-base">
            {files.length === 0 
              ? "No documents uploaded yet. Click 'Upload New Document' to get started."
              : "No files match the selected filters."}
          </p>
        </div>
      ) : (
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-600/30">
            <thead className="bg-slate-800/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Document Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-700/20 divide-y divide-slate-600/30">
              {filteredFiles.map((file) => {
                const price = file.price || {};
                const discountedPrice = price.discounted || price.actual || 0;
                const actualPrice = price.actual || 0;
                const showDiscount = actualPrice > discountedPrice;

                return (
                  <tr
                    key={file._id}
                    className="hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">📄</span>
                        <span className="text-sm font-semibold text-white">
                          {file.name || file.fileName || "Untitled"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {file.class || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                        {file.category || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      <div className="flex flex-col">
                        {showDiscount && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{actualPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="font-semibold text-white">
                          ₹{discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {formatFileSize(file.fileSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {formatDate(file.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {file.fileUrl && (
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                        >
                          View PDF
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LibraryAllFiles;
