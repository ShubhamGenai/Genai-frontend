import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import CartPage from "../pages/student/Cart";
import EnrolledCoursesPage from "../pages/student/enrolled/Mylist";
import ProfileMain from "../pages/student/profile/ProfileMain";
import StudentDashboardLayout from "./StudentDashLayout";
import Dashboard from "../pages/student/dashboard/Dashboard";
import LearnMainPage from "../pages/student/learn/LearnMain";
import TestPage from "../pages/student/test/TestPage";
import JobsPage from "../pages/student/jobs/JobsMain";
import LeaderBoardPage from "../pages/student/leaderBoard/LeaderBoard";
import { CourseDetails } from "../pages/coursespage/course-details-page/course-details-main";
import TestDetailsPage from "../pages/student/test/testDetails/TestDetailsNew";
import TestPlayer from "../pages/student/test/testDetails/Test-Player";
import TestTakingPage from "../pages/student/test/TestTakingPage";
import JobDetails from "../pages/student/jobs/JobDetails";
import CoursePlayer from "../pages/student/learn/course-player/Course-Player";
import LearnDetails from "../pages/student/learn/LearnDetails";
import CourseTakingPage from "../pages/student/learn/CourseTakingPage";

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
        <Route path="learn" element={<LearnMainPage />} />
        <Route path="learn/details/:id" element={<LearnDetails />} />
        <Route path="course-details" element={<CourseDetails />} />
        <Route path="course-player" element={<CoursePlayer />} />
        <Route path="course-taking/:id" element={<CourseTakingPage />} />
        <Route path="tests" element={<TestPage />} />
        <Route path="test-details" element={<TestDetailsPage />} />
        <Route path="test-player" element={<TestPlayer />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="job-details" element={<JobDetails />} />
        
        {/* Community Submenu Routes */}
        <Route path="community/forum" element={<div className="p-6"><h1 className="text-2xl font-bold">Community Forum</h1><p>Forum functionality coming soon...</p></div>} />
        <Route path="community/groups" element={<div className="p-6"><h1 className="text-2xl font-bold">Community Groups</h1><p>Groups functionality coming soon...</p></div>} />
        <Route path="community/events" element={<div className="p-6"><h1 className="text-2xl font-bold">Community Events</h1><p>Events functionality coming soon...</p></div>} />
        
        {/* Progress Submenu Routes */}
        <Route path="progress/courses" element={<div className="p-6"><h1 className="text-2xl font-bold">Course Progress</h1><p>Course progress tracking coming soon...</p></div>} />
        <Route path="progress/skills" element={<div className="p-6"><h1 className="text-2xl font-bold">Skills Track</h1><p>Skills tracking coming soon...</p></div>} />
        <Route path="progress/certificates" element={<div className="p-6"><h1 className="text-2xl font-bold">Certificates</h1><p>Certificates functionality coming soon...</p></div>} />
        <Route path="leaderboard" element={<LeaderBoardPage />} />
        
        {/* Settings Route */}
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings functionality coming soon...</p></div>} />
        
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
