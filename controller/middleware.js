const Jwt = require('jsonwebtoken');


// decode jwt token
module.exports.middleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.body.token)
    resp.temp = dCode;
    return next()
}

// get  requests
module.exports.getMiddleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.query.token)
    resp.temp = dCode;
    return next()
}