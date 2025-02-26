import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ContentManagerLanding from "../pages/contentManager/homepage/Landing";


const ContentManagerRoutes = () => {
  return (
    <Routes>
      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["contentmanager"]}>
            <ContentManagerLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="home"
        element={
          <ProtectedRoute allowedRoles={["contentmanager"]}>
            <ContentManagerLanding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ContentManagerRoutes;
