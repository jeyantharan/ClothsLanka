const userModel = require('../Model/user')
const bcrypt = require("bcrypt");
const {verifyEmail} = require("../Services/email")
const {otp,verifyOtp} = require("../Services/otp")


const jwt = require("jsonwebtoken")


exports.get_all_user = async (req, res) => {
    try {
      let getDetails = await userModel.find({})
      res.status(200).send(getDetails);
    } catch (error) {
      res.status(409).send("Error " + error); res.send(error)
    }
  }
  
  exports.get_user_by_id = async (req, res) => {
    try {
      let userId = req.params.userId
      const getDetail = await userModel.findById(userId);
      if(getDetail != null){
        res.status(200).send(getDetail);
      }else{
        res.send("User not found");
      }
    } catch (err) {
      res.status(409).send("Error " + err);
    }
  };

exports.create_user = async(req,res)=>{
    let newUser = new userModel(req.body);

    const existingEmail = await userModel.find({email: newUser.email})
    const existingPhone = await userModel.find({phone: newUser.phone})

    if (existingEmail.length == 0 && existingPhone.length == 0) {
        const saltRound = 10
        const hasedPassword = await bcrypt.hash(newUser.password, saltRound)
        newUser.password = hasedPassword
        newUser.otpToken =  await bcrypt.hash(otp, saltRound);
        let saveDetail = await newUser.save()
        .then(saveDetail=>{
            verifyEmail(newUser.email,otp);
            res.status(200).send(saveDetail);

        })
    }else{
        res.status(409).send("Phone number or Email used already");
    }
}

exports.otp_verify = async(req,res)=>{
try {
    let otp = req.body.otp;
    let id = req.body.id;

    let user = await userModel.findById({ _id: id });
    let verify = verifyOtp(user.otpToken, otp);
    if (verify) {
        let accesstokenObj = {
          phone: user.phone,
          email: user.email,
          id:id
        }
    
        user.otpToken = "";
        user.isVerified = true;
        user.save();
        jwt.sign(accesstokenObj,'ClothsLanka',(err,token)=>{
          res.status(200).json({token:token,user:user})
      })
    
    
      } else {
        res.send("OTP validation is wrong");
      }
} catch (error) {
    res.status(409).send(error);
}
}

exports.login_user = async(req,res)=>{
    try {
        let user = await userModel.findOne({phone:req.body.phone});
        if(user != null){
            try {
                if (await bcrypt.compare(req.body.password,user.password)) {
                  let accesstokenObj = {
                    phoneNumber: user.phone,
                    email: user.email
                  }
                    jwt.sign(accesstokenObj,'ClothsLanka',(err,token)=>{
                        res.status(200).json({token:token,user:user})
                    })
                }else{
                    res.status(403).send("Password wrong")
                }
            } catch (error) {
                res.status(500).send(error)
            }
        }else{
            res.status(400).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
  }


  exports.reset_password_otp = async(req,res)=>{
    try {
      userEmail = req.body.email;
      var userDetails = await userModel.findOne({email:userEmail});
      if (userDetails == null) {
        res.status(404).send("User not found");
      }else{
        const saltRound = 10
        otpToken =  await bcrypt.hash(otp, saltRound);
        updatevalue = {
          otpToken:otpToken,
        }
        userDetails._id =  userDetails._id
       x =  await userModel.findOneAndUpdate(userDetails._id,updatevalue,{new:true})
       console.log(x);
        verifyEmail(userEmail,otp);
        res.status(200).send("Otp send");
      }
    } catch (error) {
      if(error) throw error;
    }
  }
  