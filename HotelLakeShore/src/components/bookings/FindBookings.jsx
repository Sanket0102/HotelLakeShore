import React, { useState } from 'react'
import CheckOut from './CheckOut'
import { getBookingByConfirmationCode, cancelBookings } from '../utils/ApiFunctions'
import moment from "moment"

const FindBookings = () => {

    const [confirmationCode, setConfirmationCode] = useState("")
    const [error,setError] = useState("")
    const[isLoading,setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState()

    const token = localStorage.getItem("token")

    const [bookingInfo, setBookingInfo] = useState({
        bookingId:"",
        roomResponse:{
            id:""
        },
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate: "",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuest:"",
    })

    const [isDeleted, setIsDeleted] = useState(false)

    const clearBookingInfo ={
        
            bookingId:"",
            roomResponse:{
                id:""
            },
            bookingConfirmationCode:"",
            roomNumber:"",
            checkInDate:"",
            checkOutDate: "",
            guestFullName:"",
            guestEmail:"",
            numOfAdults:"",
            numOfChildren:"",
            totalNumOfGuest:"",
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
           const data = await getBookingByConfirmationCode(confirmationCode,token)
           setBookingInfo(data)
        }
        catch(error){
            setBookingInfo(clearBookingInfo)
           if(error){
            setError(error.message)
           }
           else{
            setError(error.response)
           }
        }
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    }

    const handleBookingCancellation = async(bookingId) => {
        try{
           await cancelBookings(bookingInfo.bookingId,token)
           setIsDeleted(true)
           setSuccessMessage("Booking has been Canncelled Successfully..!")
           setBookingInfo(clearBookingInfo)
           setConfirmationCode("")
           
        }
        catch(error){
           setError(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setError("")
            
        },3000)
    }


  return (
    <>
        <div className='container mt-5'>
            <h2 className='d-flex justify-content-center align-items-center'>
                Find My Bookings
            </h2>
            <div className = "container m-3 d-flex justify-content-center align-items-center" > 
                <form onSubmit = {handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input className='form-control' id = 'confirmationCode' name='confirmationCode' value = {confirmationCode} 
                        onChange = {handleInputChange} placeholder = "Enter the Booking Confirmation Code">
                        </input>
                        <button className='btn btn-hotel input-group-text'>Find Booking</button>
                    </div>
                </form>
            </div>
            {isLoading ? (
            <div>Finding Your Booking </div>
            ):error ?(
                <div className='text-danger'>{error}</div>
            ): bookingInfo.bookingConfirmationCode ? (
                <div className='col-md-6 mt-4 mb-4 offset-md-3'>
                    <h3>Booking Information</h3>

                    <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking ID : {bookingInfo.bookingId}</p>
                    <p>Room Number : {bookingInfo.roomResponse.id}</p>
                    <p>Room Type : {bookingInfo.roomResponse.roomType}</p>
                    <p>Check-in Date : {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}</p>
                    <p>Check-out Date : {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}</p>
                    <p>Full Name : {bookingInfo.guestFullName}</p>
                    <p>Email address : {bookingInfo.guestEmail}</p>
                    <p>Adults : {bookingInfo.numOfAdults}</p>
                    <p>Children : {bookingInfo.numOfChildren}</p>
                    <p>Total Guests : {bookingInfo.totalNumOfGuest}</p>
                    
                    {!isDeleted && (
                        <button className='btn btn-danger' onClick={() =>handleBookingCancellation(bookingInfo.bookingId)}>Cancel Booking</button>
                        
                    )}

                </div>
            ):(
                <div>
                    Find Booking.......!!
                </div>    
            )}
            {isDeleted && (
                <div className='alert alert-success mt-3 mb-3' role='alert'>{successMessage}</div>
            )}      
        </div>
    </>
    
  )
}

export default FindBookings
