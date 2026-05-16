import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, XCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useModal } from '../../context/ModalContext';
import Pagination from '../../components/Pagination';
import { useModal } from '../../context/ModalContext';
import Pagination from '../../components/Pagination';

const BookingRequests = () => {
    const { showAlert } = useModal();
    const { showAlert } = useModal();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setLoading(true);
            try {
                const params = { page: currentPage, limit: itemsPerPage };
                const { data } = await api.get('/seller/bookings', { params });
                
                const params = { page: currentPage, limit: itemsPerPage };
                const { data } = await api.get('/seller/bookings', { params });
                
                // Sort to show pending first, then by date descending
                const sortedData = data.data.sort((a, b) => {
                const sortedData = data.data.sort((a, b) => {
                    if (a.bookingStatus === 'Pending' && b.bookingStatus !== 'Pending') return -1;
                    if (a.bookingStatus !== 'Pending' && b.bookingStatus === 'Pending') return 1;
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                
                setBookings(sortedData);
                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
                });
                
                setBookings(sortedData);
                setTotalPages(data.totalPages);
                setTotalItems(data.totalItems);
            } catch (err) {
                showAlert('Failed to fetch bookings', 'error');
                showAlert('Failed to fetch bookings', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [currentPage]);
    }, [currentPage]);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/seller/bookings/${id}`, { status });
            setBookings(bookings.map(b => b._id === id ? { ...b, bookingStatus: status } : b));
            showAlert(`Booking status updated to ${status}`, 'success');
            showAlert(`Booking status updated to ${status}`, 'success');
        } catch (err) {
            showAlert('Failed to update booking status', 'error');
            showAlert('Failed to update booking status', 'error');
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
                                            <p className="font-bold text-gray-900 text-lg">₹{booking.totalAmount || booking.totalPrice || 0}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusChip(booking.bookingStatus)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setSelectedBooking(booking)} className="py-2 px-3 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors font-medium border border-blue-200 flex items-center gap-1.5 shadow-sm text-sm" title="View Details">
                                                    <Eye size={16} /> View
                                                </button>
                                                {booking.bookingStatus === 'Pending' && (
                                                    <>
                                                        <button className="cursor-pointer" onClick={() => handleUpdateStatus(booking._id, 'Confirmed')} className="py-2 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 rounded-xl transition-colors font-medium border border-emerald-200 flex items-center gap-1.5 shadow-sm text-sm" title="Accept">
                                                            <CheckCircle size={16} /> Accept
                                                        </button>
                                                        <button className="cursor-pointer" onClick={() => handleUpdateStatus(booking._id, 'Cancelled')} className="py-2 px-3 text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800 rounded-xl transition-colors font-medium border border-red-200 flex items-center gap-1.5 shadow-sm text-sm" title="Cancel">
                                                            <XCircle size={16} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                            <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer Information</h3>
                                <p className="text-gray-900 font-medium">{selectedBooking.userId?.name || 'N/A'}</p>
                                <p className="text-gray-600 text-sm">{selectedBooking.userId?.email || 'N/A'}</p>
                                <p className="text-gray-600 text-sm">{selectedBooking.userId?.phone || 'N/A'}</p>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vehicle Information</h3>
                                <div className="flex gap-4 items-center">
                                    {selectedBooking.vehicleId?.image && (
                                        <img src={`http://localhost:5000${selectedBooking.vehicleId.image}`} alt="Vehicle" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                                    )}
                                    <div>
                                        <p className="text-gray-900 font-bold">{selectedBooking.vehicleId?.vehicleName || 'N/A'}</p>
                                        <p className="text-gray-600 text-sm">{selectedBooking.vehicleId?.brand} - {selectedBooking.vehicleId?.category}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trip Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1">Pickup</p>
                                        <p className="text-gray-900">{new Date(selectedBooking.startDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1">Dropoff</p>
                                        <p className="text-gray-900">{new Date(selectedBooking.endDate).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="mt-3 text-sm">
                                    <p className="text-gray-500 font-medium inline mr-2">Location:</p>
                                    <span className="text-gray-900">{selectedBooking.pickupLocation || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600"><span>Base Price</span> <span>₹{selectedBooking.basePrice || 0}</span></div>
                                    <div className="flex justify-between text-gray-600"><span>Security Deposit</span> <span>₹{selectedBooking.securityDeposit || 0}</span></div>
                                    <div className="flex justify-between text-gray-600"><span>Taxes & Fees</span> <span>₹{(selectedBooking.gstAmount || 0) + (selectedBooking.platformFee || 0)}</span></div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 mt-2 text-gray-900">
                                        <span>Total Amount</span> 
                                        <span className="text-blue-600">₹{selectedBooking.totalAmount || selectedBooking.totalPrice || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-xs mt-1">
                                        <span>Payment Status</span> 
                                        <span className="font-semibold text-emerald-600">{selectedBooking.paymentStatus || 'Completed'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setSelectedBooking(null)} className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingRequests;
