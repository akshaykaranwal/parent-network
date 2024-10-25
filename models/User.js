const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    childName:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    parentPhoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    schoolId:{
        type:String,
        required:true
    },
    childSchool:{
        type:String,
        required:true
    },
    childClass:{
        type:String,
        required:true
    },
    childSection:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    circles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Circle'
    }]
})

module.exports = mongoose.model('User',userSchema);