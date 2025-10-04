import React, { useState } from "react";
import api from "../api/axios";

export default function AttendanceWidget({ attendance = [], userId, userRole }) {
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const todayRow = attendance.find(a => a.date === today);
  const checkInTime = todayRow?.check_in;
  const checkOutTime = todayRow?.check_out;

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await api.post("/attendance/checkin", { user_type: userRole });
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await api.post("/attendance/checkout", { user_type: userRole });
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Attendance</h3>
      <div className="mb-3">
        <div className="text-sm text-gray-600">Today</div>
        <div className="text-xl font-bold">{checkInTime ? new Date(checkInTime).toLocaleTimeString() : 'Not checked in'}</div>
        {checkOutTime && <div className="text-sm text-gray-500">Checked out at {new Date(checkOutTime).toLocaleTimeString()}</div>}
      </div>

      {!checkInTime && (
        <button onClick={handleCheckIn} disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
          {loading ? "Checking in…" : "Check In"}
        </button>
      )}

      {checkInTime && !checkOutTime && (
        <button onClick={handleCheckOut} disabled={loading} className="w-full bg-red-600 text-white py-2 rounded">
          {loading ? "Checking out…" : "Check Out"}
        </button>
      )}

      <div className="mt-4 text-sm">
        <strong>Last 7 days</strong>
        <ul className="mt-2 space-y-1">
          {attendance.slice(0,7).map(a => (
            <li key={a.id} className="flex justify-between">
              <span>{a.date}</span>
              <span className="text-gray-600">{a.status}{a.check_in ? ` • in ${new Date(a.check_in).toLocaleTimeString()}` : ''}{a.check_out ? ` • out ${new Date(a.check_out).toLocaleTimeString()}` : ''}</span>
            </li>
          ))}
          {attendance.length === 0 && <li className="text-gray-500">No records</li>}
        </ul>
      </div>
    </div>
  );
}
