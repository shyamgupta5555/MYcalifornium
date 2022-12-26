const express = require('express');
const router = express.Router();

const cardController= require("../controllers/cardController")

const commonMW = require ("../middleware/middleware")


router.get("/createUser", commonMW.middlewareHeaders, UserController.userCreate  )

router.all('/*' ,function(req ,res){
res.send({status : false , message : " path not valid"})
})
module.exports = router;