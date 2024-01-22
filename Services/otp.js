// const accountSid = "ACa1d5bbc3484e4e89573170ac9cd76d0ee";
// const authToken = "e788c60706e96268a96d35c0505285dd";
// const verifySid = "VA42b2adfb3d5392e53765e98cae82e0a0";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+94702425242", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+94702425242", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");


  //create otp
  var secret;
  var otp;

     secret = speakeasy.generateSecret({ length: 20 }).base32;

     otp = speakeasy.totp({
        secret: secret,
        encoding: "base32"
    })

    var verifyOtp =async (OtpToken,otp)=>{
        if (await bcrypt.compare(OtpToken,otp)) {
            return true;
        }else{
            return false;
        }
    }
  
    module.exports = { otp , secret, verifyOtp}