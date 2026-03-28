import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Ban } from 'lucide-react';
import api from '../../../api/axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my-bookings');
            setBookings(data.bookings || data || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        
        setCancelling(bookingId);
        try {
            await api.delete(`/bookings/${bookingId}`);
            // Update local state instead of refetching to be snappier
            setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'Cancelled' } : b));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert(error.response?.data?.message || "Failed to cancel booking");
        } finally {
            setCancelling(null);
        }
    };

    const validBookings = Array.isArray(bookings) ? bookings : [];

    const filteredBookings = validBookings.filter(booking => {
        if (filter === 'All') return true;
        if (filter === 'Active') return ['Active', 'Pending', 'Confirmed'].includes(booking.status);
        return booking.status === filter;
    });

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Active':
            case 'Confirmed': return 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-600/20';
            case 'Completed': return 'bg-green-100 text-green-700 ring-1 ring-green-600/20';
            case 'Cancelled': return 'bg-red-100 text-red-700 ring-1 ring-red-600/20';
            default: return 'bg-blue-100 text-blue-700 ring-1 ring-blue-600/20';
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Bookings</h1>
                    <p className="text-gray-500 mt-1">Manage all your vehicle rentals in one place.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl w-max shadow-sm overflow-x-auto max-w-full">
                {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                            filter === f 
                                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm mt-8">
                    <Clock className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">No {filter !== 'All' ? filter.toLowerCase() : ''} bookings found</h3>
                    <p className="text-gray-500 mb-6 mt-2 max-w-sm mx-auto">You don't have any bookings matching this filter.</p>
                    {filter !== 'All' ? (
                        <button onClick={() => setFilter('All')} className="text-blue-600 font-semibold hover:text-blue-700">Clear filters</button>
                    ) : (
                        <Link to="/vehicles" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">Book a Vehicle</Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <div key={booking._id} className="bg-white border text-left border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
                            
                            {/* Vehicle Info */}
                            <div className="flex items-center gap-5 md:w-1/3">
                                <div className="w-24 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                    <img src={booking.vehicle?.images?.[0] || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=200'} alt={booking.vehicle?.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{booking.vehicle?.name || 'Unknown Vehicle'}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Loc: {booking.pickupLocation || 'Main Branch'}</p>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusStyle(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex flex-col gap-1 text-sm text-gray-600 md:w-1/3 md:text-center">
                                <div className="flex justify-between md:justify-center gap-2">
                                    <span className="font-semibold text-gray-500 w-16 text-left">Pickup:</span>
                                    <span className="font-medium text-gray-800">{new Date(booking.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between md:justify-center gap-2">
                                    <span className="font-semibold text-gray-500 w-16 text-left">Return:</span>
                                    <span className="font-medium text-gray-800">{new Date(booking.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Actions & Price */}
                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 md:w-1/4">
                                <span className="text-2xl font-extrabold text-blue-600">₹{booking.totalAmount}</span>
                                {['Active', 'Pending', 'Confirmed'].includes(booking.status) && (
                                    <button 
                                        onClick={() => handleCancel(booking._id)}
                                        disabled={cancelling === booking._id}
                                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 w-full md:w-auto"
                                    >
                                        {cancelling === booking._id ? (
                                            <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                                        ) : <Ban size={16} />}
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
