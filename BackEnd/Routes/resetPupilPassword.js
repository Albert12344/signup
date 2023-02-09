const express = require('express');
const router = express.Router();
const userCollection = require('../Users/pupil')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { email } = req.body;

  userCollection.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ message: 'Error while searching the user' });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const resetNumber = generateResetNumber();
      user.resetPasswordNumber = resetNumber;
      user.resetPasswordExpires = Date.now();

    user.save((err) => {
      if (err) return res.status(500).send({ message: 'Error while saving the user' });

    sendPasswordResetEmail(email, resetNumber) 
      return res.send({ message: 'Password reset instructions sent to your email' });
    });
  });
});

  function generateResetNumber() {
    return  Math.floor(100000 + Math.random() * 900000)
  }
  
  function sendPasswordResetEmail(email, resetNumber) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'albert.manukyan.0005@gmail.com',
        pass: 'qxkvxfhtsfgqrltf',
      },
    });

    const emailNumber = resetNumber
  
    const mailOptions = {
      from: 'albert.manukyan.0005@gmail.com',
      to: email,
      subject: 'Password reset',
      text: `Please input this $ digit number in your web page for reset password ${emailNumber}`,
      html: `<p>Please input this 6 digit number in your web page for reset password  ${emailNumber}</p>`,
    };
  
    transporter.sendMail(mailOptions, (err) => {
      if (err) return console.error(err);
      console.log(`Password reset email sent to ${email}`);
    });
  }
  

module.exports = router

