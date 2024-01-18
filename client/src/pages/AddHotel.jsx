import React from 'react'
import ManageHotelForm from '../forms/manageHotels/ManageHotelForm'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContexts'
import { useMutation } from 'react-query'

const AddHotel = () => {
  const {showToast} = useAppContext()

  const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
    onSuccess:()=>{
      showToast({message:'Hotel saved!',type:'SUCCESS'})
    },
    onError:()=>{
      showToast({message:'Error saving hotel!',type:'ERROR'})
    }
  })

  const handleSave = (hotelFormData)=>{
    mutate(hotelFormData)
  }

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default AddHotel