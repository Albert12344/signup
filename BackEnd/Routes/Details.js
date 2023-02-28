const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {generateVerificationToken, verifyVerificationToken, sendVerificationEmail} = require('../helpers')
const teacherCollection = require('../Collections/teacher')
const studentCollection = require('../Collections/student')
const typeone = require('../Collections/firstType')
const typetwo = require('../Collections/secondType')
const typethree = require('../Collections/thirdType')

router.param('collectionType', function (req, res, next, collectionType) {
    if (collectionType === 'student') {
        req.collection = studentCollection
        req.collectionType = 'student'
    } else if (collectionType === 'teacher') {
        req.collection = teacherCollection
        req.collectionType = 'teacher'
    } else {
        return res.status(400).send('Invalid collection type')
    }
    next()
})

async function Signup (req,res) {   
    try {
        const {email, name, lastname, password, course} = req.body
        const { token, verificationCode } = generateVerificationToken(email)

        const check = await req.collection.findOne({email:email})
    
        if(check) {
            return res.status(400).json({status: 'exist'})
        } 
        if(password.length < 6) {
            return res.status(400).json({status: 'password'})
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            sendVerificationEmail(email, verificationCode)
            const teacher = await req.collection.create({
                email: email.toLowerCase(),
                name,
                lastname,
                password: hashPassword,
                course
            })
            const remainingTime = 60
                        
            return res.status(200).json({status: 'NotExist', teacher: teacher, token: token, remainingTime: remainingTime})
        }

    }catch(error) {
        console.log(error)
    }
}

async function Resend(req, res) {
    try {
      const { email } = req.body
        const { token, verificationCode } = generateVerificationToken(email)
        await sendVerificationEmail(email, verificationCode)
        const remainingTime = 60

        return res.status(200).json({ status: 'sent', token: token, remainingTime: remainingTime })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function Verify(req,res) {
  try {
    const { email, verificationCode } = req.body
    const token = req.header('Authorization').replace('Bearer ', '')

    const check = verifyVerificationToken(token, verificationCode)

    if (check) {
      const result = await req.collection.findOneAndUpdate({ email: check }, { $set: { isVerified: true } })

      if (result) {
          return res.status(200).json({status: 'Email verified successfully!'})
      } else {
          return res.status(400).json({status: 'Error verifying email'})
      }
    } else {
      return res.status(400).json({status: 'Invalid verification code!'})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({status: 'Server error'})
  }
}

async function Login(req,res) {
    try{
        const {email, password} = req.body
        const teacher = await req.collection.findOne({email:email})
        
        if(!teacher) {
            return res.status(400).json({status: 'notExist'})
        }
        if(!teacher.isVerified) {
            const { token: token, verificationCode: VerificationCode }  = generateVerificationToken(email)
            sendVerificationEmail(email, VerificationCode)

            return res.status(400).json({status: 'unverified', token: token })
        }
        if((await bcrypt.compare(password, teacher.password))) {
            const { token: token }  = generateVerificationToken(email)

            return res.status(200).json({status: 'exist', token: token})
        }
            return res.status(400).json({status: 'inviled'})

    } catch(error){
        console.log(error)
        return res.status(500).send({status: 'Server error'})
    }
}

async function Reset(req,res) {
    try {
    const { email } = req.body
    const teacher = await req.collection.findOne({email:email})

    if(teacher) {
        const { token: token, verificationCode: VerificationCode }  = generateVerificationToken(email)
        sendVerificationEmail(email, VerificationCode)
        await req.collection.findOneAndUpdate({ email }, { $set: { verification: null} })

        return res.status(200).json({ status: 'exist', token: token })
    }
        return res.status(400).json({status: 'notExist'})

    } catch(error) {
        console.log(error)
        res.status(500).send({status: 'Server error'})
    }
}

async function Update(req, res) {
    try {
        const updateWithEmail = req.params.email
        const { password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const updated = await req.collection.findOneAndUpdate(
            { email: updateWithEmail },
            { $set: { password: hashPassword } }
        )

        if(updated) {
            return res.status(200).json({status: 'updated'})
        }

        return res.status(400).json({status: 'false'})

    } catch (error) {
        console.error(error)
        res.status(500).send({status: 'Server error'})
    }
}

async function Info(req, res) {
    try {
      const email = req.params.email;
      const getInfo = await req.collection.findOne({ email });
      
      if (getInfo) {
        return res.status(200).json(getInfo);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

async function allInfo(req, res) {
    try {
      const getInfo = await req.collection.find({});
      
      if (getInfo) {
        return res.status(200).json(getInfo);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

async function typeOne(req, res) {
    const {title, question, answer, options} = req.body

    try{
        const first = await typeone.create({
            title,
            question,
            options,
            answer
        })
        return res.status(200).json(first)
    }
    catch(error) {
        console.log(error)
    }

}

async function typeTwo(req, res) {
    try {
        const { title, question, options } = req.body;
        const create = await typetwo.create ({
            title, 
            question,
            options
        });
        res.status(200).json({ message: 'Quiz created successfully.', create: create });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

async function typeThree(req, res) {
    try {
        const { title, question, firstPart, missingWord, secondPart } = req.body;
        const create = await typethree.create ({
            title, 
            question,
            firstPart,
            missingWord,
            secondPart
        });
        res.status(200).json({ message: 'Quiz created successfully.', create: create });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getQuiz(req, res) {
    try {
      const title = req.params.title;
      const quizzes = await Promise.all([
        typeone.find({ title }),
        typetwo.find({ title }),
        typethree.find({ title })
      ]);
      const flattenedQuizzes = [].concat(...quizzes);
      if (flattenedQuizzes.length > 0) {
        return res.status(200).json(flattenedQuizzes);
      }
      return res.status(404).json({ error: 'Quiz not found' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = {Signup, Resend, Verify, Login, Reset, Update, Info, allInfo, typeOne, typeTwo, typeThree, getQuiz}