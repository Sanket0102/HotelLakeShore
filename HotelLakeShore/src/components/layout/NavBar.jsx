import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-bootstrap'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/AuthProvider'

const NavBar = () => {

    const[showAccount ,setShowAccount] = useState(false)

    const{ user} = useContext(AuthContext)

    const handleAccountClick = () =>{
        setShowAccount(!showAccount)
    }

    const isLoggedIn = user !== null
    const userRole = localStorage.getItem("userRole")

  return (
    <nav className = 'navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-0 sticky-top'>
        <div className='container-fluid'>
            <Link to= {"/"} className='navbar-brand'>
               <span className='hotel-color'>Hotel Lake Shore</span>
            </Link>
            <button className='navbar-toggler' type = 'button' data-bs-toggle="collapse" data-bs-target = "#navbarScroll" aria-controls='navbarScroll'
                    aria-expanded = 'false' aria-label = 'Toggle Navigation'>
                        <span className='navbar-toggler-icon'></span>
              
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={"/browse-all-rooms"}>Browse All Room</Link>
                    </li>
                {
                    
                isLoggedIn && userRole.includes('ROLE_ADMIN') && ( 
                    <li className="nav-item">
                        <Link className="nav-link" aria-current = "page" to = {"/admin-panel"}>Admin</Link>
                    </li>)
                }
                   
                </ul>

                <ul className = 'd-flex navbar-nav'>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/find-booking"}>
                          Find My Booking 
                        </Link>
                    </li> 
                    <li className="nav-item dropdown">
                        <a className={`nav-link dropdown-toggle ${showAccount ? "show":""}`}  href = "#"  aria-expanded = 'false' 
                        role='button' data-bs-toggle = 'dropdown' onClick={handleAccountClick}>{" "} Account </a>
                        <ul className={`dropdown-menu ${showAccount ? "show":""}`} aria-labelledby="navbarDropdown">
                            {isLoggedIn ? (
                            
                                <Logout />    
                                
                            ):(
                                <>
                                <li>
                                    <Link to  = {"/login"} className='dropdown-item'>Log In</Link>
                                </li>
                                 <li>
                                    <Link to  = {"/register"} className='dropdown-item'>Register</Link>
                                </li>
                                </>
                            )}
                                
                            
                        </ul>
                    </li> 
                    
                </ul>
                
            </div>

        </div>
      
    </nav>
  )
}

export default NavBar
