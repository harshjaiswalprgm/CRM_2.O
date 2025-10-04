import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-gray-600 text-white p-4">
      <div className="text-xl font-semibold mb-6">Menu</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</Link></li>
          {role === "admin" && (
            <>
              <li><Link to="/employees" className="block py-2 px-3 rounded hover:bg-gray-700">Employees</Link></li>
              <li><Link to="/interns" className="block py-2 px-3 rounded hover:bg-gray-700">Interns</Link></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
