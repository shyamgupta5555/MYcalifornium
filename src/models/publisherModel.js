const mongoose = require("mongoose")

const publisherSchema = new  mongoose.Schema({
  name : { type : String, trim : true , uppercase : true },
  headQuarter :{type : String , trim : true , uppercase : true}
}
)

module.exports = mongoose.model("newPublisher" , publisherSchema)
