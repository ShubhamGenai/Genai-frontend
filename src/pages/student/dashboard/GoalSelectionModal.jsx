import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import { AUTHENDPOINTS } from "../../../constants/ApiConstants";
import { createPortal } from "react-dom";

const GoalSelectionModal = ({ 
  open, 
  onClose, 
  token, 
  user, 
  setUser 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [goalForm, setGoalForm] = useState({
    learningGoal: "",
    examPreference: "",
    preferredSections: [],
    studyPreference: "",
  });

  const goalOptions = [
    { 
      value: "neet", 
      label: "NEET", 
      description: "Medical Entrance",
      icon: "🏥",
      gradient: "from-red-500 to-pink-500"
    },
    { 
      value: "jee", 
      label: "JEE", 
      description: "Engineering Entrance",
      icon: "⚙️",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      value: "technical", 
      label: "Technical Skills", 
      description: "IT & Programming",
      icon: "💻",
      gradient: "from-purple-500 to-indigo-500"
    },
    { 
      value: "non-technical", 
      label: "Soft Skills", 
      description: "Communication & More",
      icon: "📚",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      value: "other", 
      label: "Exploring", 
      description: "Just Browsing",
      icon: "🔍",
      gradient: "from-orange-500 to-yellow-500"
    },
  ];

  const sectionOptions = [
    { value: "learn", label: "Learn (Courses & Study Material)" },
    { value: "tests", label: "Tests & Practice" },
    { value: "jobs", label: "Jobs & Internships" },
    { value: "library", label: "Library & Notes" },
    { value: "ai-chat", label: "AI Mentor / Doubt Solving" },
  ];

  const toggleSectionSelection = (value) => {
    setGoalForm((prev) => {
      const exists = prev.preferredSections.includes(value);
      return {
        ...prev,
        preferredSections: exists
          ? prev.preferredSections.filter((v) => v !== value)
          : [...prev.preferredSections, value],
      };
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!goalForm.learningGoal) {
        toast.error("Please select your primary goal");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setGoalForm({
      learningGoal: "",
      examPreference: "",
      preferredSections: [],
      studyPreference: "",
    });
    onClose();
  };

  const handleSaveLearningPreferences = async () => {
    if (!goalForm.learningGoal) {
      toast.error("Please select your main goal (NEET, JEE, Technical, etc.)");
      return;
    }

    if (!token) {
      toast.error("You need to be logged in to save preferences.");
      return;
    }

    try {
      setSavingPreferences(true);

      const payload = {
        learningGoal: goalForm.learningGoal,
        examPreference: goalForm.examPreference?.trim() || "",
        preferredSections: goalForm.preferredSections,
        studyPreference: goalForm.studyPreference?.trim() || "",
      };

      const response = await axios.post(
        AUTHENDPOINTS.SAVE_LEARNING_PREFERENCES,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success) {
        const updatedUser = {
          ...(user || {}),
          ...response.data.user,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("learningGoalOnboardingCompleted", "true");

        toast.success("Your learning preferences have been saved!");
        handleClose();
      } else {
        toast.error(response.data?.message || "Failed to save preferences.");
      }
    } catch (err) {
      console.error("Error saving learning preferences:", err);
      const message =
        err.response?.data?.message ||
        "Something went wrong while saving your preferences.";
      toast.error(message);
    } finally {
      setSavingPreferences(false);
    }
  };

  // Initialize form with existing user preferences when modal opens
  useEffect(() => {
    if (open && user) {
      setGoalForm({
        learningGoal: user.learningGoal || "",
        examPreference: user.examPreference || "",
        preferredSections: user.preferredSections || [],
        studyPreference: user.studyPreference || "",
      });
      // Reset to first step when opening modal
      setCurrentStep(1);
    }
  }, [open, user]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-[650px] h-[550px] mx-4 relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {/* Step Indicator */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-center space-x-1.5 mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-blue-600 text-white scale-110"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > step ? "✓" : step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 transition-all duration-300 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Container with Smooth Transitions */}
        <div className="px-8 py-4 flex-1 overflow-y-auto">
          <div className="relative overflow-hidden h-full">
            {/* Step 1: Select Goal */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                currentStep === 1 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 absolute inset-0 translate-x-[-100%] pointer-events-none"
              }`}
            >
              <h2 className="text-base font-bold text-gray-900 mb-0.5 text-center">
                What's your goal?
              </h2>
              <p className="text-[10px] text-gray-600 mb-2 text-center">
                Select your primary learning objective
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setGoalForm((prev) => ({
                        ...prev,
                        learningGoal: opt.value,
                      }));
                      // Auto-advance after a short delay for better UX
                      setTimeout(() => {
                        if (goalForm.learningGoal !== opt.value) {
                          setCurrentStep(2);
                        }
                      }, 300);
                    }}
                    className={`group relative overflow-hidden rounded-lg border-2 p-2 text-left transition-all duration-200 ${
                      goalForm.learningGoal === opt.value
                        ? `border-blue-600 bg-gradient-to-br ${opt.gradient} shadow-lg`
                        : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-md"
                    }`}
                  >
                    <div className={`text-2xl mb-0.5`}>
                      {opt.icon}
                    </div>
                    <h3 className={`font-bold text-xs mb-0 transition-colors ${
                      goalForm.learningGoal === opt.value ? "text-white" : "text-gray-900"
                    }`}>
                      {opt.label}
                    </h3>
                    <p className={`text-[9px] transition-colors ${
                      goalForm.learningGoal === opt.value ? "text-white/90" : "text-gray-500"
                    }`}>
                      {opt.description}
                    </p>
                    {goalForm.learningGoal === opt.value && (
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Sections */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                currentStep === 2 
                  ? "opacity-100 translate-x-0" 
                  : currentStep < 2
                  ? "opacity-0 absolute inset-0 translate-x-[100%] pointer-events-none"
                  : "opacity-0 absolute inset-0 translate-x-[-100%] pointer-events-none"
              }`}
            >
              <h2 className="text-base font-bold text-gray-900 mb-0.5 text-center">
                What are you looking for?
              </h2>
              <p className="text-[10px] text-gray-600 mb-2 text-center">
                Select the sections you're most interested in
              </p>

              <div className="space-y-1">
                {sectionOptions.map((opt) => {
                  const selected = goalForm.preferredSections.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleSectionSelection(opt.value)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg border-2 transition-all duration-200 ${
                        selected
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                      }`}
                    >
                      <span className={`font-medium text-[11px] ${
                        selected ? "text-blue-900" : "text-gray-700"
                      }`}>
                        {opt.label}
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        selected
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300"
                      }`}>
                        {selected && (
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Additional Details */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                currentStep === 3 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 absolute inset-0 translate-x-[100%] pointer-events-none"
              }`}
            >
              <h2 className="text-base font-bold text-gray-900 mb-0.5 text-center">
                Almost there!
              </h2>
              <p className="text-[10px] text-gray-600 mb-2 text-center">
                Add any specific preferences (optional)
              </p>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1">
                    Exam / Stream Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NEET 2026, JEE Main, Class 11 Physics"
                    className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] transition-all"
                    value={goalForm.examPreference}
                    onChange={(e) =>
                      setGoalForm((prev) => ({
                        ...prev,
                        examPreference: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1">
                    Additional Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Strong focus on Physics, prefer Hindi/English mix..."
                    className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[11px] resize-none transition-all"
                    value={goalForm.studyPreference}
                    onChange={(e) =>
                      setGoalForm((prev) => ({
                        ...prev,
                        studyPreference: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-4 pb-3 pt-2 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>

          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-1.5 rounded-lg border-2 border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 && !goalForm.learningGoal}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
                <ArrowRightIcon className="w-3 h-3 inline-block ml-1.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveLearningPreferences}
                disabled={savingPreferences}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {savingPreferences ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Continue
                    <CheckCircleIcon className="w-3 h-3 inline-block ml-1.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GoalSelectionModal;
