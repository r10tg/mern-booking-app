import React, { useEffect } from 'react'

const Toast = ({message,type,onClose}) => {

    useEffect(()=>{
        const timer = setTimeout(() => {
            onClose()
        }, 5000);
        return()=>{
            clearTimeout(timer)
        }
    },[onClose])

    const styles = type === 'SUCCESS' ? `fixed top-4 right-4 z-50 rounded-md text-white max-w-md bg-green-600`:`fixed top-4 right-4 z-50 rounded-md text-white max-w-md bg-red-600`

  return (
    <div className={styles}>
        <div className='flex justfy-center items-center '>
            <span className='text-lg font-semibold'> {message} </span>
        </div>
    </div>
  )
}

export default Toast