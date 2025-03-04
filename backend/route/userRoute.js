const express = require("express");
const UserController = require("../controller/userController");


const router = express.Router();

router.post('/userdata', UserController.getUserByEmail);


module.exports = router;