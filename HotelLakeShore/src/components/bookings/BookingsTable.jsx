import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'
import moment from "moment"

const BookingsTable = ({bookingInfo , handleBookingCancellation}) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking)=>{
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
        
    }

    useEffect(()=>{
        setFilteredBookings(bookingInfo)
    },[bookingInfo])

    return (
    <section className=''>
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>

        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking Id</th>
                    <th>RoomId</th>
                    <th>Room Type</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Number Of Adults</th>
                    <th>Number Of Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan = {2}>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredBookings.map((booking, index) => (
                <tr key = {booking.bookingId}>
                    <td>{index + 1}</td>
                    <td>{booking.bookingId}</td>
                    <td>{booking.roomResponse.id}</td>
                    <td>{booking.roomResponse.roomType}</td>
                    <td>{moment(booking.checkInDate).format("DD-MM-YYYY")}</td>
                    <td>{moment(booking.checkOutDate).format("DD-MM-YYYY")}</td>
                    <td>{booking.guestFullName}</td>
                    <td>{booking.guestEmail}</td>
                    <td>{booking.numOfAdults}</td>
                    <td>{booking.numOfChildren}</td>
                    <td>{booking.totalNumOfGuest}</td>
                    <td>{booking.bookingConfirmationCode}</td>
                    <td>
                        <button className='btn btn-danger btn-sm' onClick = {()=>handleBookingCancellation(booking.bookingId)}>Cancel</button>
                    </td>
                </tr>

    ))}
            </tbody>
        </table>
       {filterBookings.length === 0 && <p> No booking found for the selected Dates</p>}
    </section>
  )
}

export default BookingsTable
