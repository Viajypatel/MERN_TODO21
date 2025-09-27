// routes/employeeRoutes.js
const express=require("express");
const authMiddleware=require("../middleware/authMiddleware")
const { addEmployee,loginEmployee,getAllEmployee,getEmployeeById,getLeaveBalance }=require("../controllers/employeeController.js");

const router = express.Router();

// HR adds employee
router.post("/", addEmployee);
router.post("/loginEmp",loginEmployee);
router.get("/getEmployee/:id", getEmployeeById);
router.get("/getAllEmployee",getAllEmployee);

// HR fetches employee leave balance
router.get("/:id/leave-balance", getLeaveBalance);

module.exports=router;
