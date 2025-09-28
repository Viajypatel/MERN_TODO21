import React, { useState, useEffect } from "react";
import AssignmentForm from "../component/AssignmentForm";
import AssignmentList from "../component/AssignmentList";
import api from "../api/axiosInstance";
import Navbar from "../component/Navbar";
import toast from "react-hot-toast";

const BASE_URL = "https://mern-todo-21-api.vercel.app";

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  // ✅ Define function outside useEffect
  const fetchAssignments = async () => {
    try {
      const res = await api.get(`${BASE_URL}/api/assignments`);
      setAssignments(res.data);

      if (res.data.length > 0) {
        toast.success("Assignments fetched successfully 🎉");
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast.error("Failed to fetch assignments ❌");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="m-0">
      <Navbar />
      <h1 className="text-xl mb-4">Teacher Dashboard</h1>

      {/* Form to add assignment */}
      <AssignmentForm
        onAdd={(a) => setAssignments([a, ...assignments])}
      />

      {/* Pass refresh function correctly */}
      <AssignmentList
        assignments={assignments}
        role="Teacher"
        refreshAssignments={fetchAssignments}
      />
    </div>
  );
};

export default TeacherDashboard;
