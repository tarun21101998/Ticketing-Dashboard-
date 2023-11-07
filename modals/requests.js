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
    },
    contactNumber: {
        type: Number,
        require: true
    },
    slot: {
        type: String,
        require: true
    },
    from: {
        type: Date,
        require: true
    },
    to: {
        type: Date,
        require: true
    },
    status: {
        type: Number
    },
    semiStatus: {
        type: Number
    },
    semiComment: {
        type: String
    },
    Comment: {
        type: String
    }
},
{timestamps : true}
)

const Tickets= mongoose.model('Tickets', requestsSchema)
module.exports = Tickets;