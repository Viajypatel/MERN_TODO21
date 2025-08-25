// controllers/leaveController.js
const Leave=require("../models/leaveModel.js");
const Employee =require("../models/employeeModel.js");

// Employee applies for leave
exports.applyLeave = async (req, res, next) => {
  try {
    const { employeeId, startDate, endDate } = req.body;
    const employee = await Employee.findById(employeeId);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if (sDate < employee.joiningDate)
      return res.status(400).json({ error: "Cannot apply leave before joining date" });

    if (eDate < sDate) return res.status(400).json({ error: "End date cannot be before start date" });

    const daysRequested = Math.ceil((eDate - sDate) / (1000 * 60 * 60 * 24)) + 1;

    if (daysRequested > employee.leaveBalance)
      return res.status(400).json({ error: "Insufficient leave balance" });

    // Check overlapping leaves
    const overlap = await Leave.findOne({
      employeeId,
      status: { $ne: "rejected" },
      $or: [{ startDate: { $lte: eDate }, endDate: { $gte: sDate } }],
    });

    if (overlap) return res.status(400).json({ error: "Overlapping leave request exists" });

    const leave = await Leave.create({ employeeId, startDate: sDate, endDate: eDate, daysRequested });

    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    next(error);
  }
};


// controllers/leaveController.js

// Employee updates leave request (only if pending)
exports.updateLeave = async (req, res, next) => {
  try {
    const { leaveId } = req.params;
    const { startDate, endDate } = req.body;

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    if (leave.status !== "pending")
      return res.status(400).json({ error: "Cannot update leave once approved/rejected" });

    const employee = await Employee.findById(leave.employeeId);

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if (sDate < employee.joiningDate)
      return res.status(400).json({ error: "Cannot apply leave before joining date" });

    if (eDate < sDate)
      return res.status(400).json({ error: "End date cannot be before start date" });

    const daysRequested = Math.ceil((eDate - sDate) / (1000 * 60 * 60 * 24)) + 1;

    if (daysRequested > employee.leaveBalance)
      return res.status(400).json({ error: "Insufficient leave balance" });

    // Check overlapping leaves (excluding itself)
    const overlap = await Leave.findOne({
      _id: { $ne: leaveId },
      employeeId: leave.employeeId,
      status: { $ne: "rejected" },
      $or: [{ startDate: { $lte: eDate }, endDate: { $gte: sDate } }],
    });

    if (overlap) return res.status(400).json({ error: "Overlapping leave request exists" });

    leave.startDate = sDate;
    leave.endDate = eDate;
    leave.daysRequested = daysRequested;
    await leave.save();

    res.json({ message: "Leave request updated", leave });
  } catch (error) {
    next(error);
  }
};



// controllers/leaveController.js

// Employee deletes leave request (only if pending)
exports.deleteLeave = async (req, res, next) => {
  try {
    const { leaveId } = req.params;

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    if (leave.status !== "pending")
      return res.status(400).json({ error: "Cannot delete leave once approved/rejected" });

    await leave.deleteOne();

    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    next(error);
  }
};


// HR approves/rejects leave
exports.approveRejectLeave = async (req, res, next) => {
  try {
    const { leaveId, status } = req.body;
    const leave = await Leave.findById(leaveId);

    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    const employee = await Employee.findById(leave.employeeId);

    if (status === "approved") {
      if (employee.leaveBalance < leave.daysRequested)
        return res.status(400).json({ error: "Insufficient balance at approval" });

      employee.leaveBalance -= leave.daysRequested;
      await employee.save();
    }

    leave.status = status;
    await leave.save();

    res.json({
      message: `Leave ${status}`,
      updatedBalance: employee.leaveBalance,
    });
  } catch (error) {
    next(error);
  }
};
