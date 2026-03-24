import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import { useData } from '../context/DataProvider'
import Layout from '../components/Layout'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'
import Vehicles from '../pages/user/Vehicles'
import VehicleDetails from '../pages/user/VehicleDetails'
import Terms from '../pages/user/Terms'
import Payment from '../pages/user/Payment'
import PaymentStatus from '../pages/user/PaymentStatus'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useData();
    if (loading) return null; // Or a loading spinner
    return user ? children : <Navigate to="/login" />;
};

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
                <Route path='/vehicles/:id' element={<VehicleDetails />} />
                <Route path='/terms' element={<Terms />} />
                <Route 
                    path='/payment/:id' 
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } 
                />
                <Route path='/payment-status' element={<PaymentStatus />} />
            </Route>
        </Routes>
    )
}

export default UserRoute