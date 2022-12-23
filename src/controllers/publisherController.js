const publisherModel = require('../models/publisherModel')


exports.publisherCreate = async (req, res) => {
  let data = req.body
  let create = await publisherModel.create(data)
  res.send({ status: true, data: create })

}