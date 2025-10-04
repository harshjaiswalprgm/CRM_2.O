import React, { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";

export default function Interns() {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    api.get("/admin/interns").then((res) => setInterns(res.data)).catch(e => {
      console.error(e);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Interns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {interns.map((i) => <UserCard key={i.id} user={{...i, role: 'intern'}} />)}
      </div>
    </div>
  );
}
