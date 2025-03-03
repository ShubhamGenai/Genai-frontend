import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";
import HomepgMain1 from "../pages/homepage/main";
import LoginLandingPage from "../pages/auth-pages/Loginlanding";
import SignupPage from "../pages/auth-pages/Signup-page";
import LoginPage from "../pages/auth-pages/Login-page";
import TestPage from "../pages/student/test/TestPage";
import CoursesMain from "../pages/coursespage/main";
import JobsMainPage from "../pages/student/jobs/JobsMain";
import LearnMainPage from "../pages/student/learn/LearnMain";
import LeaderBoardPage from "../pages/student/leaderBoard/LeaderBoard";
import AuthCallback from "../hooks/AuthCallback";
import { CourseDetails } from "../pages/coursespage/course-details-page/course-details-main";


// Authentication route components
const authComponents = {
  "/login-landing": <LoginLandingPage />,
  "/login": <LoginPage />,
  "/signup": <SignupPage />,
};

const PublicRoutes = () => {
  const { user } = useContext(mainContext);
  const isAuthenticated = Boolean(user?.role);

  // Role-based redirection paths
  const roleRedirects = {
    admin: "/admin/home",
    contentmanager: "/contentmanager/home",
    employer: "/employer/home",
    student: "/", // Explicitly keep students on homepage
  };

  return (
    <Routes>
      {/* Home Page - Open to all */}
      <Route
        path="/"
        element={
          isAuthenticated && user.role !== "student" ? (
            <Navigate to={roleRedirects[user.role] || "/"} replace />
          ) : (
            <HomepgMain1 />
          )
        }
      />

      {/* Public Pages */}
 
      <Route path="tests" element={<TestPage />} /> 
      
      <Route path="learn" element={<CoursesMain  />} /> 
      <Route path="jobs" element={<JobsMainPage />} /> 
      <Route path="leader-board" element={<LeaderBoardPage />} /> 
      <Route path="course-details" element={<CourseDetails />} /> 
      <Route path="auth/callback" element={<AuthCallback/>} />


      {/* Authentication Pages - Redirect logged-in users */}
      {Object.keys(authComponents).map((path) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? <Navigate to={roleRedirects[user.role] || "/"} replace /> : authComponents[path]
          }
        />
      ))}

      {/* Catch-All: Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
