const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// fetching the data of user
module.exports.getData = async (req, resp) => {
    try {
        // console.log(req.query.params.param.id)
        const dCode = resp.temp
        if(dCode.isType == 2 || dCode.isType == 0){
        const result = await collection.find({})
        return resp.status(200).send(result)
        }
        return resp.status(404).json({responce: false})
    
    } catch (error) {
return resp.status(500).send("error")
    }
 }


// creating a user
module.exports.createData = async (req, resp) => {
    try {
        // checking duplicate email id
            let duplicate = await collection.findOne({ email: req.body.email });
            if (duplicate) {
                return resp.status(409).json({responce: false });
            }
            let user = new collection(req.body);
            // convert the password in code using hash algorithum
            const passwordHash = await bcrypt.hash(user.password, 10);
            user.password = passwordHash

            let result = await collection.create({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isActive: true, isType: user.isType});
            result = result.toObject();
            delete result.password
            Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    let responce = false;
                    return resp.status(409).json({ responce })
                }
                let responce = true
                return resp.status(200).json({ responce, auth: token })
            })
    }

    catch (err) {
        return resp.redirect('back',);
    }

}

// login the user
module.exports.loginData = async (req, resp, next) => {

    try {
        if (req.body.password && req.body.email) {
            // deStructuring the data in request
            const { email, password } = req.body
            // finding the user inside dataBase
            let user = await collection.findOne({ email: req.body.email });
            if(!user){
                return resp.status(401).json({responce: false})
            }
            // comparing the password using in hash algorithum
            const passwordHash = await bcrypt.compare(password, user.password)
            if (user && passwordHash) {
                // creating the jwt token and sending  as response inside the jwt token some  data is sharing 
                Jwt.sign({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, isType: user.isType}, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        return resp.status(500).json({ error: false });
                    }
                    return resp.status(200).json({firstName: user.firstName, lastName: user.lastName, isActive: user.isActive, isType: user.isType, id: user._id, auth: token })
                })
            } else {
                return resp.status(401).json({ result: 'no user found' });
            }
        } else {
            return resp.status(401).json({ result: false });
        }
    }
    catch (err) {
        console.log('Error in signing up:', err);
        return resp.status(500).redirect('back');
    }

}


