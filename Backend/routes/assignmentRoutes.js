const express = require("express");
const { createAssignment, getAssignments } = require("../controllers/assignmentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createAssignment); // Teacher posts assignment
router.get("/", getAssignments);    // Student views assignments

module.exports = router;
