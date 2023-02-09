const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const teacherCollection = require('../Users/pupil')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.put("/", async(req,res) => {
  try {
      const {teacheremail, teacherpassword} = req.body   
  
      const check = await teacherCollection.findOne({teacheremail:teacheremail})
  
      if(check) {
        const hashPassword = await bcrypt.hash(teacherpassword, 10)
      
        const teacher = await teacherCollection.updateOne({
            teacherpassword: hashPassword
        })
    
        const token = jwt.sign(
            { teacher: teacher._id, teacheremail}, process.env.TOKEN_KEY, {expiresIn: "1h",});
    
            teacher.token = token;
            
            res.status(201).json(teacher)
      }
  
  
  }catch(err){
      console.log(err)
  }
})

  
  module.exports = router