// creating the ticket and saving the request into dataBase
module.exports.createRequests= async (req, resp) => {

    try {
        // decode the jwt token and getting the data
        const email1 = resp.temp
        console.log("create", email1)

            let result = await collection1.create({email: email1.email, name: req.body.name, number: req.body.number, contactNumber: req.body.contactNumber, slot: req.body.slot, from: req.body.fromDate, to: req.body.toDate, status: 0, semiStatus: 0, semiComment: "no comment",  Comment: "No Comment"});
            result = result.toObject();
            delete result.password  

            return resp.status(200).json("successful")
    }

    catch (err) {
        // console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }

}


// fetching the request from dataBase according the type of user
module.exports.getRequests= async (req, resp) => {
    try {
        // console.log(req.body)
        // decoding the jwt token
        let  email2 = resp.temp
        email2 = email2.email
        // console.log("hii", email2)
        let data = await collection.findOne({"email": email2})
        console.log(data.firstName)
        // comparing the normal user
        if(data.isType== 1){
            let user1 = await collection1.find({email: data.email});
            // let user2 = await collection.find({email: data.email});
// console.log(user2)N
            // console.log(user1)
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

// activation or deactivation of user
module.exports.changeActive= async(req, resp)=>{
    try {
        let user = await collection.findOne({_id: req.body.value})
        if(user.isActive== false){
        await collection.updateOne({_id: req.body.value}, {$set: {isActive: true}})
        return resp.json({result1: "activate"})
        }
        else{
            await collection.updateOne({_id: req.body.value}, {$set: {isActive: false}})
            return resp.json({result1: "deactivate"})
    

        }
    } catch (error) {
        return resp.send("error is hapening")
    }
}



// accepting the request of user by admin
module.exports.acceptRequest= async(req, resp)=>{
    try {
        console.log(req.body)
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 3,  semiStatus: 1, semiComment: "Request Accepted", Comment: "Your ticket is reviewing"}})
        return resp.status(200).json({responce: "successfully accepted"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}

// rejecting the request of user by admin
module.exports.rejectRequest= async(req, resp)=>{
    try {
        console.log(req.body)
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 3,  semiStatus: 2, semiComment: req.body.comment, Comment: "Waiting for review"}})
        return resp.status(200).json({responce: "successfully Rejected"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}

// fetching the data of user for profile
module.exports.profile = async (req,  resp)=>{
    try {
        // console.log(req.body)
        const data = resp.temp;
        const user = await collection.findOne({_id: data._id})
        return resp.status(200).json({firstName: user.firstName, lastName: user.lastName, email: user.email})
    
    } catch (error) {
return resp.status(500).json({responce: 500})
    }
}


module.exports.editNameProfile1 = async (req, resp)=>{
    try {
        console.log("update")
        // const user = Jwt.decode(req.body.token)
const user = resp.temp
        await collection.updateOne({_id: user._id}, {$set: {firstName: req.body.editFirstName, lastName: req.body.editLastName}})
let find1 = await collection.findOne({email: user.email})
// console.log(find1)
return resp.status(200).json({firstName: find1.firstName, lastName: find1.lastName})

    } catch (error) {

        
    }
}

module.exports.editEmailProfile = async (req, resp)=>{
    const dCode = resp.temp
    console.log(dCode)
    let data = await collection.findOne({email: req.body.editNewEmail})
    // console.log(data)
    if(data){
        return resp.status(409).json({responce: false})
    }
    else{
let data1 = await collection.updateOne({_id: dCode._id}, {$set: {email: req.body.editNewEmail}})
let data3 = await collection1.updateMany({email: dCode.email}, {$set: {email: req.body.editNewEmail}})
// console.log(data1)
return resp.status(200).json({responce: true, email: req.body.editNewEmail})
    }
}
module.exports.editRequest= async (req, resp)=>{
    try {
        console.log(req.body)
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

// Deleting the ticket
module.exports.deleteTicket = async (req, resp)=>{
    try {
        // console.log({_id: req.body.value})
        let user =await collection1.deleteOne({_id: req.body.value});
        // console.log(user)
        return resp.send("deleted")
    } catch (error) {
        
    }
}

// publishing the  ticket
module.exports.publishTicket = async (req, resp)=>{
    try {
        console.log(req.body.value)
        const user = await collection1.findOne({_id: req.body.value})
        console.log(user)
        await collection1.updateOne({_id: req.body.value}, {$set: {status : user.semiStatus, Comment: user.semiComment}})

        // let user =await collection1.deleteOne({_id: req.body.value});
        // console.log(user)
        return resp.status(200).send("Published")
    } catch (error) {
        
    }
}


// Review the ticket again
module.exports.reviewAgainTicket= async (req, resp)=>{
    try {
        console.log("reviewing")
        const user = await collection1.findOne({_id: req.body.value})
        console.log(user)
        await collection1.updateOne({_id: user._id}, {$set: {status: 3,  semiStatus: 3, Comment: "Your ticket is reviewing"}})

        // let user =await collection1.deleteOne({_id: req.body.value});
        // console.log(user)
        return resp.status(200).send("Published")
    } catch (error) {
        
    }
}

// get data for update
module.exports.getUserDetail = async(req, resp)=>{
    try {
        console.log(req.query.params)
        const user = await collection1.findOne({_id: req.query.params})
        // console.log(user);
        return resp.status(200).send(user)
    } catch (error) {
        
    }
}

// Middleware of all the  functions
module.exports.middleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.body.token)
    console.log("middleware is calling")
    resp.temp = dCode;
    return next()
}

// Middleware for get requests
module.exports.getMiddleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.query.token)
    console.log("hello")
    resp.temp = dCode;
    return next()
}