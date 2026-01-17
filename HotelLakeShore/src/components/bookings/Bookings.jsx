import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { cancelBookings, getAllBookings } from '../utils/ApiFunctions'
import BookingsTable from './BookingsTable'
import Header from '../common/Header'
import { set } from 'date-fns'

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[error,SetError] = useState("")
    const[cancelSuccess,setCancelSuccess] = useState("")

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
        setCancelSuccess("")
        SetError("")
       try{
         const success = await cancelBookings(bookingId,token)
         console.log("Cancellation Success Response", success)
         console.log("Success Status", success.status)
         if(success.status === 200){
            console.log("Cancellation Success Message", success.data)
            setCancelSuccess(success.data)
         }
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
        {
           cancelSuccess && (
            <div className="alert alert-success">
                {cancelSuccess}
            </div>
    )}
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
