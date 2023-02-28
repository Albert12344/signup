import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function StudentSignup() {

  const history = useNavigate()

//Signup details
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [course, setCourse] = useState('')

//Verification Code 
  const [verificationCode, setVerificationCode ] = useState('')

//Show or Hide anything
  const [emailExists, setEmailExists] = useState(false)
  const [submitButton, setSubmitButton] = useState(true)
  const [emailVerification, setEmailVerification] = useState(false)
  const [check, setCheck] = useState(false)
  const [signup, setSignup] = useState(true)
  const [expireSeconds, setExpireSeconds] = useState(false)

//Change input color black to red after wrong input
  const [inputColor, setInputColor] = useState('black')

//Timer for resend Verification code
  const [seconds, setSeconds] = useState(9999999999999999999999999999)


//Create timer for resend Verification code
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 0) {
          setExpireSeconds(true)
          return seconds
        } else {
          return seconds - 1
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])


 //Post Signup details 
  async function handleSubmit(e) {
    try {
    e.preventDefault()
      const response = await axios.post('http://localhost:5555/student/signup', {
       email, name, lastname, password, course
      })
        if(response.data.status === 'NotExist') {
          setSubmitButton(false)
          setEmailVerification(true)
          setEmailExists(false)
          setSignup(false)
          localStorage.setItem('token', response.data.token)
          setSeconds(response.data.remainingTime)
        }
      }
    catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
      if(error.response.data.status === 'exist'){
        setEmailExists(true)
      } 
      if(error.response.data.status === 'password'){
        setInputColor('red')
      } 
    }
  }


//Verify the Email with verificationCode
async function handleVerification (e){
  e.preventDefault()

  try {
    const token = localStorage.getItem('token') 
    const headers = {
     'Authorization': `Bearer ${token}`
    }

    const response = await axios.post('http://localhost:5555/student/verify', {
    verificationCode: verificationCode}, {headers})

    if(response.data.status === 'Email verified successfully!'){
      history('/student/login')
      localStorage.removeItem('token')
    }
  }catch(error) {
    if (!error.response) {
      console.log('something wrong');
      return;
    }
    setCheck(true)
  }  
}


//Resend Verification Code  
  async function handleResend(e) {
    e.preventDefault()
    try {
    const response = await axios.post('http://localhost:5555/student/resend', {
      email  
    })    
      if(response.data.status === 'sent'){
        setExpireSeconds(false)
        localStorage.setItem('token', response.data.token)
        setSeconds(response.data.remainingTime)
      }
    }catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
    }
  }

  return (
    //Signup
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      
      {/* Signup bar */}
      { signup && 
        <div>
          <form className='form'>
            <h1 className='signup'>Գրանցուել</h1>
              <label className='label'>Եղեկտրոնային փոստ</label><br />
                <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ' required/><br/>
                  {emailExists && <p>Մուտքագրուած եղեկտրոնային հասցեն արդեն աւգտագործուած է</p> }
              <label className='label'>Անուն</label><br />
                <input className='input' type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Անուն' required/><br/>
              <label className='label'>Ազգանուն</label><br />
                <input className='input' type="text" onChange={(e)=>{setLastName(e.target.value)}} placeholder='Ազգանուն' required/><br/>
                <label className='label'>Կուրս</label><br />
                <input className='input' type="number" onChange={(e)=>{setCourse(e.target.value)}} placeholder='Կուրս' required/><br/>
              <label className='label'>Գաղտնաբառ</label><br />
                <input className='input' type="password" style={{ borderColor: inputColor }} minLength={6} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ' required/><br/>
                <p style={{ color: inputColor }}>Նուազագոյնը 6 նիշ</p>
                  {submitButton && <button className='button' onClick={handleSubmit}>Հաստատել</button>}
                <br />
                  <p className='label'>Կամ</p>
                <br />
                  <Link className='label' to='/student/login'>Մուտք</Link>
          </form>
        </div>
      }
      {/* Verification Bar */}
      {emailVerification && 
        <div>
          <form className='form'>
            <label className='label'>Եղ․ փոստի Նույնականացում</label>
              <input className='input' type="text" onChange={(e) =>{setVerificationCode(e.target.value)}} placeholder='Նույնականացում'/>
                {check && <p>Խնդրում ենք կրկին ստուգել</p>}
              <br />
                <button className='button' onClick={handleVerification}>Հաստատել</button>
                <p>Խնդրում ենք ստուգել ձեր եղ․ փոստը եւ մուտքագրել ստացուած 6 նիշանոց թիւը</p>
                <p>{`Վաւեր է: ${seconds} վայրկեան`}</p>
                {expireSeconds && <button className='button1' onClick={handleResend}>Նորից ուղարկել</button>}
              <br />
                <p className='label'>Կամ</p>
              <br />
                <Link className='label' to='/student/login'>Մուտք</Link>
          </form>
        </div>
      }
    </div>
  )
}
