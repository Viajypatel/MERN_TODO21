import React, { useEffect, useState } from "react";
import api from "../api/axios"


const ApproveRejectLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch all leave requests when page loads
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get("/leaves/getLeaves"); // <-- backend route to get all leave requests
        console.log(res.data.leaves);
        setLeaveRequests(res.data.leaves);
      } catch (err) {
        console.error("Error fetching leaves", err);
      }
    };

    fetchLeaves();
  }, []);

  // Handle Approve / Reject
  const handleAction = async (leaveId, action) => {
    try {
      const res = await api.post("/leaves/decision", {
        leaveId,
        status: action,
      });

      alert(res.data.message);

      // Update UI after approval/rejection
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === leaveId ? { ...leave, status: action } : leave
        )
      );
    } catch (err) {
      console.error("Error updating leave", err);
      alert("Failed to update leave status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Employee</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Days</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="p-2">{leave.employeeId.name}</td>
              <td className="p-2">{new Date(leave.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "Asia/Kolkata"
              })}</td>
              <td className="p-2">{new Date(leave.endDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "Asia/Kolkata"
              })}</td>
              <td className="p-2">{leave.daysRequested}</td>
              <td className="p-2">{leave.status}</td>
              <td className="p-2">
                {leave.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAction(leave._id, "approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(leave._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="italic text-gray-500">Already {leave.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRejectLeave;
