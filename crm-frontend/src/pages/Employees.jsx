import React, { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/admin/employees").then((res) => setEmployees(res.data)).catch(e => {
      console.error(e);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {employees.map((emp) => <UserCard key={emp.id} user={{...emp, role: 'employee'}} />)}
      </div>
    </div>
  );
}
