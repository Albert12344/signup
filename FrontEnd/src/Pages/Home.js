import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  
  return (
    <div>
      <h1>Log in as <Link to='/teacher/login'>Teacher</Link></h1>
      <br />
      <h1>Or</h1>
      <br />
      <h1>Log in as <Link to='/student/login'>Student</Link></h1>
    </div>
  )
}
