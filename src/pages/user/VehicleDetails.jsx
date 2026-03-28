import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { IndianRupee, MapPin, Fuel, Cog, ArrowLeft, ShieldCheck, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useData();
    
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Restore booking state if returning from login
    useEffect(() => {
        if (location.state?.bookingState) {
            setStartDate(location.state.bookingState.startDate);
            setEndDate(location.state.bookingState.endDate);
            if(location.state.bookingState.pickupLocation) {
                setPickupLocation(location.state.bookingState.pickupLocation);
            }
        }
    }, [location.state]);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const { data } = await api.get(`/vehicles/${id}`);
                setVehicle(data);
                if (data.location && (!location.state?.bookingState?.pickupLocation)) {
                    setPickupLocation(data.location);
                }
            } catch (err) {
                console.error("Error fetching vehicle details", err);
                setError('Failed to load vehicle details. It might have been removed.');
            }
            setLoading(false);
        };
        fetchVehicle();
    }, [id, location.state]);

    useEffect(() => {
        if (startDate && endDate && vehicle) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (end > start) {
                const hours = Math.ceil((end - start) / (1000 * 60 * 60));
                let total = 0;
                if (hours < 24) {
                    total = vehicle.pricePerHour * (hours || 1);
                } else {
                    const days = Math.ceil(hours / 24);
                    total = vehicle.pricePerDay * days;
                }
                setCalculatedPrice(total);
                setError('');
            } else {
                setCalculatedPrice(0);
                if (startDate !== '' && endDate !== '') {
                    setError('Return date must be after pickup date');
                }
            }
        }
    }, [startDate, endDate, vehicle]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!user) {
            // Not logged in -> Redirect to login page and pass return URL & state
            navigate('/login', { 
                state: { 
                    from: location.pathname,
                    bookingState: { startDate, endDate, pickupLocation }
                } 
            });
            return;
        }

        if (!startDate || !endDate || !pickupLocation) {
            return setError('Please fill all booking details.');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start < new Date()) {
            return setError('Pickup date cannot be in the past.');
        }
        if (end <= start) {
            return setError('Return date must be after pickup date.');
        }

        const hours = (Math.abs(end - start) / (1000 * 60 * 60));
        if (vehicle.category === 'Car') {
            if (hours < 4) return setError('Car bookings require a minimum of 4 hours.');
            if (hours > 144) return setError('Car bookings cannot exceed 6 days (144 hrs).');
        } else if (vehicle.category === 'Bike' || vehicle.category === 'Moped') {
            if (hours < 2) return setError(`${vehicle.category} bookings require a minimum of 2 hours.`);
            if (hours > 72) return setError(`${vehicle.category} bookings cannot exceed 3 days (72 hrs).`);
        }

        setIsProcessing(true);
        
        // Minor delay for UX
        setTimeout(() => {
            setIsProcessing(false);
            navigate(`/booking/${vehicle._id}`, {
                state: {
                    bookingState: {
                        startDate: start.toISOString(),
                        endDate: end.toISOString(),
                        pickupLocation,
                        calculatedPrice
                    }
                }
            });
        }, 500);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gray-50 py-20 px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Vehicle not found</h2>
                <button onClick={() => navigate(-1)} className="text-blue-600 font-semibold hover:underline flex items-center justify-center mx-auto">
                    <ArrowLeft className="w-5 h-5 mr-2"/> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 font-semibold mb-6 flex items-center transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2"/> Back to Vehicles
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Vehicle Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="w-full">
                                <div className="aspect-[16/9] w-full bg-gray-100 relative rounded-t-2xl overflow-hidden">
                                    <img 
                                        src={(vehicle.images && vehicle.images[mainImageIndex]) ? (vehicle.images[mainImageIndex].startsWith('/') ? `http://localhost:5000${vehicle.images[mainImageIndex]}` : vehicle.images[mainImageIndex]) : (vehicle.image && vehicle.image.startsWith('/') ? `http://localhost:5000${vehicle.image}` : vehicle.image)} 
                                        alt={vehicle.vehicleName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold shadow">
                                        {vehicle.brand}
                                    </div>
                                </div>
                                {vehicle.images && vehicle.images.length > 1 && (
                                    <div className="flex gap-2 p-4 bg-gray-50 border-x border-gray-100">
                                        {vehicle.images.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setMainImageIndex(idx)}
                                                className={`h-20 w-24 rounded-lg overflow-hidden border-2 ${mainImageIndex === idx ? 'border-blue-600' : 'border-transparent'} transition-all`}
                                            >
                                                <img src={img.startsWith('/') ? `http://localhost:5000${img}` : img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{vehicle.vehicleName}</h1>
                                        <p className="flex items-center text-gray-500 font-medium text-lg">
                                            <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                                            {vehicle.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Per Day</p>
                                        <p className="text-3xl font-black text-blue-600 flex items-center justify-end">
                                            <IndianRupee className="w-7 h-7 -mr-1" />
                                            {vehicle.pricePerDay}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-100 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center"><Fuel className="w-4 h-4 mr-1"/> Fuel</span>
                                        <span className="font-semibold text-gray-800">{vehicle.fuelType || 'Petrol'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center"><Cog className="w-4 h-4 mr-1"/> Transmission</span>
                                        <span className="font-semibold text-gray-800">{vehicle.transmission || 'Manual'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> Category</span>
                                        <span className="font-semibold text-gray-800">{vehicle.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center"><IndianRupee className="w-4 h-4 mr-1"/> Per Hour</span>
                                        <span className="font-semibold text-gray-800">₹{vehicle.pricePerHour}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center">Seats</span>
                                        <span className="font-semibold text-gray-800">{vehicle.seatingCapacity || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center">Mileage</span>
                                        <span className="font-semibold text-gray-800">{vehicle.mileage ? `${vehicle.mileage} km/l` : 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm mb-1 flex items-center">Color</span>
                                        <span className="font-semibold text-gray-800">{vehicle.color || 'N/A'}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {vehicle.description || "Enjoy a premium ride with this well-maintained vehicle. Perfect for city commutes or weekend getaways."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Checkout Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book this Vehicle</h2>
                            
                            {successMessage && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 py-3 px-4 rounded-lg flex items-center font-medium">
                                    <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                                    {successMessage}
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 py-3 px-4 rounded-lg font-medium text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleBooking} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                        placeholder="City or Airport"
                                    />
                                </div>
                                <div className="space-y-4">
                                    {/* Pickup Group */}
                                    <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                                        <label className="block text-sm font-bold text-gray-800 mb-4">Pickup Date & Time</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col relative w-full">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <DatePicker 
                                                    selected={startDate ? new Date(startDate) : null}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="MMM d, yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium shadow-sm"
                                                    required
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className="flex flex-col relative w-full">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <DatePicker 
                                                    selected={startDate ? new Date(startDate) : null}
                                                    onChange={(date) => setStartDate(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    placeholderText="Select Time"
                                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Return Group */}
                                    <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                                        <label className="block text-sm font-bold text-gray-800 mb-4">Return Date & Time</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col relative w-full">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <DatePicker 
                                                    selected={endDate ? new Date(endDate) : null}
                                                    onChange={(date) => setEndDate(date)}
                                                    dateFormat="MMM d, yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium shadow-sm"
                                                    required
                                                    minDate={startDate ? new Date(startDate) : new Date()}
                                                />
                                            </div>
                                            <div className="flex flex-col relative w-full">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <DatePicker 
                                                    selected={endDate ? new Date(endDate) : null}
                                                    onChange={(date) => setEndDate(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    placeholderText="Select Time"
                                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 mt-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-600 font-medium">Total Price</span>
                                        <span className="text-2xl font-black text-gray-900 flex items-center">
                                            <IndianRupee className="w-5 h-5 -mr-1" />
                                            {calculatedPrice.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isProcessing || calculatedPrice === 0}
                                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-all flex justify-center items-center ${
                                            isProcessing || calculatedPrice === 0 
                                            ? 'bg-blue-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 transform active:scale-[0.98]'
                                        }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-r-transparent mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            'Proceed to Booking'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                Secure payment powered by Razorpay. Free cancellation up to 24 hours before pickup.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
