const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
    
},
// {timestamps : true}
    // required: true
// }   
)

const loginUser= mongoose.model('LoginUser', loginSchema)
module.exports = loginUser;