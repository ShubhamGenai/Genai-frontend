import React, { useState } from "react";

const initialClasses = ["Class 11", "Class 12", "Common"];
const initialCategories = ["Physics", "Biology", "English"];

const LibraryUploadDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewName, setFilePreviewName] = useState("");
  const [classes] = useState(initialClasses);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setFilePreviewName(file ? file.name : "");
    setMessage(null);
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

    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select a PDF file to upload." });
      return;
    }
    if (!selectedClass) {
      setMessage({ type: "error", text: "Please select a class." });
      return;
    }
    if (!selectedCategory) {
      setMessage({ type: "error", text: "Please select a category." });
      return;
    }

    // For now we only simulate upload – later this can call a real API.
    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({
        type: "success",
        text: `Uploaded "${selectedFile.name}" for ${selectedClass} / ${selectedCategory} (simulated).`,
      });
      setSelectedFile(null);
      setFilePreviewName("");
      setSelectedClass("");
      setSelectedCategory("");
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to upload file. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Upload Document (PDF)
        </h1>
        <p className="text-slate-400 text-base font-light max-w-2xl">
          Upload PDF study materials to the library and tag them by class and
          category. Currently this is stored locally; later you can connect it
          to your backend.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload form */}
        <div className="lg:col-span-2 bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Document details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select PDF file
              </label>
              <div
                className="border-2 border-dashed border-slate-600/60 rounded-xl p-6 bg-slate-800/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-800/70 transition-colors"
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
                  Only PDF files are allowed.
                </p>
              </div>
            </div>

            {/* Class & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-800/40 border border-slate-600/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                >
                  <option value="">Select class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-800/40 border border-slate-600/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
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
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setFilePreviewName("");
                  setSelectedClass("");
                  setSelectedCategory("");
                  setMessage(null);
                }}
                disabled={isUploading}
                className="bg-slate-700/40 py-2.5 px-5 border border-slate-600/30 rounded-xl text-sm font-semibold text-white hover:bg-slate-700/60 transition-all"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {isUploading ? "Uploading..." : "Upload PDF"}
              </button>
            </div>
          </form>
        </div>

        {/* Category management */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
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
                placeholder="e.g. Chemistry, Aptitude"
                className="flex-1 bg-slate-800/40 border border-slate-600/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
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
  );
};

export default LibraryUploadDocument;


