import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLandingPage from "../pages/Admin/HomePage/Landing";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLandingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="home"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLandingPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
