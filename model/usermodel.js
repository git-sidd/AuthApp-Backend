import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    },
    token:{
        type:String
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema);