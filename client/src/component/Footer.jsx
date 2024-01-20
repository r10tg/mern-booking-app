import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-800 md:py-10 py-6'>
        <div className='container flex mx-auto flex justify-between items-center'>
            <span className='text-xl md:text-3xl text-white font-bold tracking-tight'>
                MernHolidays.com
            </span>
            <span className='text-white text-sm md:text-lg md:flex-row flex-col font-bold tracking-tight flex md:gap-4 '>
                <p className='cursor-pointer'>Privacy Policy</p>
                <p className='cursor-pointer'>Privacy Policy</p>
            </span>
        </div>
    </div>
  )
}

export default Footer