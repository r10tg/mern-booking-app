import React from 'react'
import Header from '../component/Header'
import Hero from '../component/Hero'
import Footer from '../component/Footer'



const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen w-[100vw]'>
      <Header/>
      <Hero/>
      <div className='container mx-auto flex-1 py-10'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout