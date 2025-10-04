import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // Redirect to correct login page
    if (role === "admin") navigate("/login/admin");
    else if (role === "employee") navigate("/login/employee");
    else if (role === "intern") navigate("/login/intern");
    else navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left side - Brand + Links */}
      <div className="flex items-center space-x-6">
        <div className="font-bold text-lg text-blue-600">CRM 2.0</div>

        {/* Always visible */}
        <Link to="/dashboard" className="text-sm text-gray-700 hover:underline">
          Dashboard
        </Link>

        {/* Role-specific links */}
        {role === "admin" && (
          <>
            <Link to="/employees" className="text-sm text-gray-700 hover:underline">
              Employees
            </Link>
            <Link to="/interns" className="text-sm text-gray-700 hover:underline">
              Interns
            </Link>
          </>
        )}

        {role === "employee" && (
          <>
            <Link to="/my-tasks" className="text-sm text-gray-700 hover:underline">
              My Tasks
            </Link>
            <Link to="/interns" className="text-sm text-gray-700 hover:underline">
              Interns
            </Link>
          </>
        )}

        {role === "intern" && (
          <Link to="/my-tasks" className="text-sm text-gray-700 hover:underline">
            My Tasks
          </Link>
        )}
      </div>

      {/* Right side - User + Logout */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-700">
          {user?.name || user?.email}
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
