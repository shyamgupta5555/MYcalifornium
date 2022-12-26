const mongoose =  require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const cardSchema =  new mongoose.Schema({

	cardNumber : String,
	cardType : { type : String , enum : ["REGULAR" ,"SPECIAL"]},
	customerName : String,
	status :{ type :String , default : 'ACTIVE'},
	vision : String,
	customerID :{type : String , ref :'customer'}



})

module.exports = mongoose.model('cardCollection' , cardSchema)
