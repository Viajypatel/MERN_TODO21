import API from "./axios";

// Fetch leave balance of logged-in employee
export const fetchLeaveBalance = (id) => API.get(`/employees/${id}/leave-balance`);


// Request a new leave
export const applyLeave = (leaveData) => API.post("/leave/apply", leaveData);

// Approve/Reject leave (for admin)
export const updateLeaveStatus = (leaveId, status) =>
  API.put(`/leave/${leaveId}`, { status });
