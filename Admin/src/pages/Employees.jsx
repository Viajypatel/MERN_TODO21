import React, { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { createEmployee, getEmployee } from "../api/employeeApi";
import { useEmployeeStore,useLeaveStore} from "../store/employeeStore";

export default function Employees() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    joiningDate: "",
    leaveBalance: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const {employees,setEmployees}=useEmployeeStore();
  const {leaveBalance,setLeaveBalance}=useLeaveStore();
  console.log("locat of the exact url:", location.pathname);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // update the correct field dynamically
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    // frontend validation
    if (!formData.name || !formData.email || !formData.department) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (Number(formData.leaveBalance) < 0) {
      toast.error("Leave balance cannot be negative!");
      return;
    }

    try {
      console.log("Submitting:", formData);

      // send data to backend
      const res = await createEmployee(formData);
      if (res.data.error) {
        toast.error(res.data.error); // e.g., "Email already exists"
        return;
      }
      console.log("Employee added:", res);

      toast.success("Employee added successfully!");
      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        joiningDate: "",
        leaveBalance: "",
      });
    } catch (err) {
      // err.response contains the backend response for 4xx/5xx
      console.log("Employee added:", err);

      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error); // e.g., "Email already exists"
      } else {
        toast.error("Server error. Please try again.");
      }
    }
  };


  async function getEmployeeData() {

    try {

      const res = await getEmployee();
      console.log("employee data is ", res.data.employees);
      setEmployees(res.data.employees);
    }
    catch (error) {
      console.log("something error on server side", error.message);

    }
  }

  useEffect(() => {

    getEmployeeData();

  }, [formData])

  return (
    <div className="m-0">
  {/* Form */}
  <div className="sticky top-0 flex shadow-xl items-center justify-center bg-gradient-to-r from-blue-300 to-indigo-400 p-6 z-10">
    <div className="">
      <h2 className="text-center text-2xl text-black mb-6 font-semibold">Add Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <input type="text" name="name" className="border p-2 rounded placeholder-black bg-gray-200" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" className="border p-2 rounded placeholder-black bg-gray-200" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" className="border p-2 rounded placeholder-black bg-gray-200" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="text" name="department" className="border p-2 rounded placeholder-black bg-gray-200" placeholder="Department" value={formData.department} onChange={handleChange} />
        <input type="date" name="joiningDate" className="border p-2 rounded placeholder-black bg-gray-200" value={formData.joiningDate} onChange={handleChange} />
        <input type="number" name="leaveBalance" className="border p-2 rounded placeholder-black bg-gray-200" placeholder="Leave Balance" value={formData.leaveBalance} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded font-semibold hover:bg-blue-800 hover:cursor-pointer">Add</button>
      </form>
    </div>
  </div>

  {/* Scrollable Table */}
  <div className=" overflow-auto max-h-[500px] border rounded">
    {employees.length > 0 ? (
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr className="border-b">
            <th className="pl-4">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Joining Date</th>
            <th className="p-2">Leave Balance</th>
            <th className="p-2">Employee ID</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="border-b hover:bg-indigo-200">
              <td className="pl-4">{employee.name}</td>
              <td className="p-2">{employee.email}</td>
              <td className="p-2">{employee.department}</td>
              <td className="p-2">{new Date(employee.joiningDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "Asia/Kolkata"
              })}</td>
              <td className="p-2">{employee.leaveBalance}</td>
              <td className="p-2">{employee._id}</td>
              <td>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:cursor-pointer" onClick={() => navigate(`/employees/getEmployee/${employee._id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-black font-semibold p-2">Employees not found</p>
    )}
  </div>
</div>

  );
}
