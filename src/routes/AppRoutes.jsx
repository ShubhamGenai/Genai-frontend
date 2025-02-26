import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";
import AdminRoutes from "./AdminRoutes";
import ContentManagerRoute from "./ContentManger";
import StudentRoutes from "./StudentRoutes";
import EmployerRoutes from "./EmployerRoutes";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoute";

const roleComponents = {
  admin: <AdminRoutes />,
  student: <StudentRoutes />,
  contentmanager: <ContentManagerRoute />,
  employer: <EmployerRoutes />,
};

const AppRoutes = () => {
  const { user } = useContext(mainContext);
  const userRole = user?.role;

  return (
    <Routes>
      {/* Public Routes - Available to Everyone */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Role-Based Routing - Protected */}
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

      {/* Redirect invalid paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
