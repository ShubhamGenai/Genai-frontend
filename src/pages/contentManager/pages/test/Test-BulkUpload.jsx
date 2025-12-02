import React, { useState } from "react";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const TestBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setUploadResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV or Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadResult(null);
    setError(null);

    try {
      const response = await axios.post(
        CONTENTMANAGER.BULK_UPLOAD_TESTS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResult(response.data);
    } catch (err) {
      console.error("Bulk upload failed:", err);
      const apiError = err.response?.data?.error || err.response?.data?.message;
      setError(apiError || err.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const headerRow = [
      "title",
      "company",
      "description",
      "duration",
      "numberOfQuestions",
      "level",
      "priceActual",
      "priceDiscounted",
      "passingScore",
      "totalMarks",
    ];

    const csvContent = [headerRow.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tests-bulk-upload-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Bulk Upload Tests
        </h1>
        <p className="text-slate-400 text-base font-light max-w-2xl">
          Upload a CSV/Excel file to create or update multiple tests at once.
          Use the template to ensure your data is in the correct format.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Card */}
        <div className="lg:col-span-2 bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Upload File
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select CSV / Excel file
              </label>
              <div
                className="border-2 border-dashed border-slate-600/60 rounded-xl p-6 bg-slate-800/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-800/70 transition-colors"
                onClick={() => document.getElementById("bulk-upload-file")?.click()}
              >
                <input
                  id="bulk-upload-file"
                  type="file"
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-300">
                    ⬆
                  </span>
                </div>
                <p className="text-slate-200 font-medium">
                  {file ? file.name : "Click to browse or drag & drop file"}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Accepted formats: .csv, .xls, .xlsx
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {uploadResult && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 px-4 py-3 text-sm text-emerald-200 space-y-1">
                <p className="font-semibold">Upload completed.</p>
                {"summary" in uploadResult && (
                  <p className="text-emerald-100">
                    {typeof uploadResult.summary === "string"
                      ? uploadResult.summary
                      : JSON.stringify(uploadResult.summary)}
                  </p>
                )}
                {"createdCount" in uploadResult && (
                  <p>Created: {uploadResult.createdCount}</p>
                )}
                {"updatedCount" in uploadResult && (
                  <p>Updated: {uploadResult.updatedCount}</p>
                )}
                {"failedCount" in uploadResult && (
                  <p>Failed: {uploadResult.failedCount}</p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setUploadResult(null);
                  setError(null);
                }}
                className="bg-slate-700/40 py-2.5 px-5 border border-slate-600/30 rounded-xl text-sm font-semibold text-white hover:bg-slate-700/70 transition-all"
                disabled={isUploading}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isUploading || !file}
                className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload File"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Instructions Card */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Template & Guidelines
            </h2>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
            >
              Download template
            </button>
          </div>

          <p className="text-slate-300 text-sm mb-3">
            Your CSV/Excel file should contain the following columns:
          </p>

          <ul className="text-slate-200 text-xs space-y-1 mb-4 list-disc list-inside">
            <li>title (string) – name of the test</li>
            <li>company (string) – exam provider / organization</li>
            <li>description (string)</li>
            <li>duration (number, minutes)</li>
            <li>numberOfQuestions (number)</li>
            <li>level (Beginner / Intermediate / Advanced / Intermediate to Advanced)</li>
            <li>priceActual (number)</li>
            <li>priceDiscounted (number, can be 0)</li>
            <li>passingScore (number)</li>
            <li>totalMarks (number)</li>
          </ul>

          <p className="text-slate-400 text-xs">
            After uploading, the system will validate each row and create or
            update tests accordingly. Any failed rows will be reported back in
            the upload summary from the server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestBulkUpload;


