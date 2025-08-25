import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function ApproveRejectLeave() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await api.get("/leaves"); // Backend should expose GET /leaves
      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  const handleDecision = async (leaveId, status) => {
    try {
      await api.post("/leaves/decision", { leaveId, status });
      alert(`Leave ${status}`);
      window.location.reload();
    } catch (err) {
      alert("Error updating leave status");
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      {leaves.map((leave) => (
        <div key={leave._id}>
          <p>{leave.employeeId.name} → {leave.startDate} to {leave.endDate}</p>
          <button onClick={() => handleDecision(leave._id, "approved")}>Approve</button>
          <button onClick={() => handleDecision(leave._id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
