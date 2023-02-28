require('./Mongo').connect()
const express = require('express')
const cors = require('cors')
const Route = require('../Routes/Route')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors()) 
app.listen(process.env.PORT)


app.use('/', Route)





