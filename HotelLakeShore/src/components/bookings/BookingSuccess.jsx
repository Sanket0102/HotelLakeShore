import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {

const location = useLocation()
const message = location.state?.message
const error = location.state?.error

  return (
    <div>
      <h2>BookingSuccess</h2>
        <div className='mt-5'>
            {message ? (
                <div>
                    <h3 className='text-success'> Booking Success</h3>
                    <p className='text-success'>{message}</p>
                </div>
            ):(
                <div>
                    <h3 className='text-error'>Error...!</h3>
                    <p className='text-error'>The room is already booked </p>
                </div>
            )
            }
        </div>

      
    </div>
  )
}

export default BookingSuccess
