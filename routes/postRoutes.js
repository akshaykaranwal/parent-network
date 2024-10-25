const express=require('express');
const Post = require("../models/Post");

const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const {
            title,
            content,
            author,
            circle,
            replies,
            upvotes,
            downvotes,
            createdAt
        } = req.body;

        const newPost = new Post({
            title,
            content,
            author,
            circle,
            replies,
            upvotes,
            downvotes,
            createdAt
        });

        await newPost.save();
        res.status(201).json({message:"Post created successfully", post:newPost});
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router;