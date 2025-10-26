import React from 'react'
import { Navigate, useLocation,Link } from 'react-router-dom'

const RequireAuth = ({children}) => {

    const currentUser = localStorage.getItem("userId")    
    const location = useLocation()
  
    
      if(!currentUser){
          return (
            <Navigate to = "/login" state = {{path: location.pathname}}/> 
          )
      }
      return children

}

export default RequireAuth
