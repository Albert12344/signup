import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function ResetTeacherPassword() {
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState([])
  const [isShown, setIsShown] = useState('')
  const [isShown1, setIsShown1] = useState('')
  const [changePassword, setChangePassword] = useState('')
  const [count, setCount] = useState(0)


  const handleSubmit = () => {
    axios.post("http://localhost:5555/resetpupilpassword", {
      email: email
    })
    setIsShown(true)
    setCount(resetToken)
  }

  const handleChange = () => {
    if(resetToken[count] == changePassword) {
      console.log('hello')
      history(`/newpassword/${resetToken}`)
    }else {
      setIsShown1(true)
    }
  }

  const resetToken = token.map((token) => {
    return token.resetPasswordNumber
  })
  console.log(token)
  console.log(resetToken[count])

  useEffect(() => {
    axios.get('http://localhost:5555/getpupiltoken')
    .then(res => {
    setToken(res.data)
    })
  }, [])

return (
    <div>
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/><br/>
        <input type="submit" onClick={handleSubmit}/>
        {isShown &&
          <div>
            <p>Please check your email and input here your 6 digit number</p>
            <input type="text" onChange={(e) => {setChangePassword(e.target.value)}} />
            <input type="submit" onClick={handleChange} />
            {isShown1 && <p>Please double check your 6 digit number</p>}
          </div>}
    </div>
  )
}
