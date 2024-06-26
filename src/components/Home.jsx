import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user}) => {

  const navigate=useNavigate();
 const handleClick=()=>{
  alert("Logout successfully")
    navigate('/login')
 }
  return (
    <div className='welcomeGreeting'>
    <h1>  Welcome {user.name} !🤗</h1>
    <button onClick={handleClick}>Log Out</button> 
    </div>
  )
}

export default Home
