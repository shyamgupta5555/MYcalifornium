const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const productController= require("../controllers/productController")
const orderController= require("../controllers/orderController")
const commonMW = require ("../middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", commonMW.middlewareHeaders, UserController.userCreate  )
router.post("/createProduct",  productController.productCreate )
router.post("/createOrder", commonMW.middlewareHeaders, orderController.createOrder  )


router.get("/get/:id", UserController.getData )

module.exports = router;