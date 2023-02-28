const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer');

function generateVerificationToken(email) {
    const verificationCode = Math.floor(Math.random() * 900000) + 100000; + ""
    const token = jwt.sign({ email, verificationCode }, process.env.TOKEN_KEY, { expiresIn: '1m' });
    return { token, verificationCode };
}

function verifyVerificationToken(token, verificationCode) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if (decoded.verificationCode == verificationCode) {

        return decoded.email 
      }
        return false; // Verification code does not match
    } catch (err) {
      return err; // Token is invalid or has expired
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
      from: 'Իրական Դպրոց',
      to: email,
      subject: 'Նոյնականացման Կոդ',
      text: `Ձեր նոյնականացման կոդն է։ ${verificationkey}`,
      html: `<p>Ձեր նոյնականացման կոդն է։  ${verificationkey}</p>`,
    };
  
    transporter.sendMail(mailOptions, (err) => {
      if (err) return console.error(err);
    });
}  

module.exports = {generateVerificationToken, verifyVerificationToken, sendVerificationEmail}
