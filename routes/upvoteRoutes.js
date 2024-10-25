const express = require('express')
const Post = require('../models/Post')

const router=express.Router();

router.post('/:postId/upvote',async(req,res)=>{
    try{
        const postId=req.params.postId;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        post.upvotes+=1;
        await post.save();
        res.status(200).json({message:"Post upvoted successfully",post:post})
    }
    catch{
        res.status(500).json({message:"Server error",error:error.message})
    }
})
module.exports = router;