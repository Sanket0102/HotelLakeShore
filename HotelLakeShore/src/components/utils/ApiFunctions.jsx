import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
      Authorization : `Bearer ${token}`,
      "Content-Type" : "application/json"
    }
}

export async function addRoom(photo,roomType,roomPrice,token){
    console.log("Token ",token)
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)
    
    try{
        const response =  await api.post("/rooms/add/new-room",formData,{
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if(response.status === 201){
            return true
        }
        else{
            return false
        }
    }
    catch(error){
        console.log(error)
    }
}
/*This functions return all Types of rooms from Database*/ 
export async function getRoomTypes(){
     try{
       const response = await api.get("/rooms/room/room-types")
       return response.data
     }
     catch(e){
      throw new Error("Error Fetch room types")

     }
}

/*This function returns all the rooms from the database*/ 
export async function getAllRooms(){
    try{
       const result = await api.get("/rooms/all-rooms")
       console.log(result.data)
       return result.data
    }
    catch(error){
       throw new Error("Error Fetching rooms")
    }
}

export async function deleteRoom(roomId,token){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`,{
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return result.data
    }
    catch(error){
        throw new Error(`Error Deleting room ${error.message}`)
    }
}

export async function updateRoom(roomId,roomData){
    try{
        const formData = new FormData()
        formData.append("roomType",roomData.roomType)
        formData.append("roomPrice",roomData.roomPrice)
        formData.append("photo",roomData.photo)   
        
        const response = await api.put(`/rooms/update/${roomId}`,formData,{
            headers :getHeader()
        })
        return response

    }
    catch(error){
        throw new Error(`Error Upgrading room ${error.message}`) 
    }
}

export async function getRoomById(roomId){
    try{
         const result = await api.get(`/rooms/room/${roomId}`) 
         
         return result.data
    }
    catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function bookRoom(roomId, booking,token){
    try{
      const response = await api.post(`/bookings/room/${roomId}/booking`,booking,{
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type":"Application/json"
        }
      })
      return response.data
    }
    catch(error){
        console.log(error)
        if(error.response && error.response.data){
           throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error booking room with ..! ${error.message}`)
        }

    }
}

export async function getAllBookings(){
    try{
       const result = await api.get("/bookings/all-bookings",{
        headers :getHeader()
    })
       return result.data
    }
    catch(error){
       throw new Error(`Error Fetvhing Booked Rooms : ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode,token){
    try{
      const result = await api.get(`/bookings/confirmation/${confirmationCode}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
      })
      return result.data 
      
    }
    catch(error){
        if(error.response.status === 404){
            throw new Error(`No Booking Found with Confirmation Code : ${confirmationCode}`)
         }
         else{
             throw new Error(`Error booking room with ..! ${error.message}`)
         }
    }
}

export async function cancelBookings(bookingId,token){
    try{
        console.log("Token in Cancel Bookings", token)
       const result = await api.delete(`/bookings/booking/${bookingId}/delete`,{
          headers:{
            Authorization : `Bearer ${token}`,
            "Content-Type": "Application/json"
          }
       })
       return result;
    }
    catch(error){
        console.log(error)
       throw new Error(`Error cancellinf booking : ${error.message}`)
    }
}

export async function getAvialableRooms(checkInDate, checkOutDate, roomType){
    
    const result = await api.get(`/rooms/avialable-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result;    
    
}

export async function registerUser(registration){
    try{
       const response  = await api.post("/users/register-user",registration);
       return response.data
    }
    catch(error){
        if(error.response && error.response.data){
            return error.response.data;
        }
        else{
            throw new Error("Error registering user :", error.message)
        }
    }
}

export async function loginUser(loginData){
    try{
        const response = await api.post("/auth/login",loginData)
        console.log(response)
        if(response.status >= 200 && response.status <=300){
            return response.data    
        }
        else{
            return null
        }
    }
    catch(error){
        console.log(error)
        return null;
    }
}

export async function getUserProfile(userId, token){
    try{
       const response = await api.get(`/users/get-user-by-email/${userId}`,{
           headers:getHeader()
       })
       return response.data
    }
    catch(error){
        throw error
    }
}

export async function deleteUser(userId,){
    try{
      const response = await api.delete(`/users/delete/${userId}`,{
        headers:getHeader()
      })
    return response.data
    }
    catch(error){
       return error.message
    }
}

export async function getBookingsByUserId(userId,token){
    try{
      const response = await api.get(`/bookings/user/${userId}/bookings`,{
        headers: getHeader()
      })
      return response.data 
    }
    catch(error){
      console.log("Error fetching bookings : ",error.message)
      throw new Error("Error Fetching rooms")
    }
} 

export async function assignRole(userId,roleId,token){
   try{
    console.log(userId,roleId)
     const response = await api.post(`/api/roles/assign-role?userId=${userId}&roleId=${roleId}`,{},{
        headers :{
            Authorization:`Bearer ${token}`,
            "Content-type":"Application/json"
        }
    })
     return response.data
   }
    catch(error){
        console.log(error)
      if(error.response.status === 401){
        throw new Error("User or Role Not Found")
      }
    }
}

export async function removeRole(userId,roleId,token){
    try{
        console.log(token)
        const response = await api.post(`api/roles/remove/user?userId=${userId}&roleId=${roleId}`,{},{
                headers :{
                    Authorization : `Bearer ${token}`,
                    "Content-type":"Application/json"
                }
            }
        )
        return response.data
    }
    catch(error){
        console.log(error);
        if(error.response.status === 401){
            throw new Error("User or Role Not Found")
        }
    }
}

export async function getAllUser(token){
    
    try{
       const response = await api.get('/users/3000',{
        headers : {
            Authorization : `Bearer ${token}`
        }
       })
       console.log(token)

       console.log(response)
       return response.data
    }
    catch(error){
        console.log(error)
        if (error.response.status === 302) {
            return error.response.data
        }
       throw new Error("Error Fetching Rooms :",error.message)
    }
}

