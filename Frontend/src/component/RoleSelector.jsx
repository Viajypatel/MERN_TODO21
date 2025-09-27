import React from "react";

const RoleSelector = ({ setRole }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-6">Select Your Role</h1>
      <button 
        onClick={() => setRole("teacher")} 
        className="bg-blue-500 text-white px-6 py-2 rounded mb-4">
        I'm a Teacher
      </button>
      <button 
        onClick={() => setRole("student")} 
        className="bg-green-500 text-white px-6 py-2 rounded">
        I'm a Student
      </button>
    </div>
  );
};

export default RoleSelector;
