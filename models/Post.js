const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    //title, content, author, circle, replies, upvotes, downvotes, createdAt
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    circle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
