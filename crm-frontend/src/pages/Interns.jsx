import { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";

function Interns() {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    api.get("/interns").then((res) => setInterns(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Interns</h2>
      <div className="grid grid-cols-3 gap-4">
        {interns.map((i) => (
          <UserCard key={i.id} user={i} />
        ))}
      </div>
    </div>
  );
}
export default Interns;
