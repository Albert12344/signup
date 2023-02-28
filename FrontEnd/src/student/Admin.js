import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Admin() {
  const [data, setData] = useState([])

  const email = localStorage.getItem('email')

  useEffect(() => {
    // API GET request using axios
    axios.get(`http://localhost:5555/student/getinfo/${email}`)
      .then(response => {
        // Update state with the response data
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [email])

  return (
    <div className='dataDiv'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" className='userImg1' alt=''/>
        <input type="file" />
        <h3>Անուն: {data.name}</h3>
        <h3>Ազգանուն: {data.lastname}</h3>
        <h3>Եղեկտրոնային Փոստ: {data.email}</h3>
    </div>
  )
}
