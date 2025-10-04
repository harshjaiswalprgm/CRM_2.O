import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function TasksList({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/tasks?assignedTo=${userId}`);
        setTasks(res.data || []);
      } catch (err) {
        console.warn("Tasks API failed:", err.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) return <div>Loading tasks…</div>;

  return (
    <div className="space-y-3">
      {tasks.length === 0 && <div className="text-sm text-gray-500">No tasks found.</div>}
      {tasks.map(t => (
        <div key={t.id} className="p-2 border rounded">
          <div className="flex justify-between">
            <strong>{t.title}</strong>
            <span className="text-sm text-gray-600">{t.status}</span>
          </div>
          <div className="text-sm text-gray-600">{t.description}</div>
          <div className="text-xs text-gray-500 mt-1">Due: {t.deadline || "—"}</div>
        </div>
      ))}
    </div>
  );
}
