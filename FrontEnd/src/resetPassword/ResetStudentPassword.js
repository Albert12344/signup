import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function ResetStudentPassword() {
  const history = useNavigate()

//Reset Detail
  const [email, setEmail] = useState('')

//Show or Hide anything
  const [verify, setVerify] = useState(false)
  const [doubleCheck, setDoubleCheck] = useState(false)
  const [updatePass, setUpdatePass] = useState(false)
  const [restorePass, setRestorePass] = useState(true)
  const [notMatch, setNotMatch] = useState(false)

//Verification Code
  const [verificationCode, setVerificationCode] = useState('')

//Update Password
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

//Change input color black to red after wrong input
  const [inputColor, setInputColor] = useState('black');


//Reset Detail
  async function handleSubmit(e) {
    try {
      e.preventDefault()
        const response = await axios.post("http://localhost:5555/student/reset", {
          email: email
        })
          if(response.data.status === 'exist'){
            setVerify(true)
            localStorage.setItem('token', response.data.token);
          }
          else {
            setVerify(true)
          }
    }
    catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
      setVerify(true)
    }
  } 


//Verify Email
  async function handleVerification(e) {
    try{
      e.preventDefault()

        const token = localStorage.getItem('token') 
        const headers = {
        'Authorization': `Bearer ${token}`
        }

        const response = await axios.post('http://localhost:5555/student/verify', {verificationCode: verificationCode}, {headers})
          if(response.data === 'Email verified successfully!'){
            setRestorePass(false)
            setUpdatePass(true)
          }
    }catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;
      }
        setDoubleCheck(true)
    }
  }


//Update Password
  async function handleUpdate(e, email) {
    e.preventDefault();
    try {

      if(password !== repeatPassword) {
        setNotMatch(true)
        setInputColor('red')

      }else {
        const response = await axios.put(`http://localhost:5555/student/update/${email}`, {password})
          
          if(response.data.status === 'updated') {
            history('/student/login')
          }
        }
    }catch(error) {
      if (!error.response) {
        console.log('something wrong');
        return;    
      }
    }
  }

return (
  //Reset Passsword
    <div className='container'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
    {/* Input Email */}
      {restorePass && 
        <form className='form'>
          <h2>Գաղտնաբառի վերականգնում</h2>
            <input className='input' type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Եղեկտրոնային փոստ'/><br/>
            <button className='button' onClick={handleSubmit}>Հաստատել</button>
        {/* Verify Email */}
          {verify &&
            <div className='form'>
                <p className='p'>Խնդրում ենք ստուգել ձեր եղ․ փոստը եւ մուտքագրել ստացուած 6 նիշանոց թիւը</p>
                <input className='input' type="text" onChange={(e) => {setVerificationCode(e.target.value)}} placeholder='Նույնականացման Կոդ' />
                <button className='button' onClick={handleVerification}>Հաստատել</button>
                {doubleCheck && <p>Խնդրում ենք կրկին ստուգել</p>}
            </div>
          }
        </form>
      }
    {/* Update Password */}
      {updatePass && 
        <form className='form'>
          <h1>Նոր Գաղտնաբառ</h1>  
          <label className='label'>Գաղտնաբառ</label><br /> 
          <input className='input' type="password" onChange={(e)=>{setRepeatPassword(e.target.value)}} placeholder='Նոր Գաղտնաբառ' required/><br/>
          <label className='label'>Կրկնեք Գաղտնաբառը</label><br />
          <input className='input' style={{ borderColor: inputColor }} type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Կրկնեք Գաղտնաբառը' required/><br/>
          {notMatch && <p style={{ color: inputColor }}>Գաղտնաբառերը համապատասխան չեն</p> }
          <p>Նուազագոյնը 6 նիշ</p>
          <button className='button' onClick={(e) => handleUpdate(e, email)}>Հաստատել</button>
        </form>
      }
    </div>
  )
}