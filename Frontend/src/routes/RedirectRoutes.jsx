import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const RedirectRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user && user.isValid) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectRoutes;
