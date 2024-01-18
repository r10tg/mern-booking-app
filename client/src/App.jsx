import { useState } from 'react'
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Signin from './pages/Signin'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContexts'


function App() {

  const{isLoggedIn} = useAppContext()

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout children={<p>Hello World</p>}/>}></Route>
        <Route path='/register' element={<Layout><Register></Register></Layout>}></Route>
        <Route path='/sign-in' element={<Layout><Signin></Signin></Layout>}></Route>
        {isLoggedIn&&
        <Route path='/add-hotel' element={<Layout><AddHotel></AddHotel></Layout>} />
        }
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
