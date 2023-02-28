const mongoose = require('mongoose')

const Type1 = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
    },  
    options:{
        type: Array,
        required: true
    },  
    answer:{
        type: String,
        required: true
    }
})

const typeone = mongoose.model('Type1', Type1)

module.exports = typeone