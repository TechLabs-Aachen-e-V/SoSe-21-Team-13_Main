const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    avatarUrl: String
})


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);