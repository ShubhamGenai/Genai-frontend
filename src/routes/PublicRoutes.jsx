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
import LibraryPage from "../pages/student/library/LibraryPage";
import CommunityPage from "../pages/student/community/CommunityPage";
import CollegeCommunityPage from "../pages/student/community/CollegeCommunityPage";
import CompanyCommunityPage from "../pages/student/community/CompanyCommunityPage";
import ExamPrepCommunityPage from "../pages/student/community/ExamPrepCommunityPage";
import SkillsCommunityPage from "../pages/student/community/SkillsCommunityPage";




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
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/all" element={<CommunityPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>
      
      <Route path="jobs" element={<AdaptiveLayout />}>
        <Route index element={<JobsPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/all" element={<CommunityPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>
      
      <Route path="tests" element={<AdaptiveLayout />}>
        <Route index element={<TestPage/>} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/all" element={<CommunityPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>

      {/* Library route */}
      <Route path="library" element={<AdaptiveLayout />}>
        <Route index element={<LibraryPage />} />
        <Route path="all" element={<LibraryPage />} />
        <Route path="courses" element={<LibraryPage />} />
        <Route path="books" element={<LibraryPage />} />
        <Route path="documents" element={<LibraryPage />} />
        <Route path="articles" element={<LibraryPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/all" element={<CommunityPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>

      {/* Community routes */}
      <Route path="community" element={<AdaptiveLayout />}>
        <Route index element={<CommunityPage />} />
        <Route path="all" element={<CommunityPage />} />
        <Route path="college" element={<CollegeCommunityPage />} />
        <Route path="company" element={<CompanyCommunityPage />} />
        <Route path="exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="skills" element={<SkillsCommunityPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="library" element={<LibraryPage />} />
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
