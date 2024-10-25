const express = require('express');
const Reply = require("../models/Reply");
const Post = require("../models/Post");

const router = express.Router();

router.post('/:postId/:replyId', async (req, res) => {
    try {
        const { content, author } = req.body;
        const postId = req.params.postId;
        const replyId = req.params.replyId;

        const parentReply = await Reply.findById(replyId);
        if (!parentReply) {
            return res.status(404).json({ message: "Reply not found" });
        }

        const threadReply = new Reply({
            content,
            author,
            post: postId,
            thread: []
        });

        await threadReply.save();

        parentReply.thread.push(threadReply._id);
        await parentReply.save();

        res.status(201).json({
            message: "Threaded reply created successfully",
            reply: threadReply
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;