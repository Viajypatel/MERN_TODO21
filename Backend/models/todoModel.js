const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // References the User model
            required: true
        }
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
