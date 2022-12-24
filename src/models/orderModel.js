const mongoose =  require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema =  new mongoose.Schema({

	userId: {type : objectId },
	productId: {type : objectId },
	amount: Number,
	date: {type : String},
  isFreeAppUser :{type : Boolean}

})

module.exports = mongoose.model('order' , orderSchema)
