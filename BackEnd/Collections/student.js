const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
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
        minlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    course: {
        type: Number
    }
})

const studentCollection = mongoose.model('students', studentSchema)

module.exports = studentCollection