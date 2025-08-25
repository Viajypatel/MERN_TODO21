import React, { useState } from "react";
import api from "../api/axios";

export default function Employees() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const addEmployee = async () => {
    try {
      const res = await api.post("/employees", { name, email, department, joiningDate });
      alert("Employee added: " + res.data.employee.name);
    } catch (err) {
      alert(err.response.data.error || "Error adding employee");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Department" onChange={(e) => setDepartment(e.target.value)} />
      <input type="date" onChange={(e) => setJoiningDate(e.target.value)} />
      <button onClick={addEmployee}>Add</button>
    </div>
  );
}
