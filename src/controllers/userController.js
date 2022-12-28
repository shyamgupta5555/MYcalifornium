const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });

};


const loginUser = async function (req, res) {
  
  let {emailId , password} = req.body
  if(!emailId)return res.send({status : false , message : "required emailId"})
  if(! password)return res.send({status : false , message : "required password"})

  let find = await userModel.findOne(req.body)
  if(!find)return res.send({status : false , message : "required valid details"})

  let token  = jwt.sign( {userId : find._id.toString() , author : "shyam"} ,  "californium batch" )
  res.setHeader('x-auth-token' , token)
   res.send({status : true , data :token})

  
}

const getUserData = async function (req, res) {

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};


const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) return res.send("No such user exists")

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData ,{new : true});
  res.send({ status: true, data: updatedUser });

};



const isDeleted = async function (req, res) {

  let data = req.params.userId
  let update = await userModel.findByIdAndUpdate({_id : data} , {isDeleted :true} ,{new : true})
  return res.send({ status : true , data: update})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.isDeleted = isDeleted
