import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPassword() {

  const history = useNavigate()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [notMatch, setNotMatch] = useState(false)

  async function submit(e) {
    e.preventDefault();

    try {        
      if(repeatPassword !== password){
        setNotMatch(true)
      }else{
        await axios.put('http://localhost:5555/teacher/update', {
          password
        })
        history('/teacherLogin')
      }   
    }
    catch(e){
      console.log(e)
    }
  }


  return (
    <div>
      <h1>Password Recovery</h1>
      <form action="POST">
        <input type="password" onChange={(e)=>{setRepeatPassword(e.target.value)}} placeholder='Password'/><br/>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Repeat Password'/><br/>
        {notMatch && <p>Passwords are not match</p> }
        <input type="submit" onClick={submit}/>
      </form>
    </div>
  )
}