const express = require('express')
const router = express.Router();
const listing = require('../controller/listing.js')
const login_and_signup = require('../controller/login_and_signup')
const user_request = require('../controller/user_request')
const profile = require('../controller/profile')
const user = require('../controller/middleware')


// sign_up_user
router.post('/users', login_and_signup.sign_up_user)

// otp match and sign_up user
router.post('/otp', login_and_signup.otp)
// log_in user
router.post('/login', login_and_signup.login_user)

// fetch user
router.get('/users', user.getMiddleWare,  listing.getData)

// Create ticket
router.post('/requests', user.middleWare,  user_request.create_requests)

// fetch individual user
router.get('/sendrequests', user.getMiddleWare,  user_request.get_requests)

// activate/deactivate user
router.put('/changeActive', user.middleWare,  listing.activate_deactivate)

// accept request
router.put('/acceptRequest', user.middleWare,  user_request.accept_request)

// reject request
router.put('/rejectRequest', user.middleWare,  user_request.reject_request)

// edit request
router.put('/editTicket', user.middleWare,  user_request.edit_request)

// delete ticket
router.delete('/deleteTicket', user.middleWare,  user_request.delete_ticket)

// Publish ticket
router.put('/publishTicket', user_request.publish_ticket)

// review ticket
router.put('/reviewAgainTicket', user_request.review_ticket)

// profile fetch data
router.get('/profile', user.getMiddleWare,  profile.profile)

// edit name
router.put('/editNameProfile', user.middleWare, profile.edit_name)

// edit email
router.put('/editEmailProfile', user.middleWare,   profile.edit_email)

// fetch old request
router.get('/getUserDetail', user_request.get_old_request)

module.exports = router;