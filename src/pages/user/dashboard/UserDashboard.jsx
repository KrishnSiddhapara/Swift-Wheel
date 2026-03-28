import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Car, CheckCircle, IndianRupee, Clock } from 'lucide-react';
import api from '../../../api/axios';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, vehiclesRes] = await Promise.all([
                    api.get('/bookings/my-bookings').catch(() => ({ data: [] })),
                    api.get('/vehicles').catch(() => ({ data: { vehicles: [] } }))
                ]);
                
                // Handle different response structures
                const fetchedBookings = bookingsRes.data.data || bookingsRes.data || [];
                const fetchedVehicles = vehiclesRes.data.vehicles || vehiclesRes.data || [];
                
                setBookings(fetchedBookings);
                setVehicles(Array.isArray(fetchedVehicles) ? fetchedVehicles.slice(0, 3) : []);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    const validBookings = Array.isArray(bookings) ? bookings : [];

    // Calculate stats
    const totalBookings = validBookings.length;
    const activeRentals = validBookings.filter(b => ['Active', 'Pending', 'Confirmed'].includes(b.status)).length;
    const completedTrips = validBookings.filter(b => b.status === "Completed").length;
    const totalSpent = validBookings
        .filter(b => ['Completed', 'Active', 'Confirmed'].includes(b.status))
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const activeBookingsList = validBookings.filter(b => ['Active', 'Pending', 'Confirmed'].includes(b.status)).slice(0, 5);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your rentals.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Bookings" value={totalBookings} icon={LayoutDashboard} color="bg-blue-600" />
                <StatCard title="Active Rentals" value={activeRentals} icon={Car} color="bg-indigo-600" />
                <StatCard title="Completed Trips" value={completedTrips} icon={CheckCircle} color="bg-green-500" />
                <StatCard title="Total Spent" value={`₹${totalSpent}`} icon={IndianRupee} color="bg-purple-600" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Active Bookings */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Recent Active Bookings</h2>
                        <Link to="/user/bookings" className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full transition-colors">View All</Link>
                    </div>
                    
                    {activeBookingsList.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm">
                            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-800">No active bookings</h3>
                            <p className="text-gray-500 mb-4">You don't have any ongoing rentals right now.</p>
                            <Link to="/vehicles" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md shadow-blue-500/20">Explore Vehicles</Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
                            <div className="overflow-x-auto w-full custom-scrollbar pb-2">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-widest">
                                            <th className="p-4 font-semibold whitespace-nowrap">Vehicle</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Dates</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Amount</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {activeBookingsList.map((booking) => (
                                            <tr key={booking._id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-bold text-gray-800">{booking.vehicle?.name || 'Unknown Vehicle'}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">Pickup: {booking.pickupLocation || 'Branch'}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-medium text-gray-800">{new Date(booking.startDate).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                                                </td>
                                                <td className="p-4 font-bold text-gray-800">₹{booking.totalAmount}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${booking.status === 'Active' || booking.status === 'Confirmed' ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-600/20' : 'bg-blue-100 text-blue-700 ring-1 ring-blue-600/20'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recommended Vehicles */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Recommended</h2>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
                        {vehicles.length > 0 ? (
                            vehicles.map((car) => (
                                <Link to={`/vehicles/${car._id}`} key={car._id} className="flex gap-4 group hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                    <div className="w-24 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                        <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=200'} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 py-1">
                                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">{car.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1.5">{car.category || 'SUV'}</p>
                                        <p className="font-bold text-blue-600">₹{car.pricePerDay}<span className="text-xs font-medium text-gray-500">/day</span></p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 py-4 text-center">Loading recommendations...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
