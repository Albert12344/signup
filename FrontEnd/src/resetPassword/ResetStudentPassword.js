import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function ResetStudentPassword() {
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState([])
  const [isShown, setIsShown] = useState('')
  const [isShown1, setIsShown1] = useState('')
  const [changePassword, setChangePassword] = useState('')
  const [count, setCount] = useState(0)


  const handleSubmit = () => {
  //   axios.post("http://localhost:5555/resetpupilpassword", {
  //     email: email
  //   })
  //   .then(res => {
  //     if(res.data === 'exist'){
  //       const jwttoken = res.data.token
  //       setJwtToken(jwttoken)
  //       localStorage.setItem('token', jwttoken);
  //     }
  //   setIsShown(true)
  }

  async function handleVerification (e){
  //   e.preventDefault()
  //   const token = localStorage.getItem('token') 
  //   const headers = {
  //     'Authorization': `Bearer ${token}`
  //   }
  //   await axios.post('http://localhost:5555/student/verify', {verificationCode: verificationCode}, {headers})
  //   .then((response) => {
  //     if(response.data === 'Email verified successfully!'){
  //       // history("/student/login")
  //       console.log('hello')
  //     }else{
  //       setCheck(true)
  //       console.log(headers)
  //       console.log('good bye')
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
  }

return (
    <div>
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/><br/>
        <input type="submit" onClick={handleSubmit}/>
        {isShown &&
          <div>
            <p>Please check your email and input here your 6 digit number</p>
            <input type="text" onChange={(e) => {setChangePassword(e.target.value)}} />
            <input type="submit" onClick={handleVerification} />
            {isShown1 && <p>Please double check your 6 digit number</p>}
          </div>}
    </div>
  )
}
