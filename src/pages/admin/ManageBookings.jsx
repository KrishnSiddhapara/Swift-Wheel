import React, { useState, useEffect } from 'react';
import { Search, Ban, Eye, CalendarCheck, MapPin } from 'lucide-react';
import api from '../../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null); // For modal

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/admin/bookings');
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to forcibly cancel this booking?")) return;
        
        try {
            await api.put(`/admin/bookings/${bookingId}/cancel`);
            fetchBookings();
            if (selectedBooking && selectedBooking._id === bookingId) {
                setSelectedBooking(prev => ({...prev, bookingStatus: 'Cancelled'}));
            }
        } catch (error) {
            console.error("Error cancelling booking", error);
        }
    };

    const filteredBookings = bookings.filter(b => {
        const query = searchTerm.toLowerCase();
        return (b._id?.toLowerCase().includes(query)) ||
               (b.userId?.name || '').toLowerCase().includes(query) ||
               (b.vehicleId?.vehicleName || '').toLowerCase().includes(query);
    });

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fadeIn relative">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Bookings</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search ID, user, vehicle..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto w-full custom-scrollbar pb-4">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-y border-gray-100 text-xs text-gray-500 uppercase tracking-widest">
                            <th className="p-4 font-semibold whitespace-nowrap">ID & Dates</th>
                            <th className="p-4 font-semibold whitespace-nowrap">User</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Vehicle / Seller</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Financials</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                            <th className="p-4 font-semibold text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredBookings.length > 0 ? filteredBookings.map((booking, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={booking._id} 
                                className="hover:bg-blue-50/20 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="font-mono text-xs text-gray-500 mb-1">#{booking._id.slice(-6).toUpperCase()}</div>
                                    <div className="text-sm font-bold text-gray-900">{new Date(booking.startDate).toLocaleDateString()}</div>
                                    <div className="text-xs text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">{booking.userId?.name || 'Unknown'}</div>
                                    <div className="text-xs text-gray-500">{booking.userId?.email || '-'}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-blue-600">{booking.vehicleId?.vehicleName || 'Unknown'}</div>
                                    <div className="text-xs font-semibold text-gray-500 mt-0.5 border-t border-gray-100 pt-0.5">Seller: {booking.sellerId?.name || 'Unknown'}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">₹{booking.totalPrice || booking.totalAmount}</div>
                                    <div className="text-xs text-gray-500 uppercase">{booking.paymentMethod}</div>
                                </td>
                                <td className="p-4 space-y-2">
                                    <div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                                            booking.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                                            booking.paymentStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            Pay: {booking.paymentStatus || 'Pending'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                                            booking.bookingStatus === 'Confirmed' || booking.bookingStatus === 'Active' ? 'bg-blue-100 text-blue-700' :
                                            booking.bookingStatus === 'Completed' ? 'bg-purple-100 text-purple-700' :
                                            booking.bookingStatus === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            Trip: {booking.bookingStatus}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2 flex-wrap">
                                        <button 
                                            onClick={() => setSelectedBooking(booking)}
                                            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-bold" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                        {(booking.bookingStatus !== 'Cancelled' && booking.bookingStatus !== 'Completed') && (
                                            <button onClick={() => handleCancel(booking._id)} className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all font-bold" title="Force Cancel">
                                                <Ban size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <CalendarCheck size={48} className="text-gray-200 mb-4" />
                                        <p className="text-lg font-medium text-gray-800">No bookings found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Quick Details Modal */}
            <AnimatePresence>
                {selectedBooking && (
                    <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><XCircle size={24} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">User</p>
                                        <p className="font-bold text-gray-900">{selectedBooking.userId?.name}</p>
                                        <p className="text-sm text-gray-500">{selectedBooking.userId?.email}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Vehicle</p>
                                        <p className="font-bold text-blue-600">{selectedBooking.vehicleId?.vehicleName}</p>
                                        <p className="text-sm text-gray-500">{selectedBooking.vehicleId?.category}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
                                        <p className="font-bold text-gray-900 flex items-center gap-1.5"><MapPin size={16} className="text-blue-600" /> {selectedBooking.pickupLocation}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Paid</p>
                                        <p className="text-2xl font-bold text-blue-600">₹{selectedBooking.totalPrice || selectedBooking.totalAmount}</p>
                                    </div>
                                </div>
                                {(selectedBooking.drivingLicense || selectedBooking.voterId) && (
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                         <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Verified Documents</p>
                                         <div className="flex gap-4">
                                             {selectedBooking.drivingLicense && <div className="text-sm font-bold text-green-600 flex items-center gap-1.5"><CheckCircle size={16} /> Driving License</div>}
                                             {selectedBooking.voterId && <div className="text-sm font-bold text-green-600 flex items-center gap-1.5"><CheckCircle size={16} /> Voter ID</div>}
                                         </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                                <button onClick={() => setSelectedBooking(null)} className="px-6 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Close</button>
                                {selectedBooking.bookingStatus !== 'Cancelled' && selectedBooking.bookingStatus !== 'Completed' && (
                                    <button onClick={() => { handleCancel(selectedBooking._id); setSelectedBooking(null); }} className="px-6 py-2 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-500/20">Force Cancel</button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageBookings;
