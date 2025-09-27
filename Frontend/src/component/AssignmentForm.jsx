import React, { useState } from "react";
import api from "../api/axiosInstance";

const AssignmentForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: "", description: "", subject: "", deadline: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/api/assignments", form);
    onAdd(res.data);
    setForm({ title: "", description: "", subject: "", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 mb-2 w-full" />
      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="border p-2 mb-2 w-full" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 mb-2 w-full" />
      <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Assignment</button>
    </form>
  );
};

export default AssignmentForm;
