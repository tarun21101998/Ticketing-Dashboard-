const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    }
    
},
{timestamps : true}
    // required: true
// }   
)

const user = mongoose.model('User', userSchema)
module.exports = user;