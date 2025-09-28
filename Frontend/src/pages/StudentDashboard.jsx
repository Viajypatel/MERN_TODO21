import React, { useEffect, useState } from "react";
import AssignmentList from "../component/AssignmentList";
import Navbar from "../component/Navbar"
//import api from "../api/axiosInstance";
import axios from "axios"
import toast from 'react-hot-toast';
const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
const BASE_URL = "https://mern-todo-21-api.vercel.app";

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await axios.get(`${BASE_URL}/api/assignments`);
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="m-0">
    <Navbar/>
      <h1 className="text-xl mb-4">Student Dashboard</h1>
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default StudentDashboard;
