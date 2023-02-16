import React, { useState } from 'react'
import axios from 'axios'

export default function Teacher() {
  const [isShown, setIsShown] = useState(false)
  const [isShown1, setIsShown1] = useState(false)
  const [isShown2, setIsShown2] = useState(false)
  const [valuequestion, setValueQuestion] = useState('')
  const [valueoptions, setValueOptions] = useState('')
  const [valueanswer, setValueAnswer] = useState('')
  const [optionList, setOptionList] = useState('')

  const handleClick = () => {
    axios.post('http://localhost:5555/quiz', {
      question: valuequestion,
      options: valueoptions,
      answer: valueanswer
    })
    setIsShown(false)
  }

  const options = () => {
    setIsShown(current => !current)
  }

  const withoutOptions = () => {
    setIsShown1(current => !current)
  }

  const manyAnswer = () => {
    setIsShown2(current => !current)
  }

  const addOption = () => {
    setOptionList(optionList => [...optionList, valueoptions])
  }
  
  return (
    <div>
      <h1>You can create Quizes for your pupils</h1>
      <button onClick={options}>Quiz with options</button><br />
        {isShown && 
          <div>
            <label>Question</label>
            <input type="text" onChange={(e) => setValueQuestion(e.target.value)} value={valuequestion}/>
            <label>Option</label>
            <input type="text" onChange={(e) => setValueOptions(e.target.value)} value={valueoptions}/>
            <button onClick={addOption}>Add</button>
            <label>Answer</label>
            <input type="text" onChange={(e) => setValueAnswer(e.target.value)} value={valueanswer}/>
            <button onClick={handleClick}>Add Quiz</button>
            <p>question: {valuequestion}</p>
            <p>option: {optionList}</p>
            <p>answer: {valueanswer}</p>
          </div>
        }
      <button onClick={withoutOptions}>Quiz with inputed answer</button><br />
        {isShown1 && 
          <div>
            <label>Question</label>
            <input type="text" onChange={(e) => setValueQuestion(e.target.value)}/>
            <label>Answer</label>
            <input type="text" onChange={(e) => setValueAnswer(e.target.value)}/>
            <button>Add Quiz</button>
          </div>
        }
      <button onClick={manyAnswer}>Quiz with many answers</button><br />
        {isShown2 &&
          <div>
            <label>Question</label>
            <input type="text" onChange={(e) => setValueQuestion(e.target.value)}/>
            <label>Option</label>
            <input type="text" onChange={(e) => setValueOptions(e.target.value)}/>
            <button>Add</button>
            <label>Answer</label>
            <input type="text" onChange={(e) => setValueAnswer(e.target.value)}/>
            <button>Add Quiz</button> 
          </div>
        }
    </div>
  )
}
