import React, { useState, useEffect } from "react";
import AssignmentForm from "../component/AssignmentForm";
import AssignmentList from "../component/AssignmentList";
import api from "../api/axiosInstance";

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await api.get("/api/assignments");
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Teacher Dashboard</h1>
      <AssignmentForm onAdd={(a) => setAssignments([a, ...assignments])} />
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default TeacherDashboard;
