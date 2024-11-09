const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    fatherName: {
        type: String,
        required: true
    },
    parentPhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    isPublic:{
        type:Boolean,
        default:false
    },
    circles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle'
    }]
});

module.exports = mongoose.model('Parent', parentSchema);
