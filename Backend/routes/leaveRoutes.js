// routes/leaveRoutes.js
const express= require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { applyLeave,getMyLeaves,getAllLeaves,updateLeave, deleteLeave,approveRejectLeave }=require("../controllers/leaveController.js");

const router = express.Router();

// Employee applies for leave
router.post("/apply", applyLeave);

router.get("/getLeaves",getAllLeaves);

router.get("/getMyLeaves",authMiddleware,getMyLeaves);

// Employee updates leave request (before approval)
router.put("/:leaveId", updateLeave);

// Employee deletes leave request (before approval)
router.delete("/:leaveId", deleteLeave);

// HR approves or rejects leave
router.post("/decision", approveRejectLeave);


module.exports=router;
