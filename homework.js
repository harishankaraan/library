import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const homeWorkSchema= mongoose.Schema({
    homeWork:[{

    standard:{
        type:String,
        // required:true,
    },
    subject:{
        type:String,
        // required:true,
    },
    homeworkDate:{
        type:String,
    },
    submissionDate:{
        type:String,
    },
}]
})

const HomeWork=mongoose.model("HomeWork",homeWorkSchema);
homeWorkSchema.plugin(HomeWork)
const user={
    homeWork:[
    {
        standard:"10th",
        subject:"English",
        homeworkDate:"02/03/2023",
        submissionDate:"07/03/2023",
    },
    {
        standard:"10th",
        subject:"Computer",
        homeworkDate:"02/03/2023",
        submissionDate:"07/03/2023",
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
    HomeWork.findById(req.params.id)

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
            // standard:req.body.standard,
            // subject:req.body.subject,
            homeWork:req.body.homeWork,
            // submissionDate:req.body.submissionDate,
        }
        console.log(details);
        const user=new HomeWork(details);
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
    HomeWork.findOneAndUpdate({_id:req.params.id},{
        $set:{
            // standard:req.body.standard,
            // subject:req.body.subject,
            homeWork:req.body.homeWork,
            // submissionDate:req.body.submissionDate,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_homeWork:result
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
    HomeWork.findByIdAndRemove({_id:req.params.id},{
        $set:{
            // standard:req.body.standard,
            // subject:req.body.subject,
            homeWork:req.body.homeWork,
            // submissionDate:req.body.submissionDate,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_homeWork:result
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