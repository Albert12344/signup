const express = require('express')
const router = express.Router()
const studentCollection = require('../Collections/student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {generateVerificationToken, verifyVerificationToken, sendVerificationEmail} = require('../helpers')

//Sign up post for student
router.post("/signup", async(req,res) => {
    try {
        const {email, name, lastname, password} = req.body
        const { token, verificationCode } = generateVerificationToken(email);

        const check = await studentCollection.findOne({email:email})
    
        if(check) {
           return res.json('exist')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        sendVerificationEmail(email, verificationCode)

        const student = await studentCollection.create({
            email: email.toLowerCase(),
            name,
            lastname,
            password: hashPassword,
            verification: verificationCode,
            token: token,
        })
                        
            res.status(201).json(student)
            
    }catch(err){
        console.log(err)
    }
})

router.post("/verify", async(req,res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verificationCode = req.body.verificationCode;

    const email = verifyVerificationToken(token, verificationCode);
    if (email) {
        await studentCollection.findOneAndUpdate({ token }, { $set: { isVerified: true } });
        res.json('Email verified successfully!');
      } else {
        res.json('Invalid verification code!');
    }
})

router.post("/login", async(req,res) => {
    const {email, password} = req.body

    try{
        const student = await studentCollection.findOne({email:email})
        if(student && (await bcrypt.compare(password, student.password))){
            if(student.isVerified === false) {
                res.json('notExist');
            } else {
                const token = jwt.sign({student_id: student._id, email}, process.env.TOKEN_KEY, {expiresIn: "1h",});
                student.token = token;
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

    const student = await studentCollection.findOne({email:email})

    if(student) {
        const { token: token, verificationCode: VerificationCode }  = generateVerificationToken(email);
        sendVerificationEmail(email, VerificationCode)
        await studentCollection.findOneAndUpdate({ email }, { $set: { verification: verificationCode } });
        await studentCollection.findOneAndUpdate({ email }, { $set: { verification: VerificationCode, token: token } });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.json({ status: 'exist', token: token })
    }else {
        res.json('notExist')
    }
})

router.put('/update/:id', async (req, res) => {
    const studentId = req.params.id
    const { password } = req.body

    const check = await studentCollection.findOneAndUpdate({ _id: studentId }, { $set: { password: password } });
    if(check) {
        res.json('Password updated successfully!')
    }else {
        res.json('something went wrong')
    }
});



module.exports = router