import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { CheckCircle2, XCircle, Loader } from 'lucide-react';

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
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
                setMessage(res.data.message || 'Payment successful!');
            } catch (err) {
                setStatus('failed');
                setMessage(err.response?.data?.message || 'Payment verification failed.');
            }
        };

        verifyPayment();
    }, [orderId, bookingId]);

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
                        <Link to="/vehicles" className="bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 shadow-md text-white py-2 px-6 rounded-lg font-semibold transition-all">
                            Back to Home
                        </Link>
                    </div>
                )}
                {status === 'failed' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link to="/vehicles" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold transition-colors">
                            Try Again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;
