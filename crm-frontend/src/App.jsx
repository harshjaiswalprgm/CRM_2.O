import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import LoginAdmin from "./pages/LoginAdmin";
import LoginEmployee from "./pages/LoginEmployee";
import LoginIntern from "./pages/LoginIntern";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Interns from "./pages/Interns";

import ProtectedRoute from "./components/ProtectedRoute";

/**
 * Routing rules:
 * - /login/admin  -> Admin login
 * - /login/employee -> Employee login
 * - /login/intern -> Intern login
 * - /dashboard -> protected (any role)
 * - /employees -> admin only
 * - /interns -> admin only
 *
 * Default route redirects to /login/admin (you can change)
 */

export default function App() {
  return (
    <Routes>
      {/* Login routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="/login/employee" element={<LoginEmployee />} />
      <Route path="/login/intern" element={<LoginIntern />} />

      {/* Protected dashboard (any authenticated role) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin-only pages */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute role="admin">
            <Employees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interns"
        element={
          <ProtectedRoute role="admin">
            <Interns />
          </ProtectedRoute>
        }
      />

      {/* Convenience routes */}
      <Route path="/" element={<Navigate to="/login/admin" replace />} />
      <Route path="*" element={<Navigate to="/login/admin" replace />} />
    </Routes>
  );
}
