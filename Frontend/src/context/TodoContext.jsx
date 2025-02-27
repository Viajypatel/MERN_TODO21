import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://mern-todo-21-api.vercel.app";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
<<<<<<< HEAD
        const token = localStorage.getItem('token');
=======
        const token = localStorage.getItem('token'); 
        const user=localStorage.getItem('user');// Retrieve token from localStorage
>>>>>>> e8ce3c7 (chagne inauth)
        if (!token) {
          setError("Userkkkk is not authenticated");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (err) {
       // setError("Failed to fetch todos");
      }
    };
    fetchTodos();
  }, []);

  // Create Todo
  const createTodo = async (newTodo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
<<<<<<< HEAD
        setError("User is not authenticated");
=======
        setError("Use is not authenticated");
>>>>>>> e8ce3c7 (chagne inauth)
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/todos`,
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);

      const result = await axios.get(`${BASE_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(result.data);
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  // Update Todo
  const updateTodo = async (updatedTodo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/todos/${updatedTodo._id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(todos.map(todo => todo._id === updatedTodo._id ? response.data.todo : todo));
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      await axios.delete(`${BASE_URL}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo, error }}>
      {children}
    </TodoContext.Provider>
  );
};
