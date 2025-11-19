import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";

// Import components
import HomepgMain1 from "../pages/homepage/Homepage";
import LoginLandingPage from "../pages/auth-pages/Loginlanding";
import SignupPage from "../pages/auth-pages/Signup-page";
import LoginPage from "../pages/auth-pages/Login-page";
import AuthCallback from "../hooks/AuthCallback";
import { CourseDetails } from "../pages/coursespage/course-details-page/course-details-main";
import EmployerRegistration from "../pages/auth-pages/employer-auth/Employer-Signup";
import EmployerSignIn from "../pages/auth-pages/employer-auth/Employer-signin";
import AdminLogin from "../pages/auth-pages/admin-auth/AdminLogin";
import ContentLogin from "../pages/auth-pages/content-auth/Content-login";
import CoursePlayer from "../pages/student/learn/new/Course-Player";
import AdaptiveLayout from "../component/layout/AdaptiveLayout";
import TestDetailsPage from "../pages/student/test/new/testDetails/TestDetailsNew";
import TestTakingPage from "../pages/student/test/TestTakingPage";
import LibraryPage from "../pages/student/library/LibraryPage";
import CommunityPage from "../pages/student/community/CommunityPage";
import CollegeCommunityPage from "../pages/student/community/CollegeCommunityPage";
import CompanyCommunityPage from "../pages/student/community/CompanyCommunityPage";
import ExamPrepCommunityPage from "../pages/student/community/ExamPrepCommunityPage";
import SkillsCommunityPage from "../pages/student/community/SkillsCommunityPage";
import LearnDetails from "../pages/student/learn/new/LearnDetails";
import AllCommunitiesPage from "../pages/student/community/AllCommunitiesPage";
import TestPlatform from "../pages/student/test/new/TestPage-new";
import LearningPlatform from "../pages/student/learn/new/Learnpage";
import JobsPanel from "../pages/student/jobs/new/JobsPanel";
import JobDetailsPage from "../pages/student/jobs/new/JobDetailsPage";
import LibraryDetailsPage from "../pages/student/library/new/LibraryDetailsPage";
import MyCourses from "../pages/student/progress/MyCourses";
import MyTests from "../pages/student/progress/MyTests";
import MyJobApplications from "../pages/student/progress/MyJobApplications";
import MyDocuments from "../pages/student/progress/MyDocuments";
import MyNotes from "../pages/student/progress/MyNotes";
import Profile from "../pages/student/progress/Profile";
import AIChatPage from "../pages/student/ai-chat/AIChatPage";
import CourseTakingPage from "../pages/student/learn/CourseTakingPage";

// Configuration objects for better organization
const AUTH_ROUTES = {
  "/login-landing": LoginLandingPage,
  "/login": LoginPage,
  "/signup": SignupPage,
  "/employer-signup": EmployerRegistration,
  "/employer-signin": EmployerSignIn,
  "/admin": AdminLogin,
  "/content-login": ContentLogin
};

const ROLE_REDIRECTS = {
  admin: "/admin",
  content: "/content",
  employer: "/employer/home",
  student: "/student"
};

// Shared navigation routes used across multiple sections
const SHARED_NAV_ROUTES = [
  { path: "learn", element: LearningPlatform },
  { path: "tests", element: TestPlatform },
  { path: "jobs", element: JobsPanel },
  { path: "library", element: LibraryPage },
  { path: "community", element: AllCommunitiesPage },
  { path: "community/all", element: AllCommunitiesPage },
  { path: "community/college", element: CollegeCommunityPage },
  { path: "community/company", element: CompanyCommunityPage },
  { path: "community/exam-prep", element: ExamPrepCommunityPage },
  { path: "community/skills", element: SkillsCommunityPage }
];

const PROGRESS_ROUTES = [
  { path: "mycourses", element: MyCourses },
  { path: "mytests", element: MyTests },
  { path: "myjobapplications", element: MyJobApplications },
  { path: "mydocuments", element: MyDocuments },
  { path: "mynotes", element: MyNotes },
  { path: "profile", element: Profile }
];

const LIBRARY_SUB_ROUTES = [
  { path: "all", element: LibraryPage },
  { path: "courses", element: LibraryPage },
  { path: "books", element: LibraryPage },
  { path: "documents", element: LibraryPage },
  { path: "articles", element: LibraryPage },
  { path: "details/:id", element: LibraryDetailsPage }
];

const PublicRoutes = () => {
  const { user } = useContext(mainContext);
  const isAuthenticated = Boolean(user?.role);

  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={ROLE_REDIRECTS[user.role] || "/"} replace />
          ) : (
            <HomepgMain1 />
          )
        }
      />

      {/* Learn Platform Routes */}
      <Route path="learn" element={<AdaptiveLayout />}>
        <Route index element={<LearningPlatform />} />
        <Route path="details/:id" element={<LearnDetails />} />
        <Route path="course-taking/:id" element={<CourseTakingPage />} />
        {SHARED_NAV_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Jobs Platform Routes */}
      <Route path="jobs" element={<AdaptiveLayout />}>
        <Route index element={<JobsPanel />} />
        <Route path="jobDetails/:id" element={<JobDetailsPage />} />
        {SHARED_NAV_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Tests Platform Routes */}
      <Route path="tests" element={<AdaptiveLayout />}>
        <Route index element={<TestPlatform />} />
        {SHARED_NAV_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Library Routes */}
      <Route path="library" element={<AdaptiveLayout />}>
        <Route index element={<LibraryPage />} />
        {LIBRARY_SUB_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        {SHARED_NAV_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Community Routes */}
      <Route path="community" element={<AdaptiveLayout />}>
        <Route index element={<CommunityPage />} />
        <Route path="all" element={<AllCommunitiesPage />} />
        <Route path="college" element={<CollegeCommunityPage />} />
        <Route path="company" element={<CompanyCommunityPage />} />
        <Route path="exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="library" element={<LibraryPage />} />
      </Route>

      {/* Progress Routes */}
      <Route path="progress" element={<AdaptiveLayout />}>
        {PROGRESS_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        {SHARED_NAV_ROUTES.slice(0, 5).map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* AI Chat Routes */}
      <Route path="ai-chat" element={<AdaptiveLayout />}>
        <Route index element={<AIChatPage />} />
        {SHARED_NAV_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Detail Pages */}
      <Route path="learn-details/:id" element={<AdaptiveLayout />}>
        <Route index element={<LearnDetails />} />
      </Route>

      <Route path="course-details" element={<AdaptiveLayout />}>
        <Route index element={<CourseDetails />} />
      </Route>

      <Route path="jobDetails" element={<AdaptiveLayout />}>
        <Route index element={<JobDetailsPage />} />
      </Route>

      <Route path="test-details" element={<AdaptiveLayout />}>
        <Route index element={<TestDetailsPage />} />
      </Route>

      {/* Special Routes */}
      <Route path="test-taking" element={<TestTakingPage />} />
      <Route path="testss" element={<AdaptiveLayout />}>
        <Route index element={<CoursePlayer />} />
      </Route>
      <Route path="auth/callback" element={<AuthCallback />} />

      {/* Authentication Routes */}
      {Object.entries(AUTH_ROUTES).map(([path, Component]) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? (
              <Navigate to={ROLE_REDIRECTS[user.role] || "/"} replace />
            ) : (
              <Component />
            )
          }
        />
      ))}

      {/* Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;