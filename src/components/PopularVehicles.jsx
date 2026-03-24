import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import VehicleCard from './VehicleCard';

const PopularVehicles = () => {
    const [popularVehicles, setPopularVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await api.get('/vehicles');
                const list = data.vehicles || [];
                // Get 3 bikes and 3 cars for the home page preview
                const bikes = list.filter(v => v.category === 'Bike').slice(0, 3);
                const cars = list.filter(v => v.category === 'Car').slice(0, 3);
                setPopularVehicles([...bikes, ...cars]);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
            setLoading(false);
        };
        fetchVehicles();
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Popular Vehicles</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our most booked vehicles and cars. Perfect for city travel, daily commuting, and road trips.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularVehicles.map((vehicle) => (
                            <VehicleCard 
                                key={vehicle._id || vehicle.id} 
                                vehicle={vehicle} 
                                actionText="Book Now"
                            />
                        ))}
                    </div>
                )}
                
                <div className="mt-16 text-center">
                    <a href="/vehicles" className="inline-block bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
                        View All Vehicles
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PopularVehicles;
