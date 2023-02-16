import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function ResetStudentPassword() {
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [isShown, setIsShown] = useState(false)
  const [isShown1, setIsShown1] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')


async function handleSubmit(e) {
  e.preventDefault()
  await axios.post("http://localhost:5555/student/reset", {
    email: email
  })
  .then(res => {
    if(res.data.status === 'exist'){
      setIsShown(true)
      localStorage.setItem('token', res.data.token);
    }else {
      console.log('error')
    }
    
  })
  .catch((error) => {
    console.log(error)
  });
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
      history('/student/updatepassword')
      }else{
        setIsShown1(true)
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

return (
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      <form className='form'>
        <h2>Գաղտնաբառի վերականգնում</h2>
        <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
        <button className='button' onClick={handleSubmit}>Հաստատել</button>
        {isShown &&
          <div className='form'>
              <p className='p'>Խնդրում ենք ստուգել ձեր եղ․ փոստը եւ մուտքագրել ստացուած 6 նիշանոց թիւը</p>
              <input className='input' type="text" onChange={(e) => {setVerificationCode(e.target.value)}} />
              <button className='button' onClick={handleVerification}>Հաստատել</button>
              {isShown1 && <p>Խնդրում ենք կրկին ստուգել</p>}
          </div>
        }
      </form>
    </div>
  )
}
