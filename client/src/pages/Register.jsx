import React from 'react'
import {useForm} from 'react-hook-form'
import {useMutation, useQueryClient} from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContexts'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const {register,watch,handleSubmit,formState:{errors}} = useForm()

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const {showToast} = useAppContext()

    const mutation = useMutation(apiClient.register,{
        onSuccess:async()=>{
           showToast({message:'Registration Successfull!!',type:"SUCCESS"})
           await queryClient.invalidateQueries('validateToken')
           navigate('/')
        },
        onError:()=>{
            showToast({message:'Something went wrong!!',type:"ERROR"})
        }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold' >Create an Account</h2>
        <div className='flex flex-col md:flex-row gap-5'>
            <label className='text-gray-700 text-sm font-bold flex-1' >
                First Name
                <input className='border rounded w-full py-1 px-2 font-normal' {...register("firstName",{required:"This field is required"})}></input>
                {errors.firstName&& <span className='text-red-500'>{errors.firstName.message}</span>}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Last Name
                <input className='border rounded w-full py-1 px-2 font-normal'{...register("lastName",{required:"This field is required"})}></input>
                {errors.lastName&& <span className='text-red-500'>{errors.lastName.message}</span>}

            </label>
        </div>
        <label className='text-gray-700 text-sm font-bold flex-1'>
                Email 
                <input 
                type='email'
                className='border rounded w-full py-1 px-2 font-normal'
                {...register("email",{required:"This field is required"})}></input>
                {errors.email&& <span className='text-red-500'>{errors.email.message}</span>}

        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
                Password 
                <input 
                type='password'
                className='border rounded w-full py-1 px-2 font-normal'
                {...register("password",{required:"This field is required",minLength:{
                    value:8,
                    message:'Please create a strong password with min 1 uppercase 1 lowercase 1 number and 1 special character and minimum length 8'
                }})}></input>
                {errors.password&& <span className='text-red-500'>{errors.password.message}</span>}

        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
                Confirm Password 
                <input 
                type='password'
                className='border rounded w-full py-1 px-2 font-normal'
                {...register("confirmPassword",{validate:(val)=>{
                    if(!val){
                        return "This Field is required"
                    }else if(watch("password")!== val){
                        return "password does not match"
                    }
                }})}></input>
                {errors.confirmPassword&&<span className='text-red-500'> {errors.confirmPassword.message} </span>}

        </label>
        <span>
            <button type='submit' className='bg-blue-600 text-white font-bold p-2 hover:bg-blue-400'>Create Account</button>
        </span>
    </form>
  )
}

export default Register