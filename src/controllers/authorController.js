const authorModel = require('../models/authorModel')
const mongoose = require("mongoose")

exports.createAuthor = async (req ,res)=>{
    let data  =  req.body 
    let createAuthor = await authorModel.create(data)
    res.send({ status : true ,message : "successful creation" , data : createAuthor})
}


// exports.getAuthor = async (req ,res)=>{
//     let query = req.query
//    let data  = await authorModel.find()
//    res.send({ status : true ,message : "all data" , data : data})
// }


