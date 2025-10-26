import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getBookingsByUserId, getUserProfile } from '../utils/ApiFunctions'
import moment from "moment"

const Profile = () => {
    const [user, setUser] = useState({
        id:"",
        email:"",
        firstName:"",
        lastName:"",
        roles:[{roleId:"",roleName:""}]
    })

    const [bookings,setBookings] = useState([{
        bookingId:"",
        room : {
            rommId:"",
            roomType:"",
        },
        checkInDate:"",
        checkOutDate:"",
        bookingConfirmationCode:""
    }])

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    useEffect(()=>{
        const fetchUser = async() => {
            try{
               const userData = await getUserProfile(userId,token)
               setUser(userData)
            }
            catch(error){
               console.error(error)
            }
        }
        fetchUser()
    },[userId])

    useEffect(()=>{
        const fetchBookings = async() =>{
            try{
                const response = await getBookingsByUserId(userId,token)
                setBookings(response)
            }
            catch(error){
                console.log(error)
                setErrorMessage(error.message)
            }
            
        }
        fetchBookings()
    },[userId])

    const handleDeleteAccount = async() => {
        const confirmed = window.confirm(
            'Are you sure You want to Delete? This action cannot be undone'
        )
        if(confirmed){
            await deleteUser(userId)
                 .then((response)=>{
                    setSuccessMessage(response.data)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRole")
                    navigate("/")
                    window.location.reload()

                }).catch((error)=>{
                    setErrorMessage(error.data)
                })
        }
            }

  return (
    <div className='container'>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        {successMessage && <p className='alert alert-danger'>{successMessage}</p>}

        {user ? (
            <div className="card p-5 mt-5" style = {{background:"whitesmoke"}}>
                <h4 className='card-title text-center'> User Information</h4>
                <div className="card-body">
                    <div className="col-md-10 mx-auto">
                        <div className="card mb-3 shadow">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                        <img alt="profile" className='rounded-circle' style={{width:"150px" , height : "150px" ,objectFit:"cover"}} />
                                    </div>
                                </div>
                                <div className='col-md-10'>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label className='col-md-2 col-form-label fw-bold'>ID :</label>
                                            <div className="col-md-10">
                                                <p className='card-text'>{user.id}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <label className='col-md-2 col-form-label fw-bold'>First name :</label>
                                            <div className="col-md-10">
                                                <p className='card-text'>{user.firstName}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <label className='col-md-2 col-form-label fw-bold'>Last name :</label>
                                            <div className="col-md-10">
                                                <p className='card-text'>{user.lastName}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <label className='col-md-2 col-form-label fw-bold'>Email :</label>
                                            <div className="col-md-10">
                                                <p className='card-text'>{user.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <label className='col-md-2 col-form-label fw-bold'>Roles :</label>
                                            <div className="col-md-10">
                                               <ul className='list-unstyled'>
                                                    {
                                                       user.roles.map((role)=> (
                                                        <li key = {role.roleId} className='card-text'>
                                                            {role.roleName}
                                                        </li>
                                                       ))
                                                    }
                                               </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                    
                            </div>

                        </div> 
                        <h4 className='card-title text-center'>Booking History</h4>
                        {bookings.length > 0 ? (
                            <table className='table table-bordered table-hover shadow'>
                                <thead>
                                    <tr>
                                        <th scope = "col">Booking Id</th>
                                        <th scope = "col">Room Id</th>
                                        <th scope = "col">Room Type</th>
                                        <th scope = "col">Check-in Date</th>
                                        <th scope = "col">Check-out Date</th>
                                        <th scope = "col">Confirmation Code</th>
                                        <th scope = "col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index)=>{
                                        <tr key = {index}>
                                            <td>{booking.id}</td>
                                            <td>{booking.room.id}</td>
                                            <td>{booking.room.roomType}</td>

                                            <td>
                                                {moment(booking.checkInDate).subtract(1, "month").format("MMM Do YYYY")}
                                            </td>

                                            <td>
                                                {moment(booking.checkOutDate).subtract(1, "month").format("MMM Do YYYY")}
                                            </td>
                                            <td>{booking.bookingConfirmationCode}</td>
                                            <td className='text-success'>On-Going</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        ):(
                            <p> You have not made any bookings yet</p>
                        )}  
                        <div className="d-flex justify-content-center">
                            <div className="mx-2">
                                <div className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                                    Close Account
                                </div>
                            </div>
                        </div>                     
                    </div>

                </div>

            </div>

        ):(
           <p>Loading user Data</p>
        )
        }      
    </div>
  )
}

export default Profile
