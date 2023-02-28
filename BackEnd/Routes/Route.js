const express = require('express')
const router = express.Router()
const { Signup, Resend, Verify, Login, Reset, Update, Info, allInfo, typeOne, typeTwo, typeThree, getQuiz} = require('./Details')
const teacherCollection = require('../Collections/teacher')
const studentCollection = require('../Collections/student')

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

router.post("/:collectionType/signup", Signup)

router.post('/:collectionType/resend', Resend)

router.post("/:collectionType/verify", Verify)

router.post("/:collectionType/login", Login)

router.post("/:collectionType/reset", Reset)

router.put('/:collectionType/update/:email', Update)

router.get('/:collectionType/getinfo/:email', Info)

router.get('/:collectionType/getallinfo', allInfo)

router.post('/firsttype', typeOne)

router.post('/secondtype', typeTwo)

router.post('/thirdtype', typeThree)

router.get('/quiz/:title', getQuiz)


module.exports = router