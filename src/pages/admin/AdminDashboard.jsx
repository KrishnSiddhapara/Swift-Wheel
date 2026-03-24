import React, { useState, useEffect } from 'react';
import { Users, Car, CalendarCheck, BarChart3, MapPin, Trophy } from 'lucide-react';
import api from '../../api/axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await api.get('/admin/dashboard-stats');
                setStats(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                {error}
            </div>
        );
    }

    const statCards = [
        { title: 'Total Users', value: stats?.totalUsers || 0, icon: <Users size={24} className="text-blue-500" />, trend: 'Active' },
        { title: 'Total Sellers', value: stats?.totalSellers || 0, icon: <Users size={24} className="text-purple-500" />, trend: 'Partners' },
        { title: 'Total Vehicles', value: stats?.totalVehicles || 0, icon: <Car size={24} className="text-emerald-500" />, trend: 'Fleet' },
        { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: <CalendarCheck size={24} className="text-amber-500" />, trend: 'Transactions' },
        { title: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: <BarChart3 size={24} className="text-rose-500" />, trend: 'Earnings' },
    ];

    return (
        <div className="space-y-8 bg-gray-50 min-h-screen p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
                {statCards.map((stat, index) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={index} 
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 rounded-xl">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="z-10 relative">
                            <h3 className="text-gray-500 text-sm font-semibold mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                            <p className="text-xs font-bold text-gray-500 bg-gray-100 uppercase tracking-wider inline-block px-2 py-1 rounded-md">{stat.trend}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Most Rented Vehicle */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                    <div className="flex items-center mb-6">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg mr-3">
                            <Trophy size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Most Rented Vehicle</h2>
                    </div>
                    {stats?.mostRentedVehicle ? (
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                {stats.mostRentedVehicle.image ? (
                                    <img 
                                        src={stats.mostRentedVehicle.image.startsWith('/') ? `http://localhost:5000${stats.mostRentedVehicle.image}` : stats.mostRentedVehicle.image} 
                                        alt={stats.mostRentedVehicle.vehicleName} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center text-gray-400">
                                        <Car size={32} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.mostRentedVehicle.vehicleName}</h3>
                                <p className="text-blue-600 font-semibold mb-2">{stats.mostRentedVehicle.brand}</p>
                                <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600 uppercase tracking-wider">
                                    {stats.mostRentedVehicle.category}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 italic py-8 text-center">No booking data available yet.</div>
                    )}
                </motion.div>

                {/* Top Cities */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                    <div className="flex items-center mb-6">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                            <MapPin size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Top Cities by Bookings</h2>
                    </div>
                    {stats?.topCities && stats.topCities.length > 0 ? (
                        <div className="space-y-5">
                            {stats.topCities.map((city, index) => (
                                <div key={index} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{city.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 bg-gray-100 w-32 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                                                style={{ width: `${(city.count / stats.topCities[0].count) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm ml-2">{city.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic py-8 text-center">No city data available yet.</div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
