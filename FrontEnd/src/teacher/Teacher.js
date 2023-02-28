import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()



export default function Teacher() {
  const email = localStorage.getItem('email')
  const [showInfo, setShowInfo] = useState(false)
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])


  const handleToggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleForget =() => {
    cookies.remove("TOKEN")
  }
  const handleClick1 = () => {
    alert('hello')
  }

  useEffect(() => {
    // API GET request using axios
    axios.get(`http://localhost:5555/teacher/getinfo/${email}`)
      .then(response => {
        // Update state with the response data
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [email])

  useEffect(() => {
    // API GET request using axios
    axios.get(`http://localhost:5555/student/getallinfo`)
      .then(response => {
        // Update state with the response data
        setAllData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className='container2'>
      <div className='userPanel'>
        <div className='student'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" className='userImg' alt=''/>
          <label className='label'>{data.name + ' ' + data.lastname}</label>
          <button className="infoBtn" onClick={handleToggleInfo}>/</button>
        </div>
        {showInfo && (
          <div className='userInfo'>
            <h5><a href={`/teacher/home/admin`} className='a'>Իմ Էջը</a></h5>
            <h5><a href="#" className='a'>Առաջադրանքներ</a></h5>
            <h5><a href="/teacher/login" className='a' onClick={handleForget}>Դուրս Գալ</a></h5>
          </div>
        )}
      </div>
      <div className='dropdown' key={email}>
        <button className="dropbtn">Ա կուրս</button>
          <div className="dropdown-content">
            {!! allData.length && allData.map((student) => {
              if (student.course === 1) {
                return <a key={email}>{student.email}</a>
              }
            })}
            <a href="/teacher/home/title">Create</a>
          </div>
      </div>
      <div className='dropdown'>
        <button className="dropbtn">Բ կուրս</button>
          <div className="dropdown-content">
            {!! allData.length && allData.map((student) => {
              if (student.course === 2) {
                return <a key={email}>{student.email}</a>
              }
            })}
            <a href="/teacher/home/create">Create</a>
          </div>
      </div>
      <div className='dropdown'>
        <button className="dropbtn">Գ կուրս</button>
          <div className="dropdown-content">
            {!! allData.length && allData.map((student) => {
              if (student.course === 2) {
                return <a key={email}>{student.email}</a>
              }
            })}
            <a href="/teacher/home/create">Create</a>
          </div>
      </div>
      <div className='dropdown'>
        <button className="dropbtn">Դ կուրս</button>
          <div className="dropdown-content">
            {!! allData.length && allData.map((student) => {
              if (student.course === 2) {
                return <a key={email}>{student.email}</a>
              }
            })}
            <a href="/teacher/home/create">Create</a>
          </div>
      </div>
    </div>
  )
}

