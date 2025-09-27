import React, { useState, useEffect } from "react";
import AssignmentForm from "../component/AssignmentForm";
import AssignmentList from "../component/AssignmentList";
import api from "../api/axiosInstance";
import Navbar from "../component/Navbar"
const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const BASE_URL = "https://mern-todo-21-api.vercel.app";
  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await api.get(`${BASE_URL}/api/assignments`);
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="m-0">
    <Navbar/>
      <h1 className="text-xl mb-4">Teacher Dashboard</h1>
      <AssignmentForm onAdd={(a) => setAssignments([a, ...assignments])} />
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default TeacherDashboard;
