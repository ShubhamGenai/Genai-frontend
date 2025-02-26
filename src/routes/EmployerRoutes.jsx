import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmployerLanding from "../pages/employer/homepage/Employerlanding";

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
  </Routes>
  );
};

export default EmployerRoutes;
