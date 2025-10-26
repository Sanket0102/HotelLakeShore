import React from 'react'
import { Container } from 'react-bootstrap'
import { FaClock, FaUtensils, FaWifi } from 'react-icons/fa'
import Header from './Header'
import { Row, Col, Card } from 'react-bootstrap'



const HotelService = () => {
  return (
    <div>
      <Container className='mb-2'>
        <Header title = {"Our Services"} />
        <Row>
            <h4 className='text-center'>
               Services at <span className='hotel-color'> Hotel Lake Shore</span>
               <span className='gap-2'></span>
               <FaClock /> - 24-Hour Front Desk
            </h4>
        </Row>
        <hr/>
        <Row xs = {1} md = {2} lg = {3} className = 'g-4 mt-2'>
            <Col>
               <Card.Body>
                <Card.Title className = "hotel-color">
                    <FaWifi />
                           Free Wifi Access
                </Card.Title>
                <Card.Text>
                    Stay Connected with high-speed internet-access..!
                </Card.Text>

               </Card.Body>
            </Col>
            
            <Col>
               <Card.Body>
                <Card.Title className = "hotel-color">
                    <FaUtensils /> BreakFast

                </Card.Title>
                <Card.Text>
                    Star
                </Card.Text>

               </Card.Body>
            </Col>
        </Row>


      </Container>
    </div>
  )
}

export default HotelService

