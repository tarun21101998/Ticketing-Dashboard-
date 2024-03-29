// importing express library and bodyparser 
const express = require('express')
const bodyparser = require('body-parser')

const cors = require('cors');

// calling the express
const app = express()



// importing the DataBase and Collections
const dotEnv = require("dotenv").config()
const db = require('./data_base/initDB')
const collection = require('./modals/data')

const PORT = process.env.PORT || 8000

app.use(express.urlencoded());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors());
// app.use(express.static("./Client/build/index.html"));
app.use('/', require('./routes'));
// app.use(express.static("Client/build"))
app.listen(PORT, (err)=>{
    if(!err){
        console.log("Server is running on PORT " + PORT)
    }
    else{
        console.log("Error is happening")
    }
})