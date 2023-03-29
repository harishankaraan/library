import express from "express";
import connectDB from "./db.js";
import assignment from "./assignment.js";
import attendance from "./attendance.js"
import timetable from "./timetable.js";
import homework from "./homework.js";
import reportcard from "./reportcard.js";
import leaverequest from "./leaverequest.js";
import event from "./event.js";
import profile from "./profile.js"; 
import leaveletters from "./leaveletters.js";
import library from "./library.js";


connectDB();
const app=express();
app.use(express.json());
app.use("/assignment",assignment);
app.use("/attendance",attendance);
app.use("/timetable",timetable);
app.use("/homework",homework);
app.use("/reportcard",reportcard);
app.use("/leaverequest",leaverequest);
app.use("/leaveletters",leaveletters);
app.use("/event",event);
app.use("/profile",profile);
app.use("/library",library);

const port=9532;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
 
});