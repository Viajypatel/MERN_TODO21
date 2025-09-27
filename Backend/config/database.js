const mongoose =require("mongoose")
require("dotenv").config();


const dbConnect=async()=>{

            try{

                await mongoose.connect(process.env.MONGO_URL);
                console.log("Mongodb Connected Successfully");

            }
            catch(error){

                console.error("error to Mongodb connection",error.message);
                process.exit(1);

            }

}

module.exports=dbConnect;