import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios"
import { useNavigate } from "react-router-dom";
import { fetchLeaveBalance } from "../api/leaveApi";
import { getEmployeeById } from "../api/employeeApi";
export default function ViewEmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(null);

  async function handleLeaveBalance() {

    try {
      const res = await fetchLeaveBalance(id);
      console.log("leave balacne is", res.data);
      setLeaveBalance(res.data);
    }
    catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployeeById(id);
        console.log(res.data);
        setEmployee(res.data.employees);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{employee.name}</h2>

      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Password:</span> {employee.password}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Department:</span> {employee.department}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Joining Date:</span>{" "}
          {new Date(employee.joiningDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata",
          })}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Leave Balance:</span> {employee.leaveBalance}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Employee ID:</span> {employee.employeeID}
        </p>
      </div>

      <div className="mt-6 text-center flex justify-between">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={() => navigate("/employees")}
        >
          Back to Employees
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={handleLeaveBalance}
        >
          View currnt leave
        </button>
      </div>
      {/* 👇 Only show leave balance after button is clicked */}
      {leaveBalance !== null && (
        <p className="mt-4 text-center text-lg text-green-700 font-semibold">
          Current Leave Balance: {leaveBalance.leaveBalance}
        </p>
      )}

    </div>
  );
}
