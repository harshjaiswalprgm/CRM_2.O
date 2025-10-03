import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginAdmin;
