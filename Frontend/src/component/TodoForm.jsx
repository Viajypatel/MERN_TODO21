import React from "react";

const TodoForm = ({ newTodo, setNewTodo, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg mb-2">
      <input
        type="text"
        name="title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <textarea
        name="description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      ></textarea>
      <button type="submit" className="bg-green-500 text-white p-2 rounded-xl shadow-lg w-full">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
