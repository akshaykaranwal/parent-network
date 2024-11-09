const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: true
    },
    schoolId: {
        type: String,
        required: true
    },
    childSchool: {
        type: String,
        required: true
    },
    childClass: {
        type: String,
        required: true
    },
    childSection: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    circles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle'
    }]
});

module.exports = mongoose.model('Child', childSchema);
