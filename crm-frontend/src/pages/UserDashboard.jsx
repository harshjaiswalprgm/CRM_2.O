import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import AttendanceWidget from "../components/AttendanceWidget";
import PerformanceChart from "../components/PerformanceChart";
import TasksList from "../components/TasksList";

export default function UserDashboard() {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const role = stored.role || localStorage.getItem("role");
  const id = stored.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!id) {
      setErr("No user info found.");
      setLoading(false);
      return;
    }
    const endpoint = role === "employee" ? `/employees/${id}/dashboard` : `/interns/${id}/dashboard`;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(endpoint);
        setData(res.data);
      } catch (e) {
        console.error(e);
        setErr(e.response?.data?.error || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, role]);

  if (loading) return <div className="p-8">Loading dashboard…</div>;
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;

  const { profile, attendance = [], performance = [] } = data || {};
  const latestPerf = performance?.[0] || {};
  const kpis = {
    sales: latestPerf.sales ?? 0,
    targets: latestPerf.targets ?? 0,
    tasks_completed: latestPerf.tasks_completed ?? 0,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:pl-64">
        <Navbar />
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProfileCard profile={profile} role={role} />
              <AttendanceWidget attendance={attendance} userId={id} userRole={role} />
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">KPIs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Sales</span><strong>{kpis.sales}</strong></div>
                  <div className="flex justify-between"><span>Targets</span><strong>{kpis.targets}</strong></div>
                  <div className="flex justify-between"><span>Tasks Completed</span><strong>{kpis.tasks_completed}</strong></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-3">Performance (last months)</h3>
                <PerformanceChart data={performance} />
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-3">Tasks</h3>
                <TasksList userId={id} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
