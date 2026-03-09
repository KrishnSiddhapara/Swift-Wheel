import React from 'react';
import { IndianRupee, MapPin, Fuel, Cog, ArrowRight } from 'lucide-react';

const VehicleCard = ({ vehicle, actionText = "View Details" }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full group">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-t-xl aspect-[16/10]">
                <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {vehicle.brand}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {vehicle.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{vehicle.name}</h3>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{vehicle.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center">
                        <Cog className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{vehicle.transmission}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-medium mb-0.5">Price</p>
                        <p className="text-xl font-bold text-blue-600 flex items-center">
                            <IndianRupee className="w-5 h-5 -mr-0.5"/>
                            {vehicle.pricePerDay}
                            <span className="text-sm font-normal text-gray-500 ml-1">/ day</span>
                        </p>
                    </div>
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                        {actionText}
                        {actionText === "View Details" && <ArrowRight className="w-4 h-4 ml-1.5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
