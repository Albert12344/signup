import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPassword() {

  const history = useNavigate()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [notMatch, setNotMatch] = useState(false)

  async function submit(e, _id) {
    e.preventDefault();

    try {        
      if(repeatPassword !== password){
        setNotMatch(true)
      }else{
        await axios.put(`http://localhost:5555/student/update/${_id}`, {
          password
        })
        .then((res) => {
          if(res.data === 'Password updated successfully!') {
            history('/student/login')
          }else {
            setNotMatch(true)
          }
        })
      }   
    }
    catch(e){
      console.log(e)
    }
  }


  return (
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      <form className='form'>
        <h1>Նոր Գաղտնաբառ</h1>  
        <label className='label'>Գաղտնաբառ</label><br />
        <input className='input' type="password" onChange={(e)=>{setRepeatPassword(e.target.value)}} placeholder='Password'/><br/>
        <label className='label'>Կրկնեք Գաղտնաբառը</label><br />
        <input className='input' type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Repeat Password'/><br/>
        {notMatch && <p>Գաղտնաբառերը համապատասխան չեն</p> }
        <button className='button' onClick={submit}>Հաստատել</button>
      </form>
    </div>
  )
}