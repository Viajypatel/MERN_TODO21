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
    <>
      {isEditing ? (
       <div className="border w-[400px] h-[200px] border-gray-300 rounded-2xl shadow-md p-2 mb-4 bg-white">
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
          <div className="flex justify-between mt-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 border w-[400px] h-[150px] border-gray-300 rounded-2xl shadow-md  bg-white">
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoItem;
