import React from "react";

const AssignmentList = ({ assignments }) => {
  return (
    <div>
      {assignments.map((a) => (
        <div key={a._id} className="border p-4 mb-2 rounded shadow">
          <h2 className="font-bold">{a.title}</h2>
          <p>{a.description}</p>
          <p className="text-sm text-gray-600">{a.subject} | Deadline: {new Date(a.deadline).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
