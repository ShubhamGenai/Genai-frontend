import { Routes, Route } from "react-router-dom";
import LoginLandingPage from "../pages/auth-pages/Loginlanding";
import ProtectedRoute from "./ProtectedRoute";
import HomepgMain1 from "../pages/homepage/main";
import CartPage from "../pages/student/Cart";


const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <HomepgMain1 />
          </ProtectedRoute>
        }
      />

<Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CartPage/>
          </ProtectedRoute>
        }
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default StudentRoutes;
