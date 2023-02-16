const express = require('express')
const router = express.Router()
const teacherCollection = require('../Collections/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {generateVerificationToken, verifyVerificationToken, sendVerificationEmail} = require('../helpers')

//Sign up post for teacher
router.post("/signup", async(req,res) => {
    try {
        const {email, name, lastname, password} = req.body
        const { token, verificationCode } = generateVerificationToken(email);

        const check = await teacherCollection.findOne({email:email})
    
        if(check) {
           return res.json('exist')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        sendVerificationEmail(email, verificationCode)

        const teacher = await teacherCollection.create({
            email: email.toLowerCase(),
            name,
            lastname,
            password: hashPassword,
            verification: verificationCode,
            token: token
        })
                        
            res.status(201).json(teacher)
            
    }catch(err){
        console.log(err)
    }
})

router.post("/verify", async(req,res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verificationCode = req.body.verificationCode;
    
    const email = verifyVerificationToken(token, verificationCode);
    if (email) {
        await teacherCollection.findOneAndUpdate({ token }, { $set: { isVerified: true } });
        res.json('Email verified successfully!');
      } else {
        res.json('Invalid verification code!');
    }
})

router.post("/login", async(req,res) => {
    const {email, password} = req.body

    try{
        const teacher = await teacherCollection.findOne({email:email})
        if(teacher && (await bcrypt.compare(password, teacher.password))){
            if(teacher.isVerified === false) {
                res.json('notExist');
            } else {
                const token = jwt.sign({teacher_id: teacher._id, email}, process.env.TOKEN_KEY, {expiresIn: "1h",});
                teacher.token = token;
                res.json('exist');
            }
        }
        else {
            res.json('notExist');
        }
    }
    catch(e){
        res.json('notExist');
    }
})

router.post("/reset", async(req,res) => {
    const { email } = req.body
    const { token, verificationCode } = generateVerificationToken(email);

    const teacher = await teacherCollection.findOne({email:email})

    if(teacher) {
        const { token: token, verificationCode: VerificationCode }  = generateVerificationToken(email);
        sendVerificationEmail(email, VerificationCode)
        await teacherCollection.findOneAndUpdate({ email }, { $set: { verification: verificationCode } });
        await teacherCollection.findOneAndUpdate({ email }, { $set: { verification: VerificationCode, token: token } });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.json({ status: 'exist', token: token })
    }else {
        res.json('notExist')
    }
})


module.exports = router