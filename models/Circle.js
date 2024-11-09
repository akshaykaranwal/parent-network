const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    subCircles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Circle'
    }],
    parentCircle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Circle'
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Circle',circleSchema);