const express = require("express");
const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new To-Do (Protected Route)
// Add authMiddleware to this route to ensure only authenticated users can create a to-do.
router.post("/", authMiddleware, createTodo); // <-- Add authMiddleware here

// Get all To-Dos for the logged-in user
router.get("/", authMiddleware, getTodos);

// Update a To-Do by ID
router.put("/:id", authMiddleware, updateTodo);

// Delete a To-Do by ID
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
