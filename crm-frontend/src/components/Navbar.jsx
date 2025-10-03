import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">CRM 2.0</h1>

      <div className="flex items-center space-x-4">
        {/* Links */}
        {role && (
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>

            {role === "admin" && (
              <>
                <Link to="/employees" className="hover:text-gray-200">
                  Employees
                </Link>
                <Link to="/interns" className="hover:text-gray-200">
                  Interns
                </Link>
              </>
            )}

            {role === "employee" && (
              <>
                <Link to="/my-tasks" className="hover:text-gray-200">
                  My Tasks
                </Link>
                <Link to="/interns" className="hover:text-gray-200">
                  Interns
                </Link>
              </>
            )}

            {role === "intern" && (
              <Link to="/my-tasks" className="hover:text-gray-200">
                My Tasks
              </Link>
            )}
          </div>
        )}

        {/* User info + Logout */}
        <div className="flex items-center space-x-4">
          {userName && <span className="font-medium">{userName}</span>}
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
