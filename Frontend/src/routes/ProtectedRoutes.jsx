import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isValid) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export default ProtectedRoutes;
