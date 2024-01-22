const router = require("express").Router();
const {User} = require("../Middleware/auth")


const userController = require("../Controller/user")


//create user
router.post("/signup",userController.create_user);

//otp verify
router.post("/verify",userController.otp_verify);

//login user
router.post("/login",userController.login_user);

//get all user
router.get("/",userController.get_all_user);

//get by id
router.get("/:userId",userController.get_user_by_id);

//forgot password
router.patch("/reset",userController.reset_password_otp);




module.exports = router;