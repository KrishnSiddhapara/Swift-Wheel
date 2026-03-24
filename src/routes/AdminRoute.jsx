import React from 'react'
import { Routes, Route } from "react-router-dom"
import AdminLayout from '../components/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageSellers from '../pages/admin/ManageSellers'
import ManageVehicles from '../pages/admin/ManageVehicles'
import ManageBookings from '../pages/admin/ManageBookings'
import Analytics from '../pages/admin/Analytics'

const AdminRoute = () => {
    return (
    <Routes>
        <Route element={<AdminLayout />}>
            <Route path='/' index element={<AdminDashboard />} />
            <Route path='/users' element={<ManageUsers />} />
            <Route path='/sellers' element={<ManageSellers />} />
            <Route path='/vehicles' element={<ManageVehicles />} />
            <Route path='/bookings' element={<ManageBookings />} />
            <Route path='/analytics' element={<Analytics />} />
        </Route>
      </Routes>
  )
}

export default AdminRoute