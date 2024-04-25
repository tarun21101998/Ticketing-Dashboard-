const collection = require('../modals/data')
const collection1 = require('../modals/requests')
const temporary_user = require('../modals/temporary_user')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const nodemailer = require('nodemailer');

// sign-up a user
module.exports.sign_up_user = async (req, resp) => {
    try {
        // existing user
        let existing_temporary_user = await temporary_user.findOne({ email: req.body.email });
        let existing_user = await collection.findOne({ email: req.body.email });


        if (existing_user) {
            return resp.status(400).json({ response: "already_exists" })
        }
        if (existing_temporary_user) {
            const delete_temporary_data = await temporary_user.deleteOne({ email: req.body.email });
        }
        // generating OTP
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

        let user = new collection(req.body);

        // checking user data exists
        if (!user.firstName && !user.lastName && !user.email && !user.password && !user.isType) {
            return resp.status(400).json({ response: false })
        }

        let result = await temporary_user.create({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isActive: true, isType: user.isType, otp: otp });

        // send OTP through mail 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tarunsinghal8295437364@gmail.com', // Your email address
                pass: 'mtsl mnuo aqda ucmc' // Your password
            }
        });

        // Email content
        let mailOptions = {
            from: 'Tarun Singhal', // Sender address
            to: req.body.email, // List of recipients
            subject: 'OTP Verification', // Subject line
            text: `Hello ${req.body.firstName} ${req.body.lastName} \n Your OTP is ${otp} \n Do not share the OTP with anyone. ` // Plain text body
        };
        // Sending email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return resp.status(400).json({ response: false })
            }
            return resp.status(200).json({ response: true, email: req.body.email })
        });
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
            if (!user) {
                return resp.status(401).json({ responce: false })
            }
            // comparing the password using in hash algorithum
            const passwordHash = await bcrypt.compare(password, user.password)
            if (user && passwordHash) {
                // creating the jwt token and sending  as response inside the jwt token some  data is sharing 
                Jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, isType: user.isType }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        return resp.status(500).json({ error: false });
                    }
                    return resp.status(200).json({ firstName: user.firstName, lastName: user.lastName, isActive: user.isActive, isType: user.isType, id: user._id, auth: token })
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

// checking OTP and save user

module.exports.otp = async (req, resp) => {
    try {
        if (!req.body.otp || !req.body.param.id) {
            return resp.status(400).json({ response: false })
        }
        let temporary_user_data = await temporary_user.findOne({ email: req.body.param.id })
        console.log(temporary_user_data)
        if (req.body.otp != temporary_user_data.otp) {
            console.log(temporary_user_data.otp)
            console.log(req.body.otp)
            return resp.status(400).json({ response: 401 })
        }
        // convert the password in code using hash algorithum
        const passwordHash = await bcrypt.hash(temporary_user_data.password, 10);
        temporary_user_data.password = passwordHash

        // saving user
        let result = await collection.create({ firstName: temporary_user_data.firstName, lastName: temporary_user_data.lastName, email: temporary_user_data.email, password: temporary_user_data.password, isActive: true, isType: temporary_user_data.isType });
        console.log("success")
        const delete_temporary_data = await temporary_user.deleteOne({ email: temporary_user_data.email });
        return resp.status(200).json({ response: true })
    } catch (error) {
        console.error('Error inserting documents:', error);
        // Handle the error appropriately
    }
}

module.exports.resend_otp = async (req, resp) => {
    try {
        if (!req.body.param.id) {
            return resp.status(400).json({ response: false })
        }

        // generating OTP
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

        // update otp 
        await temporary_user.updateOne({ email: req.body.param.id }, { $set: { otp: otp } })
// fetch temporary_user
        let temporary_users = await temporary_user.findOne({ email: req.body.param.id })
        // send OTP through mail 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tarunsinghal8295437364@gmail.com', // Your email address
                pass: 'mtsl mnuo aqda ucmc' // Your password
            }
        });

        // Email content
        let mailOptions = {
            from: 'Tarun Singhal', // Sender address
            to: req.body.param.id, // List of recipients
            subject: 'OTP Verification', // Subject line
            text: `Hello ${temporary_users.firstName} ${temporary_users.lastName} \n Your OTP is ${otp} \n Do not share the OTP with anyone. ` // Plain text body
        };

        // Sending email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return resp.status(400).json({ response: false })
            }
            return resp.status(200).json({ response: true, email: req.body.email })
        });

    } catch (error) {
        console.log("error is showing")
    }
}