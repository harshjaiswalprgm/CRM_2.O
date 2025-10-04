import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const roleStr = localStorage.getItem("role");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // not logged in at all
  if (!token || !user) {
    return <Navigate to="/login/admin" replace />;
  }

  // role-specific route protection
  if (role && roleStr !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
