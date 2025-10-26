
import './App.css'
import AddRooms from './components/rooms/AddRooms'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ExistingRooms from './components/rooms/ExistingRooms'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Home from "./components/home/Home"
import EditRoom from "./components/rooms/EditRoom"
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/rooms/RoomListing'
import CheckOut from './components/bookings/CheckOut'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import Admin from './components/admin/Admin'
import FindBookings from './components/bookings/FindBookings'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Profile from './components/auth/Profile'
import AuthProvider from './components/auth/AuthProvider'
import Logout from './components/auth/Logout'
import RequireAuth from './components/auth/RequireAuth'
import ManageRoles from './components/roles/ManageRoles'
import ViewRoom from './components/rooms/ViewRoom'




function App() {
  

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/edit-room/:roomId" element = {<EditRoom />} />
            <Route path = "/existing-rooms" element = {<ExistingRooms />} />
            <Route path = "/add-room" element = {<AddRooms />} />
            <Route path = "/browse-all-rooms" element = {<RoomListing />} />
            <Route path = "/view-room/:roomId" element = {<ViewRoom/>}></Route>

            <Route path = "/book-room/:roomId" 
            element = {
               <RequireAuth>
                  <CheckOut />
               </RequireAuth>} />
            <Route path = "/booking-success" element = {<BookingSuccess />} />
            <Route path = "/existing-bookings" element = {<Bookings />} />
            <Route path = "/admin-panel" element = {<Admin />} />
            <Route path = "/find-booking" element = {<FindBookings />} />

            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element = {<Registration />} />
            <Route path = "/profile" element = {<Profile />} />
            <Route path = "/profile" element = {<Logout />} />
            <Route path = "/manage-roles" element ={<ManageRoles/>} />
            
          </Routes>
          
        </Router>
        <Footer />
     </main>
    </AuthProvider>
  )
}

export default App
