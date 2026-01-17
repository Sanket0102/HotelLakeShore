import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const Registration = () => {
    const[registration, setRegistration] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        roles : [
            {
                roleName : "ROLE_USER"
            }
        ]
    })

    const [errorMessage, setErrorMessage] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setRegistration({...registration, [name]: value})
    }

    const handleRegistration = async(e) =>{
        e.preventDefault();
        try{
           const result = await registerUser(registration)
           setSuccessMessage("User Registered Successfully ",result)
           setErrorMessage("")
           setRegistration({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
             roles : [
            {
                roleName : "ROLE_USER"
            }
        ]
           })
        }
        catch(error){
           setSuccessMessage("")
           setErrorMessage(`Registration error :${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
            setSuccessMessage("")
        },3000)
    }

  return (
    <section className='container col-6 mt-5 mb-5'>
        {errorMessage && <div>
                             <p className='alert alert-danger'>{errorMessage}</p>
                         </div>}
         
        {successMessage && <div>
                             <p className='alert alert-danger'>{successMessage}</p>
                         </div>}

        <h2>Registration</h2>
        <form onSubmit = {handleRegistration}>
             <div className='row'>
                <label htmlFor='firstName' className='col-sm-3 col-form-label'>First Name</label>
                <input className='form-control m-3' id='firstName' type='firtName' name = 'firstName'
                 value={registration.firstName} placeholder = "Enter your first name here" onChange={handleInputChange} />
             </div>
             <div className='row'>
                <label htmlFor='lastName' className='col-sm-3 col-form-label'>Last Name</label>
                <input className='form-control m-3' id='lastName' placeholder = "Enter your Last name here" 
                type='lastName' name = 'lastName' value={registration.lastName} onChange={handleInputChange} />
             </div>
            
             
             <div className='row'>
                <label htmlFor='email' className='col-sm-3 col-form-label'>Email</label>
                <input className='form-control m-3' id='email' type='email' name = 'email'
                 placeholder = "Enter your email adress here" value={registration.email} onChange={handleInputChange} />
             </div>
             <div className='row'>
                <label htmlFor='password' className='col-sm-3 col-form-label'>Password</label>
                <input className='form-control m-3' id='password' 
                placeholder = "Enter your password here" type='password' name = 'password' value={registration.password} onChange={handleInputChange} />
             </div>
             <div className='row justify-content-between'>
                 <button type = 'submit' className='btn btn-primary col-sm-2' >Register</button>
                 <span className='col-sm-6 align-items-end' style = {{marginLeft:"20px"}}>
                    <Link to = {"/login"}>Already have an account</Link>
                 </span>
             </div>

        </form>                 
    </section>
  )
}

export default Registration

