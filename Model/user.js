const mongoose = require('mongoose')

module.exports = mongoose.model('User', {
    username: {type: String},
    email: {type: String},
    role: {type: String,default:"user"},
    phone: {type: String},
    otpToken: {type: String},
    password: {type: String},
    isVerified: {type: Boolean, default: false}
})