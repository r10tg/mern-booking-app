import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import DetailsSection from './DetailsSection'
import TypesSection from './TypesSection'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'

const ManageHotelForm = ({onSave,isLoading}) => {
    const formMethod = useForm()
    const {handleSubmit} = formMethod

    const onSubmit = handleSubmit((formDataJson)=>{
        const formData = new FormData();
        formData.append('name',formDataJson.name)
        formData.append('description',formDataJson.description)
        formData.append('city',formDataJson.city)
        formData.append('country',formDataJson.country)
        formData.append('type',formDataJson.type)
        formData.append('pricePerNight',formDataJson.pricePerNight.toString())
        formData.append('starRating',formDataJson.starRating.toString())
        formData.append('adultCount',formDataJson.adultCount.toString())
        formData.append('childCount',formDataJson.childCount.toString())

        formDataJson.facilities.forEach((facility,index) => {
            formData.append(`facilities[${index}]`,facility)
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append('imageFiles',imageFile)
        })

        onSave(formData)
    })
  return (
    <div>
        <FormProvider {...formMethod}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                <DetailsSection/>
                <TypesSection/>
                <FacilitiesSection/>
                <GuestsSection/>
                <ImagesSection/>    
                <span className='flex justify-end'>
                    <button disabled={isLoading} type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 hover:text-xl rounded disabled:bg-gray-500 disabled:cursor-disabled'>{isLoading?'Saving...':'Save'}</button>
                </span>
            </form>
        </FormProvider>
    </div>
  )
}

export default ManageHotelForm