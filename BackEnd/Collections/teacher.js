const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
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
        required: true,
    },
    token:{
        type: String
    },
    verification: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const teacherCollection = mongoose.model('teachers', teacherSchema)


module.exports = teacherCollection
