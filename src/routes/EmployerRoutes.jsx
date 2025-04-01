import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmployerLanding from "../pages/employer/homepage/Employerlanding";
import JobPostingPage from "../pages/employer/homepage/JobPosting";
import EmployerProfilePage from "../pages/employer/homepage/Employer-profile";

const EmployerRoutes = () => {
  return (
    <Routes>
    {/* Protected Admin Routes */}
    <Route
      path="/"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <EmployerLanding />
        </ProtectedRoute>
      }
    />
    <Route
      path="home"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <EmployerLanding />
        </ProtectedRoute>
      }
    />

<Route
      path="post-job"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <JobPostingPage />
        </ProtectedRoute>
      }
    />

<Route
      path="profile"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <EmployerProfilePage />
        </ProtectedRoute>
      }
    />

  </Routes>
  );
};

export default EmployerRoutes;
