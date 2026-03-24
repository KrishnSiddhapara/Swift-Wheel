import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

const Payment = () => {
    const { id: bookingId } = useParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        setIsProcessing(true);
        setError('');
        try {
            const res = await api.post('/payments/create-order', { bookingId });
            const { paymentSessionId } = res.data;

            if (window.Cashfree) {
                let cashfree = window.Cashfree({
                    mode: "sandbox", 
                });
                
                cashfree.checkout({
                    paymentSessionId: paymentSessionId,
                    returnUrl: `http://localhost:5173/payment-status?order_id={order_id}&booking_id=${bookingId}`
                });
            } else {
                setError('Cashfree SDK not loaded.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error initializing payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h2>
                <p className="text-gray-600 mb-8">Please proceed to pay to confirm your booking.</p>
                
                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}
                
                <button 
                    onClick={handlePayment} 
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 shadow-md'}`}
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default Payment;
