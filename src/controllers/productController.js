const productModel = require('../models/productModel')



exports.productCreate = async (req, res) =>{

   let data =  req.body
   let create =  await productModel.create(data)

res.send({status: true, data : create})

}