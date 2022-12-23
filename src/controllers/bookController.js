const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require('../models/publisherModel')



exports.bookCreate = async (req, res) => {
  let data = req.body
  let { name, author, price, rating, publisher } = data

  if (!author) return res.send({ status: false, message: "author id required" })
  let findvaildAuthor = await authorModel.findById({ _id: author })
  if (!findvaildAuthor) return res.send({ status: false, message: "author id is not valid" })

  if (!publisher) return res.send({ status: false, message: "publisher id  required" })
  let findvaildpublisher = await publisherModel.findById({ _id: publisher })
  if (!findvaildpublisher) return res.send({ status: false, message: "publisher id is not present in valid" })

  let createBook = await bookModel.create(data)
  res.send({ status: true, data: createBook })

}


exports.getBook =async (req ,res)=>{
  let data = await bookModel.find().populate('author').populate('publisher')
 
  res.send({data : data})
}


exports.updateIsTrueCover =async (req,res)=>{

  let publisher = await publisherModel.find({name :{$in : ['Penguin','HarperCollins' ]}})
  let allData = []
  for(let i = 0; i<publisher.length ; i++){
     let update =  await bookModel.findOneAndUpdate( i.publisher,{$set : {isHardCover : true}} ,{new : true})
    allData.push(update)
 
  }
  let objectData = {}

  objectData.data = allData

  res.send({status : true , data  :objectData})

}

exports.updatePrice =async (req,res)=>{

  let author = await authorModel.find({rating :{$gt : 3.5}})
  let allData = []

  for(let i = 0; i<author.length ; i++){


     let update =  await bookModel.findOneAndUpdate( i.author,{$inc :{price : 10}} ,{New : true})
    allData.push(update)
    
  }

  let objectData = {}

  objectData.data = allData

  res.send({status : true , data  :objectData})
  
}