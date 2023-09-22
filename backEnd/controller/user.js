    const collection=  require('../modals/data')

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

