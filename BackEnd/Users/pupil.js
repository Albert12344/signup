const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true 
    },  
    name:{
        type: String,
        required: true
    },  
    lastname:{
        type: String,
        required: true
    },  
    password:{
        type: String,
        required: true
    },
    token:{
        type: String
    },
    resetPasswordNumber: {
        type: Number,
    },
    resetPasswordExpires: {
      type: Date,
    },
})

const userCollection = mongoose.model('users', userSchema)

module.exports = userCollection