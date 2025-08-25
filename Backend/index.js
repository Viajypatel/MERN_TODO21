const express=require("express");
const dbConnect=require("./config/database");
const app=express();
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const employeeRoutes=require("./routes/employeeRoutes.js");
const leaveRoutes=require("./routes/leaveRoutes.js");
const PORT=process.env.PORT||8000;

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/employees", employeeRoutes); // HR side
app.use("/api/leaves", leaveRoutes);
app.get("/",(req,res)=>{
    res.send("hi from serverj888688");
})

dbConnect();
app.listen(PORT,()=>{
    console.log(`Server is running on Port  ${PORT}`);
})