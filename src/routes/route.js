const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController =require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.post("/createPublisher", publisherController.publisherCreate )

router.post("/createBook", bookController.bookCreate )

router.get("/allBook",bookController.getBook)

router.put("/updateIsTrueCover" ,bookController.updateIsTrueCover)

router.put("/updatePrice" , bookController.updatePrice)

router.all("/*",(req ,res) =>{
    res.status(400).send({message : "path is wrong please is correct path  "})

})

module.exports = router;