import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxy handles forwarding to 5000
});

// Attach token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("toke is generated",token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
