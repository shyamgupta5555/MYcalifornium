const orderModel = require('../models/orderModel')
const UserModel = require("../models/userModel")
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const moment = require('moment')
const { set } = require('mongoose')



exports.createOrder = async (req, res) => {

  let data = req.body
  const { userId, productId } = data

  if (!userId) return res.send({ status: false, message: " userId  is required" })

  let userFind = await userModel.findById({ _id: userId })
  if (!userFind) return res.send({ status: false, message: " userId is not valid" })


  if (!productId) return res.send({ status: false, message: " productId  is required" })

  let productFind = await productModel.findById({ _id: productId })
  if (!productFind) return res.send({ status: false, message: " productId  is not valid" })


  let productPrice = productFind.price
  let userDetails = userFind.isFreeAppUser
  let userAmount = userFind.balance


  let date1 = moment().format("DD-MM-YYYY")
  data.date = date1

  if (userDetails == true) {

    data.amount = 0
    data.isFreeAppUser = true

    let createOrder = await orderModel.create(data)
    res.send({ status: true, data: createOrder })



  } else {

    if (productPrice > userAmount) return res.send({ status: false, message: "inSufficient balance" })

    data.amount = productPrice
    data.isFreeAppUser = false
    let createOrder = await orderModel.create(data)
    let user = await userModel.updateOne({ _id: userId }, { $inc: { balance: -productPrice } }, { new: true })
    res.send({ status: true, data: createOrder })

  }

}


