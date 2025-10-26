import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { getAllRooms } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import doubleBedroom1 from '../../assets/doubleBedroom1.jpg'
import singleBedRoom1 from '../../assets/singleBedroom1.jpg'
import tripleSuiteRoom1 from '../../assets/tripleSuiteRoom1.jpg'

/*const [rooms ,setRooms] = useState([{id: "",roomType: "",roomPrice: "",photo : ""}])
const [isLoading, setIsLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState("")

useEffect(() =>{
    setIsLoading(true)
    getAllRooms()
    .then((data) =>{
        setRooms(data)
        setIsLoading(false)
    })
    .catch((error) =>{
        setErrorMessage(error.message)
        setIsLoading(false)
    })
},[])

if(isLoading){
    <div><h2 className='mt-5'>Loading Rooms</h2> </div>
}


if(errorMessage){
    <div><h2 className='mt-5'>Error : {errorMessage}</h2> </div>
}*/


const RoomCarousel = () => {
  return (
    <>
    <Link to = "/browse-all-rooms">
    <div className='mt-5 mb-5'>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={doubleBedroom1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className = 'text-white'>Double Bed Room</h3>
          <h5 className='text-white'>Double Bedroom for a only one person with AC</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={singleBedRoom1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className=''>Single Bed Room</h3>
          <h5 className='text-dark'>Single Bed room for one with person with Elite Services</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={tripleSuiteRoom1}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className='text-white'>Triple Suite Room</h3>
          <h5 className='text-white'>
            Triple Suite Room For Family more than 4 members with AC and Elite Room Services
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </Link>
    </>
    /*<section className='bg-light, mt-5 mb-5 shadow'>
        <Link to = {"/browse-all-rooms"} className = 'hotel-color text-center'>
            Browse all rooms
        </Link>
        <Container>
            <Carousel indicators = {false}>
                {[...Array(Math.ceil(rooms.length / 4))].map((_,i)=>(
                    <Carousel.Item key = {index}>
                        <Row>
                            {rooms.slice(index * 4,index*4+4).map((room)=>(
                                <Col key = {room.id} className = 'mb-4' xs={12} lg = {3}>
                                    <Card>
                                        <Link to = {`/book-room/${room.id}`}>
                                            <Card.Img variant = 'top' src = {`data:image/jpg:base64,${room.photo}`} alt = "Room Photo" 
                                                      className= "w-100" style = {{height: "200px"}}>

                                            </Card.Img>

                                        </Link>
                                        <Card.Body >
                                        </Card.Body>    
                                    </Card>
                                    
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}

            </Carousel>
        </Container>
    </section>*/
  )
}

export default RoomCarousel
