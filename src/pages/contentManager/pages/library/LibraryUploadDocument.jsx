import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const initialClasses = ["Class 11", "Class 12", "Common"];
const initialCategories = ["Physics", "Biology", "English"];

const LibraryUploadDocument = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewName, setFilePreviewName] = useState("");
  const [name, setName] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [classes] = useState(initialClasses);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setFilePreviewName(file ? file.name : "");
    setMessage(null);
    if (errors.pdfFile) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.pdfFile;
        return newErrors;
      });
    }
  };

  const handleAddCategory = () => {
    const value = newCategory.trim();
    if (!value) return;
    if (categories.includes(value)) {
      setMessage({ type: "warning", text: "Category already exists." });
      return;
    }
    setCategories((prev) => [...prev, value]);
    setSelectedCategory(value);
    setNewCategory("");
    setMessage({ type: "success", text: "Category added locally." });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!name || name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (!priceActual || priceActual <= 0) {
      newErrors.priceActual = "Actual price is required and must be greater than 0";
    }
    if (!priceDiscounted || priceDiscounted <= 0) {
      newErrors.priceDiscounted = "Discounted price is required and must be greater than 0";
    }
    if (!selectedFile) {
      newErrors.pdfFile = "Please select a PDF file to upload.";
    }
    if (!selectedClass) {
      newErrors.selectedClass = "Please select a class.";
    }
    if (!selectedCategory) {
      newErrors.selectedCategory = "Please select a category.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUploading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('pdfFile', selectedFile);
      formData.append('name', name.trim());
      formData.append('priceActual', priceActual);
      formData.append('priceDiscounted', priceDiscounted);
      formData.append('class', selectedClass);
      formData.append('category', selectedCategory);

      const res = await axios.post(CONTENTMANAGER.UPLOAD_LIBRARY_DOCUMENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({
        type: "success",
        text: `Successfully uploaded "${name}" to the library.`,
      });

      // Reset form
      setSelectedFile(null);
      setFilePreviewName("");
      setName("");
      setPriceActual("");
      setPriceDiscounted("");
      setSelectedClass("");
      setSelectedCategory("");
    } catch (err) {
      console.error("Upload error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "Failed to upload file. Please try again.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/content/library")}
            className="mr-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Upload Document (PDF)
            </h1>
            <p className="text-slate-400 text-base font-light max-w-2xl">
              Upload PDF study materials to the library and tag them by class and category.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">
              Document details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">
                  Document Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.name;
                        return newErrors;
                      });
                    }
                  }}
                  className={`block w-full bg-slate-800/40 border ${errors.name ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. NCERT Physics Class 11"
                />
                {errors.name && (
                  <p className="mt-2 text-sm font-semibold text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-base font-bold text-slate-300 mb-2">
                    Actual Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={priceActual}
                    onChange={(e) => {
                      setPriceActual(e.target.value);
                      if (errors.priceActual) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.priceActual;
                          return newErrors;
                        });
                      }
                    }}
                    className={`block w-full bg-slate-800/40 border ${errors.priceActual ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  {errors.priceActual && (
                    <p className="mt-2 text-sm font-semibold text-red-400">{errors.priceActual}</p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-bold text-slate-300 mb-2">
                    Discounted Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={priceDiscounted}
                    onChange={(e) => {
                      setPriceDiscounted(e.target.value);
                      if (errors.priceDiscounted) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.priceDiscounted;
                          return newErrors;
                        });
                      }
                    }}
                    className={`block w-full bg-slate-800/40 border ${errors.priceDiscounted ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  {errors.priceDiscounted && (
                    <p className="mt-2 text-sm font-semibold text-red-400">{errors.priceDiscounted}</p>
                  )}
                </div>
              </div>

              {/* File */}
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">
                  Select PDF file <span className="text-red-400">*</span>
                </label>
                <div
                  className={`border-2 border-dashed ${errors.pdfFile ? 'border-red-500' : 'border-slate-600/60'} rounded-xl p-6 bg-slate-800/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-800/70 transition-colors`}
                  onClick={() =>
                    document.getElementById("library-pdf-file")?.click()
                  }
                >
                  <input
                    id="library-pdf-file"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="mb-3">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-300">
                      ⬆
                    </span>
                  </div>
                  <p className="text-slate-200 font-medium">
                    {filePreviewName || "Click to browse and select a PDF"}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Only PDF files are allowed (max 50MB).
                  </p>
                </div>
                {errors.pdfFile && (
                  <p className="mt-2 text-sm font-semibold text-red-400">{errors.pdfFile}</p>
                )}
              </div>

              {/* Class & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-base font-bold text-slate-300 mb-2">
                    Class <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      if (errors.selectedClass) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.selectedClass;
                          return newErrors;
                        });
                      }
                    }}
                    className={`block w-full bg-slate-800/40 border ${errors.selectedClass ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  >
                    <option value="">Select class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  {errors.selectedClass && (
                    <p className="mt-2 text-sm font-semibold text-red-400">{errors.selectedClass}</p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-bold text-slate-300 mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (errors.selectedCategory) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.selectedCategory;
                          return newErrors;
                        });
                      }
                    }}
                    className={`block w-full bg-slate-800/40 border ${errors.selectedCategory ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.selectedCategory && (
                    <p className="mt-2 text-sm font-semibold text-red-400">{errors.selectedCategory}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    message.type === "error"
                      ? "bg-red-500/10 border border-red-500/40 text-red-200"
                      : message.type === "warning"
                      ? "bg-yellow-500/10 border border-yellow-500/40 text-yellow-200"
                      : "bg-emerald-500/10 border border-emerald-500/40 text-emerald-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-600/30">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFilePreviewName("");
                    setName("");
                    setPriceActual("");
                    setPriceDiscounted("");
                    setSelectedClass("");
                    setSelectedCategory("");
                    setMessage(null);
                    setErrors({});
                  }}
                  disabled={isUploading}
                  className="bg-slate-700/40 py-3 px-6 border border-slate-600/30 rounded-xl shadow-sm text-base font-semibold text-white hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload PDF"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Category management */}
          <div className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Categories (local)
            </h2>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Add new category
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="e.g. Chemistry, Aptitude"
                  className="flex-1 bg-slate-800/60 border border-slate-600/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 rounded-xl bg-slate-600 text-xs font-semibold text-white hover:bg-slate-500 transition-all"
                >
                  Add
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-2">
              Existing categories (used for filtering and uploads):
            </p>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-600/50 text-[11px] text-slate-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryUploadDocument;
