import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  
  return (
    <div className='homeContainer'>
      <img className="img" src="https://upload.wikimedia.org/wikipedia/hy/9/9a/%D4%BB%D6%80%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A4%D5%BA%D6%80%D5%B8%D6%81.jpg" alt="" />
      <div className='router'>
        <h1>Մուտք գործել որպէս <Link to='/teacher/login' className='link'>Ուսուցիչ</Link></h1>
        <br />
        <h2>Կամ</h2>
        <br />
        <h1>Մուտք գործել որպէս <Link to='/student/login' className='link'>Ուսանող</Link></h1>
      </div>
    </div>
  )
}
