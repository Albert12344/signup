const express = require('express')
const router = express.Router()
const teacherCollection = require('../Users/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

//Log in post for teacher
router.post("/", async(req,res) => {
    const {teacheremail, teacherpassword} = req.body

        try{
            const teacher = await teacherCollection.findOne({teacheremail:teacheremail})
            if(teacher && (await bcrypt.compare(teacherpassword, teacher.teacherpassword))){
                const token = jwt
                .sign({teacher_id: teacher._id, teacheremail}, process.env.TOKEN_KEY, {expiresIn: "2h",});
                teacher.token = token;
                res.json('exist')
            }
            else{
                res.json('notExist')
            }
        }
        catch(e){
            res.json('notExist')
        }
});

module.exports = router