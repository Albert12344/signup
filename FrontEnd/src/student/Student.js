import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export default function Student() {
  const [showInfo, setShowInfo] = useState(false);
  const [data, setData] = useState([]);
  const [quiz, setQuiz] = useState([])

  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleForget =() => {
    cookies.remove("TOKEN")
    localStorage.removeItem('email')
  }
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

  useEffect(() => {
    // API GET request using axios
    axios.get('http://localhost:5555/quiz')
      .then(response => {
        // Update state with the response data
        setQuiz(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  console.log(quiz)

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
            <h5><a href={`/student/home/admin`} className='a'>Իմ Էջը</a></h5>
            <h5><a href="#" className='a'>Առաջադրանքներ</a></h5>
            <h5><a href="/student/login" className='a' onClick={handleForget}>Դուրս Գալ</a></h5>
          </div>
        )}
      </div>
    </div>
  );
}

