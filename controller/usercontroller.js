
import bcrypt from "bcrypt";
import { User } from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})


export const signup=async(req,res)=>{
    try {
        const {username,password,email,role}=req.body;

        const existedUser=await User.findOne({email});
        if(existedUser){
            return res.status(400).json(
            { 
                success:false,
                message:'User already Exists!!',
            }
            )
        }
        //bcrypt hash function requires 2 arguement 1:what is to hash {password} and 2:how many rounds of hashing is required..
        let hashPassword;
        try {
             hashPassword=await bcrypt.hash(password,10);
        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    success:false,
                    message:"error while storing password"
                }
            )
        }
        const user=await User.create({
            username,password:hashPassword,email,role
        })
        return res.status(200).json({
            success:true,
            message:'User Registered Successfully!!'
        }
        )
        
    } catch (error) {
        
        return res.status(500).json({
            success:true,
            message:'Unable to Register User,Please try Later!!',
            error:error,
        }
        )
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Every Field is required!!",
            })
        }
        const user=await User.findOne({email})
        if(!user){
          return res.status(401).json({
            success:false,
            message:"user not registered!!",
          })
        }
        const payload={
            id:user._id,
            email:user.email,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                }
             )
             user.token=token;
             user.password=undefined;
             const option={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
             }

            res.cookie("AuthCookie",token,option).status(201).json({
                success:true,
                token,
                user,
                message:"User Logged in Successfully!!"
            });
             
        }
    } catch (error) {
        console.error(error)
        return res.status(403).json({
            success:false,
            message:"User Can't Logged in,Please try later!!"

        })
    }
}