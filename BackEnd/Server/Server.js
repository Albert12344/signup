require('./Mongo').connect()
const express = require('express')
const cors = require('cors')
const Student = require('../Routes/Student')
const Teacher = require('../Routes/Teacher')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors()) 
app.listen(process.env.PORT)

app.use('/student', Student)
app.use('/teacher', Teacher)





