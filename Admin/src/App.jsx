import './App.css'
import Dashboard from "./pages/Dashboard";
import {Routes,Route } from 'react-router-dom';
import Employee from "./pages/Employees"
import ViewEmployeeDetails from './pages/ViewEmployeeDetails';
import  ApproveRejectLeave  from './pages/ApproveRejectLeave';
import { Toaster } from "react-hot-toast";
function App() {
  

  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/employees" element={<Employee/>} />
         <Route path="/approve-reject-leave" element={<ApproveRejectLeave/>} />
        <Route path="/employees/getEmployee/:id" element={<ViewEmployeeDetails/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>

    </>
  )
}

export default App
