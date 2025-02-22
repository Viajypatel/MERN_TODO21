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
    <div className="mt-4 container mx-auto p-6 h-80 w-120  rounded-1xl">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Todo List</h1>
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit} />
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-8 border-1 border-black rounded-sm">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available</p>
        ) : (
          <div className="space-y-4 gap-y-1">
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
