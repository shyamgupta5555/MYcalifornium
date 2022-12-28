const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware = require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end

router.get("/users/:userId",middleware.authenticate, userController.getUserData)

router.delete("/users/:userId",middleware.authenticate,middleware.authorise, userController.isDeleted)

router.put("/users/:userId",middleware.authenticate,middleware.authorise, userController.updateUser)

module.exports = router;
