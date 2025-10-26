import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import {Container, Row,Col} from 'react-bootstrap'
import RoomPaginator from '../common/RoomPaginator'
import RoomFilter from '.././common/RoomFilter'
import RoomCard from './RoomCard'


const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(5)
    const [filteredData, setFilteredData] = useState([{id:""}])

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data)=>{
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)
        })        
    },[])

    if(isLoading){
        return <div>Loading the rooms...!</div>
    }
    if(error){
        return <div className='text-danger'> Error : {error}</div>
        
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage)
    console.log("totalPages",totalPages)

    const renderRooms = () => {
        const startIndex = (currentPage - 1 ) * roomsPerPage
        console.log("start Index",startIndex)
        const endIndex = startIndex + roomsPerPage
        console.log("end Index",endIndex)
        return filteredData
             .slice(startIndex,endIndex)
             .map((room)=> <RoomCard key = {room.id} room = {room} />)
    }
  return (
    
      <Container>
        <Row>
            <Col md = {6} className = "mb-3 mb-md-0">
                <RoomFilter data = {data} setFilteredData = {setFilteredData}/>
            </Col>
            <Col md = {6} className = 'd-flex align-items-center justify-content-end' >
                <RoomPaginator currentPage= {currentPage} totalPages = {totalPages} onPageChange = {handlePageChange}></RoomPaginator>
            </Col>
        </Row>
        <Row>
            <Col>{renderRooms()}</Col></Row>
        <Row>
           <Col md = {6} className = 'd-flex align-items-center justify-content-end' >
                <RoomPaginator currentPage= {currentPage} totalPages = {totalPages} onPageChange = {handlePageChange}></RoomPaginator>
            </Col>
        </Row>    

      </Container>
    
  )
}

export default Room
