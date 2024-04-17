const mongoose = require('mongoose')

const temporary_userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
        // unique: true
    },
    password: {
        type: String,
        require: true
    },
    isActive: {
type: Boolean,
require: true
    },
    isType: {
        type: Number,
        require: true
    },
    otp: {
        type: String,
        require: true
    }
},
{timestamps : true}
)

const temporary_user = mongoose.model('temporary_user', temporary_userSchema)
module.exports = temporary_user;
