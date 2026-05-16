import React, { memo } from 'react';
import { IndianRupee, MapPin, Fuel, Cog, ArrowRight, Bell, Clock, Ban } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useVehicleRealtime } from '../context/useVehicleRealtime';
import api from '../api/axios';

const VehicleCard = ({ vehicle, actionText = "View Details" }) => {
    const navigate = useNavigate();
    const { availabilityStatus, expectedAvailableAt } = useVehicleRealtime(vehicle);
    
    const isAvailableSoon = availabilityStatus === 'available_soon';
    const isUnavailable = availabilityStatus === 'unavailable';
    const isAvailable = availabilityStatus === 'available' || !availabilityStatus;
    
    const handleNotifyMe = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/interactions/notify', { vehicleId: vehicle._id || vehicle.id });
            alert("You will be notified when it's available.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to request notification.");
        }
    };

    const handleWaitlist = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/interactions/waitlist', { vehicleId: vehicle._id || vehicle.id });
            alert("Successfully joined the waitlist.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to join waitlist.");
        }
    };

    const navigate = useNavigate();
    const { availabilityStatus, expectedAvailableAt } = useVehicleRealtime(vehicle);
    
    const isAvailableSoon = availabilityStatus === 'available_soon';
    const isUnavailable = availabilityStatus === 'unavailable';
    const isAvailable = availabilityStatus === 'available' || !availabilityStatus;
    
    const handleNotifyMe = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/interactions/notify', { vehicleId: vehicle._id || vehicle.id });
            alert("You will be notified when it's available.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to request notification.");
        }
    };

    const handleWaitlist = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/interactions/waitlist', { vehicleId: vehicle._id || vehicle.id });
            alert("Successfully joined the waitlist.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to join waitlist.");
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-md transition-all duration-300 border flex flex-col h-full group relative overflow-hidden ${isUnavailable ? 'opacity-80 border-gray-200 grayscale-[0.5]' : isAvailableSoon ? 'border-yellow-200 shadow-yellow-100' : 'hover:shadow-lg border-gray-100'}`}>
            
            {/* Status Overlays */}
            {isUnavailable && (
                <div className="absolute inset-0 z-20 bg-gray-900/10 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                        <Ban size={18} /> Not Available
                    </span>
                </div>
            )}

            {/* Image Section */}
            <div className="relative overflow-hidden rounded-t-xl aspect-[16/10]">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm w-fit">
                        {vehicle.brand}
                    </span>
                    {isAvailableSoon && (
                        <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                            <Clock size={12} /> Available Soon
        <div className={`bg-white rounded-xl shadow-md transition-all duration-300 border flex flex-col h-full group relative overflow-hidden ${isUnavailable ? 'opacity-80 border-gray-200 grayscale-[0.5]' : isAvailableSoon ? 'border-yellow-200 shadow-yellow-100' : 'hover:shadow-lg border-gray-100'}`}>
            
            {/* Status Overlays */}
            {isUnavailable && (
                <div className="absolute inset-0 z-20 bg-gray-900/10 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                        <Ban size={18} /> Not Available
                    </span>
                </div>
            )}

            {/* Image Section */}
            <div className="relative overflow-hidden rounded-t-xl aspect-[16/10]">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm w-fit">
                        {vehicle.brand}
                    </span>
                    {isAvailableSoon && (
                        <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                            <Clock size={12} /> Available Soon
                        </span>
                    )}
                </div>
                
                <div className="absolute top-3 right-3 z-10">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {vehicle.category}
                    </span>
                </div>

                <Link to={`/vehicles/${vehicle._id || vehicle.id}`} className={`block w-full h-full ${!isAvailable ? 'pointer-events-none' : ''}`}>
                    <img
                        loading="lazy"
                        src={(vehicle.images && vehicle.images[0]) ? (vehicle.images[0].startsWith('/') ? `http://localhost:5000${vehicle.images[0]}` : vehicle.images[0]) : (vehicle.image && vehicle.image.startsWith('/') ? `http://localhost:5000${vehicle.image}` : vehicle.image)}
                        alt={vehicle.vehicleName || vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            </div>
                    )}
                </div>
                
                <div className="absolute top-3 right-3 z-10">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {vehicle.category}
                    </span>
                </div>

                <Link to={`/vehicles/${vehicle._id || vehicle.id}`} className={`block w-full h-full ${!isAvailable ? 'pointer-events-none' : ''}`}>
                    <img
                        loading="lazy"
                        src={(vehicle.images && vehicle.images[0]) ? (vehicle.images[0].startsWith('/') ? `http://localhost:5000${vehicle.images[0]}` : vehicle.images[0]) : (vehicle.image && vehicle.image.startsWith('/') ? `http://localhost:5000${vehicle.image}` : vehicle.image)}
                        alt={vehicle.vehicleName || vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            </div>

            {/* Content Section */}
            <div className="p-5 flex-grow flex flex-col relative z-30">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{vehicle.vehicleName || vehicle.name}</h3>
                </div>
            {/* Content Section */}
            <div className="p-5 flex-grow flex flex-col relative z-30">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{vehicle.vehicleName || vehicle.name}</h3>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{vehicle.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.fuelType || 'Petrol'}</span>
                    </div>
                    <div className="flex items-center">
                        <Cog className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.transmission || 'Manual'}</span>
                    </div>
                </div>

                {isAvailableSoon && expectedAvailableAt && (
                    <div className="mb-4 text-sm font-medium text-yellow-700 bg-yellow-50 p-2 rounded-lg flex items-center gap-2">
                        <Clock size={16} /> Available in {formatDistanceToNow(new Date(expectedAvailableAt))}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.fuelType || 'Petrol'}</span>
                    </div>
                    <div className="flex items-center">
                        <Cog className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.transmission || 'Manual'}</span>
                    </div>
                </div>

                {isAvailableSoon && expectedAvailableAt && (
                    <div className="mb-4 text-sm font-medium text-yellow-700 bg-yellow-50 p-2 rounded-lg flex items-center gap-2">
                        <Clock size={16} /> Available in {formatDistanceToNow(new Date(expectedAvailableAt))}
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-medium mb-0.5">Price</p>
                        <p className="text-xl font-bold text-blue-600 flex items-center">
                            <IndianRupee className="w-5 h-5 -mr-0.5" />
                            {vehicle.pricePerDay}
                            <span className="text-sm font-normal text-gray-500 ml-1">/ day</span>
                        </p>
                    </div>
                    
                    <div className="flex gap-2 relative z-30">
                        {isAvailable && (
                            <Link to={`/vehicles/${vehicle._id || vehicle.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer">
                                {actionText}
                                {actionText === "View Details" && <ArrowRight className="w-4 h-4 ml-1.5" />}
                            </Link>
                        )}
                        {isAvailableSoon && (
                            <button onClick={handleNotifyMe} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer">
                                Notify Me <Bell className="w-4 h-4 ml-1.5" />
                            </button>
                        )}
                        {isUnavailable && (
                            <button onClick={handleWaitlist} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer relative z-30">
                                Join Waitlist
                            </button>
                        )}
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-medium mb-0.5">Price</p>
                        <p className="text-xl font-bold text-blue-600 flex items-center">
                            <IndianRupee className="w-5 h-5 -mr-0.5" />
                            {vehicle.pricePerDay}
                            <span className="text-sm font-normal text-gray-500 ml-1">/ day</span>
                        </p>
                    </div>
                    
                    <div className="flex gap-2 relative z-30">
                        {isAvailable && (
                            <Link to={`/vehicles/${vehicle._id || vehicle.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer">
                                {actionText}
                                {actionText === "View Details" && <ArrowRight className="w-4 h-4 ml-1.5" />}
                            </Link>
                        )}
                        {isAvailableSoon && (
                            <button onClick={handleNotifyMe} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer">
                                Notify Me <Bell className="w-4 h-4 ml-1.5" />
                            </button>
                        )}
                        {isUnavailable && (
                            <button onClick={handleWaitlist} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm cursor-pointer relative z-30">
                                Join Waitlist
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default memo(VehicleCard);
