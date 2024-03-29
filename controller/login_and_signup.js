const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// sign-up a user
module.exports.sign_up_user = async (req, resp) => {
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
module.exports.login_user = async (req, resp, next) => {
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
        return resp.status(500).redirect('back');
    }
}
