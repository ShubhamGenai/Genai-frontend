import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";
import AdminRoutes from "./AdminRoutes";
import ContentManagerRoute from "./ContentMangerRoutes";
import StudentRoutes from "./StudentRoutes";
import EmployerRoutes from "./EmployerRoutes";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../component/Scroll-top";

const roleComponents = {
  admin: <AdminRoutes />,
  student: <StudentRoutes />,
  content: <ContentManagerRoute />,
  employer: <EmployerRoutes />,
};

const AppRoutes = () => {
  const { user } = useContext(mainContext);
  const userRole = user?.role;

  return (
    <>
    <ScrollToTop/>
    <Routes>
      {/* Role-Based Routing - Protected (Higher Priority) */}
      {userRole && roleComponents[userRole] && (
        <Route
          path={`${userRole}/*`}
          element={
            <ProtectedRoute allowedRoles={[userRole]}>
              {roleComponents[userRole]}
            </ProtectedRoute>
          }
        />
      )}

      {/* Public Routes - Available to Everyone */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Redirect invalid paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default AppRoutes;
