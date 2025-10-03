import { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-3 gap-4">
        {employees.map((emp) => (
          <UserCard key={emp.id} user={emp} />
        ))}
      </div>
    </div>
  );
}
export default Employees;
