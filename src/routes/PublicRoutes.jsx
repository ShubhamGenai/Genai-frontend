import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";
import HomepgMain1 from "../pages/homepage/main";
import LoginLandingPage from "../pages/auth-pages/Loginlanding";
import SignupPage from "../pages/auth-pages/Signup-page";
import LoginPage from "../pages/auth-pages/Login-page";
import LeaderBoardPage from "../pages/student/leaderBoard/LeaderBoard";
import AuthCallback from "../hooks/AuthCallback";
import { CourseDetails } from "../pages/coursespage/course-details-page/course-details-main";
import EmployerRegistration from "../pages/auth-pages/employer-auth/Employer-Signup";
import EmployerSignIn from "../pages/auth-pages/employer-auth/Employer-signin";
import AdminLogin from "../pages/auth-pages/admin-auth/AdminLogin";
import JobsPage from "../pages/student/jobs/JobsMain";
import JobDetails from "../pages/student/jobs/JobDetails";
import LearnMainPage from "../pages/student/learn/LearnMain";
import ContentLogin from "../pages/auth-pages/content-auth/Content-login";
import CoursePlayer from "../pages/student/learn/course-player/Course-Player";
import GuestLearnLayout from "../component/layout/GuestLearnLayout";
import AdaptiveLayout from "../component/layout/AdaptiveLayout";
import TestPage from "../pages/student/test/TestPage";
import TestDetailsPage from "../pages/student/test/testDetails/TestDetails";




// Authentication route components
const authComponents = {
  "/login-landing": <LoginLandingPage />,
  "/login": <LoginPage />,
  "/signup": <SignupPage />,
  "/employer-signup": <EmployerRegistration/>,
  "/employer-signin": <EmployerSignIn/>,
  "/admin": <AdminLogin/>,
   "/content-login": <ContentLogin/>
};

const PublicRoutes = () => {
  const { user } = useContext(mainContext);
  const isAuthenticated = Boolean(user?.role);

  // Role-based redirection paths
  const roleRedirects = {
    admin: "/admin",
    content: "/content",
    employer: "/employer/home",
    student: "/student", // Redirect students to their dashboard
  };

  return (
    <Routes>
      {/* Home Page - Open to all */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={roleRedirects[user.role] || "/"} replace />
          ) : (
            <HomepgMain1 />
          )
        }
      />

      {/* Public Pages */}
 
      {/* All pages with adaptive layout - Works for both guest and authenticated users */}
      <Route path="learn" element={<AdaptiveLayout />}>
        <Route index element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>}/>
        <Route path="jobs" element={<JobsPage />} />
        <Route path="community" element={<div className="p-6"><h1 className="text-2xl font-bold">Community</h1><p>Community functionality coming soon...</p></div>} />
      </Route>
      
      <Route path="jobs" element={<AdaptiveLayout />}>
        <Route index element={<JobsPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="community" element={<div className="p-6"><h1 className="text-2xl font-bold">Community</h1><p>Community functionality coming soon...</p></div>} />
      </Route>
      
      <Route path="tests" element={<AdaptiveLayout />}>
        <Route index element={<TestPage/>} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="community" element={<div className="p-6"><h1 className="text-2xl font-bold">Community</h1><p>Community functionality coming soon...</p></div>} />
      </Route>
      
      {/* Details pages with adaptive layout - Works for both guest and authenticated users */}
      <Route path="course-details" element={<AdaptiveLayout />}>
        <Route index element={<CourseDetails />} />
      </Route>
      
      <Route path="job-details" element={<AdaptiveLayout />}>
        <Route index element={<JobDetails />} />
      </Route>
      
      <Route path="test-details" element={<AdaptiveLayout />}>
        <Route index element={<TestDetailsPage />} />
      </Route>

      <Route path="leaderboard" element={<AdaptiveLayout />}>
        <Route index element={<LeaderBoardPage />} />
      </Route>

      <Route path="testss" element={<AdaptiveLayout />}>
        <Route index element={<CoursePlayer />} />
      </Route>
      
      <Route path="auth/callback" element={<AuthCallback/>} />

      <Route path="admin" element={<AdminLogin/>} />


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
