import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'

const Home = () => {

   const location = useLocation()
   const message = location.state && location.state.message
   const currentUser = localStorage.getItem("userId")

  return (
    <section>
       {message && <p className = "alert alert-warning m-2">{message}</p>}
       {currentUser && <h6 className='text-success text-venter'>Welcome {currentUser}</h6>}
       <HeaderMain></HeaderMain>
       
       <section className = 'container'>
       <RoomCarousel />
       <RoomSearch />
        <Parallax />
        <HotelService />
        <Parallax />

        
       </section>
       
    </section>
  )
}

export default Home
