// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await api.get("/admin/stats"); 
  //       //setStats(res.data);
  //     } catch (err) {
  //       console.error("Error fetching dashboard stats", err);
  //     }
  //   };

  //   fetchStats();
  // }, [55]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Total Employees</h2>
          <p className="text-3xl font-bold text-white">{stats.totalEmployees}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Pending Leaves</h2>
          <p className="text-3xl font-bold">{stats.pendingLeaves}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Approved Leaves</h2>
          <p className="text-3xl font-bold">{stats.approvedLeaves}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Rejected Leaves</h2>
          <p className="text-3xl font-bold">{stats.rejectedLeaves}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/employees"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Manage Employees</h3>
          <p className="text-gray-600">View, add, or edit employee records</p>
        </Link>

        <Link
          to="/approve-reject-leave"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Leave Requests</h3>
          <p className="text-gray-600">Approve or reject employee leave</p>
        </Link>

        <Link
          to="/reports"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Reports</h3>
          <p className="text-gray-600">Generate and download reports</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
