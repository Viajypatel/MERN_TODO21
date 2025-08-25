// routes/employeeRoutes.js
const express=require("express");
const { addEmployee,getAllEmployee,getLeaveBalance }=require("../controllers/employeeController.js");

const router = express.Router();

// HR adds employee
router.post("/", addEmployee);
router.get("/getAllEmployee",getAllEmployee);

// HR fetches employee leave balance
router.get("/:id/leave-balance", getLeaveBalance);

module.exports=router;
