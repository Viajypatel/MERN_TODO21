const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:{type:String,required:true},
  department: { type: String, required: true, trim: true },
  joiningDate: { type: Date, required: true },
  leaveBalance: { type: Number, default: 20 },
  employeeID: { type: String, default: uuidv4, unique: true },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
