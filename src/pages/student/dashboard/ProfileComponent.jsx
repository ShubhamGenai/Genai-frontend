import React, { useState, useContext } from "react";
import { UsersIcon, TargetIcon, AwardIcon, BarChart3Icon, PencilIcon } from "lucide-react";
import { mainContext } from "../../../context/MainContext";
import GoalSelectionModal from "./GoalSelectionModal";

// Profile component with user information
const ProfileComponent = ({ user, profileData, loading, error }) => {
  const { token, setUser: setContextUser } = useContext(mainContext);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Use profileData if available, otherwise fall back to user from context
  const displayUser = profileData || user;

  const getLearningGoalLabel = (goal) => {
    const labels = {
      neet: "NEET",
      jee: "JEE",
      technical: "Technical Skills",
      "non-technical": "Soft Skills",
      other: "Exploring",
    };
    return labels[goal] || goal;
  };

  const getSectionLabel = (section) => {
    const labels = {
      learn: "Learn (Courses & Study Material)",
      tests: "Tests & Practice",
      jobs: "Jobs & Internships",
      library: "Library & Notes",
      "ai-chat": "AI Mentor / Doubt Solving",
    };
    return labels[section] || section;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <div className="text-center py-8 sm:py-12">
          <div className="inline-block w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading profile information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="text-xs sm:text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Goal Selection Modal for editing preferences */}
      <GoalSelectionModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        token={token}
        user={user}
        setUser={setContextUser}
      />

      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Full Name</label>
            <p className="text-sm sm:text-base font-medium text-gray-900">{displayUser?.name || "Not provided"}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Email</label>
            <p className="text-sm sm:text-base font-medium text-gray-900 break-all">{displayUser?.email || "Not provided"}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Mobile Number</label>
            <p className="text-sm sm:text-base font-medium text-gray-900">{displayUser?.mobile || "Not provided"}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Role</label>
            <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">{displayUser?.role || "Not provided"}</p>
          </div>
        </div>
      </div>

      {/* Learning Preferences - Always visible */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Learning Preferences
          </h3>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-medium transition-colors"
            title="Edit preferences"
          >
            <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
        
        {(displayUser?.learningGoal ||
          displayUser?.examPreference ||
          displayUser?.preferredSections?.length > 0 ||
          displayUser?.studyPreference) ? (
          <div className="space-y-4 sm:space-y-5">
            {displayUser?.learningGoal && (
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Primary Goal</label>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {getLearningGoalLabel(displayUser.learningGoal)}
                </p>
              </div>
            )}
            {displayUser?.examPreference && (
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Exam / Stream Details</label>
                <p className="text-sm sm:text-base font-medium text-gray-900">{displayUser.examPreference}</p>
              </div>
            )}
            {displayUser?.preferredSections && displayUser.preferredSections.length > 0 && (
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">Preferred Sections</label>
                <div className="flex flex-wrap gap-2">
                  {displayUser.preferredSections.map((section, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-full font-medium"
                    >
                      {getSectionLabel(section)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {displayUser?.studyPreference && (
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500 mb-1 block">Additional Preferences</label>
                <p className="text-sm sm:text-base text-gray-900">{displayUser.studyPreference}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <TargetIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-3" />
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">No Preferences Set</h4>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Set your learning goals and preferences to get personalized recommendations.
            </p>
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
            >
              <TargetIcon className="w-4 h-4" />
              Set Preferences
            </button>
          </div>
        )}
      </div>

      {/* Account Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <AwardIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Account Status
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Email Verified</span>
            <span
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                displayUser?.isEmailVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {displayUser?.isEmailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Mobile Verified</span>
            <span
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                displayUser?.isMobileVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {displayUser?.isMobileVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Profile Verified</span>
            <span
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                displayUser?.isProfileVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {displayUser?.isProfileVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Onboarding Completed</span>
            <span
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                displayUser?.onboardingCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {displayUser?.onboardingCompleted ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

