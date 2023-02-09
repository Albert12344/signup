const express = require('express')
const router = express.Router()
const userCollection = require('../Users/pupil')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


//Sign up post for pupil
router.post("/", async(req,res) => {
    try {
        const {email, name, lastname, password} = req.body   
    
        const check = await userCollection.findOne({email:email})
    
        if(check) {
           return res.json('exist')
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
        
        const pupil = await userCollection.create({
            email: email.toLowerCase(),
            name,
            lastname,
            password: hashPassword
        })
    
        const token = jwt.sign(
            { pupil_id: pupil._id, email}, process.env.TOKEN_KEY, {expiresIn: "1h",});
    
            pupil.token = token;
            
            res.status(201).json(pupil)
    
    }catch(err){
        console.log(err)
    }
})

module.exports = router