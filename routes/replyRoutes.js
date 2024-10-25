const express = require('express');
const Reply = require("../models/Reply");
const Post = require("../models/Post");

const router = express.Router();

router.post('/:postId/replies', async (req, res) => {
    try {
        const { content, author } = req.body;
        const postId = req.params.postId;

        const reply = new Reply({
            content,
            author,
            post: postId
        });

        await reply.save();

        await Post.findByIdAndUpdate(postId, { $push: { replies: reply._id } });

        res.status(201).json({
            message: "Reply created successfully",
            reply: reply
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post('/:postId/replies/:replyId', async (req, res) => {
    try {
        const { content, author } = req.body;
        const postId = req.params.postId;
        const parentReplyId = req.params.replyId;

        const nestedReply = new Reply({
            content,
            author,
            post: postId
        });

        await nestedReply.save();

        await Reply.findByIdAndUpdate(parentReplyId, { $push: { thread: nestedReply._id } });

        res.status(201).json({
            message: "Nested reply created successfully",
            reply: nestedReply
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
