const express = require('express')
const router = express.Router()
const userCollection = require('../Users/pupil')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

//Log in post for pupil
router.post("/", async(req,res) => {
    const {email, password} = req.body

    try{
        const pupil = await userCollection.findOne({email:email})
        if(pupil && (await bcrypt.compare(password, pupil.password))){
            const token = jwt
            .sign({pupil_id: pupil._id, email}, process.env.TOKEN_KEY, {expiresIn: "1h",});
           
            pupil.token = token;

            res.json('exist')
        }
        else{
            res.json('notExist')
        }
    }
    catch(e){
        res.json('notExist')
    }
})

module.exports = router