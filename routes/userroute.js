import { Router } from "express";
const router=Router();
import {login,signup} from "../controller/usercontroller.js"

router.post("/login",login);
router.post("/signup",signup);

export default router;