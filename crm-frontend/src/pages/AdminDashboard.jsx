import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserCard from "../components/UserCard";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [eRes, iRes] = await Promise.all([api.get("/admin/employees"), api.get("/admin/interns")]);
        setEmployees(eRes.data);
        setInterns(iRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:pl-64">
        <Navbar />
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-3">Employees ({employees.length})</h2>
              {loading ? <p>Loading…</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {employees.map((e) => <UserCard key={e.id} user={{...e, role: 'employee'}} />)}
                </div>
              )}
            </section>

            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-3">Interns ({interns.length})</h2>
              {loading ? <p>Loading…</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {interns.map((i) => <UserCard key={i.id} user={{...i, role: 'intern'}} />)}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
