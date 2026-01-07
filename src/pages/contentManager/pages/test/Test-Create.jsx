import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import axios from "axios";
import { CONTENTMANAGER } from "../../../../constants/ApiConstants";
import QuizSelectorPopup from "../../../../component/contentManagerComponents/QuizSelectorPopup";
import TestImageUpload from "../../../../component/contentManagerComponents/TestImageUpload";

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Intermediate to Advanced",
];

const emptyQuestion = {
  questionText: "",
  options: ["", "", "", ""],
  answer: "",
};

const TestCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [priceActual, setPriceActual] = useState("");
  const [priceDiscounted, setPriceDiscounted] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [features, setFeatures] = useState("");
  const [skills, setSkills] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [passingScore, setPassingScore] = useState("");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [isQuizSelectorOpen, setIsQuizSelectorOpen] = useState(false);

  const [testImageUrl, setTestImageUrl] = useState("");
  const [testImagePublicId, setTestImagePublicId] = useState("");
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFree, setIsFree] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...emptyQuestion }]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuizSelect = (quizzes) => {
    setSelectedQuizzes(quizzes);
  };

  const handleRemoveSelectedQuiz = (quizId) => {
    setSelectedQuizzes(selectedQuizzes.filter(q => q._id !== quizId));
  };

  const handleTestImageUploaded = (imageData) => {
    if (imageData && imageData.imageUrl) {
      setTestImageUrl(imageData.imageUrl);
      setTestImagePublicId(imageData.imagePublicId || "");
      setIsImageUploadModalOpen(false);
    }
  };

  const handleRemoveTestImage = () => {
    setTestImageUrl("");
    setTestImagePublicId("");
  };

  // Fetch test data when in edit mode
  useEffect(() => {
    const fetchTestData = async () => {
      if (!isEditMode || !id) return;

      setIsLoading(true);
      try {
        const res = await axios.get(`${CONTENTMANAGER.GET_TEST_BY_ID}/${id}`);
        const testData = res.data.test || res.data;

        // Populate form fields
        setTitle(testData.title || "");
        setCompany(testData.company || "");
        setDescription(testData.description || "");
        setDuration(testData.duration?.toString() || "");
        setNumberOfQuestions(testData.numberOfQuestions?.toString() || "");
        setPriceActual(testData.price?.actual?.toString() || "");
        setPriceDiscounted(testData.price?.discounted?.toString() || "");
        setCategory(testData.category || "");
        setLevel(testData.level || "");
        setFeatures(testData.features?.join(", ") || "");
        setSkills(testData.skills?.join(", ") || "");
        setCertificate(testData.certificate !== undefined ? testData.certificate : true);
        setPassingScore(testData.passingScore?.toString() || "");
        setIsFree(testData.isFree || false);
        setTestImageUrl(testData.image || "");
        setTestImagePublicId(testData.imagePublicId || "");

        // Handle quizzes - populate selected quizzes if they exist
        if (testData.quizzes && Array.isArray(testData.quizzes) && testData.quizzes.length > 0) {
          // Check if quizzes are populated (have title) or just IDs
          const populatedQuizzes = testData.quizzes.map(quiz => {
            if (quiz.title) {
              // Already populated
              return {
                _id: quiz._id,
                title: quiz.title,
                duration: quiz.duration,
                questions: quiz.questions || []
              };
            }
            return null;
          }).filter(Boolean);
          
          if (populatedQuizzes.length > 0) {
            setSelectedQuizzes(populatedQuizzes);
          }
        }
      } catch (err) {
        console.error("Failed to fetch test data", err);
        alert("Failed to load test data. Please try again.");
        navigate("/content/test-list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, [isEditMode, id, navigate]);

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
    // Price validation: only required when test is not free
    if (!isFree) {
      const actualPriceNum = Number(priceActual);
      const discountedPriceNum = Number(priceDiscounted);
      
      if (!priceActual || priceActual.toString().trim() === '' || isNaN(actualPriceNum) || actualPriceNum < 0) {
        newErrors.priceActual = "Actual price is required and must be a valid number";
      }
      if (!priceDiscounted || priceDiscounted.toString().trim() === '' || isNaN(discountedPriceNum) || discountedPriceNum < 0) {
        newErrors.priceDiscounted = "Discounted price is required and must be a valid number";
      }
    }
    if (!level) newErrors.level = "Level is required";

    // Check if user has either selected quizzes OR created a new quiz
    const hasNewQuiz = quizTitle && questions.length > 0 && questions.some(q => q.questionText && q.answer);
    const hasSelectedQuizzes = selectedQuizzes.length > 0;

    if (!hasNewQuiz && !hasSelectedQuizzes) {
      newErrors.quizzes = "Please either select existing quizzes or create a new quiz with questions.";
    }

    // Validate new quiz if being created
    if (hasNewQuiz) {
      if (!quizDuration || quizDuration.trim() === '') {
        newErrors.quizDuration = "Quiz duration is required when creating a new quiz.";
      } else if (isNaN(Number(quizDuration)) || Number(quizDuration) <= 0) {
        newErrors.quizDuration = "Quiz duration must be a valid positive number.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const featuresArr = features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    const skillsArr = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Prepare quizzes array
    const quizzesArray = [];

    // Add selected quizzes (they already exist, backend will use their IDs)
    selectedQuizzes.forEach(quiz => {
      quizzesArray.push({
        _id: quiz._id, // Include _id for existing quizzes in edit mode
        title: quiz.title,
        duration: quiz.duration,
        questions: quiz.questions || []
      });
    });

    // Add new quiz if created
    if (hasNewQuiz) {
      const newQuiz = {
        title: quizTitle,
        duration: Number(quizDuration), // Duration is required and validated above
        questions: questions.filter(q => q.questionText && q.answer && q.options.some(opt => opt.trim() !== '')),
      };
      quizzesArray.push(newQuiz);
    }

    const actualPriceValue = isFree ? 0 : Number(priceActual || 0);
    const discountedPriceValue = isFree ? 0 : Number(priceDiscounted || 0);

    const payload = {
      title,
      company,
      description,
      duration: Number(duration),
      numberOfQuestions: Number(numberOfQuestions),
      price: {
        actual: actualPriceValue,
        discounted: discountedPriceValue,
      },
      isFree,
      level,
      category: category || undefined,
      features: featuresArr,
      skills: skillsArr,
      certificate,
      quizzes: quizzesArray,
      passingScore: passingScore ? Number(passingScore) : undefined,
      image: testImageUrl || undefined,
      imagePublicId: testImagePublicId || undefined,
    };

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        // Update existing test
        const res = await axios.put(`${CONTENTMANAGER.UPDATE_TEST}/${id}`, payload);
        console.log("Test updated:", res.data);
        alert("Test updated successfully");
      } else {
        // Create new test
        const res = await axios.post(CONTENTMANAGER.ADD_TEST, payload);
        console.log("Test created:", res.data);
        alert("Test created successfully");
      }
      navigate("/content/test-list");
    } catch (err) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} test`, err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} test`;
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full pb-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
            {isEditMode ? "Edit Test" : "Create New Test"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title and Company Row */}
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
                placeholder="e.g. JEE Main 2025"
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
                placeholder="e.g. NTA, SSC"
              />
              {errors.company && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.company}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`block w-full bg-slate-800/40 border ${errors.description ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
              placeholder="Short description of the test..."
            />
            {errors.description && (
              <p className="mt-1 text-xs font-semibold text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Duration, Number of Questions, Passing Score Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Duration (min) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={`block w-full bg-slate-800/40 border ${errors.duration ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                min={1}
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
                min={1}
              />
              {errors.numberOfQuestions && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.numberOfQuestions}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Passing Score
              </label>
              <input
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(e.target.value)}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                min={0}
              />
            </div>
          </div>

          {/* Price Row */}
          <div className="flex items-center mb-1">
            <input
              id="isFree"
              type="checkbox"
              checked={isFree}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsFree(checked);
                if (checked) {
                  // Clear any previous price validation errors when switching to free
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.priceActual;
                    delete newErrors.priceDiscounted;
                    return newErrors;
                  });
                  // Optionally reset price fields visually
                  setPriceActual("0");
                  setPriceDiscounted("0");
                } else {
                  // When unchecking, allow user to set prices again
                  if (priceActual === "0") setPriceActual("");
                  if (priceDiscounted === "0") setPriceDiscounted("");
                }
              }}
              className="h-4 w-4 text-indigo-600 border-slate-600 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="isFree"
              className="ml-2 text-sm font-bold text-slate-300"
            >
              Make this a free test (price will be ₹0)
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Actual Price (₹) {!isFree && <span className="text-red-400">*</span>}
              </label>
              <input
                type="number"
                value={priceActual}
                onChange={(e) => setPriceActual(e.target.value)}
                className={`block w-full bg-slate-800/40 border ${errors.priceActual ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                disabled={isFree}
                min={0}
                step="0.01"
              />
              {errors.priceActual && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceActual}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Discounted Price (₹) {!isFree && <span className="text-red-400">*</span>}
              </label>
              <input
                type="number"
                value={priceDiscounted}
                onChange={(e) => setPriceDiscounted(e.target.value)}
                className={`block w-full bg-slate-800/40 border ${errors.priceDiscounted ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                disabled={isFree}
                min={0}
                step="0.01"
              />
              {errors.priceDiscounted && (
                <p className="mt-1 text-xs font-semibold text-red-400">{errors.priceDiscounted}</p>
              )}
            </div>
          </div>

          {/* Discount Calculation Display */}
          {!isFree && priceActual && priceDiscounted && 
           !isNaN(Number(priceActual)) && !isNaN(Number(priceDiscounted)) &&
           Number(priceActual) > 0 && Number(priceDiscounted) >= 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-emerald-300">Discount Calculation</p>
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span>
                      <span className="text-slate-400">Actual:</span> ₹{Number(priceActual).toFixed(2)}
                    </span>
                    <span>
                      <span className="text-slate-400">Discounted:</span> ₹{Number(priceDiscounted).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {Number(priceActual) > Number(priceDiscounted) ? (
                    <>
                      <p className="text-lg font-bold text-emerald-400">
                        -₹{(Number(priceActual) - Number(priceDiscounted)).toFixed(2)}
                      </p>
                      <p className="text-xs text-emerald-300">
                        {(((Number(priceActual) - Number(priceDiscounted)) / Number(priceActual)) * 100).toFixed(1)}% OFF
                      </p>
                    </>
                  ) : Number(priceActual) === Number(priceDiscounted) ? (
                    <p className="text-sm text-slate-400">No discount</p>
                  ) : (
                    <p className="text-sm text-yellow-400">⚠ Discounted price is higher</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Test Image Upload */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">
              Test Image
            </label>
            <div className="flex items-center gap-3">
              {testImageUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={testImageUrl}
                    alt="Test preview"
                    className="h-20 w-20 object-cover rounded-lg border border-slate-600/30"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      console.error("Failed to load test image:", testImageUrl);
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsImageUploadModalOpen(true)}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-all"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveTestImage}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsImageUploadModalOpen(true)}
                  className="flex items-center gap-2 bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700/60 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Upload Test Image
                </button>
              )}
            </div>
          </div>

          {/* Category and Level Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="e.g., JEE, NEET, SSC"
              />
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
          </div>

          {/* Features and Skills Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Features (comma separated)
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="Mock Test, Detailed Solutions, Timed Exam"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="block w-full bg-slate-800/40 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="Physics, Chemistry, Mathematics"
              />
            </div>
          </div>

          {/* Certificate */}
          <div className="flex items-center">
            <input
              id="certificate"
              type="checkbox"
              checked={certificate}
              onChange={(e) => setCertificate(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-slate-600 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="certificate"
              className="ml-2 text-sm font-bold text-slate-300"
            >
              Certificate provided
            </label>
          </div>

          {/* Quiz Selection and Creation */}
          <div className="border-t border-slate-600/30 pt-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">
                Quizzes for this Test
              </h2>
              <button
                type="button"
                onClick={() => setIsQuizSelectorOpen(true)}
                className="bg-indigo-600 py-1.5 px-3 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 transition-all"
              >
                + Select Existing Quizzes
              </button>
            </div>

            {/* Selected Quizzes Display */}
            {selectedQuizzes.length > 0 && (
              <div className="mb-3 space-y-2">
                <p className="text-sm font-bold text-slate-300">
                  Selected Quizzes ({selectedQuizzes.length}):
                </p>
                {selectedQuizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="bg-indigo-600/20 border border-indigo-500/30 rounded-lg p-2 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{quiz.title}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-300">
                        {quiz.duration && <span>Duration: {quiz.duration} min</span>}
                        <span>Questions: {quiz.questions?.length || 0}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedQuiz(quiz._id)}
                      className="text-red-400 hover:text-red-300 transition-colors text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Create New Quiz Section */}
            <div className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-3">
              <h3 className="text-sm font-bold text-white mb-3">
                Create New Quiz (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="block w-full bg-slate-800/60 border border-slate-600/30 rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    placeholder="e.g. Full-Length Mock"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">
                    Quiz Duration (min) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={quizDuration}
                    onChange={(e) => {
                      setQuizDuration(e.target.value);
                      // Clear error when user types
                      if (errors.quizDuration) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.quizDuration;
                          return newErrors;
                        });
                      }
                    }}
                    className={`block w-full bg-slate-800/60 border ${errors.quizDuration ? 'border-red-500' : 'border-slate-600/30'} rounded-lg shadow-sm py-1.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                    min={1}
                    placeholder="e.g. 60"
                  />
                  {errors.quizDuration && (
                    <p className="mt-1 text-xs font-semibold text-red-400">{errors.quizDuration}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700/40 border border-slate-600/30 rounded-lg p-2 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">
                        Question {idx + 1}
                      </h4>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(idx)}
                          className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Question Text
                      </label>
                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) =>
                          handleQuestionChange(idx, "questionText", e.target.value)
                        }
                        className="block w-full bg-slate-800/60 border border-slate-600/30 rounded-lg shadow-sm py-1 px-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                        placeholder="Enter question text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Options
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => (
                          <input
                            key={oIdx}
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(idx, oIdx, e.target.value)
                            }
                            className="block w-full bg-slate-800/60 border border-slate-600/30 rounded-lg shadow-sm py-1 px-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                            placeholder={`Option ${oIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Correct Answer (must match one option)
                      </label>
                      <input
                        type="text"
                        value={q.answer}
                        onChange={(e) =>
                          handleQuestionChange(idx, "answer", e.target.value)
                        }
                        className="block w-full bg-slate-800/60 border border-slate-600/30 rounded-lg shadow-sm py-1 px-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                        placeholder="Enter correct answer"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addQuestion}
                className="mt-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-700/40 border border-slate-600/30 text-xs font-semibold text-white hover:bg-slate-700/60 transition-all"
              >
                + Add Question
              </button>
            </div>
            {errors.quizzes && (
              <p className="mt-2 text-xs font-semibold text-red-400">{errors.quizzes}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-600/30">
            <button
              type="button"
              onClick={() => navigate("/content/test-list")}
              className="bg-slate-700/40 py-2 px-4 border border-slate-600/30 rounded-lg shadow-sm text-sm font-semibold text-white hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditMode ? "Update Test" : "Create Test"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Quiz Selector Popup */}
      <QuizSelectorPopup
        isOpen={isQuizSelectorOpen}
        onClose={() => setIsQuizSelectorOpen(false)}
        selectedQuizzes={selectedQuizzes}
        onSelect={handleQuizSelect}
      />

      {/* Test Image Upload Modal */}
      {isImageUploadModalOpen && (
        <TestImageUpload
          testId={null}
          onImageUploaded={handleTestImageUploaded}
          onClose={() => setIsImageUploadModalOpen(false)}
          existingImageUrl={testImageUrl}
        />
      )}
    </div>
  );
};

export default TestCreate;
