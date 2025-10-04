import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <div className="font-semibold">{user.name || user.email}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
