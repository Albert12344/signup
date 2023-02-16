const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer');

function generateVerificationToken(email) {
    const verificationCode = Math.floor(Math.random() * 900000) + 100000; + ""// Generate a random 6-digit code
    const token = jwt.sign({ email, verificationCode, password }, process.env.TOKEN_KEY, { expiresIn: '1 minutes' });
    return { token, verificationCode };
}

function verifyVerificationToken(token, verificationCode) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if (decoded.verificationCode == verificationCode) {
        return decoded.email; // Return the email address
      }
        return false; // Verification code does not match
    } catch (err) {
      return false; // Token is invalid or has expired
    }
}

function sendVerificationEmail(email, verification) {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.error(`Invalid email address: ${email}`);
      return;
    }
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'albert.manukyan.0005@gmail.com',
        pass: 'vpcflusgprgeewgi',
      },
    });
  
    const verificationkey = verification
  
    const mailOptions = {
      from: 'albert.manukyan.0005@gmail.com',
      to: email,
      subject: 'Password reset',
      text: `Please input this 6 digit number in your web page for reset password ${verificationkey}`,
      html: `<p>Please input this 6 digit number in your web page for reset password  ${verificationkey}</p>`,
    };
  
    transporter.sendMail(mailOptions, (err) => {
      if (err) return console.error(err);
      console.log(`Password reset email sent to ${email}`);
    });
}  

module.exports = {generateVerificationToken, verifyVerificationToken, sendVerificationEmail}
