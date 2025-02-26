import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/MainContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(mainContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
