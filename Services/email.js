const nodemailer = require('nodemailer')


exports.verifyEmail = async(email,otp)=>{
    console.log(email,otp);
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "aathiaathithyan123@gmail.com",
            pass: 'xxfk ovwb kshx ofjs'
        },
    })

        console.log(`${process.env.USER}, ${process.env.PASSWORD}`)

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `
                <div>
                    <h1>Your OTP: ${otp} </h1>
                </div>
            `
            
        })

}