import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions';
import {Link, useNavigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import { AuthContext } from './AuthProvider';


const Login = () => {

    const [errorMessage,setErrorMessage] = useState("")
    const [loginData,setLoginData] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate();

    const {handleLogin} = useContext(AuthContext) 

    const handleInputChange = (e) =>{
       setLoginData({...loginData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const success = await loginUser(loginData)
        if(success){
            const token = success.token
            handleLogin(token)
            window.location.reload
            navigate("/",{state : {message: "You have loggedIn succesfully" }})
        }
        else{
            setErrorMessage("Invalid Username and Password...!")
        }
        setTimeout(()=>{
            setErrorMessage
        },3000)
    }

  return (
    <section className='container col-md-6 mt-5 mb-5'>
       {errorMessage && <p className='alert alert-message'>{errorMessage}</p>}
       <h2>Login</h2>
       <form onSubmit = {handleSubmit}>
             <div className='row'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <input className='form-control m-3' id='email' type='email' 
                placeholder = "Enter your email address here" name = 'username' value={loginData.username} onChange={handleInputChange} />
             </div>
             <div className='row'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <input className='form-control m-3' id='password' type='password'
                 placeholder = "Enter your password here" name = 'password' value={loginData.password} onChange={handleInputChange} />
             </div>
             <div className='row justify-content-between'>
                 <button type = 'submit' className='btn btn-warning col-sm-3'>Login</button>
                 <span className = "col-sm-6" style = {{marginLeft:"20px"}}>
                    <Link to = {"/register"}>Don't have an account</Link>
                 </span>
             </div>

       </form>
      
    </section>
  )
}

export default Login
