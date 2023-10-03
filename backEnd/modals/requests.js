const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    }
},
{timestamps : true}
)

const requests= mongoose.model('Requests', requestsSchema)
module.exports = requests;