const mongoose = require('mongoose');

const errandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    compensation: {
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    dateDue: {
        type: String,
        required: true
    },
    timeDue: {
        type: String,
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    errandStatus: {
        type: Boolean,
    },
    requestMsg :{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Errand', errandSchema);