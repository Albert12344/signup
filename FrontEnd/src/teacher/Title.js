import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Title() {
  const history = useNavigate()
  const [title, setTitle] = useState('')

  const onSubmit = () => {
    localStorage.setItem('title', title)
    history('/teacher/home/create')
  }

  return (
    <div>
        <form onSubmit={onSubmit}>
          <h1>Հաստատելու համար սեղմեք Enter</h1>
          <input type="text" name="" id="" className='input' placeholder='Մուտքագրեք Վեռնագիր' onChange={(e) => setTitle(e.target.value)} required/>
        </form>
    </div>
  )
}
