import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
      <div>
        <h1 className='text-center'>Welcome to the App</h1>
      <nav className='flex justify-center align-middle '>
        <Link to="/login">Login</Link> | <Link to="/registration">Registration</Link>
      </nav>
    </div>
  )
}
