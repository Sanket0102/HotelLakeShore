import React, { useEffect, useState } from 'react'
import { assignRole, getAllUser } from '../utils/ApiFunctions'
import AssignRoles from './AssignRoles'
import RemoveRoles from './RemoveRoles'

const ManageRoles = () => {

    const [userData, setUserData] = useState([{
        userId:"",
        firstName:"",
        lastName:"",
        email:"",
        roles:[{
          roleId:"",
          roleName:""
        }]
    }])

    const [errorMessage,setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

   const token = localStorage.getItem("token")

    const [isLoading,setIsLoading] = useState(false)

    const fetchAllUsers = async() =>{
      setIsLoading(true)
      try{
        const result = await getAllUser(token)
        console.log(result)
        setUserData(result)
        setIsLoading(false)
      }
      catch(error){
       setErrorMessage(error.message)
       setIsLoading(false)
      }
   }

    useEffect(()=>{
      
      fetchAllUsers()
    },[])

    const handleRoles = () =>{
        fetchAllUsers()
    }
// form -data

 




  return (
    <>
      {isLoading ? (<p>Loading user Data</p>) :(
      <>
      <h2 className='mt-1 mb-1'>Manage Roles</h2>
      <h5 className='mt-3 mb-3'>All User Data</h5>
      <div className='container m-3'>
        <table className='table table-stripped table-hover m-3'>
          <thead>
            <tr className='text-center'>
              <td>User Id</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Roles</td>
            </tr>
          </thead>
          <tbody >
            
              {userData.map((user) => (
                <tr key = {user.userId} className='text-center'>
                   <td>{user.userId}</td>
                   <td>{user.firstName}</td>
                   <td>{user.lastName}</td>
                   <td>{user.email}</td>
                   {user.roles.map((role) => (
                    <td key = {role.roleId}>
                      <tr>{role.roleId} ":" {role.roleName}</tr> 
                    </td>
                   ))}

                </tr>
              ))}
          </tbody>
        </table>     
      </div>
      < AssignRoles />
      < RemoveRoles />
      
      </>
      )}
    </>
  )
}

export default ManageRoles
