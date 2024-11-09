const express=require('express');
const Circle=require('../models/Circle');

const router=express.Router();

router.get('/public', async (req, res) => {
    try {
        const publicCircles = await Circle.find({ isPublic: true });
        res.status(200).json(publicCircles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching public circles' });
    }
});

router.post('/',async(req,res)=>{
    try{
        const {
            name,
            type,
            members,
            parentCircleId,
            createdAt
        }=req.body;

        const newCircle=new Circle({name,type,members,subCircles:[],parentCircle:parentCircleId,createdAt});
        await newCircle.save();
        // if(parentCircleId){
        //     await Circle.findByIdAndUpdate(parentCircleId,{$addToSet:{subCircles:newCircle._id}});
        // }
        // else{
        //     await Circle.findByIdAndUpdate(newCircle._id,{$addToSet:{members:members || []}});
        // }
        //await Circle.findByIdAndUpdate(newCircle._id,{$addToSet:{members:members || []}});
        res.status(201).json({message:"Circle created successfully",circle:newCircle});
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router;