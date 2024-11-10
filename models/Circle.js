const mongoose = require('mongoose');

// this is circleSchema which is used to create circle collection in database
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
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Circle',circleSchema);