const express=require("express");
const dbConnect=require("./config/database");
const app=express();
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const PORT=process.env.PORT||5000;

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/",(req,res)=>{
    res.send("hi from serverj888888888");
})

dbConnect();
app.listen(PORT,()=>{
    console.log(`Server is running on Port${PORT}`);
})