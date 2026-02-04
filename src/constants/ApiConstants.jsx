// API base URL – use VITE_API_BASE_URL when building for production (e.g. DigitalOcean)
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://genai-backend-three.vercel.app/api'
// export const API_BASE_URL = 'http://localhost:8080/api' 

const BASE_URL =(import.meta.env.VITE_API_BASE_URL || "https://api.genailearning.in") + "/api";

export const EMPLOYERENDPOINTS = {
VERIFY_EMPLOYER : `${API_BASE_URL}/employer/verify-employer`,
COMPLETE_REGISTRATION :`${API_BASE_URL}/employer/employer-register`,
EMPLOYER_SIGNIN :`${API_BASE_URL}/employer/employer-signin`,

}


// API endpoints for admin
export const ADMINENDPOINTS = {

ADMIN_SIGNIN: `${API_BASE_URL}/auth/admin-signin`,


};

export const USERENDPOINTS = {
   GETTESTS: `${API_BASE_URL}/student/getTests`,
   GETTESTSBYID: `${API_BASE_URL}/student/getTestById`,
   GETTEST_CATEGORIES: `${API_BASE_URL}/student/getTestCategories`,
   ADD_TO_CART: `${API_BASE_URL}/student/addToCart`,
   CHECK_CART: `${API_BASE_URL}/student/checkitemCart`,
   GET_CART_TEST: `${API_BASE_URL}/student/getCartTests`,
   REMOVE_FROM_CART:`${API_BASE_URL}/student/removeFromCart`,
   GET_QUIZ:`${API_BASE_URL}/student/getQuiz`,
   SUBMIT_QUIZ:`${API_BASE_URL}/student/submitQuiz`,
   SUBMIT_TEST:`${API_BASE_URL}/student/submitTest`,
   CREATE_PAYMENT:`${API_BASE_URL}/student/create-payment`,
   VERIFY_PAYMENT:`${API_BASE_URL}/student/verify-payment`,

   GETCOURSES: `${API_BASE_URL}/student/getCourse`,
   GETCOURSESBYID: `${API_BASE_URL}/student/getCourseById`,
   GET_CART_COURSE: `${API_BASE_URL}/student/getCartCourses`,
   CREATE_COURSE_PAYMENT:`${API_BASE_URL}/student/create-course-payment`,
   VERIFY_COURSE_PAYMENT:`${API_BASE_URL}/student/verify-course-payment`,

   GET_MODULES_DETAILS :`${API_BASE_URL}/student/getModulesDetails`, // Fetch modules by IDs

   GET_LATEST_COURSES_AND_TESTS: `${API_BASE_URL}/student/get-latest-Course-test`, // Fetch latest courses and tests
   GET_ENROLLED_TESTS: `${API_BASE_URL}/student/getEnrolledTests`, // Fetch enrolled/purchased tests
   GET_DASHBOARD_OVERVIEW: `${API_BASE_URL}/student/getDashboardOverview`, // Fetch dashboard overview data
   GET_TEST_SUBMISSION_HISTORY: `${API_BASE_URL}/student/getTestSubmissionHistory`, // Get test submission history
   GET_TEST_SUBMISSION_DETAILS: `${API_BASE_URL}/student/getTestSubmissionDetails`, // Get detailed submission results
   AI_CHAT: `${API_BASE_URL}/student/ai-chat`, // AI Chat endpoint
   GENERATE_QUESTION_EXPLANATION: `${API_BASE_URL}/student/generate-question-explanation`, // Generate AI explanation for question
   ENROLL_FREE_TEST: `${API_BASE_URL}/student/enroll-free-test`, // Enroll in free test
   GET_AI_CAREER_RECOMMENDATIONS: `${API_BASE_URL}/student/getAICareerRecommendations`, // Get AI-generated career recommendations
   GET_LIBRARY_DOCUMENTS: `${API_BASE_URL}/student/library-documents`,
   GET_LIBRARY_DOCUMENT_BY_ID: `${API_BASE_URL}/student/library-documents`, // + '/:id' on use
};

// Auth / profile specific endpoints
export const AUTHENDPOINTS = {
  SAVE_LEARNING_PREFERENCES: `${API_BASE_URL}/auth/save-learning-preferences`,
  GET_USER_DETAILS: `${API_BASE_URL}/auth/userDetails`,
};




