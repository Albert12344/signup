import axios from 'axios'
import React, { useState } from 'react'

export default function FirstQuiz() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([''])
  const [answer, setAnswer] = useState('')

  const handleAddInput = () => {
    setOptions([...options, ''])
  }

  const handleRemoveInput = () => {
    setOptions(options.slice(0, -1));
  }

  const handleInputChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  async function handleSubmit() {
    try {
        const title = localStorage.getItem('title')
        const response = await axios.post('http://localhost:5555/firsttype', {
            title: title,
            question,
            options, 
            answer
        })
        console.log(response.data)
        window.location.reload(false)
    } catch(error) {
        console.log(error)
    }

  }

  return (
    <div className='type'>
        <label className='label'>Հարց</label><br />
        <input className='input' type="text" placeholder='Հարց' onChange={(e) => setQuestion(e.target.value)} />
      {options.map((option, index) => (
        <div key={index}>
          <label className='label'>Տարբերակ</label><br />
          <input
            className='input'
            type="text"
            value={option}
            placeholder='Տարբերակ'
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className='buttonDiv'>
        <button className='button' onClick={handleAddInput}>Ավելացնել</button>
        <button className='button' onClick={handleRemoveInput}>Ջնջել</button>
      </div>
      <label className='label'>Պատասխան</label><br />
      <input className='input' type="text" placeholder='Պատասխան' onChange={(e) => setAnswer(e.target.value)} /><br/>
      <button className='button' onClick={handleSubmit}>Հաստատել</button>
    </div>
  )
}
