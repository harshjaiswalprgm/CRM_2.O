import React from "react";

export default function ProfileCard({ profile = {}, role }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl">
          {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{profile.name || "No name"}</h3>
          <p className="text-sm text-gray-600">{profile.email}</p>
          <p className="text-sm text-gray-500">{role === "employee" ? profile.position : ""}</p>
        </div>
      </div>

      <div className="mt-4 text-sm space-y-1">
        <div><strong>ID:</strong> {profile.id || "-"}</div>
        {role === "employee" && <div><strong>Salary:</strong> {profile.salary ? `$${profile.salary}` : "-"}</div>}
        {role === "intern" && <div><strong>Stipend:</strong> {profile.stipend ? `$${profile.stipend}` : "-"}</div>}
        <div><strong>Joined:</strong> {profile.created_at || "-"}</div>
      </div>
    </div>
  );
}
