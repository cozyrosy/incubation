import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

function NavBar() {
  let {user,logoutUser} = useContext(AuthContext)

  return (
    <div className='bg-violet-900 flex justify-between '>


    {user ? (
          <button className='text-white bg-violet-700 font-bold py-2 px-4 mb-2 mt-2 ml-2 rounded focus:outline-none' onClick={logoutUser}>Logout</button> 
        ):(
          <Link to="/login"> Login</Link>
        )}

        {user && <p className='text-white mb-2 mt-2 mr-2'>  {user.username} </p> }
   
    </div>
  )
}

export default NavBar