const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.createUser = async function (req ,res) {
  
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ data: savedData });

};

exports.loginUser = async function (req, res) {
try{

  let { emailId , password } = req.body

 if(!emailId) return res.send({status : false , message : "emailId is required "})
 if(! password) return res.send({status : false , message : "password is required "})

  let checkDetails = await userModel.findOne({emailId : emailId , password : password})
  if(!checkDetails) return res.send({status :false   , message : "provide valid details "})

  let token = jwt.sign({userId :checkDetails._id ,author : "Shyam Gupta" } , "i am software developer" , {expiresIn : '1h'})

  res.setHeader('x-auth-token' , token)
  res.send({ status: true, data: token })

}catch(err){
  res.send({status: true ,message : err.message})
}
  
}




exports.headerMiddleware = (req ,res ,next) =>{

 let header = req.headers['x-auth-token']
 if(!header)return res.send({status :false  , message :"headers is required" })

   jwt.verify(header  ,"i am software developer" , (err )=>{
    if(err)return res.send({status : true , message : err.message })
    next()
   })

}



exports.getUserData = async function (req, res) {

  let id = req.params.userId

  let findData = await userModel.findById({_id : id})
  if(!findData )return res.send({status :false , message : "data not found"})
  res.send({status: true , data : findData})

};




exports.updateUser = async function (req, res) {

  let userId = req.params.userId;
  let userData = req.body

  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData , {new : true});
  if(!updatedUser) return res.send({status : false , message: "user id not valid"})

  res.send({ status: true, data: updatedUser });

};


exports.isDeleted = async (req ,res)=>{

let userId = req.params.userId
let updateDATA = await userModel.findOneAndUpdate({_id:userId },{isDeleted : true} , {new : true})
res.send({status : true , data : updateDATA})

}




