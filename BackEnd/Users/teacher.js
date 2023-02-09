const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    teacheremail:{
        type: String,
        required: true,
        unique: true 
    },  
    teachername:{
        type: String,
        required: true
    },  
    teacherlastname:{
        type: String,
        required: true
    },  
    teacherpassword:{
        type: String,
        required: true,
    },
    token:{
        type: String
    },
    resetPasswordToken: {
        type: String,
      },
    resetPasswordExpires: {
        type: Date,
    }
})

const teacherCollection = mongoose.model('teacher', teacherSchema)


module.exports = teacherCollection
