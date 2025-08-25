// models/leaveModel.js
const mongoose=require("mongoose");

/*
  Leave Schema
  - Employee applies leave
  - HR approves or rejects
*/
const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  daysRequested: { type: Number, required: true },
  reson:{type:String},
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports=Leave;
