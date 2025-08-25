// routes/leaveRoutes.js
const express= require("express");
const { applyLeave,updateLeave, deleteLeave,approveRejectLeave }=require("../controllers/leaveController.js");

const router = express.Router();

// Employee applies for leave
router.post("/apply", applyLeave);


// Employee updates leave request (before approval)
router.put("/:leaveId", updateLeave);

// Employee deletes leave request (before approval)
router.delete("/:leaveId", deleteLeave);

// HR approves or rejects leave
router.post("/decision", approveRejectLeave);


module.exports=router;
