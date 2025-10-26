import moment from 'moment'
import React, { useState } from 'react'
import { getAvialableRooms } from '../utils/ApiFunctions'
import { Container , Col ,Row , Form, Button} from 'react-bootstrap'
import { RoomTypeSelecter } from './RoomTypeSelecter'
import RoomSearchResult from './RoomSearchResult'

const RoomSearch = () => {

    const [searchQuery , setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate : "",
        roomType : ""
    })

    const [errorMessage,setErrorMessage] = useState("")
    const [avialbleRooms, setAvialableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
       e.preventDefault()
       const checkIn = moment(searchQuery.checkInDate)
       const checkOut = moment(searchQuery.checkOutDate)
       if(!checkIn.isValid() || !checkOut.isValid){
            setErrorMessage("Please Enter Valid Date Range")
            return 
        }
        if(!checkOut.isSameOrAfter(checkIn)){
            setErrorMessage("Check-in Date must come before Check-out date")
            return 
        }
        setIsLoading(true)
        getAvialableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
        .then((response)=>{
            setAvialableRooms(response.data)
            setTimeout(()=>{
                setIsLoading(false)
            },2000)
        })
        .catch((error)=>{
            console.error(error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target 
        setSearchQuery({...searchQuery, [name]: value})
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        if(checkIn.isValid() && checkOut.isValid){
            setErrorMessage("") 
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkInDate : "",
            checkOutDate : "",
            roomType : ""
        })
    }
  return (
    <>
      
      <Container className='mt-5 mb-5 py-5 shadow'>
      <h2 className='mt-3 mb-3'> Search Your Room Here</h2>
         <Form onSubmit = {handleSearch}>
            <Row className = "justify-content-center">
                <Col xs = {12} md = {3}>
                    <Form.Group controlId='checkInDate'>
                         <Form.Label>Check-in Date</Form.Label>
                         <Form.Control type = 'date' name = 'checkInDate' value = {searchQuery.checkInDate} onChange={handleInputChange}
                                       min = {moment().format("YYYY-MM-DD")} />
                    </Form.Group>
                </Col>

                <Col xs = {12} md = {3}>
                    <Form.Group controlId='checkOutDate'>
                         <Form.Label>Check-out Date</Form.Label>
                         <Form.Control type = 'date' name = 'checkOutDate' value = {searchQuery.checkOutDate} onChange={handleInputChange}
                                       min = {moment().format("YYYY-MM-DD")} />
                    </Form.Group>
                </Col>

                <Col xs = {12} md = {3}>
                    <Form.Group controlId='roomType'>
                         <Form.Label>Room Type</Form.Label>
                         <div className="d-flex">
                             <RoomTypeSelecter handleRoomInputChange={handleInputChange} newRoom={searchQuery} />
                             <Button variant = 'primary' type = 'submit'> Search </Button>
                         </div>

                    </Form.Group>
                </Col>
            </Row>
         </Form>

        {isLoading ? (
            <p> Finding avialable rooms</p>
        ): avialbleRooms ? (
            <RoomSearchResult results ={ avialbleRooms} onClearSearch={clearSearch} />

        ):(
            <p>No rooms Avialabe..!</p>
        )}
        {errorMessage && 
         <p className='text-danger'>{errorMessage}</p>
        }
      </Container>
    </>
  )
}

export default RoomSearch
