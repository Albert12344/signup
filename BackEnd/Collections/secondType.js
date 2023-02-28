const mongoose = require('mongoose')

const Type2 = new mongoose.Schema({
    title: {
      type: String, 
      required: true 
    },
    question: {
       type: String, 
       required: true 
    },
    options: { 
      type: Array, 
      required: true 
    },
});

const typetwo = mongoose.model('Type2', Type2)

module.exports = typetwo