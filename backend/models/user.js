const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name cannot be blank']
    },
    lastName: {
        type: String,
        required: [true, 'Last name cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'E-Mail cannot be blank'],
        unique: true
    },
    hashedPassword: {
        tpye: String,
        required: [true, 'Password cannot be blank']
    },
    avatarUrl: String
})

module.exports = mongoose.model('User', userSchema);