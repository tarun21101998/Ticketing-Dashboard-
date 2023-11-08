
const express = require('express')
const router = express.Router();
const user = require('../controller/user')




// Data saving to Data Base
router.post('/users', user.createData)
// login API is handling
router.post('/login', user.loginData)

// Data is fetching from DataBase
router.get('/users', user.getMiddleWare,  user.getData)
// Creating the ticket and saving  data to dataBase
router.post('/requests', user.middleWare,  user.createRequests)

// getting data from and compare from dataBase and sending the result  frontEnd
router.get('/sendrequests', user.getMiddleWare,  user.getRequests)

// activation and deactivation of user
router.put('/changeActive', user.middleWare,  user.changeActive)
// Request is accepting
router.put('/acceptRequest', user.middleWare,  user.acceptRequest)

// rejecting the request
router.put('/rejectRequest', user.middleWare,  user.rejectRequest)
// profile fetch data
router.get('/profile', user.getMiddleWare,  user.profile)

// edit the first and last name
router.put('/editNameProfile', user.middleWare, user.editNameProfile1)

router.put('/editEmailProfile', user.middleWare,   user.editEmailProfile)
router.put('/editTicket', user.middleWare,  user.editRequest)
router.delete('/deleteTicket', user.middleWare,  user.deleteTicket)
// Publish ticket
router.put('/publishTicket', user.publishTicket)

// reReview the ticket
router.put('/reviewAgainTicket', user.reviewAgainTicket)

// Get data for update
router.get('/getUserDetail', user.getUserDetail)
module.exports = router;