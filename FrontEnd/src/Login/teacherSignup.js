import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function TeacherSignup() {

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
  const setJwtToken = useState('')


  async function handleSubmit(e) {
    e.preventDefault();
      await axios.post('http://localhost:5555/teacher/signup', {
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
    await axios.post('http://localhost:5555/teacher/verify', {verificationCode: verificationCode}, {headers})
    .then((response) => {
      if(response.data === 'Email verified successfully!'){
        history("/teacher/login")
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
    <div>
      <h1>Գրանցուել</h1>
      <form>
        <label>Եղեկտրոնային փոստ</label><br />
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
          {emailExists && <p>Մուտքագրուած եղեկտրոնային հասցեն արդեն աւգտագործուած է</p> }
        <label>Անուն</label><br />
        <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Անուն'/><br/>
        <label>Ազգանուն</label><br />
        <input type="text" onChange={(e)=>{setLastName(e.target.value)}} placeholder='Ազգանուն'/><br/>
        <label>Գաղտնաբառ</label><br />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ'/><br/>
        {submitButton && <button onClick={handleSubmit}>Հաստատել</button>}
          {emailVerification && 
            <div>
              <p>Խնդրում ենք ստուգել ձեր Եղեկտրոնային փոստը եւ մուտքագրել ստացուած 6 նիշանոց թիւը</p>
              <input type="text" onChange={(e) =>{setVerificationCode(e.target.value)}} placeholder='Եղեկտրոնային փոստի նույնականացում'/>
              {check && <p>Խնդրում ենք կրկին ստուգել</p>}
              <br />
              <button onClick={handleVerification}>Հաստատել</button>
            </div>}
      </form>
      <br/>
      <p>Կամ</p>
      <br/>
      <Link to='/teacher/login'>Մուտք</Link>
    </div>
  )
}
