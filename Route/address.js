const router = require("express").Router();
const {User} = require("../Middleware/auth")


const addressController = require("../Controller/address")


//create user
router.post("/add",User,addressController.add_address);

module.exports = router;