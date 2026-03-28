import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useData } from '../../context/DataProvider';
import { Image as ImageIcon, CheckCircle2, ShieldCheck, FileCheck, Info, AlertCircle, ChevronRight, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingCheckout = () => {
    const { vehicleId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useData();

    // Data State
    const [vehicle, setVehicle] = useState(null);
    const [bookingState, setBookingState] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [voterId, setVoterId] = useState(null);
    
    // Preview State
    const [dlPreview, setDlPreview] = useState('');
    const [voterPreview, setVoterPreview] = useState('');

    // Submission State
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('filling'); // filling, uploading, creating, redirecting

    useEffect(() => {
        if (!location.state?.bookingState) {
            navigate(`/vehicles/${vehicleId}`);
            return;
        }
        setBookingState(location.state.bookingState);

        const fetchVehicle = async () => {
            try {
                const { data } = await api.get(`/vehicles/${vehicleId}`);
                setVehicle(data);
            } catch (err) {
                console.error("Error fetching vehicle", err);
                setError('Failed to load vehicle details.');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [vehicleId, location.state, navigate]);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
            return alert('Please upload only an image or a PDF file.');
        }

        if (type === 'dl') {
            setDrivingLicense(file);
            setDlPreview(URL.createObjectURL(file));
        } else {
            setVoterId(file);
            setVoterPreview(URL.createObjectURL(file));
        }
    };

    const uploadDocument = async (file) => {
        const formData = new FormData();
        formData.append('document', file);
        const { data } = await api.post('/upload/document', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data.documentUrl;
    };

    const handlePayment = async () => {
        if (!termsAccepted) return setError("You must accept the terms and conditions.");
        if (!drivingLicense || !voterId) return setError("Please upload both Driving License and Voter ID.");
        if (!user) return setError("You must be logged in to book.");

        setIsProcessing(true);
        setError('');

        try {
            setStep('uploading');
            // 1. Upload Documents
            const [dlUrl, voterUrl] = await Promise.all([
                uploadDocument(drivingLicense),
                uploadDocument(voterId)
            ]);

            setStep('creating');
            // 2. Create Booking
            const bookingPayload = {
                vehicleId,
                pickupLocation: bookingState.pickupLocation,
                startDate: bookingState.startDate,
                endDate: bookingState.endDate,
                drivingLicense: dlUrl,
                voterId: voterUrl
            };
            
            const bookingRes = await api.post('/bookings', bookingPayload);
            const bookingId = bookingRes.data._id;

            setStep('redirecting');
            // 3. Initiate Payment
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
                setIsProcessing(false);
                setStep('filling');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Error processing your request.');
            setIsProcessing(false);
            setStep('filling');
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (!vehicle || !bookingState) return null;

    const isFormValid = termsAccepted && drivingLicense && voterId;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Secure Checkout</h1>
                    <p className="text-gray-500 mt-2">Complete verification and payment to confirm your booking.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT SIDE: Verification & Terms */}
                    <div className="lg:w-7/12 space-y-6">
                        {/* 1. Document Upload */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-blue-600" /> Identity Verification
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex gap-3">
                                <Info className="text-blue-500 flex-shrink-0 w-5 h-5" />
                                Government regulations require us to verify your identity before renting out a vehicle. Your documents are securely uploaded and encrypted.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Driving License */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Driving License <span className="text-red-500">*</span></label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-gray-50/50 text-center relative overflow-hidden group">
                                        {dlPreview ? (
                                            <div className="relative h-32 w-full">
                                                {drivingLicense.type === 'application/pdf' ? (
                                                    <div className="flex flex-col items-center justify-center h-full text-blue-600">
                                                        <FileCheck size={40} className="mb-2" />
                                                        <span className="font-medium text-sm">PDF Uploaded</span>
                                                    </div>
                                                ) : (
                                                    <img src={dlPreview} alt="Driving License" className="w-full h-full object-contain rounded-lg" />
                                                )}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                    <span className="text-white font-medium text-sm">Change File</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-6 flex flex-col items-center justify-center text-gray-400">
                                                <ImageIcon size={32} className="mb-2 text-gray-300" />
                                                <span className="text-sm font-medium">Click to upload image/pdf</span>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*,application/pdf"
                                            onChange={(e) => handleFileChange(e, 'dl')}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                        />
                                    </div>
                                </div>

                                {/* Voter ID */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Voter ID / Aadhar <span className="text-red-500">*</span></label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-gray-50/50 text-center relative overflow-hidden group">
                                        {voterPreview ? (
                                            <div className="relative h-32 w-full">
                                                {voterId.type === 'application/pdf' ? (
                                                    <div className="flex flex-col items-center justify-center h-full text-blue-600">
                                                        <FileCheck size={40} className="mb-2" />
                                                        <span className="font-medium text-sm">PDF Uploaded</span>
                                                    </div>
                                                ) : (
                                                    <img src={voterPreview} alt="Voter ID" className="w-full h-full object-contain rounded-lg" />
                                                )}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                    <span className="text-white font-medium text-sm">Change File</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-6 flex flex-col items-center justify-center text-gray-400">
                                                <ImageIcon size={32} className="mb-2 text-gray-300" />
                                                <span className="text-sm font-medium">Click to upload image/pdf</span>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*,application/pdf"
                                            onChange={(e) => handleFileChange(e, 'voter')}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Terms and Conditions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckSquare className="text-blue-600" /> Terms & Conditions
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 h-40 overflow-y-auto mb-6 border border-gray-100 space-y-3 custom-scrollbar">
                                <p><strong>1. Driver Requirements:</strong> The renter must possess a valid driving license and be at least 21 years of age.</p>
                                <p><strong>2. Insurance & Liability:</strong> Basic insurance is included. The renter is liable for damages not covered by insurance up to the deductible amount.</p>
                                <p><strong>3. Usage Policy:</strong> The vehicle must not be used for illegal activities, towing, or racing. Off-road driving is prohibited unless specifically authorized.</p>
                                <p><strong>4. Fuel Policy:</strong> The vehicle must be returned with the same level of fuel as at the time of pickup. Additional charges apply for refueling.</p>
                                <p><strong>5. Cancellation:</strong> Free cancellation up to 24 hours prior to the pickup time. Late cancellations may incur a fee of up to 1 day's rental cost.</p>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center mt-0.5">
                                    <input 
                                        type="checkbox" 
                                        className="appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                    />
                                    <CheckCircle2 size={14} className="absolute text-white pointer-events-none opacity-0 left-0.5 peer-checked:opacity-100" style={{ opacity: termsAccepted ? 1 : 0 }} />
                                </div>
                                <span className={`text-sm select-none transition-colors ${termsAccepted ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    I have read and agree to the SwiftWheel Rental Terms and Conditions.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Summary & Payment */}
                    <div className="lg:w-5/12">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>
                            
                            {/* Vehicle Mini Card */}
                            <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                <div className="w-20 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <img 
                                        src={(vehicle.images && vehicle.images[0]) ? (vehicle.images[0].startsWith('/') ? `http://localhost:5000${vehicle.images[0]}` : vehicle.images[0]) : (vehicle.image && vehicle.image.startsWith('/') ? `http://localhost:5000${vehicle.image}` : vehicle.image)} 
                                        alt={vehicle.vehicleName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 line-clamp-1">{vehicle.vehicleName}</h3>
                                    <p className="text-sm text-gray-500">{vehicle.category} • {vehicle.transmission}</p>
                                </div>
                            </div>

                            {/* Dates & Location */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Pickup Location</span>
                                    <span className="font-semibold text-gray-800">{bookingState.pickupLocation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Start Date</span>
                                    <span className="font-semibold text-gray-800">
                                        {new Date(bookingState.startDate).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'})}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">End Date</span>
                                    <span className="font-semibold text-gray-800">
                                        {new Date(bookingState.endDate).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'})}
                                    </span>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-100 pt-6 mb-8 space-y-3">
                                <div className="flex justify-between text-xl font-black text-gray-900">
                                    <span>Total Amount</span>
                                    <span>₹{bookingState.calculatedPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-xs text-gray-400 text-right">Includes taxes and insurance fees</p>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 border border-red-200 text-red-600 py-3 px-4 rounded-xl flex items-start gap-2 text-sm font-medium">
                                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {/* Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={!isFormValid || isProcessing}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                                    (!isFormValid || isProcessing) 
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 shadow-blue-500/30 hover:shadow-blue-500/50'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-r-transparent"></div>
                                        {step === 'uploading' && 'Uploading Documents...'}
                                        {step === 'creating' && 'Securing Vehicle...'}
                                        {step === 'redirecting' && 'Initializing Bank...'}
                                        {step === 'filling' && 'Processing...'}
                                    </>
                                ) : (
                                    <>Pay ₹{bookingState.calculatedPrice.toLocaleString('en-IN')} <ChevronRight size={20} /></>
                                )}
                            </button>
                            {!isFormValid && !isProcessing && (
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Complete verification on the left to activate payment.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingCheckout;
