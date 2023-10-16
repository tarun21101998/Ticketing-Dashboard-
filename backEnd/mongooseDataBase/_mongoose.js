const mongoose = require('mongoose');
// const dataBase = "127.0.0.1:27017"
const dataBase = require('../config/env')
// console.log(url.url)
mongoose.connect('mongodb://'+dataBase.url+dataBase.dataBaseName)
.then(()=>{console.log("DataBase connection is successful")})
.catch((err)=>{console.log("error is showing in dataBase")})


