const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';

// creating the ticket and saving the request into dataBase
module.exports.create_requests= async (req, resp) => {
    try {
        // decode the jwt token and getting the data
        const email1 = resp.temp
            let result = await collection1.create({email: email1.email, name: req.body.name, number: req.body.number, contactNumber: req.body.contactNumber, slot: req.body.slot, from: req.body.fromDate, to: req.body.toDate, status: 0, semiStatus: 0, semiComment: "no comment",  Comment: "No Comment"});
            result = result.toObject();
            delete result.password  
            return resp.status(200).json("successful")
    }
    catch (err) {
        return resp.redirect('back',);
    }
}


// fetching the request from dataBase according the type of user
module.exports.get_requests= async (req, resp) => {
    try {
        // decoding the jwt token
        let  email2 = resp.temp
        email2 = email2.email
        let data = await collection.findOne({"email": email2})
        // comparing the normal user
        if(data.isType== 1){
            let user1 = await collection1.find({email: data.email});
            return resp.status(200).json({lastName: data.lastName,  type: data.isType, user1: user1, firstName: data.firstName})
        }
        else{
            // comparing the  type of user 0 and 2 is for admin and reviewer 
            let admin = await collection1.find({})
            return resp.status(200).json({lastName: data.lastName,  data: data.isType, user1: admin, firstName: data.firstName})
        }
    }
    catch (err) {
        return resp.redirect('back',);
    }
}


// accept request
module.exports.accept_request= async(req, resp)=>{
    try {
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 3,  semiStatus: 1, semiComment: "Request Accepted", Comment: "Your ticket is reviewing"}})
        return resp.status(200).json({responce: "successfully accepted"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}

// reject request
module.exports.reject_request= async(req, resp)=>{
    try {
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 3,  semiStatus: 2, semiComment: req.body.comment, Comment: "Waiting for review"}})
        return resp.status(200).json({responce: "successfully Rejected"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}


// edit request
module.exports.edit_request= async (req, resp)=>{
    try {
        console.log(req.body.param.id)
        let user = await collection1.findOne({_id: req.body.param.id})
        console.log(user)
if(user.status ==0){
        await collection1.updateOne({_id: req.body.param.id}, {$set: {name: req.body.name, number: req.body.number, contactNumber: req.body.contactNumber, from: req.body.fromDate, to: req.body.toDate}})
        resp.status(200).send("successfully updated")
        }
        else{
            return resp.status(500).send("not updated")
        }
    } catch (error) {
        resp.send("error is showing")
    }
}

// Delet ticket
module.exports.delete_ticket = async (req, resp)=>{
    try {
        let user =await collection1.deleteOne({_id: req.body.value});
        // console.log(user)
        return resp.send("deleted")
    } catch (error) {
    }
}

// publish ticket
module.exports.publish_ticket = async (req, resp)=>{
    try {
        const user = await collection1.findOne({_id: req.body.value})
        await collection1.updateOne({_id: req.body.value}, {$set: {status : user.semiStatus, Comment: user.semiComment}})
        return resp.status(200).send("Published")
    } catch (error) {
    }
}


// Review ticket
module.exports.review_ticket= async (req, resp)=>{
    try {
        const user = await collection1.findOne({_id: req.body.value})
        await collection1.updateOne({_id: user._id}, {$set: {status: 3,  semiStatus: 3, Comment: "Your ticket is reviewing"}})
        return resp.status(200).send("Published")
    } catch (error) {
    }
}

// fetch  request for update
module.exports.get_old_request = async(req, resp)=>{
    try {
        const user = await collection1.findOne({_id: req.query.params})
        return resp.status(200).send(user)
    } catch (error) {
    }
}
