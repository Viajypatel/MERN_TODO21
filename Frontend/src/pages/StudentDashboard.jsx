import React, { useEffect, useState } from "react";
import AssignmentList from "../component/AssignmentList";
//import api from "../api/axiosInstance";
import axios from "axios"
const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
const BASE_URL = "https://mern-todo-21-api.vercel.app";

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await axios.get(`http://localhost:5000/api/assignments`);
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Student Dashboard</h1>
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default StudentDashboard;
