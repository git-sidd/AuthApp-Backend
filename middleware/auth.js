//auth isStudent isAdmin
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})

export const auth=(req,res,next)=>{
    try {
        const token=req.body.token;
        if(!token){
            res.status(401).json({
                success:false,
                message:"Token not found!!"
            })
        }
        try {//verify token
            const payload=jwt.verify(token,process.env.JWT_SECRET)
            console.log(payload);
            //here payload is stored and this payload contains role which is required next middleware!!
            req.user=payload;
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"invalid token!"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying token"
        })
    }
}
export const isStudent=(req,res,next)=>{
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for students!"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role not matching..",
            error:error
        })
    }
}
export const isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"This is Protected Route For Admin"
            })
        }next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"user role not matching"
        })
    }
}