import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const initialClasses = ["Class 11", "Class 12", "Common"];

const LibraryUploadDocument = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewName, setFilePreviewName] = useState("");
  const [name, setName] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newClass, setNewClass] = useState("");
  const [description, setDescription] = useState("");
  const [whatsIncludedText, setWhatsIncludedText] = useState("");
  const [bestFor, setBestFor] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [support, setSupport] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState("");
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch classes and categories from backend on component mount
  useEffect(() => {
    const fetchClassesAndCategories = async () => {
      setIsLoadingClasses(true);
      setIsLoadingCategories(true);
      try {
        // Fetch classes
        try {
          const clsRes = await axios.get(CONTENTMANAGER.GET_LIBRARY_CLASSES);
          if (clsRes.data.success && clsRes.data.classes) {
            const classNames = clsRes.data.classes.map((cls) => cls.name);
            setClasses(classNames);
          } else {
            setClasses(initialClasses);
          }
        } catch (err) {
          console.error("Failed to fetch classes:", err);
          setClasses(initialClasses);
        } finally {
          setIsLoadingClasses(false);
        }

        // Fetch categories
        try {
          const res = await axios.get(CONTENTMANAGER.GET_LIBRARY_CATEGORIES);
          if (res.data.success && res.data.categories) {
            const categoryNames = res.data.categories.map((cat) => cat.name);
            setCategories(categoryNames);
          } else {
            setCategories(["Physics", "Biology", "English"]);
          }
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          setCategories(["Physics", "Biology", "English"]);
        } finally {
          setIsLoadingCategories(false);
        }
      } catch (e) {
        // generic safety, though inner try/catches handle most
        console.error("Error initializing library upload data:", e);
        setClasses(initialClasses);
        setCategories(["Physics", "Biology", "English"]);
        setIsLoadingClasses(false);
        setIsLoadingCategories(false);
      }
    };

    fetchClassesAndCategories();
  }, []);

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

  const handleAddCategory = async () => {
    const value = newCategory.trim();
    if (!value) return;
    
    // Check if category already exists (case-insensitive)
    if (categories.some(cat => cat.toLowerCase() === value.toLowerCase())) {
      setMessage({ type: "warning", text: "Category already exists." });
      return;
    }

    try {
      // Add category via API
      const res = await axios.post(CONTENTMANAGER.ADD_LIBRARY_CATEGORY, {
        name: value
      });

      if (res.data.success) {
        // Update local state with new category
        setCategories((prev) => [...prev, res.data.category.name]);
        setSelectedCategory(res.data.category.name);
        setNewCategory("");
        setMessage({ type: "success", text: "Category added successfully." });
      }
    } catch (err) {
      console.error("Failed to add category:", err);
      const errorMsg = err.response?.data?.error || "Failed to add category. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  const handleAddClass = async () => {
    const value = newClass.trim();
    if (!value) return;
    
    // Check if class already exists (case-insensitive)
    if (classes.some(cls => cls.toLowerCase() === value.toLowerCase())) {
      setMessage({ type: "warning", text: "Class already exists." });
      return;
    }

    try {
      // Add class via API
      const res = await axios.post(CONTENTMANAGER.ADD_LIBRARY_CLASS, {
        name: value
      });

      if (res.data.success) {
        // Update local state with new class
        setClasses((prev) => [...prev, res.data.classItem.name]);
        setSelectedClass(res.data.classItem.name);
        setNewClass("");
        setMessage({ type: "success", text: "Class added successfully." });
      }
    } catch (err) {
      console.error("Failed to add class:", err);
      const errorMsg = err.response?.data?.error || "Failed to add class. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }
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
    // Only validate prices when not free
    if (!isFree) {
      if (!priceActual || Number(priceActual) <= 0) {
        newErrors.priceActual = "Actual price is required and must be greater than 0";
      }
      if (!priceDiscounted || Number(priceDiscounted) <= 0) {
        newErrors.priceDiscounted = "Discounted price is required and must be greater than 0";
      }
    }
    const maxPdfBytes = 100 * 1024 * 1024; // 100 MB max (fast multipart upload for 50MB+)
    if (!selectedFile) {
      newErrors.pdfFile = "Please select a PDF file to upload.";
    } else if (selectedFile.size > maxPdfBytes) {
      newErrors.pdfFile = `File is too large (max 100 MB). Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB.`;
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
    setUploadProgress(0);

    const uploadId = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `upload-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    const progressUrl = `${CONTENTMANAGER.UPLOAD_PROGRESS}?uploadId=${encodeURIComponent(uploadId)}`;
    let eventSource = null;
    try {
      eventSource = new EventSource(progressUrl);
    } catch (_) {}

    eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.percent === "number") setUploadProgress(data.percent);
          if (data.stage) setUploadStage(data.stage);
        } catch (_) {}
    };
    eventSource.onerror = () => eventSource.close();

    try {
      const formData = new FormData();
      formData.append('pdfFile', selectedFile);
      formData.append('name', name.trim());
      
      const finalPriceActual = isFree ? 0 : priceActual;
      const finalPriceDiscounted = isFree ? 0 : priceDiscounted;
      formData.append('priceActual', finalPriceActual);
      formData.append('priceDiscounted', finalPriceDiscounted);
      
      formData.append('class', selectedClass);
      formData.append('category', selectedCategory);
      
      if (description) formData.append('description', description.trim());
      if (whatsIncludedText) {
        const whatsIncludedArray = whatsIncludedText.split('\n').filter(item => item.trim());
        formData.append('whatsIncluded', JSON.stringify(whatsIncludedArray));
      }
      if (bestFor) formData.append('bestFor', bestFor.trim());
      if (prerequisites) formData.append('prerequisites', prerequisites.trim());
      if (support) formData.append('support', support.trim());
      formData.append('icon', 'FileText');
      formData.append('format', 'PDF');

      const res = await axios.post(CONTENTMANAGER.UPLOAD_LIBRARY_DOCUMENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Upload-ID': uploadId,
        },
        timeout: 300000,
      });

      if (eventSource) eventSource.close();
      setUploadProgress(100);

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
      
      // Refresh classes and categories list in case new ones were added
      try {
        // Refresh classes
        const clsRes = await axios.get(CONTENTMANAGER.GET_LIBRARY_CLASSES);
        if (clsRes.data.success && clsRes.data.classes) {
          const classNames = clsRes.data.classes.map(cls => cls.name);
          setClasses(classNames);
        }
      } catch (err) {
        console.error("Failed to refresh classes:", err);
      }

      try {
        // Refresh categories
        const catRes = await axios.get(CONTENTMANAGER.GET_LIBRARY_CATEGORIES);
        if (catRes.data.success && catRes.data.categories) {
          const categoryNames = catRes.data.categories.map(cat => cat.name);
          setCategories(categoryNames);
        }
      } catch (err) {
        console.error("Failed to refresh categories:", err);
      }
    } catch (err) {
      console.error("Upload error:", err);
      if (eventSource) eventSource.close();
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "Failed to upload file. Please try again.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      if (eventSource) eventSource.close();
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStage("");
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

              {/* Free/Paid Toggle */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => {
                      setIsFree(e.target.checked);
                      if (e.target.checked) {
                        setPriceActual("0");
                        setPriceDiscounted("0");
                        // Clear price errors when making free
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.priceActual;
                          delete newErrors.priceDiscounted;
                          return newErrors;
                        });
                      }
                    }}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-800/40 text-indigo-600 focus:ring-indigo-500/50 focus:ring-2"
                  />
                  <span className="text-base font-bold text-slate-300">
                    Make this document free
                  </span>
                </label>
                <p className="text-xs text-slate-400 mt-1 ml-8">
                  If checked, the document will be available for free download
                </p>
              </div>

              {/* Price Row */}
              {!isFree && (
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
              )}

              {/* Description */}
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                  placeholder="Brief description of the document (optional)"
                />
              </div>

              {/* What's Included */}
              <div>
                <label className="block text-base font-bold text-slate-300 mb-2">
                  What's Included
                </label>
                <textarea
                  value={whatsIncludedText}
                  onChange={(e) => setWhatsIncludedText(e.target.value)}
                  rows={4}
                  className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-3 px-5 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                  placeholder="Enter each item on a new line (optional)&#10;e.g.&#10;High-quality PDF format&#10;All chapters included&#10;Printable format"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Enter each item on a separate line. They will be displayed as a list.
                </p>
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
                    Only PDF files are allowed (max 100 MB). 50MB+ use fast multipart upload.
                  </p>
                </div>
                {errors.pdfFile && (
                  <p className="mt-2 text-sm font-semibold text-red-400">{errors.pdfFile}</p>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-6 p-6 bg-slate-800/20 border border-slate-600/20 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-300 mb-4">
                  Additional Information (Optional)
                </h3>
                
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Best For
                  </label>
                  <textarea
                    value={bestFor}
                    onChange={(e) => setBestFor(e.target.value)}
                    rows={2}
                    className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-2 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                    placeholder="Who is this document best suited for?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Prerequisites
                  </label>
                  <textarea
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                    rows={2}
                    className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-2 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                    placeholder="What knowledge or skills are required?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Support
                  </label>
                  <textarea
                    value={support}
                    onChange={(e) => setSupport(e.target.value)}
                    rows={2}
                    className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-xl shadow-sm py-2 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                    placeholder="Support information or contact details"
                  />
                </div>
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
                    disabled={isLoadingClasses}
                    className={`block w-full bg-slate-800/40 border ${errors.selectedClass ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">
                      {isLoadingClasses ? "Loading classes..." : "Select class"}
                    </option>
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
                    disabled={isLoadingCategories}
                    className={`block w-full bg-slate-800/40 border ${errors.selectedCategory ? 'border-red-500' : 'border-slate-600/30'} rounded-xl shadow-sm py-3 px-5 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">
                      {isLoadingCategories ? "Loading categories..." : "Select category"}
                    </option>
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
                    setNewClass("");
                    setNewCategory("");
                    setDescription("");
                    setWhatsIncludedText("");
                    setBestFor("");
                    setPrerequisites("");
                    setSupport("");
                    setIsFree(false);
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
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {uploadStage ? `${uploadStage} – ` : ""}{uploadProgress}%
                    </>
                  ) : (
                    "Upload PDF"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Class and Category management */}
          <div className="space-y-6">
            {/* Class management */}
            <div className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Classes
              </h2>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Add new class
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddClass();
                      }
                    }}
                    placeholder="e.g. Class 9, Class 10"
                    className="flex-1 bg-slate-800/60 border border-slate-600/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddClass}
                    className="px-3 py-2 rounded-xl bg-slate-600 text-xs font-semibold text-white hover:bg-slate-500 transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-2">
                Existing classes (used for filtering and uploads):
              </p>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {classes.map((cls) => (
                  <span
                    key={cls}
                    className="px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-600/50 text-[11px] text-slate-200"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>

            {/* Category management */}
            <div className="bg-slate-800/40 border border-slate-600/30 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Categories
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
    </div>
  );
};

export default LibraryUploadDocument;
