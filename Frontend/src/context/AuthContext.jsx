import { useState, createContext, useEffect } from "react";
import { toast } from 'react-hot-toast';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));  // Retrieve token from localStorage

  //console.log(token);
  // If token exists, set user data from the token
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64);
      const payload = JSON.parse(decodedJson);
      setUser(payload);
    } catch (_err) {
      setUser(null);
    }
  }, [token]);

  const login = (userData, token) => {
    console.log(token);
    setUser(userData);
    setToken(token); // Save token in state
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Log to verify
    console.log("Stored Token:", localStorage.getItem("token"));
    console.log("Stored8888 User:", JSON.parse(localStorage.getItem("user")))// Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
