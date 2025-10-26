import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5 mb-5'>
        <h2>Admin panel</h2>
        <hr />
        <Link to={"/existing-rooms"} className='btn btn-hotel'> Manage Rooms </Link>
        <Link to={"/existing-bookings"} className='btn btn-hotel'>Manage Bookings </Link>
        <Link to={"/manage-roles"} className='btn btn-hotel'>Manage Roles </Link>
      
    </section>
  )
}

export default Admin

