import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const BASE_URL = "https://mern-todo-21-api.vercel.app";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const { token,user } = useContext(AuthContext);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const user=localStorage.getItem('user');
        if (!token || !user) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
        setError(null);
      } catch (err) {
       // setError("Failed to fetch todos");
      }
    };
    fetchTodos();
  }, [token]);

  // Create Todo
  const createTodo = async (newTodo) => {
    try {
      if (!token||!user) {
        setError("User is not authenticated");
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
       toast.success('Todo created Successful! 🎉');
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  // Update Todo
  const updateTodo = async (updatedTodo) => {
    try {
      const user=localStorage.getItem('user');
      if (!token || !user) {
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
       toast.success('Updated Successful! 🎉');
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      if (!token ||!user) {
        setError("User is not authenticated");
        return;
      }

      await axios.delete(`${BASE_URL}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter(todo => todo._id !== id));
       toast.success('Delete Successful! 🎉');
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
