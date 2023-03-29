import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const attendanceSchema= mongoose.Schema({
    attendance:[{
   name:{
    type:String,
   },

   rollNo:{
    type:String,
   },

   standard:{
    type:String,
   },

   section:{
    type:String,
   },

   date:{
    type:String,
   },

   attendance:{
    type:String,
   },

   total:{
    type:String,
   },
}]
    },
 )
 

const Attendance=mongoose.model("Attendance",attendanceSchema);
attendanceSchema.plugin(Attendance)
const user={
    attendance:[{
        name:"Harish",
        rollNo:"0001",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        name:"Shalini",
        rollNo:"0002",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        name:"Hem",
        rollNo:"0003",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
    },
    {
        name:"Devi",
        rollNo:"0004",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        name:"Hari",
        rollNo:"0005",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        name:"Megha",
        rollNo:"0006",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
    },
    {
        name:"Aswini",
        rollNo:"0007",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        name:"Gowri",
        rollNo:"0008",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
   
]}

// const app=express();
// app.use(express.json());

// get

router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Attendance.findById(req.params.id)

    .then(result=>{
        res.status(200).json({
            user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(505).json({
            error:err
        })
    })
})

// post

router.post('/', async(req,res)=>{
    try{
        const details={
            attendance:req.body.attendance 
        }
        console.log(details);
        const user=new Attendance(details);
        const userCreated=await user.save();
        if(userCreated){
            console.log("created");
            res.status(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});

// put

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Attendance.findOneAndUpdate({_id:req.params.id},{
        $set:{
            attendance:req.body.attendance,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_attendance:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Attendance.findByIdAndRemove({_id:req.params.id},{
        $set:{
            attendance:req.body.attendance,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_attendance:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
        
    })
})


export default router;
// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });