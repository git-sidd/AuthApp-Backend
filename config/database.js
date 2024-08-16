import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
export const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongDB Connection Successful!!")
    })
    .catch((error)=>{
        console.log("MongoDB Connection Failed!!")
        console.error(error);
        process.exit(1);
        
    })
  
}