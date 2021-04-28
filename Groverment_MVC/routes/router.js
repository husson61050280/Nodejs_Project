const express = require('express');
const router = express.Router()

//import Controller 
const Controller = require("../controller/controller");
const con = new Controller();

router.get("/" , con.homePage);
router.get("/add", con.addPage);
router.get("/add_university", con.addUniversityPage);
router.post("/add", con.addUser);
router.post("/add_university", con.addUniversity);

module.exports = router