import axios from "axios";

const api = axios.create({
  baseURL: " https://mern-todo-21-api.vercel.app",
});

export default api;
