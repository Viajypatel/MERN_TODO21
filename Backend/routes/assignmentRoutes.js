const express = require("express");
const { createAssignment, getAssignments,deleteAssignment } = require("../controllers/assignmentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createAssignment); // Teacher posts assignment
router.get("/", getAssignments);    // Student views assignments

router.delete("/:id",deleteAssignment);

module.exports = router;
