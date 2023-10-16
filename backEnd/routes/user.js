
const express = require('express')
const router = express.Router();
const user = require('../controller/user')




// Data saving to Data Base
router.post('/users', user.createData)
// login API is handling
router.post('/login', user.loginData)

// Data is fetching from DataBase
router.post('/user', user.middleWare,  user.getData)
// Creating the ticket and saving  data to dataBase
router.post('/requests', user.middleWare,  user.createRequests)

// getting data from and compare from dataBase and sending the result  frontEnd
router.post('/sendrequests', user.middleWare,  user.getRequests)

// activation and deactivation of user
router.post('/changeActive', user.changeActive)
// Request is accepting
router.post('/acceptRequest', user.acceptRequest)

// rejecting the request
router.post('/rejectRequest', user.rejectRequest)
// profile fetch data
router.post('/profile', user.middleWare,  user.profile)

// edit the first and last name
router.post('/editNameProfile', user.middleWare, user.editNameProfile1)

router.post('/editEmailProfile', user.middleWare,   user.editEmailProfile)
router.post('/editTicket', user.editRequest)
router.post('/deleteTicket', user.deleteTicket)

module.exports = router;