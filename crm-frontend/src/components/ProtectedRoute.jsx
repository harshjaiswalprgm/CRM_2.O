import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login/admin" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