export const GEUESTENDPOINTS = {
  GETGUESTJOBS: `${API_BASE_URL}user/getGuestJobs`,
  UPCOMMINGTESTS: `${API_BASE_URL}user/upcommingTest`, //not using complete test fetch
  EXAM_TYPES:`${API_BASE_URL}user/guestExamType`,
  TESTS_BY_TYPE:`${API_BASE_URL}user/test-by-Type`,
  GUESTTESTDETAIL_BY_ID:`${API_BASE_URL}user/test-by-id`
 
 
}


export const CONTENTMANAGER = {

  CONTENT_SIGNIN:`${API_BASE_URL}/auth/content-manager-signin`,
  ADD_QUIZ:`${API_BASE_URL}/content/add-quiz`,
  UPDATE_QUIZ:`${API_BASE_URL}/content/update-quiz`,
  // Base URL for updating a single quiz question's passage:
  // usage: `${UPDATE_QUESTION_PASSAGE}/${quizId}/question/${questionId}/passage`
  UPDATE_QUESTION_PASSAGE:`${API_BASE_URL}/content/quiz`,
  DELETE_QUIZ:`${API_BASE_URL}/content/delete-quiz`,
  GET_QUIZ:`${API_BASE_URL}/content/get-quiz`,
  GET_TESTS:`${API_BASE_URL}/content/get-tests`,
  GET_TEST_BY_ID:`${API_BASE_URL}/content/get-test`,
  GET_COURSES:`${API_BASE_URL}/content/get-courses`,
  GET_COURSE_BY_ID:`${API_BASE_URL}/content/get-course`,
  ADD_LESSON:`${API_BASE_URL}/content/add-lesson`,
  UPDATE_LESSON:`${API_BASE_URL}/content/update-lesson`,
  DELETE_LESSON:`${API_BASE_URL}/content/delete-lesson`,
  GET_LESSONS:`${API_BASE_URL}/content/get-lesson`,
  LESSON_VIEW:`${API_BASE_URL}/content/lesson-view`,

  GET_MODULES:`${API_BASE_URL}/content/get-module`,
  GET_MODULEBYID:`${API_BASE_URL}/content/get-modulebyid`,
  ADD_MODULE:`${API_BASE_URL}/content/add-module`,
  UPDATE_MODULE:`${API_BASE_URL}/content/update-module`,
  DELETE_MODULE:`${API_BASE_URL}/content/delete-module`,
  ADD_COURSE:`${API_BASE_URL}/content/add-course`,
  UPDATE_COURSE:`${API_BASE_URL}/content/update-course`,
  DELETE_COURSE:`${API_BASE_URL}/content/delete-course`,
  BULK_UPLOAD_TESTS:`${API_BASE_URL}/content/tests/bulk-upload`,
  ADD_TEST:`${API_BASE_URL}/content/add-test`,
  UPDATE_TEST:`${API_BASE_URL}/content/update-test`,
  DELETE_TEST:`${API_BASE_URL}/content/delete-test`,
  UPLOAD_LIBRARY_DOCUMENT:`${API_BASE_URL}/content/upload-library-document`,
  GET_LIBRARY_DOCUMENTS:`${API_BASE_URL}/content/get-library-documents`,
  ADD_LIBRARY_CATEGORY:`${API_BASE_URL}/content/add-library-category`,
  GET_LIBRARY_CATEGORIES:`${API_BASE_URL}/content/get-library-categories`,
  ADD_LIBRARY_CLASS:`${API_BASE_URL}/content/add-library-class`,
  GET_LIBRARY_CLASSES:`${API_BASE_URL}/content/get-library-classes`,
  DASHBOARD_STATS:`${API_BASE_URL}/content/dashboard-stats`,
  RECENT_ACTIVITIES:`${API_BASE_URL}/content/recent-activities`,
  PARSE_PDF_UPLOAD:`${API_BASE_URL}/content/parse-pdf`,
  UPLOAD_QUESTION_IMAGE:`${API_BASE_URL}/content/upload-question-image`,
  UPLOAD_TEST_IMAGE:`${API_BASE_URL}/content/upload-test-image`,
  GET_TEST_IMAGES:`${API_BASE_URL}/content/get-test-images`,
  GENERATE_QUIZ_QUESTIONS:`${API_BASE_URL}/content/generate-quiz-questions`,
 
}



// old url
// export const API_BASE_URL = 'https://genai-backend-eight.vercel.app/api'