const express = require('express');
const router = express.Router();
const teacherCollection = require('../teachers/pupil')
require('dotenv').config()
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { teacheremail } = req.body;

  teacherCollection.findOne({ teacheremail }, (err, teacher) => {
    if (err) return res.status(500).send({ message: 'Error while searching the teacher' });
    if (!teacher) return res.status(404).send({ message: 'teacher not found' });

    const resetNumber = generateResetNumber();
      teacher.resetPasswordNumber = resetNumber;
      teacher.resetPasswordExpires = Date.now();

    teacher.save((err) => {
      if (err) return res.status(500).send({ message: 'Error while saving the teacher' });

    sendPasswordResetEmail(teacheremail, resetNumber) 
      return res.send({ message: 'Password reset instructions sent to your email' });
    });
  });
});

  function generateResetNumber() {
    return  Math.floor(100000 + Math.random() * 900000)
  }
  
  function sendPasswordResetEmail(teacheremail, resetNumber) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        teacher: 'albert.manukyan.0005@gmail.com',
        pass: 'qxkvxfhtsfgqrltf',
      },
    });

    const emailNumber = resetNumber
  
    const mailOptions = {
      from: 'albert.manukyan.0005@gmail.com',
      to: teacheremail,
      subject: 'Password reset',
      text: `Please input this $ digit number in your web page for reset password ${emailNumber}`,
      html: `<p>Please input this 6 digit number in your web page for reset password  ${emailNumber}</p>`,
    };
  
    transporter.sendMail(mailOptions, (err) => {
      if (err) return console.error(err);
      console.log(`Password reset email sent to ${teacheremail}`);
    });
  }
  

module.exports = router

