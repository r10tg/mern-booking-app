import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import * as apiClient from '../api-client'
import ManageHotelForm from '../forms/manageHotels/ManageHotelForm'
import { useAppContext } from '../contexts/AppContexts'

const EditHotel = () => {

    const {hotelId} = useParams()

    const {showToast} = useAppContext()

    const {data:hotel} = useQuery('fetchMyHotelById',()=>apiClient.fetchMyHotelById(hotelId||""),{
        enabled:!!hotelId,
        onError:()=>{},
        select:(response)=>response.data.hotel
    })

   const {mutate,isLoading} = useMutation(apiClient.updateMyHotelById,{
    onSuccess:()=>{
        showToast({message:"Hotel Updated Successfull",type:"SUCCESS"})
    },
    onError:()=>{
        showToast({message:"something went wrong!",type:"ERROR"})
    
    }
   })

   const handleSave = (hotelFormData)=>{
    mutate(hotelFormData)
   }

  return (
    <div>
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default EditHotel