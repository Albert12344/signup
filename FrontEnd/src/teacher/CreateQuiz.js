import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import SecondQuiz from './SecondQuiz'
import FirstQuiz from './FirstQuiz'
import ThirdType from './ThirdType'
const cookies = new Cookies()



export default function Teacher() {
  const email = localStorage.getItem('email')
  const [title, setTitle] = useState('')
  const [showTitle, setShowTitle] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [showQuizType1, setShowQuizType1] = useState(false)
  const [showQuizType2, setShowQuizType2] = useState(false)
  const [showQuizType3, setShowQuizType3] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [data, setData] = useState([])
  const [quiz, setQuiz] = useState([])

  const handleToggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleForget =() => {
    cookies.remove("TOKEN")
  }

  async function createQuiz1(e) {
    e.preventDefault()
    setShowQuizType1(true)
    setShowQuizType2(false)
    setShowQuizType3(false)
    setShowButton(false)
  }

  async function createQuiz2(e) {
    e.preventDefault()
    setShowQuizType1(false)
    setShowQuizType2(true)
    setShowQuizType3(false)
    setShowButton(false)
  }

  async function createQuiz3(e) {
    e.preventDefault()
    setShowQuizType1(false)
    setShowQuizType2(false)
    setShowQuizType3(true)
    setShowButton(false)
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

  const quizTitle = localStorage.getItem('title')
  
  useEffect(() => {
    // API GET request using axios
    axios.get(`http://localhost:5555/quiz/${quizTitle}`)
      .then(response => {
        // Update state with the response data
        setQuiz(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])  

  const question = quiz.map((question) => {
    return question.question
  })

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
            <h5><a href="/jell" className='a'>Առաջադրանքներ</a></h5>
            <h5><a href="/teacher/login" className='a' onClick={handleForget}>Դուրս Գալ</a></h5>
          </div>
        )}
      </div>
      <div className='body'>
        {showButton && (
          <div className='showButtons'>
              <button className='button' onClick={createQuiz1}>Տեսակ 1</button>
              <button className='button' onClick={createQuiz2}>Տեսակ 2</button>
              <button className='button' onClick={createQuiz3}>Տեսակ 3</button>
          </div>
        )}
        <div className='Quiz'>
          {showQuizType1 && (
            <FirstQuiz/>
          )}
          {showQuizType2 && (
            <SecondQuiz/>
          )}
          {showQuizType3 && (
             <ThirdType/>
          )}
        </div>
        <div className='quiz'>
          {!!quiz.length && question.map(question => (<p href='#'>{question}</p>))}
        </div>
      </div>
    </div>
  )
}

