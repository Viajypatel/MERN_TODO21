import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "../component/TodoItem";
import TodoForm from "../component/TodoForm";

const TodoPage = () => {
  const { todos, createTodo, updateTodo, deleteTodo, error } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title.trim() && newTodo.description.trim()) {
      createTodo(newTodo);
      setNewTodo({ title: "", description: "" }); // Clear the form
    }
  };

  return (
    <div className="mt-4 container mx-auto p-6  rounded-1">
    <h1 className="sticky top-0 text-3xl font-bold text-center text-gray-700 mb-6">Todo List</h1>
    <div className="mt-4 container mx-auto p-6 h-80 w-120  rounded-1x">
      
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit} />
      
      {error && <p className="text-red-500 text-center">{error}</p>}
  </div>
      <div className="">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {Array.isArray(todos)&&todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} className='gap-y-1' />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
