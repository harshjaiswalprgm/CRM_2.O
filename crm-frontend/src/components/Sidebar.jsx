import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul className="space-y-3">
        <li>
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        {role === "admin" && (
          <>
            <li>
              <Link to="/employees" className="hover:text-blue-400">
                Employees
              </Link>
            </li>
            <li>
              <Link to="/interns" className="hover:text-blue-400">
                Interns
              </Link>
            </li>
          </>
        )}

        {role === "employee" && (
          <>
            <li>
              <Link to="/my-tasks" className="hover:text-blue-400">
                My Tasks
              </Link>
            </li>
            <li>
              <Link to="/interns" className="hover:text-blue-400">
                Interns
              </Link>
            </li>
          </>
        )}

        {role === "intern" && (
          <li>
            <Link to="/my-tasks" className="hover:text-blue-400">
              My Tasks
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
