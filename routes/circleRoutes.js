const express=require('express');
const Circle=require('../models/Circle');

const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const {
            name,
            type,
            members,
            createdAt
        }=req.body;

        const newCircle=new Circle({name,type,members,createdAt});
        await newCircle.save();
        res.status(201).json({message:"Circle created successfully",circle:newCircle});
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router;