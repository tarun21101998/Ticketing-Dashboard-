
const express = require('express')
const router = express.Router();
const user = require('../controller/user')

// Data sending to Data Base
router.post('/users', user.createData)

router.post('/login', user.loginData)

// Data is fetching from DataBase
router.get('/users', user.getData)


module.exports = router;