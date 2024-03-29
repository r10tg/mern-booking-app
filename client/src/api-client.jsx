import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData)=>{
    console.log('register function called')
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        console.log(response.data);
    
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
        } else {
            console.log(response.data);
            throw new Error(response.message)
        }
    } catch (error) {
        console.error("Request failed:", error.message);
        // Handle the error
    }
    
}

export const signIn = async(formData)=>{
    console.log('form data is: ',formData)
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`,formData,{
        withCredentials:true,
        headers:{
            "Content-Type":'application/json'
        }
    })
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
    } else {
        console.log(response.data);
        throw new Error(response.data)
    }
}

export const validateToken = async()=>{
    const response = await axios.get(`${API_BASE_URL}/api/auth/verify-token`,{
        withCredentials:true
    })
    if(response.status!==200){
        throw new Error("Token invalid")
    }
   return response
}

export const signOut = async()=>{
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`,'',{
        withCredentials:true
    })
    if(response.status>=300){
        throw new Error('Error siging out')
    }
}

export const addMyHotel = async(formData)=>{
    const response = await axios.post(`${API_BASE_URL}/api/my-hotels`,formData,{
        withCredentials:true
    })
    if(response.status>=200 && response.status<300){
        return response
    }
    throw  new Error('Error saving hotel')

}

export const fetchMyHotels = async()=>{
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels`,{
        withCredentials:true
    })
    if(response.status>=200 && response.status<300){
        return response
    }
    throw  new Error('Error Fetching hotels')
}

export const fetchMyHotelById = async(hotelId)=>{
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        withCredentials:true
    })
    if(response.status>=200 && response.status<300){
        return response
    }
    throw  new Error('Error Fetching hotel')
}

export const updateMyHotelById = async(hotelFormData)=>{
    const response = await axios.put(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,hotelFormData,{
        withCredentials:true
    })
if(response.status>=200 && response.status<300){
    return response
}
throw  new Error('Error updating hotel')
}