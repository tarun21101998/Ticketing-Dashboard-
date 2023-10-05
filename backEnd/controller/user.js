const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// creating user

module.exports.getData = async (req, resp) => {
    const result = await collection.find({})
    // console.log(result)
    resp.status(200).send(result);
 }



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
                // console.log(responce)
                return resp.status(200).json({ responce, auth: token })
            })
        // }
        // return resp.send({ responce: 10 })
        console.log("error")
    }

    catch (err) {
        console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }

}


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
                    // resp.status(200).send("successfully");
                    // next()
                    return resp.status(200).json({auth: token })
                })
            } else {
                return resp.status(400).json({ result: 'no user found' });
            }
        } else {
            return resp.status(400).json({ result: false });
            //   console.log("tarun")
        }
    }
    catch (err) {
        console.log('Error in signing up:', err);
        return resp.status(500).redirect('back');
    }

}



module.exports.createRequests= async (req, resp) => {

    try {
        console.log(req.body)
        const email1 = Jwt.decode(req.body.email1)

            // let user = new collection1(req.body);
            console.log(email1.email)
            let result = await collection1.create({email: email1.email, name: req.body.name, number: req.body.number, from: req.body.fromDate, to: req.body.toDate});
            result = result.toObject();
            delete result.password  

            return resp.status(200).json("successful")
    }

    catch (err) {
        // console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }

}



module.exports.getRequests= async (req, resp) => {
    try {
        let  email2 = Jwt.decode(req.body.email1)
        email2 = email2.email
// console.log(req.body)
        let data = await collection.findOne({"email": email2})
        if(data.isType== false){
            let user1 = await collection1.find({email: data.email});
            console.log(user1)
            return resp.status(200).json(user1)
        }
        else{
            let admin = await collection1.find({})
            console.log(admin)
            return resp.status(200).json(admin)
        }
    }

    catch (err) {
        console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }

}

