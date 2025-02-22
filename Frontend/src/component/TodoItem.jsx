import React, { useState } from "react";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleEdit = () => {
    updateTodo(editedTodo); // Update the todo with the edited values
    setIsEditing(false); // Exit edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            name="description"
            value={editedTodo.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <div className="flex justify-between mt-4">
            <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 p-2 rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
        <div className=" border-black border border-1">
          <h3 className="text-xl font-semibold">{todo.title}</h3>
          <p className="text-gray-600">{todo.description}</p>
         
          <div className="flex justify-between mt-4">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded">
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
