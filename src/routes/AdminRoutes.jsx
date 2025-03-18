import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLandingPage from "../pages/Admin/HomePage/Landing";
import Sidebar from "../component/baseComponents/admin/AdminSidebar";
import StudentsManagement from "../component/adminComponents/studentManagemant/StudentManagement";

const AdminRoutes = () => {
  return (
    <>
  <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <AdminNavBar /> */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
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

<Route
        path="student-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <StudentsManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
</main>
</div>
</div>
    </>
  );
};

export default AdminRoutes;
