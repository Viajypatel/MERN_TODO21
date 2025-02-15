const Todo = require("../models/todoModel");

// Create a To-Do
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTodo = new Todo({
            title,
            description,
            user: req.user.id, // User ID from JWT middleware
        });

        await newTodo.save();
        res.status(201).json({ message: "To-Do created successfully", newTodo });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all To-Dos for the logged-in user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a To-Do
exports.updateTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todoId = req.params.id;

        let todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "To-Do not found" });
        }

        // Ensure the to-do belongs to the logged-in user
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.completed = completed !== undefined ? completed : todo.completed;

        await todo.save();
        res.status(200).json({ message: "To-Do updated successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a To-Do
exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        let todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "To-Do not found" });
        }

        // Ensure the to-do belongs to the logged-in user
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await todo.deleteOne();
        res.status(200).json({ message: "To-Do deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
