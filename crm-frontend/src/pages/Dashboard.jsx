import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to CRM 2.0!</p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
