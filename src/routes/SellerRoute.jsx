import React from 'react'
import { Routes, Route } from "react-router-dom"
import SellerLayout from '../components/SellerLayout'
import SellerDashboard from '../pages/seller/SellerDashboard'
import MyVehicles from '../pages/seller/MyVehicles'
import AddVehicle from '../pages/seller/AddVehicle'
import BookingRequests from '../pages/seller/BookingRequests'
import Earnings from '../pages/seller/Earnings'
import Profile from '../pages/seller/Profile'

const SellerRoute = () => {
    return (
    <Routes>
        <Route element={<SellerLayout />}>
            <Route path='/' index element={<SellerDashboard />} />
            <Route path='/vehicles' element={<MyVehicles />} />
            <Route path='/add-vehicle' element={<AddVehicle />} />
            <Route path='/bookings' element={<BookingRequests />} />
            <Route path='/earnings' element={<Earnings />} />
            <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
  )
}

export default SellerRoute
