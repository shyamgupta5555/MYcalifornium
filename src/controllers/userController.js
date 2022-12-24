
const userModel = require("../models/userModel")


exports.userCreate = async (req ,res)=>{

let data =  req.body
let create  =  await userModel.create(data)
res.send({status : true , data :  create})

}

exports.getData = async (req ,res) =>{
    let get = await userModel.findOne({_id :req.params.id})
    res.send(get)
}
