import { Routes, Route } from "react-router-dom";
import LoginLandingPage from "../pages/auth-pages/Loginlanding";
import ProtectedRoute from "./ProtectedRoute";
import HomepgMain1 from "../pages/homepage/main";
import CartPage from "../pages/student/Cart";
import EnrolledCoursesPage from "../pages/student/enrolled/Mylist";
import StudentProfile from "../pages/student/profile/Profile_Main";


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


<Route
        path="/list"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <EnrolledCoursesPage/>
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentProfile/>
          </ProtectedRoute>
        }
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default StudentRoutes;
