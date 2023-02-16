const mongoose = require('mongoose')
const dotenv = require('dotenv').config()



exports.connect = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URI, {})
        .then(() => {
            console.log('connected')
        })
        .catch((e) => {
            console.log(e)
            console.log('failed')
    })
}
