import { Router } from "express";
const router=Router();
import {login,signup} from "../controller/usercontroller.js"
import {auth,isStudent,isAdmin} from "../middleware/auth.js"

router.post("/login",login);
router.post("/signup",signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Protected Route for Test"
    })
})


router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Protected Route for Students"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Protected Route for Admin"
    })
})


export default router;