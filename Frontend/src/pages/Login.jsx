import { useState, useContext } from 'react';
//import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {loginUser} from "../api/authApi";
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      if(res.status===200){
        toast.success('Login Successful! 🎉');
      const { token, user } = res.data;
      console.log(res.data);
      login(user,token);
      localStorage.setItem('token', token);
      //alert('Login successful!');
      navigate('/home');
      }
    } catch (error) {
      //alert(error.response?.data?.message || 'Login failed');
      toast.error(error.response?.data?.message || 'login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-96">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4">
        <p className="text-center">
          Not have an account?{' '}
          <Link to="/" className="text-red-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
