const express = require('express')
const router = express.Router()
const teacherCollection = require('../Users/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


//Sign up post for teacher
router.post("/", async(req,res) => {
    try {
    const {teacherusername, teachername, teacherlastname, teacherpassword} = req.body  

    const check = await teacherCollection.findOne({teacherusername:teacherusername})

    if(check) {
       return res.status(409).send('exist')
    }    

    const hashPassword = await bcrypt.hash(teacherpassword, 10)
    
    const teacher = await teacherCollection.create({
        teacherusername: teacherusername.toLowerCase(),
        teachername,
        teacherlastname,
        teacherpassword: hashPassword
    })

    const token = jwt.sign(
        { teacher_id: teacher._id, teacherusername}, process.env.TOKEN_KEY, {expiresIn: "1h",});

        teacher.token = token;
        
        res.status(201).json(teacher)

    }catch(err){
        console.log(err)
    }
})

module.exports = router