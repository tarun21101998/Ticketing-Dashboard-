const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/requests')
const Jwt = require('jsonwebtoken');

// fetch user
module.exports.getData = async (req, resp) => {
    try {
        // console.log(req.query.params.param.id)
        const dCode = resp.temp
        if(dCode.isType == 2 || dCode.isType == 0){
        const result = await collection.find({})
        return resp.status(200).send(result)
        }
        return resp.status(404).json({responce: false})
    } catch (error) {
return resp.status(500).send("error")
    }
 }

// activate/deactivate user
module.exports.activate_deactivate= async(req, resp)=>{
    try {
        let user = await collection.findOne({_id: req.body.value})
        if(user.isActive== false){
        await collection.updateOne({_id: req.body.value}, {$set: {isActive: true}})
        return resp.json({result1: "activate"})
        }
        else{
            await collection.updateOne({_id: req.body.value}, {$set: {isActive: false}})
            return resp.json({result1: "deactivate"})
        }
    } catch (error) {
        return resp.send("error is hapening")
    }
}





