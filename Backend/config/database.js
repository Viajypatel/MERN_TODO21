const mongoose =require("mongoose")
require("dotenv").config();


const dbConnect=async()=>{

            try{

                await mongoose.connect(process.env.MONGO_URL);
                console.log("Mongodb Connected successfully");

            }
            catch(error){

                console.error("error to mongodb connection",error.message);
                process.exit(1);

            }

}

module.exports=dbConnect;