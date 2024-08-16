import express from "express";
import { connectDB } from "./config/database.js";
import router from "./routes/userroute.js";

const app= express();
app.use(express.json())

const port=process.env.Port||3000

connectDB();

app.use("/api/v1",router);
app.listen(port,()=>{
    console.log(`server Started at port:${port}`)
})