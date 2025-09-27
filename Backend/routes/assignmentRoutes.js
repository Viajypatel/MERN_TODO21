const express = require("express");
const { createAssignment, getAssignments } = require("../controllers/assignmentController");

const router = express.Router();

router.post("/", createAssignment); // Teacher posts assignment
router.get("/", getAssignments);    // Student views assignments

module.exports = router;
