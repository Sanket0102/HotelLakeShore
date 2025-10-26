import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import moment from "moment"
import {Button} from "react-bootstrap"

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {

    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDay = checkOutDate.diff(checkInDate,"days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()
    
    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(()=> {
      if(isBookingConfirmed){
        navigate("/booking-success")
      }
    },[isBookingConfirmed, navigate])


  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='card card-body mt-5'>
            <h3>Reservation Summary</h3>

            <h5 className='mt-3 mb-3'>FullName : <strong>{booking.guestFullName}</strong></h5>
            <h5 className='mt-3 mb-3'>Email : <strong>{booking.guestEmail}</strong></h5>
            <h5 className='mt-3 mb-3'>Checkin Date : <strong>{moment(booking.checkInDate).format("DD MM YYYY")}</strong></h5>
            <h5 className='mt-3 mb-3'>Checkout Date : <strong>{moment(booking.checkOutDate).format("DD MM YYYY")}</strong></h5>
            <h5 className='mt-3 mb-3'>Number Of Days : <strong>{numOfDay}</strong></h5>

            <div>
                <h5 className='mt-3 mt-5'>Number Of Guest</h5>
                <strong>Adult{booking.numbOfAdults > 1 ? "s": ""} {booking.numOfAdults} </strong>
                <strong>Children : {booking.numOfChildren} </strong>
            </div>

            {payment > 0 ? (
                <>
                  <h4>
                    Total Payment : <strong > ${payment}</strong> 
                  </h4>

                  {isFormValid && !isBookingConfirmed ? (
                    <Button variant = 'success' onClick = {handleConfirmBooking}>{
                        isProcessingPayment ? (
                            <>
                            <span className='spinner-border spinner-border-sm mr-2' role = 'status' aria-hidden ='true'></span>
                            Booking Confirmed, redirecting to payment ....!
                            </>
                        ) : (
                          "Confirm Booking and Proceed to payment"
                        )} </Button> 

                    
                  ):isBookingConfirmed ?(
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='spinner border text-primary' role = 'status'>
                            <span className='sr-only'>Loading..!</span>
                        </div>
                    </div>
                  ):null}
                </>
            ):(
                <p className='text-danger'>Check Out date must be after check in date</p>
            )}
          
        </div>
      </div>
    </div>
  )
}

export default BookingSummary
