const express = require('express');
const app = express();

// app.get('/', (req,resp)=>{
//     resp.send("this is home page")
// })

app.listen(3000, (err)=>{
    if(!err){
        console.log("successfully connected")
    }
    else{
        console.log("err is happening")
    }
});