import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleRoleSelect = (e) => setRole(e.target.value);
  const handleContinue = () => navigate(`/login/${role}`);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <select
        value={role}
        onChange={handleRoleSelect}
        className="border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="intern">Intern</option>
      </select>
      <button
        onClick={handleContinue}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Continue
      </button>
    </div>
  );
}
