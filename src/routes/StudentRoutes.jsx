import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import CartPage from "../pages/student/Cart";
import EnrolledCoursesPage from "../pages/student/enrolled/Mylist";
import ProfileMain from "../pages/student/profile/ProfileMain";
import StudentDashboardLayout from "./StudentDashLayout";
import Dashboard from "../pages/student/dashboard/Dashboard";
import { CourseDetails } from "../pages/coursespage/course-details-page/course-details-main";
import TestDetailsPage from "../pages/student/test/new/testDetails/TestDetailsNew";
// import TestPlayer from "../pages/student/test/new/testDetails/Test-Player";
import TestTakingPage from "../pages/student/test/TestTakingPage";
import CoursePlayer from "../pages/student/learn/new/Course-Player";
import LearnDetails from "../pages/student/learn/new/LearnDetails";
import LearningPlatform from "../pages/student/learn/new/Learnpage";
import TestPlatform from "../pages/student/test/new/TestPage-new";
import JobsPlatform from "../pages/student/jobs/new/JobsPanel";
import MyCourses from "../pages/student/progress/MyCourses";
import MyTests from "../pages/student/progress/MyTests";
import MyJobApplications from "../pages/student/progress/MyJobApplications";
import MyDocuments from "../pages/student/progress/MyDocuments";
import MyNotes from "../pages/student/progress/MyNotes";
import Profile from "../pages/student/progress/Profile";
import CollegeCommunityPage from "../pages/student/community/CollegeCommunityPage";
import CompanyCommunityPage from "../pages/student/community/CompanyCommunityPage";
import ExamPrepCommunityPage from "../pages/student/community/ExamPrepCommunityPage";
import SkillsCommunityPage from "../pages/student/community/SkillsCommunityPage";
import LibraryPage from "../pages/student/library/LibraryPage";
import AIChatPage from "../pages/student/ai-chat/AIChatPage";
import CommunityPage from "../pages/student/community/CommunityPage";

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Test Taking - Full Screen, No Layout */}
      <Route
        path="test-taking"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <TestTakingPage />
          </ProtectedRoute>
        }
      />
      
      {/* Dashboard Layout Wrapper */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} /> {/* Dashboard as landing */}
        <Route path="cart" element={<CartPage />} />
        <Route path="list" element={<EnrolledCoursesPage />} />
        <Route path="profile" element={<ProfileMain />} />
        
        {/* Main Navigation Routes */}
        <Route path="learn" element={<LearningPlatform />} />
        <Route path="learn/details/:id" element={<LearnDetails />} />
        <Route path="course-details" element={<CourseDetails />} />
        <Route path="course-player" element={<CoursePlayer />} />
        {/* <Route path="course-taking/:id" element={<CourseTakingPage />} /> */}
        <Route path="tests" element={<TestPlatform />} />
        <Route path="test-details" element={<TestDetailsPage />} />
        {/* <Route path="test-player" element={<TestPlayer />} /> */}
        <Route path="jobs" element={<JobsPlatform />} />
        {/* <Route path="job-details" element={<JobDetails />} /> */}
        
        {/* Community Submenu Routes */}
        <Route path="community/all" element={<CommunityPage />} />
        <Route path="community/college" element={<CollegeCommunityPage />} />
        <Route path="community/company" element={<CompanyCommunityPage />} />
        <Route path="community/examprep" element={<ExamPrepCommunityPage />} />
        <Route path="community/skills" element={<SkillsCommunityPage />} />
        
        {/* Progress Submenu Routes */}
        <Route path="progress/mycourses" element={<MyCourses />} />
        <Route path="progress/mytests" element={<MyTests />} />
        <Route path="progress/myjobapplications" element={<MyJobApplications />} />
        <Route path="progress/mydocuments" element={<MyDocuments />} />
        <Route path="progress/mynotes" element={<MyNotes />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Settings Route */}
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings functionality coming soon...</p></div>} />
        
        <Route path="library" element={<LibraryPage />} />
        <Route path="ai-chat" element={<AIChatPage />} />
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
