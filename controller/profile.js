const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');

// fetchuser
module.exports.profile = async (req,  resp)=>{
    try {
        const data = resp.temp;
        const user = await collection.findOne({_id: data._id})
        return resp.status(200).json({firstName: user.firstName, lastName: user.lastName, email: user.email})
    } catch (error) {
return resp.status(500).json({responce: 500})
    }
}

// edit name
module.exports.edit_name = async (req, resp)=>{
    try {
const user = resp.temp
        await collection.updateOne({_id: user._id}, {$set: {firstName: req.body.editFirstName, lastName: req.body.editLastName}})
let find1 = await collection.findOne({email: user.email})
return resp.status(200).json({firstName: find1.firstName, lastName: find1.lastName})
    } catch (error) {
    }
}

// edit email
module.exports.edit_email= async (req, resp)=>{
    const dCode = resp.temp
    let data = await collection.findOne({email: req.body.editNewEmail})
    if(data){
        return resp.status(409).json({responce: false})
    }
    else{
let data1 = await collection.updateOne({_id: dCode._id}, {$set: {email: req.body.editNewEmail}})
let data3 = await collection1.updateMany({email: dCode.email}, {$set: {email: req.body.editNewEmail}})
return resp.status(200).json({responce: true, email: req.body.editNewEmail})
    }
}
