import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function TeacherLogin() {

  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [incorrect, setIncorrect] = useState(false)

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5555/teacher/login', {
        email, password
      })
      .then(res => {
        if(res.data == 'exist'){
          history('/teacher/home')
        }
        else if(res.data == 'notExist'){
          setIncorrect(true)
        }
      })
      .catch(e => {
        alert('wrong details')
        console.log(e)
      })
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Մուտք</h1>
      <form action="POST">
        <label>Եղեկտրոնային Փոստ</label><br />
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
        <label>Գաղտնաբառ</label><br />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ'/><br/>
        {incorrect && <p>Եղ․ փոստը կամ գաղտնաբառը սխալ է</p>}
        <input type="submit" onClick={submit}/>
      </form>
      
      <br />
      <p>Կամ</p>
      <br />

      <Link to='/teacher/signup'>Գրանցում</Link>
    </div>
  )
}