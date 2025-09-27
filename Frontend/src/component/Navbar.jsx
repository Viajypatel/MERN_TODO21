import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-700 px-3 py-2 rounded-md font-semibold"
      : "hover:bg-blue-600 px-3 py-2 rounded-md font-semibold";

  return (
    <nav className="flex justify-between items-center bg-blue-500 text-white px-6 py-3">
      <div className="flex space-x-4">
        <NavLink to="/home" className={linkClass}>
          Todo
        </NavLink>
        <NavLink to="/ts" className={linkClass}>
          Assignments
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
