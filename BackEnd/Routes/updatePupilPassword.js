const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const userCollection = require('../Users/pupil')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

router.put("/", async(req,res) => {
  try {
      const {email, password} = req.body   
  
      const check = await userCollection.findOne({email:email})
  
      if(check) {
        const hashPassword = await bcrypt.hash(password, 10)
      
        const pupil = await userCollection.updateOne({
            password: hashPassword
        })
    
        const token = jwt.sign(
            { pupil_id: pupil._id, email}, process.env.TOKEN_KEY, {expiresIn: "1h",});
    
            pupil.token = token;
            
            res.status(201).json(pupil)
      }
  
  
  }catch(err){
      console.log(err)
  }
})

  
  module.exports = router
