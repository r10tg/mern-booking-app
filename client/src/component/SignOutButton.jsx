import React from 'react'
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContexts";
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const {showToast} = useAppContext()


    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken')
            showToast({message:'Sign out Successfull!!',type:"SUCCESS"})
            navigate('/sign-in')
      
          },
          onError: async (error) => {
            showToast({message:error.response.data.message,type:"ERROR"})
          },
    })

    const handleClick = ()=>{
        mutation.mutate()
    }

  return (
    <button className='text-blue-600 bg-white hover:bg-gray-400 px-3 font-bold' onClick={handleClick}>Sign Out</button>
  )
}

export default SignOutButton