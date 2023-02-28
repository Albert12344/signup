const mongoose = require('mongoose')

const Type3 = new mongoose.Schema({
    title: { 
      type: String, 
      required: true 
    },
    question: {
      type: String,
      required: true
    },
    firstPart: {
      type: String, 
      required: true 
    },
    missingWord: { 
      type: String, 
      required: true 
    },
    secondPart: {
      type: String,
      required: true
    }
});

const typethree = mongoose.model('Type3', Type3)

module.exports = typethree