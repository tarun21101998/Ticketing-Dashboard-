const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ticketing_management_system')
.then(()=>{console.log("DataBase connection is successful")})
.catch((err)=>{console.log("error is showing in dataBase",err)})