const Assignment = require("../models/Assignment");

// Create assignment
const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all assignments
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//dlete assignment byID

const deleteAssignment=async(req,res)=>{

    try{

       const {id}=req.params;
       console.log(req.params);
          const assigment=await Assignment.findByIdAndDelete(id);
          if (!assigment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
       
    }
    catch(error){
          res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { createAssignment, getAssignments,deleteAssignment };
