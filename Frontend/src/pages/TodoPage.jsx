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
    <div className=" mt-0 scattered-bg p-6 rounded-1 h-100vh">
    <h1 className="sticky top-0 text-3xl font-bold text-center text-white mb-2">Todo List</h1>
    <div className="mt-0 border-2 border-black bg-gray-500 container mx-auto p-4 h-auto w-120  rounded-xl shadow-lg">
      
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit} />
      
      {error && <p className="text-red-500 text-center">{error}</p>}
  </div>
      <div className="">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available</p>
        ) : (
          <div className="w-full flex justify-center mt-4">
          <div className="w-[500px] h-[400px] bg-gray-500 overflow-y-auto rounded-2xl shadow-lg scrollbar-hide ">
          <div className="w-auto  p-4 grid place-items-center gap-y-2">
            {Array.isArray(todos)&&todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} className='gap-y-1' />
            ))}
          </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
