import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Header = () => {
  let {user,logoutUser} = useContext(AuthContext)
  return (
    <div className='text-center text-4xl mt-6 text-violet-900 mb-6'>
        <Link to="/"> Home</Link>
        <span> | </span>
        {user ? (
          <p onClick={logoutUser}>Logout</p>
        ):(
          <Link to="/"> Login</Link>
        )}

        {user && <p> Welcome {user.username} </p> }
        

    </div>
  )
}

export default Header