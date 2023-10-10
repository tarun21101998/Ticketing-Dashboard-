
const express = require('express')
const router = express.Router();
const user = require('../controller/user')

// Data saving to Data Base
router.post('/users', user.createData)
// login API is handling
router.post('/login', user.loginData)

// Data is fetching from DataBase
router.post('/user', user.getData)
// Creating the ticket and saving  data to dataBase
router.post('/requests', user.createRequests)

// getting data from and campare from dataBase and sending the result  frontEnd
router.post('/sendrequests', user.getRequests)

// activation and deactivation of user
router.post('/changeActive', user.changeActive)
// Request is accepting
router.post('/acceptRequest', user.acceptRequest)

// rejecting the request
router.post('/rejectRequest', user.rejectRequest)
// profile fetch data
router.post('/profile', user.profile)

// edit the first and last name
router.post('/editNameProfile', user.editNameProfile1)

router.post('/editEmailProfile', user.editEmailProfile)

module.exports = router;