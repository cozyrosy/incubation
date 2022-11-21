import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  
  const navigate = useNavigate()
function odiko()
{
  navigate('/application')
}

  return (
    <div>
      <NavBar/>
      <button onClick={odiko} className="bg-violet-900 hover:bg-violet-800 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">New application</button>
        <h1>You are logged in !</h1>
        <ul>
          
        </ul>
    </div>
  )
}

export default HomePage