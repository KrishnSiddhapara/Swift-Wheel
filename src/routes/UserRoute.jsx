import React from 'react'
import { Route, Routes } from "react-router-dom"
import Layout from '../components/Layout'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'
import Vehicles from '../pages/user/Vehicles'
import Terms from '../pages/user/Terms'


const UserRoute = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/vehicles' element={<Vehicles />} />
                <Route path='/terms' element={<Terms />} />
            </Route>
        </Routes>
    )
}

export default UserRoute