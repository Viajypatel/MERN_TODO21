import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);



  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get('/api/todos', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authorization
          },
        });
        setTodos(response.data);
      } catch (err) {
        setError("Failed to fetch todos");
      }
    };
    fetchTodos();
  }, []);

  // Create Todo
  const createTodo = async (newTodo) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError("Userkkk is not authenticated");
        return;
      }

      const response = await axios.post(
        '/api/todos',
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authorization
          },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
      // Optionally, re-fetch all todos from the backend after creation
      const result = await axios.get('/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is sent with re-fetch
        },
      });
      setTodos(result.data);  // Replace with the latest todos
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  // Update Todo
  const updateTodo = async (updatedTodo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User is not jauthenticated");
        return;
      }

      const response = await axios.put(
        `/api/todos/${updatedTodo._id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authorization
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

      await axios.delete(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authorization
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
