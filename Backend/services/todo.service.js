const Todo = require("../models/todoModel");

// Service function to create a new Todo
exports.createTodoService = async ({ title, description, userId }) => {
    const newTodo = new Todo({
        title,
        description,
        user: userId, // Pass user ID as parameter
    });

    await newTodo.save();

    return newTodo; // Return the saved Todo document
};
