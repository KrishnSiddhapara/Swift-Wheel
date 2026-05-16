import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { CheckCircle2, XCircle, Loader, ClipboardList } from 'lucide-react';

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('order_id');
    const bookingId = searchParams.get('booking_id');
    
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!orderId || !bookingId) {
            setStatus('failed');
            setMessage('Invalid payment parameters.');
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await api.post('/payments/verify', { orderId, bookingId });
                setStatus('success');
                setMessage('Your booking has been confirmed successfully.');
            } catch (err) {
                setStatus('failed');
                setMessage(err.response?.data?.message || 'Payment verification failed.');
            }
        };

        verifyPayment();
    }, [orderId, bookingId]);

    const goMyBookings = () => navigate('/my-bookings');

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-20 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gray-100">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-xl font-bold">Verifying Payment...</h2>
                        <p className="text-gray-500 mt-2">Please do not close this window.</p>
                    </div>
                )}
                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link to="/my-bookings" className="bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 shadow-md text-white py-2 px-6 rounded-lg font-semibold transition-all flex items-center gap-2">
                            <ClipboardList size={20} /> View My Bookings
                        </Link>
                    </div>
                )}
                {status === 'failed' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <div className="flex flex-col w-full gap-3 max-w-xs">
                            <button
                                type="button"
                                onClick={goMyBookings}
                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                            >
                                Go to My Bookings
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/vehicles')}
                                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors"
                            >
                                Browse vehicles
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;
