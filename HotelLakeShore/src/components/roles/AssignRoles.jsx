import React, {useState} from 'react'
import { assignRole } from '../utils/ApiFunctions'

const AssignRoles = () => {

    const [roleData, setRoleData] = useState({
        userId:0,
        roleId:0
    })

    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
     
    const handleInputChange= (e) =>{
        const {name ,value} = e.target 
        setRoleData({...roleData,[name]:value})
    }

    const token = localStorage.getItem("token")
     
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            console.log("userId :",roleData.userId)
            console.log("roleId :",roleData.roleId)
            const result = await assignRole(roleData.userId, roleData.roleId,token)
            if(result!== undefined){
                setTimeout(()=>{
                    setSuccessMessage("")
                },3000)
                setSuccessMessage("Role Has Has Been Assigned SuccessFully")

                
            }
        }
        catch(error){
           console.log(error)
           console.log(error.message)
           setTimeout(()=>{
            setErrorMessage("")
           },3000)
           setErrorMessage(error.message)
        }
    }
       

  return (
    <div>
      <h5 className='mt-3'> Assign Role</h5>
      {errorMessage && <p className='alert alert-danger'> Error assiging role: {errorMessage}</p>}
      {successMessage && <p className='alert alert-primary'>{successMessage}</p>}

      <div className='container m-3'>
        <form onSubmit={handleSubmit}>  
            <div className='row d-flex'>   
              <div className='col col-sm-3'>     
                <div className = 'form-group mt-3'>
                  <label htmlFor="userId">User ID</label>
                  <input className='form-control m-1' type = "number" id = "userId" placeholder='Enter UserID here' onChange={handleInputChange}
                    name = "userId" value = {roleData.userId}></input>
                </div>
              </div>
              <div className='col col-sm-3'>  
                <div className = 'form-group mt-3'>
                  <label htmlFor="roleId">Role ID</label>
                  <input className='form-control m-1' type = "number" id = "roleId" placeholder='Enter roleID here' onChange={handleInputChange}
                    name = "roleId" value = {roleData.roleId}></input>
                </div>
              </div>  
            </div>
            <div>
              <button className = "btn btn-warning" type = "submit">Assign Role</button>
            </div>
         
        </form>
      </div>
    </div>
  )
}

export default AssignRoles
