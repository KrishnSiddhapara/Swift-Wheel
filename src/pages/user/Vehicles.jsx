import React, { useState } from 'react';
import { vehicles as allVehicles } from '../../data/vehicles';
import VehicleCard from '../../components/VehicleCard';

const Vehicles = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Vehicles');
    const categories = ['All Vehicles', 'Bikes', 'Mopeds', 'Cars'];

    const filteredVehicles = selectedCategory === 'All Vehicles' 
        ? allVehicles 
        : allVehicles.filter(v => v.category === (selectedCategory === 'Bikes' ? 'Bike' : selectedCategory === 'Mopeds' ? 'Moped' : 'Car'));

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Vehicles</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose from our wide range of bikes, mopeds, and cars. Whether you need an agile ride for the city or a comfortable car for a road trip, we have you covered.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-colors border ${
                                selectedCategory === category 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div className="mb-6 text-gray-500 font-medium">
                    Showing {filteredVehicles.length} {filteredVehicles.length === 1 ? 'result' : 'results'} for "{selectedCategory}"
                </div>

                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {filteredVehicles.map(vehicle => (
                        <VehicleCard 
                            key={vehicle.id} 
                            vehicle={vehicle} 
                            actionText="View Details"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
