import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function StudentSignup() {

  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode ] = useState('')
  const [emailExists, setEmailExists] = useState(false)
  const [submitButton, setSubmitButton] = useState(true)
  const [emailVerification, setEmailVerification] = useState(false)
  const [check, setCheck] = useState(false)
  const [jwttoken, setJwtToken] = useState('')
  const [signup, setSignup] = useState(true)


  async function handleSubmit(e) {
    e.preventDefault();
      await axios.post('http://localhost:5555/student/signup', {
       email, name, lastname, password, 
      })
      .then(res => {
        if(res.data === 'exist'){
          setEmailExists(true)
        }else{
          setSubmitButton(false)
          setEmailVerification(true)
          setEmailExists(false)
          const jwttoken = res.data.token
          setJwtToken(jwttoken)
          localStorage.setItem('token', jwttoken);
          setSignup(false)
        }
      })
      .catch(e => {
        alert('wrong details')
        console.log(e)
      })
  }

  async function handleVerification (e){
    e.preventDefault()
    const token = localStorage.getItem('token') 
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    await axios.post('http://localhost:5555/student/verify', {verificationCode: verificationCode}, {headers})
    .then((response) => {
      if(response.data === 'Email verified successfully!'){
        console.log(verificationCode)
        console.log(headers)
        history("/student/login")
      }else{
        setCheck(true)
        console.log(headers)
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      { signup && <div>
        <form className='form'>
          <h1 className='signup'>Գրանցուել</h1>
          <label className='label'>Եղեկտրոնային փոստ</label><br />
          <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
            {emailExists && <p>Մուտքագրուած եղեկտրոնային հասցեն արդեն աւգտագործուած է</p> }
            <label className='label'>Անուն</label><br />
            <input className='input' type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Անուն'/><br/>
          <label className='label'>Ազգանուն</label><br />
          <input className='input' type="text" onChange={(e)=>{setLastName(e.target.value)}} placeholder='Ազգանուն'/><br/>
          <label className='label'>Գաղտնաբառ</label><br />
          <input className='input' type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ'/><br/>
          {submitButton && <button className='button' onClick={handleSubmit}>Հաստատել</button>}
          <br />
          <p className='label'>Կամ</p>
          <br />
          <Link className='label' to='/student/login'>Մուտք</Link>
        </form>
      </div>
      }
          {emailVerification && 
            <div>
              <form className='form'>
                <label className='label'>Եղ․ փոստի Նույնականացում</label>
                <input className='input' type="text" onChange={(e) =>{setVerificationCode(e.target.value)}} placeholder='Նույնականացում'/>
                {check && <p>Խնդրում ենք կրկին ստուգել</p>}
                <br />
                <button className='button' onClick={handleVerification}>Հաստատել</button>
                <p>Խնդրում ենք ստուգել ձեր եղ․ փոստը եւ մուտքագրել ստացուած 6 նիշանոց թիւը</p>
                <br />
                <p className='label'>Կամ</p>
                <br />
                <Link className='label' to='/student/login'>Մուտք</Link>
              </form>
            </div>}
    </div>
  )
}
