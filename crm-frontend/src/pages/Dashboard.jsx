import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || localStorage.getItem("role") || "employee";
  if (role === "admin") return <AdminDashboard />;
  return <UserDashboard />;
}
