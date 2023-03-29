import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const reportCardSchema= mongoose.Schema({
    reportCard:[{
    studentName:{
        type:String,
        required:true,
    },
    enrollNo:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
    },
    totalMarks:{
        type:String,
    },
    passingMarks:{
        type:String,
    },
    obtainedMarks:{
        type:String,
    },
}]
})

const ReportCard=mongoose.model("ReportCard",reportCardSchema);
reportCardSchema.plugin(ReportCard)
const user={
    reportCard:[
    {
        studentName:"Hari",
        enrollNo:"0001",
        subject:"English",
        totalMarks:"100",
        passingMarks:"35",
        obtainedMarks:"82",
    },
    {
        studentName:"Aswini",
        enrollNo:"0002",
        subject:"English",
        totalMarks:"100",
        passingMarks:"35",
        obtainedMarks:"98",
    },
]
}

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
    ReportCard.findById(req.params.id)

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
            reportCard:req.body.reportCard,
        }
        console.log(details);
        const user=new ReportCard(details);
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
    ReportCard.findOneAndUpdate({_id:req.params.id},{
        $set:{
            reportCard:req.body.reportCard,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_reportCard:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    ReportCard.findByIdAndRemove({_id:req.params.id},{
        $set:{
            reportCard:req.body.reportCard,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_reportCard:result
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