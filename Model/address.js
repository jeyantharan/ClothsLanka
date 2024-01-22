const mongoose = require('mongoose')

module.exports = mongoose.model('Address', {
    firstname: {type: String},
    lastname: {type: String},
    address: {type: String},
    city: {type: String},
    postalcode: {type: String},
    userId:{type: String}
    
})