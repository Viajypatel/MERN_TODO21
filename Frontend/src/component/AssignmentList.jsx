import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://mern-todo-21-api.vercel.app";

const AssignmentList = ({ assignments, role, refreshAssignments }) => {
  // ✅ Delete assignment
  async function handleDelete(id) {
    try {
      console.log("deleted id is:",id);
     await axios.delete(`${BASE_URL}/api/assignments/${id}`);
    alert("Assignment deleted successfully");
      toast.success("Assignment deleted successfully ✅");
      refreshAssignments(); // refresh list after delete
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong ❌");
    }
  }

  return (
    <div>
      {assignments.map((a) => (
        <div
          key={a._id}
          className="border p-4 mb-2 rounded shadow flex justify-between"
        >
          <div>
            <h2 className="font-bold">{a.title}</h2>
            <p>{a.description}</p>
            <p className="text-sm text-gray-600">
              {a.subject} | Deadline: {new Date(a.deadline).toDateString()}
            </p>
          </div>

          {/* ✅ Show delete only for teacher */}
          {role === "Teacher" && (
            <button
              onClick={() => handleDelete(a._id)}
              className="bg-red-600 text-white px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-red-400"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
