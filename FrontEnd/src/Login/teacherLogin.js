import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function TeacherLogin() {

  const history = useNavigate()

  //Email and Password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Hide or show anything
  const [incorrect, setIncorrect] = useState(false)
  const [Login, SetLogin] = useState(true)
  const [verify, setVerify] = useState(false)
  const [check, setCheck] = useState(false)

  //Verification Code
  const [verificationCode, setVerificationCode] = useState('')

  //Login 
  async function submit(e) {

    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:5555/teacher/login", {
        email, password
      })
      if(response.data.status === 'exist'){
        cookies.set("TOKEN", response.data.token)


        localStorage.setItem('email', email)
        history("/teacher/home")
        window.location.reload(false); 
      }
    } catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
      if(error.response.data.status === 'notExist'){
        setIncorrect(true)
      }
      if(error.response.data.status === 'unverified') {
        SetLogin(false)
        setVerify(true)
        localStorage.setItem('token', error.response.data.token);
      }else {
        setIncorrect(true)
      }
    }
  }


  //SetIsverified false => true
  async function handleVerification (e){
    e.preventDefault()

    try {
      const token = localStorage.getItem('token') 
      const headers = {
       'Authorization': `Bearer ${token}`
      }

      const response = await axios.post('http://localhost:5555/teacher/verify', {
      verificationCode: verificationCode}, {headers})

      if(response.data.status === 'Email verified successfully!'){
        SetLogin(true)
        setVerify(false)
      }
    }catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
      setCheck(true)
    }  
  }

  return (
    //body
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      <form className='form'>
    {/* Login bar */}
      {Login &&
        <> 
          <h1>Մուտք</h1>
          <label className='label'>Եղեկտրոնային Փոստ</label><br />
            <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
          <label className='label'>Գաղտնաբառ</label><br />
            <input className='input' type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ'/><br/>
            {incorrect && <p className='label'>Եղ․ փոստը կամ գաղտնաբառը սխալ է</p>}
          <button className='button' type="submit" onClick={submit}>Հաստատել</button><br />
          <Link className='label' to='/teacher/resetpassword'>Մոռացե՞լ եք գաղտնաբառը</Link>
            <br />
              <p className='label'>Կամ</p>
            <br />
              <Link className='label' to='/teacher/signup'>Գրանցում</Link>
         </>
      }
    {/* Verification bar */}
      {verify && 
        <div className='form1'>
            <h1 className='label'>Եղ․ փոստի Նույնականացում</h1>
              <input className='input' type="text" onChange={(e) =>{setVerificationCode(e.target.value)}} placeholder='Նույնականացում'/>
                {check && <p>Խնդրում ենք կրկին ստուգել</p>}
              <br />
                <button className='button' onClick={handleVerification}>Հաստատել</button>
              <p>Խնդրում ենք մուտքագրել ստացուած 6 նիշանոց թիւը</p>
        </div>
      }
      </form>
    </div>
  )
}