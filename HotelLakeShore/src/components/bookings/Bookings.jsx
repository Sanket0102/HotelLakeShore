import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { cancelBookings, getAllBookings } from '../utils/ApiFunctions'
import BookingsTable from './BookingsTable'
import Header from '../common/Header'

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[error,SetError] = useState("")

    const token = localStorage.getItem("token")

    useEffect(()=>{
        setTimeout(()=>{
            getAllBookings().then((data)=>{
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error)=>{
                SetError(error.message)
                setIsLoading(false)
            })
        },2000)
    },[]) 

    const handleBookingCancellation = async(bookingId) => {
        console.log(bookingId)
        console.log(typeof(bookingId))
       try{
         await cancelBookings(bookingId,token)
         const data = await getAllBookings()
         setBookingInfo(data)        
       }
       catch(error){
        SetError(error.message)
       }
    }
  return (
    <section className='container' style = {{backgroundColor:"whitesmoke"}}>
        <h2>Existing Bookings</h2>
        {error && (<div><p className='text-danger'>{error}</p></div>)}
        {isLoading ? (<div>
           <p>Loading ExistingBookings</p>
        </div>):(
            <BookingsTable bookingInfo = {bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
        )} 
      
    </section>
  )
}

export default Bookings
