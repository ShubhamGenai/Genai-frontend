import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import ParsedQuestionPreview from "../../../../component/contentManagerComponents/ParsedQuestionPreview";

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Intermediate to Advanced",
];

const TestPDFUpload = () => {
  const navigate = useNavigate();
  
  // Test metadata
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [level, setLevel] = useState("");
  const [features, setFeatures] = useState("");
  const [skills, setSkills] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [instructorId, setInstructorId] = useState("");
  const [passingScore, setPassingScore] = useState("");

  // PDF upload state
  const [pdfFile, setPdfFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [parseError, setParseError] = useState(null);
  const [parseResult, setParseResult] = useState(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setParseError('Please select a PDF file');
        return;
      }
      setPdfFile(file);
      setParseError(null);
      setParseResult(null);
      setParsedQuestions([]);
    }
  };

  const handleParsePDF = async () => {
    if (!pdfFile) {
      setParseError('Please select a PDF file first');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setParseResult(null);

    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);

      const response = await axios.post(CONTENTMANAGER.PARSE_PDF_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setParseResult(response.data.data);
        setParsedQuestions(response.data.data.questions || []);
        setNumberOfQuestions(response.data.data.totalQuestions.toString());
        
        // Show validation warnings if any
        if (response.data.data.validation && response.data.data.validation.warnings.length > 0) {
          console.warn('Parsing warnings:', response.data.data.validation.warnings);
        }
      } else {
        setParseError('Failed to parse PDF');
      }
    } catch (err) {
      console.error('Error parsing PDF:', err);
      setParseError(err.response?.data?.error || err.message || 'Failed to parse PDF');
    } finally {
      setIsParsing(false);
    }
  };

  const handleQuestionsChange = (updatedQuestions) => {
    setParsedQuestions(updatedQuestions);
    setNumberOfQuestions(updatedQuestions.length.toString());
  };

  const handleRemoveQuestion = (index) => {
    const updated = parsedQuestions.filter((_, i) => i !== index);
    setParsedQuestions(updated);
    setNumberOfQuestions(updated.length.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!company) newErrors.company = "Company/Organizer is required";
    if (!description) newErrors.description = "Description is required";
    if (!duration) newErrors.duration = "Duration is required";
    if (!numberOfQuestions) newErrors.numberOfQuestions = "Number of questions is required";
    if (!priceActual) newErrors.priceActual = "Actual price is required";
    if (!priceDiscounted) newErrors.priceDiscounted = "Discounted price is required";
    if (!level) newErrors.level = "Level is required";
    if (!passingScore) newErrors.passingScore = "Passing score is required";
    if (!instructorId) newErrors.instructorId = "Instructor ID is required";

    if (parsedQuestions.length === 0) {
      newErrors.questions = "Please parse PDF and ensure at least one question is available";
    }

    // Validate all questions
    const invalidQuestions = parsedQuestions.filter((q, index) => {
      const hasText = q.questionText && q.questionText.trim().length > 0;
      const hasOptions = q.options && q.options.length >= 2;
      const hasAnswer = q.answer && ['A', 'B', 'C', 'D'].includes(q.answer.toUpperCase());
      return !hasText || !hasOptions || !hasAnswer;
    });

    if (invalidQuestions.length > 0) {
      newErrors.questions = `${invalidQuestions.length} question(s) are invalid. Please fix them before submitting.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload
    const featuresArray = features ? features.split(',').map(f => f.trim()).filter(f => f) : [];
    const skillsArray = skills ? skills.split(',').map(s => s.trim()).filter(s => s) : [];

    // Create quiz from parsed questions
    const quizData = {
      title: `${title} - Quiz`,
      duration: parseInt(duration) || 60,
      questions: parsedQuestions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        answer: q.answer,
        imageUrl: q.imageUrl || null,
        marks: q.marks || 1
      }))
    };

    const payload = {
      title,
      company,
      description,
      duration: parseInt(duration),
      numberOfQuestions: parseInt(numberOfQuestions),
      price: {
        actual: parseFloat(priceActual),
        discounted: parseFloat(priceDiscounted)
      },
      level,
      features: featuresArray,
      skills: skillsArray,
      certificate,
      instructor: instructorId,
      passingScore: parseInt(passingScore),
      quizzes: [quizData]
    };

    setIsSubmitting(true);
    try {
      const res = await axios.post(CONTENTMANAGER.ADD_TEST, payload);
      console.log("Test created:", res.data);
      alert("Test created successfully");
      navigate("/content/test-list");
    } catch (err) {
      console.error("Failed to create test", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to create test";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-full pb-4">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-lg shadow-xl p-3">
        {/* Header */}
        <div className="flex items-center mb-3">
          <button
            onClick={() => navigate("/content/test-list")}
            className="mr-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Create Test from PDF
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* PDF Upload Section */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-600/30">
            <h2 className="text-lg font-semibold text-white mb-3">Step 1: Upload PDF</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  PDF File <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                  />
                  {pdfFile && (
                    <button
                      type="button"
                      onClick={handleParsePDF}
                      disabled={isParsing}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm font-semibold"
                    >
                      {isParsing ? 'Parsing...' : 'Parse PDF'}
                    </button>
                  )}
                </div>
                {pdfFile && (
                  <p className="text-xs text-slate-400 mt-1">Selected: {pdfFile.name}</p>
                )}
              </div>

              {parseError && (
                <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-sm text-red-200">
                  {parseError}
                </div>
              )}

              {parseResult && (
                <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3 text-sm text-emerald-200">
                  <p className="font-semibold">PDF Parsed Successfully!</p>
                  <p>Total Pages: {parseResult.totalPages}</p>
                  <p>Total Questions Found: {parseResult.totalQuestions}</p>
                  {parseResult.validation && parseResult.validation.warnings.length > 0 && (
                    <div className="mt-2 text-xs">
                      <p className="font-semibold">Warnings:</p>
                      <ul className="list-disc list-inside">
                        {parseResult.validation.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Test Metadata Section */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-600/30">
            <h2 className="text-lg font-semibold text-white mb-3">Step 2: Test Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.title ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. NEET 2025 Mock Test"
                />
                {errors.title && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Company / Organizer <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.company ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. NTA, NEET"
                />
                {errors.company && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.company}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.description ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="Test description..."
                  rows={2}
                />
                {errors.description && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Duration (minutes) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.duration ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. 180"
                />
                {errors.duration && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Number of Questions <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.numberOfQuestions ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="Auto-filled from PDF"
                  readOnly
                />
                {errors.numberOfQuestions && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.numberOfQuestions}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Actual Price <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={priceActual}
                  onChange={(e) => setPriceActual(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.priceActual ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. 999"
                />
                {errors.priceActual && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceActual}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Discounted Price <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={priceDiscounted}
                  onChange={(e) => setPriceDiscounted(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.priceDiscounted ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. 499"
                />
                {errors.priceDiscounted && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceDiscounted}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Level <span className="text-red-400">*</span>
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.level ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                >
                  <option value="">Select level</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
                {errors.level && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.level}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Passing Score (%) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.passingScore ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="e.g. 50"
                />
                {errors.passingScore && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.passingScore}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Instructor ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value)}
                  className={`block w-full bg-slate-800/40 border ${errors.instructorId ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="Instructor MongoDB ID"
                />
                {errors.instructorId && (
                  <p className="mt-1 text-xs font-semibold text-red-400">{errors.instructorId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g. Detailed Solutions, Performance Analytics"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g. Physics, Chemistry, Biology"
                />
              </div>
            </div>
          </div>

          {/* Questions Preview Section */}
          {parsedQuestions.length > 0 && (
            <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-600/30">
              <h2 className="text-lg font-semibold text-white mb-3">
                Step 3: Review & Edit Questions ({parsedQuestions.length} questions)
              </h2>
              
              {errors.questions && (
                <div className="mb-3 bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-sm text-red-200">
                  {errors.questions}
                </div>
              )}

              <ParsedQuestionPreview
                questions={parsedQuestions}
                onQuestionsChange={handleQuestionsChange}
                onRemoveQuestion={handleRemoveQuestion}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/content/test-list")}
              className="bg-slate-700/40 py-2.5 px-5 border border-slate-600/30 rounded-xl text-sm font-semibold text-white hover:bg-slate-700/70 transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || parsedQuestions.length === 0}
              className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? "Creating Test..." : "Create Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPDFUpload;

