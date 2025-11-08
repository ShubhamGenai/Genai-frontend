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
import LearnMainPage from "../pages/student/learn/LearnMain";
import ContentLogin from "../pages/auth-pages/content-auth/Content-login";
import CoursePlayer from "../pages/student/learn/course-player/Course-Player";
import AdaptiveLayout from "../component/layout/AdaptiveLayout";
import TestPage from "../pages/student/test/TestPage";
import TestDetailsPage from "../pages/student/test/testDetails/TestDetailsNew";
import TestTakingPage from "../pages/student/test/TestTakingPage";
import LibraryPage from "../pages/student/library/LibraryPage";
import CommunityPage from "../pages/student/community/CommunityPage";
import CollegeCommunityPage from "../pages/student/community/CollegeCommunityPage";
import CompanyCommunityPage from "../pages/student/community/CompanyCommunityPage";
import ExamPrepCommunityPage from "../pages/student/community/ExamPrepCommunityPage";
import SkillsCommunityPage from "../pages/student/community/SkillsCommunityPage";
import LearnDetails from "../pages/student/learn/LearnDetails";
import AllCommunitiesPage from "../pages/student/community/AllCommunitiesPage";

import TestPlatform from "../pages/student/test/new/TestPage-new";
import LearningPlatform from "../pages/student/learn/new/Learnpage";
import JobsPanel from "../pages/student/jobs/new/JobsPanel";
import JobDetailsPage from "../pages/student/jobs/new/JobDetailsPage"; // Import the new JobDetailsPage
import LibraryDetailsPage from "../pages/student/library/new/LibraryDetailsPage";
import CourseTakingPage from "../pages/student/learn/CourseTakingPage";
import MyCourses from "../pages/student/progress/MyCourses";
import MyTests from "../pages/student/progress/MyTests";
import MyJobApplications from "../pages/student/progress/MyJobApplications";
import MyDocuments from "../pages/student/progress/MyDocuments";
import MyNotes from "../pages/student/progress/MyNotes";
import Profile from "../pages/student/progress/Profile";
import AIChatPage from "../pages/student/ai-chat/AIChatPage";


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

      {/* old lean page */}
        {/* <Route index element={<LearnMainPage />} /> */}
          <Route index element={<LearningPlatform />} />
        <Route path="tests" element={<TestPlatform/>}/>

        {/* <Route path="jobs" element={<JobsPage />} /> */}
        {/* Learn Details (nested under /learn) */}
        <Route path="details/:id" element={<LearnDetails />} />
        <Route path="course-taking/:id" element={<CourseTakingPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<AllCommunitiesPage />} />
        <Route path="community/all" element={<AllCommunitiesPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>
      
      <Route path="jobs" element={<AdaptiveLayout />}>
        <Route index element={<JobsPanel />} />
        <Route path="jobDetails/:id" element={<JobDetailsPage />} />
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="tests" element={<TestPlatform/>} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<AllCommunitiesPage />} />
        <Route path="community/all" element={<AllCommunitiesPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>
      
      <Route path="tests" element={<AdaptiveLayout />}>
        <Route index element={<TestPlatform/>} />
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<AllCommunitiesPage />} />
        <Route path="community/all" element={<AllCommunitiesPage />} />
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
        <Route path="details/:id" element={<LibraryDetailsPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="community" element={<AllCommunitiesPage />} />
        <Route path="community/all" element={<AllCommunitiesPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
      </Route>

      {/* Community routes */}
      <Route path="community" element={<AdaptiveLayout />}>
        <Route index element={<CommunityPage />} />
        <Route path="all" element={<AllCommunitiesPage />} />
        <Route path="college" element={<CollegeCommunityPage />} />
        <Route path="company" element={<CompanyCommunityPage />} />
        <Route path="exam-prep" element={<ExamPrepCommunityPage />} />
        <Route path="skills" element={<SkillsCommunityPage />} />
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="tests" element={<TestPage/>} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="library" element={<LibraryPage />} />
      </Route>
      
      {/* Progress routes */}
      <Route path="progress" element={<AdaptiveLayout />}>
        <Route path="mycourses" element={<MyCourses />} />
        <Route path="mytests" element={<MyTests />} />
        <Route path="myjobapplications" element={<MyJobApplications />} />
        <Route path="mydocuments" element={<MyDocuments />} />
        <Route path="mynotes" element={<MyNotes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="tests" element={<TestPlatform/>} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="community" element={<AllCommunitiesPage />} />
      </Route>
      
      {/* Library main route, also acts as a top-level route */}
      <Route path="library" element={<AdaptiveLayout />}>
        <Route index element={<LibraryPage />} />
        <Route path="details/:id" element={<LibraryDetailsPage />} />
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="tests" element={<TestPlatform />} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="community" element={<AllCommunitiesPage />} />
      </Route>

      {/* AI Chat Route */}
      <Route path="ai-chat" element={<AdaptiveLayout />}>
        <Route index element={<AIChatPage />} />
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="tests" element={<TestPlatform />} />
        <Route path="jobs" element={<JobsPanel />} />
        <Route path="community" element={<AllCommunitiesPage />} />
        <Route path="library" element={<LibraryPage />} />
      </Route>

      {/* Details pages with adaptive layout - Works for both guest and authenticated users */}
      <Route path="learn-details" element={<AdaptiveLayout />}>
        <Route path=":id" element={<LearnDetails />} />
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
      
      <Route path="test-taking" element={<TestTakingPage />} />

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
