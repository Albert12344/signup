const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    teacherusername:{
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
    }
})

const teacherCollection = mongoose.model('teacher', teacherSchema)


module.exports = teacherCollection
