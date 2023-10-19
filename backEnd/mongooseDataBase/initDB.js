const mongoose = require('mongoose')
// const dotEnv = require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DataBase connection is successful")})
.catch((err)=>{console.log("error is showing in dataBase",err)})