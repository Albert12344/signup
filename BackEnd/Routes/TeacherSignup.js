const express = require('express')
const router = express.Router()
const teacherCollection = require('../Users/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


//Sign up post for teacher
router.post("/", async(req,res) => {
    try {
    const {teacheremail, teachername, teacherlastname, teacherpassword} = req.body  

    const check = await teacherCollection.findOne({teacheremail:teacheremail})

    if(check) {
       return res.status(409).send('exist')
    }    

    const hashPassword = await bcrypt.hash(teacherpassword, 10)
    
    const teacher = await teacherCollection.create({
        teacheremail: teacheremail.toLowerCase(),
        teachername,
        teacherlastname,
        teacherpassword: hashPassword
    })

    const token = jwt.sign(
        { teacher_id: teacher._id, teacheremail}, process.env.TOKEN_KEY, {expiresIn: "1h",});

        teacher.token = token;
        
        res.status(201).json(teacher)

    }catch(err){
        console.log(err)
    }
})

module.exports = router