import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
mongoose.set("strictQuery", false);
// connectDB();
const router=express.Router();
const AddressSchema = mongoose.Schema({
    houseNumber: {
        type:String,
    },
    street: {
        type:String,

    },
    city: {
        type:String,

    },
    State:{
        type:String,
    },
    Pincode:{
        type:String
    }
  });
const profileSchema=mongoose.Schema({
    profile:[{
    Name:{
        type:String,
        // required:true
    },
    faculty:{
        type:String,
        // required:true
    },
    department:{
        type:String,
        // required:true
    },
    BloodGroup:{
        type:String,
        // required:true
    },
    dob:{
        type:String,
        // required:true
    },
    FatherName:{
        type:String,
        // required:true
    },
    Email:{
        type:String,
        // required:true
    },
    Email:{
        type:String,
        // required:true
    },
    Address:{
        type:AddressSchema,
        // required:true
    }
}]

})
var Profile = mongoose.model('Profile',profileSchema);
profileSchema.plugin(Profile);
const profile={
    profile:[{
    Name     :"Harish",
    faculty   :"Science and Social",
    department:"CSE",
    BloodGroup    :"O'+ve",
    dob  :"23/04/1998",
    FatherName:"Kasi",
    Email     :"abc@gmail.com",
    Address   :{
        houseNumber:"G-36",
        street: "1st cross",
        city:"Chennai",
        State:"TamilNadu",
        Pincode:"600009"
     }

},
]}

const app=express();
app.use(express.json());

// get

router.get('/',(req,res)=>{
    try{
        res.status(200).send(profile);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Profile.findById(req.params.id)

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

//post

router.post('/',async(req,res)=>{
    try{
      const details={
        profile:req.body.profile
      }
      console.log(details);
      const menu=new Profile(profile);
      const profileCreated=await menu.save();
      if(profileCreated){
        console.log("Created");
        res.status(201).json({message:"Profile available"});
    }else
    {
        res.status(401);
        throw new Error("not available");
    }
  } catch (err){
          return res.status(500).json({message: err.message});
        }});

 //put

router.put('/:id',(req,res)=>{
  console.log(req.params.id);
  Profile.findOneAndUpdate({_id:req.params.id},{
      $set:{
        profile:req.body.profile
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_profileDetails:result       
       })
  })
  .catch(err=>{
      console.log(err)
      res.status(500).json({
          error:err
      })
  })
  })      
       
  //delete

  router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Profile.findByIdAndRemove({_id:req.params.id},{
        $set:{
            profile:req.body.profile
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_profileDetails:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    
    router.delete("/api/profile",(req,res)=>{
    
      Profile.deleteMany({profile},(err,result)=>{
      if(err) throw err
      res.send(profile)
      })
  })  


// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(profile);
// });
export default router;