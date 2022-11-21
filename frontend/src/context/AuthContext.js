import {createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [admin, setAdmin] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    let loginUser = async (e) => {
        e.preventDefault()
        console.log('Form is submitted')

        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            console.log(data.access);
            console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",data);

            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/home')
        }else{
            Swal.fire("Error",'Invalid Credentials!!')
        }
    }

    let logoutUser = () => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure to logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                navigate('/')
            }
        })
    }

    let updateToken = async() => {
        console.log('Update Toked Called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    // Admin Login and Logout


    let loginAdmin = async (e) =>{
        console.log('admin loging innnnnnn')
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            console.log(data.access);
            console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",data);
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))

            if(admin.is_admin){
                console.log(authTokens, 'aaadddd')
                navigate('/sidebar')
            }else{
                setAuthTokens(null)
                setAdmin(null)
                localStorage.removeItem('authTokens')
                Swal.fire("Error", 'Invalid Credentials!!')
            }
            
        }else{
            Swal.fire("Error",'Invalid Credentials!!')
        }

    }

    let logoutAdmin = () => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure to logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null)
                setAdmin(null)
                localStorage.removeItem('authTokens')
                navigate('/adminLogin')
            }
        })
    }

    let updateAdminToken = async() => {
        console.log('Update Toked Called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutAdmin()
        }

        if(loading){
            setLoading(false)
        }
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        admin:admin,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
    }

    useEffect(()=> {
       let fourMinutes = 1000 * 60 * 10
       let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
                updateAdminToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}