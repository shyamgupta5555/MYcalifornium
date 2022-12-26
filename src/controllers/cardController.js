
const customerModel = require("../models/customerCollection")
// const userModel = require("../models/cardCollection")



exports.userCreate = async (req ,res)=>{
let allData = await customerModel.find({status : 'ACTIVE'})
let data =  req.body
let create  =  await customerModel.findOneAndUpdate(data , )
res.send({status : true , data :  create})

}


