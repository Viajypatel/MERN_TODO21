import axios from "axios";

const BASE_URL = "https://mern-todo-21-api.vercel.app";

export const registerUser = async (userData) => {
  return axios.post(`${BASE_URL}/api/auth/register`, userData);
}

export const loginUser = async (userData) => {
  return axios.post(`${BASE_URL}/api/auth/login`, userData);
}
