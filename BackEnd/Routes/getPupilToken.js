const express = require('express');
const router = express.Router();
const userCollection = require('../Users/pupil')

router.get('/', async(req, res) => {
    const {resetPasswordToken} = req.body
    const token = await userCollection.findOne({resetPasswordToken: resetPasswordToken})
    res.json(token)
})

module.exports = router
