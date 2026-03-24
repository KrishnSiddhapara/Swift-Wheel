import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const BookingRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/seller/bookings');
                // Sort to show pending first, then by date descending
                setBookings(data.sort((a, b) => {
                    if (a.bookingStatus === 'Pending' && b.bookingStatus !== 'Pending') return -1;
                    if (a.bookingStatus !== 'Pending' && b.bookingStatus === 'Pending') return 1;
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }));
            } catch (err) {
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/seller/bookings/${id}`, { status });
            setBookings(bookings.map(b => b._id === id ? { ...b, bookingStatus: status } : b));
        } catch (err) {
            alert('Failed to update booking status');
        }
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'Completed': return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Completed</span>;
            case 'Confirmed': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Confirmed</span>;
            case 'Pending': return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><Clock size={12} /> Pending</span>;
            case 'Cancelled': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Cancelled</span>;
            default: return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{status}</span>;
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[500px]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Booking Requests</h1>
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-semibold">User Details</th>
                                <th className="px-6 py-4 font-semibold">Vehicle</th>
                                <th className="px-6 py-4 font-semibold">Duration</th>
                                <th className="px-6 py-4 font-semibold">Total Price</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{booking.userId?.name || 'Unknown User'}</p>
                                            <p className="text-xs text-gray-500">{booking.userId?.phone || 'No phone'}</p>
                                            <p className="text-xs text-gray-400">{booking.userId?.email || ''}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {booking.vehicleId?.image && (
                                                    <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                                                        <img src={`http://localhost:5000${booking.vehicleId.image}`} alt={booking.vehicleId.vehicleName} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-gray-900">{booking.vehicleId?.vehicleName || 'Deleted Vehicle'}</p>
                                                    <p className="text-xs text-gray-500">{booking.vehicleId?.brand || ''}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900">{new Date(booking.startDate).toLocaleDateString()} <span className="text-gray-400 font-normal">to</span></p>
                                            <p className="text-sm font-medium text-gray-900">{new Date(booking.endDate).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900 text-lg">₹{booking.totalPrice}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusChip(booking.bookingStatus)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {booking.bookingStatus === 'Pending' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleUpdateStatus(booking._id, 'Confirmed')} className="py-2 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 rounded-xl transition-colors font-medium border border-emerald-200 flex items-center gap-1.5 shadow-sm text-sm" title="Accept">
                                                        <CheckCircle size={16} /> Accept
                                                    </button>
                                                    <button onClick={() => handleUpdateStatus(booking._id, 'Cancelled')} className="py-2 px-3 text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800 rounded-xl transition-colors font-medium border border-red-200 flex items-center gap-1.5 shadow-sm text-sm" title="Cancel">
                                                        <XCircle size={16} /> Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <AlertCircle size={32} className="mx-auto text-gray-400 mb-3" />
                                        <p className="font-medium text-gray-900 mb-1">No booking requests found</p>
                                        <p className="text-sm">When users rent your vehicles, they will appear here.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingRequests;
