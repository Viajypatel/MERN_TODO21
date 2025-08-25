// controllers/employeeController.js
const Employee=require("../models/employeeModel.js");
const bcrypt=require("bcrypt");
// HR adds a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name,email,password,department,joiningDate,leaveBalance} = req.body;

    // Prevent duplicate employees by email
    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ error: "Employee already exists with this email" });
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name,email,password:hashedPassword,department,joiningDate,leaveBalance});
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    return res.status(500).json({message:"server error"});
  }
};


exports.getAllEmployee=async(req,res)=>{

     try{
           
          const employee=await Employee.find().select("-password");
          if(!employee)
            return res.status(400).json({message:"employee is not available"});

           return res.status(200).json({message:"employee is fetch successfully",employee});

     }
     catch(error){
          console.log("something wrong to fetch the employee");
          return res.status(500).json({message:"server error"});
     }

}
// Fetch leave balance of employee
exports.getLeaveBalance = async (req,res) => {
     console.log("the data inside the params",req.params);
  try {
   
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.json({ employeeId:employee._id, leaveBalance: employee.leaveBalance });
  } catch (error) {
   return res.status(500).json({message:"server error"});
  }
};
