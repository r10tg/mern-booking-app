import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Signin from './pages/Signin'
import AddHotel from './pages/AddHotel'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import { useAppContext } from './contexts/AppContexts'


function App() {

  const{isLoggedIn} = useAppContext()

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Layout children={<p>Hello World</p>}/>}></Route>
        <Route path='/register' element={<Layout><Register></Register></Layout>}></Route>
        <Route path='/sign-in' element={<Layout><Signin></Signin></Layout>}></Route>
        {isLoggedIn&&
        <Route path='/add-hotel' element={<Layout><AddHotel></AddHotel></Layout>} />
        }
        {isLoggedIn && 
        <Route path='/my-hotels' element={<Layout><MyHotels></MyHotels></Layout>} />
        }
        {isLoggedIn && 
        <Route path='/edit-hotel/:hotelId' element={<Layout><EditHotel></EditHotel></Layout>} />
        }
      </Routes>
    </Router>
    </>
  )
}

export default App
