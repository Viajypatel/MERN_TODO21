// controllers/employeeController.js
const Employee=require("../models/employeeModel.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
// HR adds a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name,email,password,department,joiningDate,leaveBalance} = req.body;

    // Prevent duplicate employees by email
    const exists = await Employee.findOne({ email });
    if (exists)
       return res.status(400).json({ error: "Employee already exists with this email" });
   
    // const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name,email,password,department,joiningDate,leaveBalance});
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    return res.status(500).json({message:"server error"});
  }
};


exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(400).json({ error: "Employee does not exist with this email" });

     console.log("employeeisisiiDDD",employee);
    console.log("Input password:", password);
    console.log("Stored password:", employee.password);

    if (password.trim() !== employee.password.trim()) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
   console.log("Signing secret:", process.env.JWT_SECRET);
    const token = jwt.sign(
  { id: employee._id, email: employee.email }, // payload
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
console.log("Generated token:", token);
    return res.status(200).json({
  message: "Employee logged in successfully",
  token,
  userId: employee._id
});

  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllEmployee=async(req,res)=>{

     try{
           
          const employees=await Employee.find().select("-password").sort({createdAt:-1});
          if(!employees)
            return res.status(400).json({message:"employee is not available"});

           return res.status(200).json({message:"employee is fetch successfully",employees});

     }
     catch(error){
          console.log("something wrong to fetch the employee");
          return res.status(500).json({message:"server error"});
     }

}


exports.getEmployeeById=async(req,res)=>{

     try{
           const id=req.params.id;
           console.log(req.params);
          const employees=await Employee.findById(id);
          if(!employees)
            return res.status(400).json({message:"employee is not available"});

           return res.status(200).json({message:"employee is fetch successfully",employees});

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
