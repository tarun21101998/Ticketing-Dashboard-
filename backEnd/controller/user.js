const collection=  require('../modals/data')
  const bcrypt = require('bcryptjs');
const collection1 = require('../modals/loginData')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// creating user
module.exports.createData= async (req, resp)=>{

  try {
    const existingUser = await collection.findOne({ email: req.body.email });
    
    if (!existingUser) {
      const newUser = await collection.create(req.body);
      return resp.send("data added");
    } else {
    
      return resp.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.log('Error in signing up:', err);
    return res.redirect('back');
  }

}

// fetching the data of user
module.exports.getData = async (req, resp)=>{
const result = await collection.find({})
// console.log(result)
resp.send(result);
}



module.exports.registerData= async (req, resp)=>{

try {
let user = new collection1(req.body);
console.log(user.password)
const passwordHash = await bcrypt.hash(user.password , 10);
console.log(passwordHash)
// req.body.password = passwordHash
// console.log(req.body.password)
let result = await collection1.create({"email": req.body.email, "password": passwordHash});
result = result.toObject();
delete result.password
Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
    if(err){
        return resp.send("Something went wrong")  
    }
    // console.log(token)
    return resp.send({result,auth:token})
})
}
catch (err) {
console.log('Error in signing up:', err);
return resp.redirect('back');
}

}


module.exports.loginData  = async (req, resp)=>{

try {
if (req.body.password && req.body.email) {
  const {email, password} = req.body
  console.log(password)

   let user = await collection1.findOne({email : req.body.email});
const  passwordHash = await bcrypt.compare(password, user.password)
// console.log(passwordHash)
// console.log(user)
// next()
  if (user && passwordHash) {
      Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
          if(err){
              resp.send("Something went wrong")  
          }
          resp.send({user,auth:token})
      })
  } else {
      resp.send({ result: "No User found" })
  }
} else {
  resp.send({ result: "No User found" })
  console.log("tarun")
}
}
catch (err) {
console.log('Error in signing up:', err);
return resp.redirect('back');
}

}
