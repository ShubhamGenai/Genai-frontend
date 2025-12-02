import React, { useState } from "react";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";

const QuizBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setQuizzes([]);
    setSummary(null);
    setError(null);
  };

  const parseCsvText = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length <= 1) {
      throw new Error("No data rows found in file.");
    }

    const header = lines[0].split(",").map((h) => h.trim());
    const requiredHeaders = [
      "quizTitle",
      "quizDuration",
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "answer",
    ];

    for (const h of requiredHeaders) {
      if (!header.includes(h)) {
        throw new Error(
          `Missing required column '${h}'. Please download and use the template.`
        );
      }
    }

    const idx = (name) => header.indexOf(name);

    const quizMap = new Map();

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row) continue;

      const cols = row.split(",").map((c) => c.trim());
      if (cols.length !== header.length) {
        // Skip malformed rows but continue
        // You could collect row-level errors if needed
        continue;
      }

      const quizTitle = cols[idx("quizTitle")];
      const quizDuration = cols[idx("quizDuration")];
      const questionText = cols[idx("questionText")];
      const option1 = cols[idx("option1")];
      const option2 = cols[idx("option2")];
      const option3 = cols[idx("option3")];
      const option4 = cols[idx("option4")];
      const answer = cols[idx("answer")];

      if (!quizTitle || !questionText) {
        continue;
      }

      const key = `${quizTitle}__${quizDuration || ""}`;
      if (!quizMap.has(key)) {
        quizMap.set(key, {
          title: quizTitle,
          duration: quizDuration ? Number(quizDuration) : undefined,
          questions: [],
        });
      }

      const quiz = quizMap.get(key);
      quiz.questions.push({
        questionText,
        options: [option1, option2, option3, option4].filter((o) => o),
        answer,
      });
    }

    return Array.from(quizMap.values());
  };

  const handleParse = () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setIsParsing(true);
    setError(null);
    setQuizzes([]);
    setSummary(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result || "";
        const parsedQuizzes = parseCsvText(text);
        if (parsedQuizzes.length === 0) {
          throw new Error("No valid quiz rows found in file.");
        }
        setQuizzes(parsedQuizzes);
      } catch (err) {
        console.error("Parse error:", err);
        setError(err.message || "Failed to parse CSV file.");
      } finally {
        setIsParsing(false);
      }
    };
    reader.onerror = () => {
      setIsParsing(false);
      setError("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!quizzes.length) {
      setError("No quizzes parsed. Please parse the file first.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSummary(null);

    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (let i = 0; i < quizzes.length; i++) {
      const quizData = quizzes[i];
      try {
        await axios.post(CONTENTMANAGER.ADD_QUIZ, quizData);
        successCount++;
      } catch (err) {
        failCount++;
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Unknown error";
        errors.push({ quizTitle: quizData.title, error: msg });
      }
    }

    setIsUploading(false);
    setSummary({ total: quizzes.length, success: successCount, failed: failCount, errors });
  };

  const handleDownloadTemplate = () => {
    const headerRow = [
      "quizTitle",
      "quizDuration",
      "questionText",
      "option1",
      "option2",
      "option3",
      "option4",
      "answer",
    ];

    const sampleRow = [
      "Sample Quiz",
      "30",
      "What is 2 + 2?",
      "3",
      "4",
      "5",
      "6",
      "4",
    ];

    const csvContent = [headerRow.join(","), sampleRow.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "quizzes-bulk-upload-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetState = () => {
    setFile(null);
    setQuizzes([]);
    setSummary(null);
    setError(null);
    setIsParsing(false);
    setIsUploading(false);
  };

  return (
    <div className="w-full min-h-full pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Bulk Upload Quizzes
        </h1>
        <p className="text-slate-400 text-base font-light max-w-2xl">
          Upload a CSV file to create multiple quizzes at once. Each row
          represents a question; rows with the same quiz title are grouped into
          a single quiz and sent to the backend{" "}
          <code className="text-xs bg-slate-800 px-1 rounded">
            /content/add-quiz
          </code>{" "}
          endpoint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Actions */}
        <div className="lg:col-span-2 bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            1. Upload & Parse CSV
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select CSV file
              </label>
              <div
                className="border-2 border-dashed border-slate-600/60 rounded-xl p-6 bg-slate-800/40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/70 hover:bg-slate-800/70 transition-colors"
                onClick={() => document.getElementById("quiz-bulk-file")?.click()}
              >
                <input
                  id="quiz-bulk-file"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-300">
                    ⬆
                  </span>
                </div>
                <p className="text-slate-200 font-medium">
                  {file ? file.name : "Click to browse CSV file"}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Accepted format: .csv (no commas inside cells)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleParse}
                disabled={!file || isParsing}
                className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {isParsing ? "Parsing..." : "Parse File"}
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!quizzes.length || isUploading}
                className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-all"
              >
                {isUploading ? "Uploading..." : "Upload Quizzes"}
              </button>
              <button
                type="button"
                onClick={resetState}
                disabled={isParsing || isUploading}
                className="inline-flex items-center justify-center py-2.5 px-5 border border-slate-600/40 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-700/60 transition-all"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {quizzes.length > 0 && (
              <div className="rounded-lg bg-slate-800/50 border border-slate-600/40 px-4 py-3 text-sm text-slate-200">
                <p className="font-semibold mb-1">
                  Parsed {quizzes.length} quiz
                  {quizzes.length > 1 ? "zes" : ""} from file.
                </p>
                <ul className="list-disc list-inside text-xs space-y-1 max-h-40 overflow-y-auto">
                  {quizzes.map((q, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{q.title}</span> —{" "}
                      {q.questions.length} questions
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 px-4 py-3 text-sm text-emerald-200 space-y-1">
                <p className="font-semibold">Upload summary</p>
                <p>
                  Total quizzes: {summary.total} | Successful: {summary.success} | Failed:{" "}
                  {summary.failed}
                </p>
                {summary.errors?.length > 0 && (
                  <div className="mt-2 text-xs text-emerald-100 max-h-32 overflow-y-auto">
                    <p className="font-semibold mb-1">Errors:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {summary.errors.map((e, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{e.quizTitle}:</span> {e.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Template & Instructions */}
        <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              2. Template & Guidelines
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
            Your CSV should contain these columns:
          </p>
          <ul className="text-slate-200 text-xs space-y-1 mb-4 list-disc list-inside">
            <li>
              <strong>quizTitle</strong> – name of the quiz (rows with same title are
              grouped)
            </li>
            <li>
              <strong>quizDuration</strong> – duration in minutes (same for all rows of a
              quiz)
            </li>
            <li>
              <strong>questionText</strong> – the question text
            </li>
            <li>
              <strong>option1..option4</strong> – up to four options (can leave some
              empty)
            </li>
            <li>
              <strong>answer</strong> – correct answer text (should match one of the
              options)
            </li>
          </ul>

          <p className="text-slate-400 text-xs">
            For each distinct quiz (same title & duration), the system builds a payload
            like{" "}
            <code className="bg-slate-800 px-1 rounded">
              &#123; title, duration, questions: [&#123; questionText, options, answer
              &#125;...] &#125;
            </code>{" "}
            and sends it to the backend <code>/content/add-quiz</code> endpoint.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizBulkUpload;


