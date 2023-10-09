const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// fetching the data of user
module.exports.getData = async (req, resp) => {
    const result = await collection.find({})
    // console.log(result)
    resp.status(200).send(result);
 }


// creating a user
module.exports.createData = async (req, resp) => {

    try {
        console.log(req.body)
        // if (req.body.firstName && req.body.lastName && req.body.email && req.body.password && req.body.isType) {
            let duplicate = await collection.findOne({ email: req.body.email });
            console.log(duplicate)
            if (duplicate) {
                return resp.status(409).json({responce: false });
            }
            let user = new collection(req.body);
            const passwordHash = await bcrypt.hash(user.password, 10);
            user.password = passwordHash

            console.log(user)
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
            const { email, password } = req.body
            let user = await collection.findOne({ email: req.body.email });
            if(!user){
                return resp.status(400).json({responce: false})
            }
            const passwordHash = await bcrypt.compare(password, user.password)
            console.log(user)   
            if (user && passwordHash) {
                Jwt.sign({firstName: user.firstName, lastName: user.lastName, email: user.email, isType: user.isType}, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        return resp.status(500).json({ error: false });
                    }
                    return resp.status(200).json({firstName: user.firstName, lastName: user.lastName, isActive: user.isActive, isType: user.isType, id: user._id, auth: token })
                })
            } else {
                return resp.status(400).json({ result: 'no user found' });
            }
        } else {
            return resp.status(400).json({ result: false });
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
        console.log(req.body)
        const email1 = Jwt.decode(req.body.email1)

            // let user = new collection1(req.body);
            console.log(email1.email)
            let result = await collection1.create({email: email1.email, name: req.body.name, number: req.body.number, from: req.body.fromDate, to: req.body.toDate, status: 0});
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
        console.log(req.body)
        let  email2 = Jwt.decode(req.body.email1)
        email2 = email2.email
// console.log(req.body)
        let data = await collection.findOne({"email": email2})
        if(data.isType== 1){
            let user1 = await collection1.find({email: data.email});
            // console.log(user1)
            return resp.status(200).json({type: data.isType, user1: user1})
        }
        else{
            let admin = await collection1.find({})
            // console.log(admin)
            return resp.status(200).json({data: data.isType, user1: admin})
        }
    }

    catch (err) {
        console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }

}

// activation or deactivation of user
module.exports.changeActive= async(req, resp)=>{
    try {
        let user = await collection.findOne({_id: req.body.value})
        console.log(user)
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
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 1}})
        return resp.status(200).json({responce: "successfully accepted"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}

// rejecting the request of user by admin
module.exports.rejectRequest= async(req, resp)=>{
    try {
        console.log(req.body)
        let result = await collection1.updateOne({_id:  req.body.value}, {$set: {status: 2}})
        return resp.status(200).json({responce: "successfully Rejected"})
    } catch (error) {
 return resp.status(500).send("error")       
    }
}

// fetching the data of user for profile
module.exports.profile = async (req,  resp)=>{
    const data = Jwt.decode(req.body.token)
    const user = await collection.findOne({email: data.email})
    console.log(user)
    return resp.status(200).json({firstName: user.firstName, lastName: user.lastName, email: user.email})
}


module.exports.editNameProfile1 = async (req, resp)=>{
    try {
        const user = Jwt.decode(req.body.token)

        console.log("tarun")
        console.log(user.email);
        await collection.updateOne({email: user.email}, {$set: {firstName: req.body.editFirstName}})
    } catch (error) {
        console.log("error is happening", error)
        
    }
}