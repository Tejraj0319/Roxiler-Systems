import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user || user.role !== "STORE_OWNER") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
