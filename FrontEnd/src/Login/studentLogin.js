import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function StudentLogin() {

  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [incorrect, setIncorrect] = useState(false)

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5555/student/login', {
        email, password
      })
      .then(res => {
        if(res.data == 'exist'){
          history('/student/home')
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
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      <form className='form'>
        <h1>Մուտք</h1>
        <label className='label'>Եղեկտրոնային Փոստ</label><br />
        <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
        <label className='label'>Գաղտնաբառ</label><br />
        <input className='input' type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Գաղտնաբառ'/><br/>
        {incorrect && <p>Եղ․ փոստը կամ գաղտնաբառը սխալ է</p>}
        <button className='button' type="submit" onClick={submit}>Հաստատել</button><br />
        <Link className='label' to='/student/resetpassword'>Մոռացե՞լ եք գաղտնաբառը</Link>
        <br />
      <p className='label'>Կամ</p>
      <br />
      <Link className='label' to='/student/signup'>Գրանցում</Link>
      </form>
    </div>
  )
}