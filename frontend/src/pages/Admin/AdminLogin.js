import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'


function AdminLogin() {
    // let { loginUser } = useContext(AuthContext);

      let {loginAdmin, user,authTokens} = useContext(AuthContext)
      const navigate = useNavigate()
  
      
  
      const [formErrors, setFormErrors] = useState({})
      const [isSubmit, setIsSubmit] = useState(false)
      const [userData, setUserData] = useState({
          'username':'',
          'password':'',
      })
  
      const handleChange = (e)=>{
          setUserData({
              ...userData,
              [e.target.name]:e.target.value
          })
          
      }
  
      const handleSubmit = ()=>{
          
          setFormErrors(validate(userData))
  
      }
  
      useEffect(()=>{
          if(Object.keys(formErrors).length === 0 && isSubmit){
              console.log(userData);
          }
      },[formErrors])
  
  
      const validate = (values) =>{
          const errors = {}
          if(!values.username){
              errors.username="Username required"
          }
          if (!values.password) {
              errors.password= "Password is required"
          }
          return errors
      }
  
    return (
      <div className="w-full py-32 h-screen top-0">
        {/* <img className="object-cover w-full" src="https://images.unsplash.com/photo-1653849753645-340aa6b4c636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img> */}
        {/* <div className="flex justify-center place-content-center h-screen bg-red-500 my-auto"> */}
        <div className="w-full shadow-md rounded max-w-lg my-auto mx-auto  bg-white ">
          <h1
            className="text-blue-900 text-4xl  justify-center text-center
           font-extrabold"
          >
            Admin Here{" "}
          </h1>
          <form className=" px-8 pt-6 pb-8 " onSubmit={loginAdmin} >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                id="password"
                type="password"
                placeholder="******************"
                onChange={handleChange}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    );
}

export default AdminLogin