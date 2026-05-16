import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { useData } from '../context/DataProvider'
import Layout from '../components/Layout'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import ForgotPassword from '../pages/user/ForgotPassword'
import ResetPassword from '../pages/user/ResetPassword'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'
import Vehicles from '../pages/user/Vehicles'
import VehicleDetails from '../pages/user/VehicleDetails'
import Terms from '../pages/user/Terms'
import PrivacyPolicy from '../pages/user/PrivacyPolicy'
import Payment from '../pages/user/Payment'
import PaymentStatus from '../pages/user/PaymentStatus'
import BookingCheckout from '../pages/user/BookingCheckout'
import UserDashboardLayout from '../pages/user/dashboard/UserDashboardLayout'
import UserDashboard from '../pages/user/dashboard/UserDashboard'
import UserProfile from '../pages/user/dashboard/UserProfile'
import MyBookingsRedirect from '../pages/user/dashboard/MyBookings'
import MyBookingsPage from '../pages/user/MyBookingsPage'
import BookingDetailPage from '../pages/user/BookingDetailPage'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useData();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
    }

    return children;
};

const UserRoute = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/vehicles' element={<Vehicles />} />
                <Route path='/vehicles/:id' element={<VehicleDetails />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route 
                    path='/payment/:id' 
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/booking/:vehicleId' 
                    element={
                        <ProtectedRoute>
                            <BookingCheckout />
                        </ProtectedRoute>
                    } 
                />
                <Route path='/payment-status' element={<PaymentStatus />} />
                <Route 
                    path='/my-bookings' 
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    } 
                />

                {/* User Dashboard Routes */}
                <Route
                    path='/user'
                    element={
                        <ProtectedRoute>
                            <UserDashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path='dashboard' element={<UserDashboard />} />
                    <Route path='bookings' element={<Navigate to="/my-bookings" replace />} />
                    <Route path='profile' element={<UserProfile />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default UserRoute
